"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import BoardImage from "./BoardImage";
import Reveal from "./Reveal";
import StatusBadge from "./StatusBadge";
import CaseStudyModal from "./CaseStudyModal";
import { hasCaseDetail, type CaseStudyProject } from "@/lib/case-study-types";

const STAGE_MARK = { done: "✓", active: "●", todo: "○" } as const;

function paramOf(): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("project");
}

/**
 * Proje kartları + case study modal + URL state (?project=slug).
 * Kart tıklaması sayfa geçişi yapmaz; back tuşu modalı kapatır.
 */
export default function CaseStudyList({ projects }: { projects: CaseStudyProject[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(() => {
    const initial = paramOf();
    return initial && projects.some((p) => p.slug === initial) ? initial : null;
  });
  const [pushed, setPushed] = useState(false);

  const open = useCallback((slug: string) => {
    setOpenSlug(slug);
    setPushed(true);
    window.history.pushState({ project: slug }, "", `?project=${slug}`);
  }, []);

  const close = useCallback(() => {
    if (pushed) {
      setPushed(false);
      window.history.back();
    } else {
      setOpenSlug(null);
    }
  }, [pushed]);

  // back tuşu
  useEffect(() => {
    const onPop = () => setOpenSlug(paramOf());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // modal kapalıyken URL'de artık parametre kalmasın
  useEffect(() => {
    if (openSlug) return;
    if (paramOf()) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [openSlug]);

  const active = projects.find((p) => p.slug === openSlug) ?? null;

  return (
    <>
      <div className="mt-10 space-y-8">
        {projects.map((p, i) => {
          const detail = hasCaseDetail(p);
          return (
            <Reveal
              as="article"
              key={p.id}
              y={28}
              scaleFrom={0.985}
              duration={0.7}
              delay={Math.min(i * 0.1, 0.2)}
            >
              <div
                onClick={detail ? () => open(p.slug) : undefined}
                role={detail ? "button" : undefined}
                tabIndex={detail ? 0 : undefined}
                onKeyDown={
                  detail
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          open(p.slug);
                        }
                      }
                    : undefined
                }
                aria-label={detail ? `${p.title} — detayları incele` : undefined}
                className={`group rounded-md border border-[var(--line)] bg-[var(--panel)] p-6 transition-[transform,border-color,box-shadow] duration-200 md:p-8 ${
                  detail
                    ? "cursor-pointer hover:-translate-y-[3px] hover:border-[var(--accent)] hover:shadow-[0_0_32px_var(--accent-soft)]"
                    : ""
                }`}
              >
                <Reveal y={12} duration={0.5} delay={0.05}>
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
                    <span className="font-mono text-[12px] tracking-[0.2em] text-[var(--accent-ink)]">
                      {p.projectCode}
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
                </Reveal>

                <Reveal y={12} duration={0.5} delay={0.1}>
                  <h3 className="mt-4 max-w-3xl text-2xl font-semibold tracking-tight text-[var(--ink)] md:text-3xl">
                    {p.title}
                  </h3>
                </Reveal>

                <Reveal y={12} duration={0.5} delay={0.15}>
                  <p className="mt-3 max-w-3xl leading-relaxed text-[var(--muted)]">
                    {p.shortDescription}
                  </p>
                </Reveal>

                {p.specs.length > 0 && (
                  <Reveal y={12} duration={0.5} delay={0.2}>
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
                  </Reveal>
                )}

                {p.pipeline && p.pipeline.length > 0 && (
                  <Reveal y={12} duration={0.5} delay={0.22}>
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
                  </Reveal>
                )}

                {p.media.length > 0 && (
                  <div className="mt-6 grid gap-5 border-t border-[var(--line-soft)] pt-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[...p.media]
                      .sort((a, b) => a.sortOrder - b.sortOrder)
                      .slice(0, 3)
                      .map((m, vi) => (
                        <BoardImage
                          key={m.id}
                          src={m.image}
                          alt={m.alt}
                          caption={m.title}
                          delay={0.2 + vi * 0.1}
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
            </Reveal>
          );
        })}
      </div>

      {active && <CaseStudyModal project={active} onClose={close} />}
    </>
  );
}
