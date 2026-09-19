import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { CaseStudyProject } from "./case-study-types";

const STORE_PATH = path.join(process.cwd(), "data", "projects.json");

export function newId(): string {
  return randomUUID().slice(0, 8);
}

async function ensureStore(): Promise<CaseStudyProject[]> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as CaseStudyProject[];
    return [];
  } catch {
    return [];
  }
}

export async function getAllProjects(): Promise<CaseStudyProject[]> {
  const all = await ensureStore();
  return [...all].sort((a, b) => a.sortOrder - b.sortOrder);
}

/** Public site: yalnızca görünür projeler, sıraya göre. */
export async function getVisibleProjects(): Promise<CaseStudyProject[]> {
  const all = await getAllProjects();
  return all.filter((p) => p.visible);
}

export async function getProjectById(id: string): Promise<CaseStudyProject | null> {
  const all = await ensureStore();
  return all.find((p) => p.id === id) ?? null;
}

export async function getProjectByCode(code: string): Promise<CaseStudyProject | null> {
  const all = await ensureStore();
  return (
    all.find((p) => p.projectCode.toLowerCase() === code.toLowerCase()) ?? null
  );
}

export async function saveAllProjects(all: CaseStudyProject[]): Promise<void> {
  const sorted = [...all].sort((a, b) => a.sortOrder - b.sortOrder);
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(sorted, null, 2) + "\n", "utf-8");
}
