"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Copy, Eye, EyeOff, Pencil, Plus, ScanEye, Trash2 } from "lucide-react";
import {
  deleteProjectAction,
  duplicateProjectAction,
  moveProjectAction,
  toggleProjectVisibilityAction,
} from "@/lib/admin-actions";
import type { CaseStudyProject } from "@/lib/case-study-types";
import ProjectDetail from "../ProjectDetail";

function RowButton({
  title,
  onClick,
  children,
}: {
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      className="rounded-sm border border-[var(--line)] p-2 text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-ink)]"
    >
      {children}
    </button>
  );
}

export default function AdminProjectList({ initial }: { initial: CaseStudyProject[] }) {
  const [items, setItems] = useState<CaseStudyProject[]>(initial);
  const [previewing, setPreviewing] = useState<CaseStudyProject | null>(null);
  const [pending, start] = useTransition();
  const router = useRouter();

  const moveLocal = (id: string, dir: -1 | 1) =>
    start(async () => {
      setItems((prev) => {
        const idx = prev.findIndex((p) => p.id === id);
        const j = idx + dir;
        if (idx < 0 || j < 0 || j >= prev.length) return prev;
        const next = [...prev];
        const [item] = next.splice(idx, 1);
        next.splice(j, 0, item);
        return next;
      });
      await moveProjectAction(id, dir);
      router.refresh();
    });

  const toggleLocal = (id: string) =>
    start(async () => {
      setItems((prev) => prev.map((p) => (p.id === id ? { ...p, visible: !p.visible } : p)));
      await toggleProjectVisibilityAction(id);
      router.refresh();
    });

  const deleteLocal = (id: string) =>
    start(async () => {
      setItems((prev) => prev.filter((p) => p.id !== id));
      await deleteProjectAction(id);
      router.refresh();
    });

  const duplicateLocal = (id: string) =>
    start(async () => {
      const r = await duplicateProjectAction(id);
      router.refresh();
      if (r.ok && r.id) router.push(`/admin/projects/${r.id}`);
    });

  return (
    <div className="overflow-hidden rounded-md border border-[var(--line)]">
      {items.map((p, i) => {
        const thumb = p.thumbnail || p.coverImage || p.media[0]?.image;
        return (
          <div
            key={p.id}
            className={`flex flex-wrap items-center gap-3 px-4 py-4 md:px-5 ${
              i > 0 ? "border-t border-[var(--line-soft)]" : ""
            } ${p.visible ? "" : "opacity-55"}`}
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-[var(--line)] bg-[var(--panel)]">
              {thumb ? (
                // eslint-disable-next-line @next/next/no-img-element -- küçük admin liste thumbnail'i
                <img src={thumb} alt="" className="h-full w-full object-contain p-1" />
              ) : (
                <span className="font-mono text-[10px] text-[var(--muted)]">—</span>
              )}
            </span>

            <span className="w-10 shrink-0 font-mono text-[12px] text-[var(--accent-ink)]">
              {p.projectCode}
            </span>

            <div className="min-w-0 flex-1 basis-48">
              <p className="flex flex-wrap items-center gap-x-2 truncate text-[15px] font-medium text-[var(--ink)]">
                {p.title}
                {p.featured && (
                  <span className="rounded-sm border border-[var(--accent)]/40 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.1em] text-[var(--accent-ink)]">
                    FEATURED
                  </span>
                )}
              </p>
              <p className="mt-0.5 font-mono text-[11px] text-[var(--muted)]">
                {p.visible ? "YAYINDA" : "GİZLİ"}
                {p.category && ` · ${p.category.toUpperCase()}`}
                {p.date && ` · ${p.date}`} · {p.sections.length} BÖLÜM ·{" "}
                {p.specs.length} SPEC · {p.media.length} MEDYA
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <RowButton title="Yukarı taşı" onClick={() => moveLocal(p.id, -1)}>
                <ArrowUp size={15} aria-hidden />
              </RowButton>
              <RowButton title="Aşağı taşı" onClick={() => moveLocal(p.id, 1)}>
                <ArrowDown size={15} aria-hidden />
              </RowButton>
              <RowButton title="Önizle" onClick={() => setPreviewing(p)}>
                <ScanEye size={15} aria-hidden />
              </RowButton>
              <RowButton
                title={p.visible ? "Gizle" : "Yayınla"}
                onClick={() => toggleLocal(p.id)}
              >
                {p.visible ? <Eye size={15} aria-hidden /> : <EyeOff size={15} aria-hidden />}
              </RowButton>
              <RowButton title="Düzenle" onClick={() => router.push(`/admin/projects/${p.id}`)}>
                <Pencil size={15} aria-hidden />
              </RowButton>
              <RowButton title="Kopyala" onClick={() => duplicateLocal(p.id)}>
                <Copy size={15} aria-hidden />
              </RowButton>
              <RowButton
                title="Sil"
                onClick={() => {
                  if (window.confirm(`"${p.title}" projesini silmek istediğinizden emin misiniz?`)) {
                    deleteLocal(p.id);
                  }
                }}
              >
                <Trash2 size={15} aria-hidden />
              </RowButton>
            </div>
          </div>
        );
      })}
      {items.length === 0 && (
        <p className="px-5 py-10 text-center text-[14px] text-[var(--muted)]">
          Henüz proje yok. “Yeni Proje” ile başlayın.
        </p>
      )}
      <span className="hidden">{pending ? "1" : ""}</span>

      {previewing && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Proje önizlemesi"
          className="fixed inset-0 z-[200] overflow-y-auto bg-[var(--bg)]"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--line)] bg-[var(--header-bg)] px-5 py-3 backdrop-blur-md md:px-8">
            <p className="font-mono text-[11px] tracking-[0.2em] text-[var(--accent-ink)]">
              ÖNİZLEME {!previewing.visible && "— GİZLİ (TASLAK)"}
            </p>
            <button
              type="button"
              onClick={() => setPreviewing(null)}
              className="inline-flex items-center gap-2 rounded-sm border border-[var(--line)] px-4 py-2 text-[13px] text-[var(--ink-dim)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-ink)]"
            >
              Önizlemeyi Kapat
            </button>
          </div>
          <ProjectDetail project={previewing} onBack={() => setPreviewing(null)} />
        </div>
      )}
    </div>
  );
}

export function AdminNewButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push("/admin/projects/new")}
      className="inline-flex items-center gap-2 rounded-sm bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[#0b1512] transition-all hover:brightness-110"
    >
      <Plus size={16} aria-hidden />
      Yeni Proje
    </button>
  );
}
