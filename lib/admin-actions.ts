"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  getAllProjects,
  getProjectById,
  newId,
  saveAllProjects,
} from "./projects-store";
import { isAdminSetup, loginAdmin, logoutAdmin, requireAdmin, setupAdmin } from "./admin-auth";
import type {
  CaseSectionType,
  CaseStudyProject,
  MediaType,
  ProjectStatus,
} from "./case-study-types";

async function guard() {
  if (!(await requireAdmin())) throw new Error("UNAUTHORIZED");
}

function slugify(s: string): string {
  return (
    s
      .toLowerCase()
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "proje"
  );
}

// ---------- auth ----------

export async function adminSetupAction(password: string) {
  const r = await setupAdmin(password);
  if (!r.ok) return r;
  revalidatePath("/admin");
  return r;
}

export async function adminLoginAction(password: string) {
  const r = await loginAdmin(password);
  if (!r.ok) return r;
  revalidatePath("/admin");
  return r;
}

export async function adminLogoutAction() {
  await logoutAdmin();
  redirect("/admin/login");
}

export async function adminSetupState() {
  return isAdminSetup();
}

// ---------- validation ----------

const specSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1).max(80),
  value: z.string().min(1).max(200),
  sortOrder: z.number().int(),
});

const sectionSchema = z.object({
  id: z.string().min(1),
  type: z.enum([
    "overview", "problem", "architecture", "pcb", "firmware",
    "software", "test", "result", "contribution", "custom",
  ]),
  title: z.string().max(120),
  content: z.string().max(20000),
  image: z.string().max(500).optional(),
  caption: z.string().max(300).optional(),
  visible: z.boolean(),
  sortOrder: z.number().int(),
});

const mediaSchema = z.object({
  id: z.string().min(1),
  type: z.enum(["3d", "pcb", "schematic", "test", "photo", "other"]),
  image: z.string().min(1).max(500),
  title: z.string().max(120),
  caption: z.string().max(300).optional().default(""),
  alt: z.string().max(200),
  sortOrder: z.number().int(),
});

const stageSchema = z.object({
  label: z.string().min(1).max(40),
  state: z.enum(["done", "active", "todo"]),
});

const projectSchema = z.object({
  id: z.string().min(1),
  projectCode: z.string().min(1).max(12),
  title: z.string().min(2).max(140),
  slug: z.string().max(160).optional().default(""),
  shortDescription: z.string().max(300),
  longDescription: z.string().max(5000).default(""),
  status: z.enum(["in-development", "prototype", "completed", "flight-tested"]),
  category: z.string().max(60).default(""),
  organization: z.string().max(120).default(""),
  date: z.string().max(60).default(""),
  coverImage: z.string().max(500).optional().default(""),
  thumbnail: z.string().max(500).optional().default(""),
  featured: z.boolean().default(false),
  visible: z.boolean(),
  sortOrder: z.number().int(),
  seoTitle: z.string().max(160).optional().default(""),
  seoDescription: z.string().max(300).optional().default(""),
  specs: z.array(specSchema).default([]),
  sections: z.array(sectionSchema).default([]),
  media: z.array(mediaSchema).default([]),
  contributions: z.array(z.string().max(200)).default([]),
  pipeline: z.array(stageSchema).optional().default([]),
});

export type ProjectInput = z.infer<typeof projectSchema>;

// ---------- CRUD ----------

function normalize<T extends ProjectInput>(input: T, existing?: CaseStudyProject): CaseStudyProject {
  const now = new Date().toISOString();
  const slug = input.slug?.trim() || slugify(input.title);
  return {
    ...(existing ?? {}),
    id: input.id || newId(),
    projectCode: input.projectCode.trim().toUpperCase(),
    title: input.title.trim(),
    slug,
    shortDescription: input.shortDescription.trim(),
    longDescription: input.longDescription.trim(),
    status: input.status as ProjectStatus,
    category: input.category.trim(),
    organization: input.organization.trim(),
    date: input.date.trim(),
    coverImage: input.coverImage?.trim() || undefined,
    thumbnail: input.thumbnail?.trim() || undefined,
    featured: input.featured,
    visible: input.visible,
    sortOrder: input.sortOrder,
    seoTitle: input.seoTitle?.trim() || undefined,
    seoDescription: input.seoDescription?.trim() || undefined,
    specs: input.specs.map((s, i) => ({ ...s, sortOrder: i + 1 })),
    sections: input.sections.map((s, i) => ({
      ...s,
      type: s.type as CaseSectionType,
      sortOrder: i + 1,
    })),
    media: input.media.map((m, i) => ({ ...m, type: m.type as MediaType, sortOrder: i + 1 })),
    contributions: input.contributions.map((c) => c.trim()).filter(Boolean),
    pipeline: (input.pipeline ?? []).map((p) => ({ ...p })),
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
}

export async function saveProjectAction(input: ProjectInput): Promise<{ ok: boolean; error?: string; id?: string }> {
  await guard();
  const parsed = projectSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Form verisi geçersiz." };
  const all = await getAllProjects();
  const idx = all.findIndex((p) => p.id === parsed.data.id);
  const dup = all.find(
    (p) =>
      p.projectCode.toLowerCase() === parsed.data.projectCode.trim().toLowerCase() &&
      p.id !== parsed.data.id,
  );
  if (dup) return { ok: false, error: "Bu Project ID zaten kullanılıyor." };
  const record = normalize(parsed.data, idx >= 0 ? all[idx] : undefined);
  if (idx >= 0) all[idx] = record;
  else {
    record.sortOrder = Math.max(0, ...all.map((p) => p.sortOrder)) + 1;
    all.push(record);
  }
  await saveAllProjects(all);
  revalidatePath("/");
  revalidatePath("/admin");
  return { ok: true, id: record.id };
}

export async function deleteProjectAction(id: string): Promise<{ ok: boolean }> {
  await guard();
  const all = await getAllProjects();
  await saveAllProjects(all.filter((p) => p.id !== id));
  revalidatePath("/");
  revalidatePath("/admin");
  return { ok: true };
}

export async function toggleProjectVisibilityAction(id: string): Promise<{ ok: boolean }> {
  await guard();
  const all = await getAllProjects();
  const p = all.find((x) => x.id === id);
  if (!p) return { ok: false };
  p.visible = !p.visible;
  p.updatedAt = new Date().toISOString();
  await saveAllProjects(all);
  revalidatePath("/");
  revalidatePath("/admin");
  return { ok: true };
}

export async function moveProjectAction(id: string, dir: -1 | 1): Promise<{ ok: boolean }> {
  await guard();
  const all = await getAllProjects();
  const idx = all.findIndex((p) => p.id === id);
  const j = idx + dir;
  if (idx < 0 || j < 0 || j >= all.length) return { ok: false };
  const [item] = all.splice(idx, 1);
  all.splice(j, 0, item);
  all.forEach((p, i) => {
    p.sortOrder = i + 1;
    p.updatedAt = new Date().toISOString();
  });
  await saveAllProjects(all);
  revalidatePath("/");
  revalidatePath("/admin");
  return { ok: true };
}

export async function getAdminProjectAction(id: string) {
  await guard();
  return getProjectById(id);
}
