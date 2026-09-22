"use client";

import { ArrowRight, Star } from "lucide-react";
import BoardImage from "./BoardImage";
import { RevealGroup, RevealItem } from "./Reveal";
import StatusBadge from "./StatusBadge";
import { useProjectNav } from "./ProjectNavContext";
import { hasCaseDetail, type CaseStudyProject } from "@/lib/case-study-types";

const STAGE_MARK = { done: "✓", active: "●", todo: "○" } as const;

/**
 * Proje kartları. Tıklama, ProjectViewGate'e (üst seviye) bildirilir —
 * detay artık modal değil, tam sayfa case-study görünümü olarak açılır.
 */
export default function CaseStudyList({ projects }: { projects: CaseStudyProject[] }) {
  const { openProject } = useProjectNav();

  return (
    <>
      <div className="mt-10 space-y-8">
        {projects.map((p, i) => {
          const detail = hasCaseDetail(p);
          return (
            <RevealGroup
              as="article"
              key={p.id}
              y={34}
              scaleFrom={0.975}
              duration={0.85}
              delay={Math.min(i * 0.08, 0.16)}
            >
              <div
                onClick={detail ? () => openProject(p.slug) : undefined}
                role={detail ? "button" : undefined}
                tabIndex={detail ? 0 : undefined}
                onKeyDown={
                  detail
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          openProject(p.slug);
                        }
                      }
                    : undefined
                }
                aria-label={detail ? `${p.title} — detayları incele` : undefined}
                className={`group relative overflow-hidden rounded-xl border bg-[var(--panel)] p-8 transition-all duration-300 md:p-10 ${
                  p.featured
                    ? "border-[var(--accent)]/45 bg-gradient-to-br from-[var(--panel)] via-[var(--panel)] to-[var(--panel-soft)] shadow-[0_0_40px_var(--accent-soft)] ring-1 ring-[var(--accent)]/20"
                    : "border-[var(--line)] hover:border-[var(--line-soft)]"
                } ${
                  detail
                    ? "card-glow-hover cursor-pointer hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
                    : ""
                }`}
              >
                {/* öne çıkan projede üst kenarda ince vurgu şeridi */}
                {p.featured && (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
                  />
                )}
                <RevealItem y={12} duration={0.5}>
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="font-mono text-[12px] tracking-[0.2em] text-[var(--accent-ink)]">
                        {p.projectCode}
                      </span>
                      {p.featured && (
                        <span className="badge-glow inline-flex items-center gap-1.5 rounded-md border border-[var(--accent)]/30 bg-[var(--accent)]/5 px-2.5 py-1 font-mono text-[10px] font-600 tracking-[0.18em] text-[var(--accent-ink)]">
                          <Star size={10} aria-hidden fill="currentColor" strokeWidth={0} />
                          ÖNE ÇIKAN
                        </span>
                      )}
                    </span>
                    <span className="flex flex-col items-end gap-2">
                      <StatusBadge status={p.status} />
                      {p.organization && (
                        <span className="text-right font-mono text-[11px] tracking-[0.14em] text-[var(--muted)]">
                          {p.organization}
                        </span>
                      )}
                    </span>
                  </div>
                </RevealItem>

                <RevealItem y={12} duration={0.5}>
                  <h3 className="mt-4 max-w-3xl text-balance text-2xl font-semibold tracking-tight text-[var(--ink)] md:text-3xl">
                    {p.title}
                  </h3>
                </RevealItem>

                <RevealItem y={12} duration={0.5}>
                  <p className="mt-3 max-w-[68ch] text-pretty leading-[1.7] text-[var(--muted)]">
                    {p.shortDescription}
                  </p>
                </RevealItem>

                {p.tags && p.tags.length > 0 && (
                  <RevealItem y={10} duration={0.5}>
                    <ul aria-label="Teknolojiler" className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <li
                          key={t}
                          className="rounded-sm border border-[var(--line)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </RevealItem>
                )}

                {p.specs.length > 0 && (
                  <RevealItem y={12} duration={0.5}>
                    <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[var(--line-soft)] pt-5 sm:grid-cols-3 lg:grid-cols-4">
                      {[...p.specs]
                        .sort((a, b) => a.sortOrder - b.sortOrder)
                        .map((s) => (
                          <div key={s.id}>
                            <dt className="font-mono text-[10px] tracking-[0.2em] text-[var(--muted)]">
                              {s.label.toUpperCase()}
                            </dt>
                            <dd className="mt-1 text-sm font-medium text-[var(--ink-dim)]">
                              {s.value}
                            </dd>
                          </div>
                        ))}
                    </dl>
                  </RevealItem>
                )}

                {p.pipeline && p.pipeline.length > 0 && (
                  <RevealItem y={12} duration={0.5}>
                    <div className="mt-6 border-t border-[var(--line-soft)] pt-5">
                      <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--muted)]">
                        CURRENT STAGE
                      </p>
                      <ul aria-label="Geliştirme aşamaları" className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                        {p.pipeline.map((s) => (
                          <li
                            key={s.label}
                            className={`inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] ${
                              s.state === "active"
                                ? "text-[var(--accent-ink)]"
                                : "text-[var(--muted)]"
                            }`}
                          >
                            <span aria-hidden>{STAGE_MARK[s.state]}</span>
                            {s.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </RevealItem>
                )}

                {p.media.length > 0 && (
                  <div className="mt-6 grid gap-5 border-t border-[var(--line-soft)] pt-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[...p.media]
                      .sort((a, b) => a.sortOrder - b.sortOrder)
                      .slice(0, 3)
                      .map((m) => (
                        <BoardImage
                          key={m.id}
                          src={m.image}
                          alt={m.alt}
                          caption={m.title}
                          item
                        />
                      ))}
                  </div>
                )}

                {detail && (
                  <span className="mt-6 inline-flex items-center gap-2 text-[13px] text-[var(--muted)] opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[var(--accent-ink)] group-hover:opacity-100 group-focus-within:opacity-100">
                    DETAYLARI İNCELE
                    <ArrowRight size={14} aria-hidden />
                  </span>
                )}
              </div>
            </RevealGroup>
          );
        })}
      </div>
    </>
  );
}
