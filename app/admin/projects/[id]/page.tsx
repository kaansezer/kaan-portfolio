import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireAdmin } from "@/lib/admin-auth";
import { getProjectById } from "@/lib/projects-store";
import ProjectEditor from "@/components/admin/ProjectEditor";
import type { CaseStudyProject } from "@/lib/case-study-types";

function blank(): Omit<CaseStudyProject, "createdAt" | "updatedAt"> {
  return {
    id: "",
    projectCode: "",
    title: "",
    slug: "",
    shortDescription: "",
    longDescription: "",
    status: "in-development",
    category: "",
    organization: "",
    date: "",
    featured: false,
    visible: true,
    sortOrder: 0,
    specs: [],
    sections: [],
    media: [],
    contributions: [],
    pipeline: [],
  };
}

export default async function ProjectEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await requireAdmin())) redirect("/admin/login");
  const { id } = await params;

  const existing = id === "new" ? null : await getProjectById(id);
  if (id !== "new" && !existing) redirect("/admin");

  const initial = existing ?? blank();

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-10 md:px-8 md:py-14">
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-[14px] text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
      >
        <ArrowLeft size={15} aria-hidden /> Projects
      </Link>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--ink)] md:text-3xl">
        {id === "new" ? "Yeni Proje" : `${existing?.projectCode} — ${existing?.title}`}
      </h1>
      <div className="mt-6">
        <ProjectEditor initial={initial} />
      </div>
    </main>
  );
}
