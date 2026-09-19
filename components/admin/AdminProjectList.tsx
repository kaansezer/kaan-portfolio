"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Eye, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
import {
  deleteProjectAction,
  moveProjectAction,
  toggleProjectVisibilityAction,
} from "@/lib/admin-actions";
import type { CaseStudyProject } from "@/lib/case-study-types";

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

  return (
    <div className="overflow-hidden rounded-md border border-[var(--line)]">
      {items.map((p, i) => (
        <div
          key={p.id}
          className={`flex flex-wrap items-center gap-3 px-4 py-4 md:px-5 ${
            i > 0 ? "border-t border-[var(--line-soft)]" : ""
          } ${p.visible ? "" : "opacity-55"}`}
        >
          <span className="w-10 shrink-0 font-mono text-[12px] text-[var(--accent-ink)]">
            {p.projectCode}
          </span>
          <div className="min-w-0 flex-1 basis-48">
            <p className="truncate text-[15px] font-medium text-[var(--ink)]">{p.title}</p>
            <p className="mt-0.5 font-mono text-[11px] text-[var(--muted)]">
              {p.visible ? "YAYINDA" : "GİZLİ"} · {p.sections.length} BÖLÜM ·{" "}
              {p.specs.length} SPEC · {p.media.length} MEDYA
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <RowButton title="Yukarı taşı" onClick={() => moveLocal(p.id, -1)}>
              <ArrowUp size={15} aria-hidden />
            </RowButton>
            <RowButton title="Aşağı taşı" onClick={() => moveLocal(p.id, 1)}>
              <ArrowDown size={15} aria-hidden />
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
            <RowButton
              title="Sil"
              onClick={() => {
                if (window.confirm(`"${p.title}" silinsin mi?`)) {
                  deleteLocal(p.id);
                }
              }}
            >
              <Trash2 size={15} aria-hidden />
            </RowButton>
          </div>
        </div>
      ))}
      {items.length === 0 && (
        <p className="px-5 py-10 text-center text-[14px] text-[var(--muted)]">
          Henüz proje yok. “Yeni Proje” ile başlayın.
        </p>
      )}
      <span className="hidden">{pending ? "1" : ""}</span>
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
