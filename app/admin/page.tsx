import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { adminLogoutAction } from "@/lib/admin-actions";
import { getAllProjects } from "@/lib/projects-store";
import AdminProjectList, { AdminNewButton } from "@/components/admin/AdminProjectList";

export default async function AdminPage() {
  if (!(await requireAdmin())) redirect("/admin/login");
  const projects = await getAllProjects();

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-10 md:px-8 md:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[12px] tracking-[0.22em] text-[var(--accent-ink)]">
            KS · REV-A — ADMIN
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--ink)]">
            Projects
          </h1>
          <p className="mt-1 font-mono text-[11px] tracking-[0.14em] text-[var(--muted)]">
            {projects.length} PROJE · {projects.filter((p) => p.visible).length} YAYINDA
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="rounded-sm border border-[var(--line)] px-4 py-2.5 text-sm text-[var(--ink-dim)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-ink)]"
          >
            Siteye Dön
          </Link>
          <AdminNewButton />
          <form action={adminLogoutAction}>
            <button
              type="submit"
              className="rounded-sm border border-[var(--line)] px-4 py-2.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
            >
              Çıkış
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8">
        <AdminProjectList initial={projects} />
      </div>
    </main>
  );
}
