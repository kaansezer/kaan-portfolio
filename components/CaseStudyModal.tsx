"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { X } from "lucide-react";
import StatusBadge from "./StatusBadge";
import {
  MEDIA_TYPES,
  sectionLabel,
  type CaseStudyProject,
} from "@/lib/case-study-types";

const STAGE_MARK = { done: "✓", active: "●", todo: "○" } as const;

function Markdown({ text }: { text: string }) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => (
          <p className="mt-3 leading-relaxed text-[var(--ink-dim)] first:mt-0">{children}</p>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-[var(--ink)]">{children}</strong>
        ),
        ul: ({ children }) => (
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[var(--ink-dim)]">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[var(--ink-dim)]">{children}</ol>
        ),
        h3: ({ children }) => (
          <h4 className="mt-5 text-[15px] font-semibold text-[var(--ink)]">{children}</h4>
        ),
        a: ({ children, href }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent-ink)] underline underline-offset-2"
          >
            {children}
          </a>
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

function MediaGallery({ project }: { project: CaseStudyProject }) {
  const types = MEDIA_TYPES.map((t) => t.value).filter((t) =>
    project.media.some((m) => m.type === t),
  );
  const [tab, setTab] = useState<string | undefined>(types[0]);
  const [lightbox, setLightbox] = useState<string | null>(null);

  if (types.length === 0) return null;
  const items = project.media
    .filter((m) => m.type === tab)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div>
      <div role="tablist" aria-label="Medya türü" className="flex flex-wrap gap-5">
        {types.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`relative pb-2 font-mono text-[12px] tracking-[0.16em] transition-colors ${
              tab === t ? "text-[var(--accent-ink)]" : "text-[var(--muted)] hover:text-[var(--ink-dim)]"
            }`}
          >
            {MEDIA_TYPES.find((x) => x.value === t)?.label ?? t.toUpperCase()}
            <span
              aria-hidden
              className={`absolute inset-x-0 -bottom-px h-px bg-[var(--accent)] transition-opacity ${
                tab === t ? "opacity-100" : "opacity-0"
              }`}
            />
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {items.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setLightbox(m.image)}
            className="group relative aspect-[16/9] overflow-hidden rounded-sm border border-[rgba(100,150,130,.25)] bg-[var(--panel)]"
            aria-label={`${m.title} — büyüt`}
          >
            <Image
              src={m.image}
              alt={m.alt}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-contain p-2"
              loading="lazy"
            />
            <span className="absolute inset-x-0 bottom-0 bg-black/55 px-3 py-1.5 text-left font-mono text-[11px] tracking-[0.08em] text-zinc-200">
              {m.title}
            </span>
          </button>
        ))}
      </div>
      {lightbox && (
        <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-10"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Kapat"
        autoFocus
        className="absolute right-4 top-4 rounded-sm border border-white/20 p-2 text-zinc-300 transition-colors hover:border-white/50 hover:text-white"
      >
        <X size={18} aria-hidden />
      </button>
      <div className="relative h-[80vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <Image src={src} alt="Büyütülmüş görsel" fill sizes="100vw" className="object-contain" priority />
      </div>
    </div>
  );
}

/**
 * Premium case study modal: admin datasından beslenir, hardcode yok.
 * Yalnızca mevcut (visible) section/spec/media/contribution render olur.
 */
export default function CaseStudyModal({
  project,
  onClose,
}: {
  project: CaseStudyProject;
  onClose: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const sections = [...project.sections]
    .filter((s) => s.visible)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  // ESC + body scroll lock + başlık
  useEffect(() => {
    const prevTitle = document.title;
    document.title = project.seoTitle?.trim() || `${project.title} — Kaan Sezer`;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      document.title = prevTitle;
    };
  }, [onClose, project.seoTitle, project.title]);

  const scrollTo = useCallback((id: string) => {
    scrollRef.current
      ?.querySelector(`[data-section="${id}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={onClose}
      className="fixed inset-0 z-[90] flex items-end justify-center bg-[rgba(0,0,0,.72)] backdrop-blur-sm sm:items-center sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-xl border border-[var(--line)] bg-[var(--bg)] sm:max-h-[90vh] sm:rounded-md md:w-[min(1180px,92vw)]"
      >
        {/* header */}
        <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] px-5 py-5 md:px-8">
          <div className="min-w-0">
            <p className="font-mono text-[12px] tracking-[0.2em] text-[var(--accent-ink)]">
              {project.projectCode}
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-[var(--ink)] md:text-3xl">
              {project.title}
            </h2>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] tracking-[0.14em] text-[var(--muted)]">
              {project.organization && <span>{project.organization}</span>}
              <StatusBadge status={project.status} />
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="shrink-0 rounded-sm border border-[var(--line)] p-2 text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--ink)]"
          >
            <X size={18} aria-hidden />
          </button>
        </div>

        {/* section nav */}
        {sections.length > 1 && (
          <nav aria-label="Case study bölümleri" className="border-b border-[var(--line-soft)] px-5 md:px-8">
            <ul className="flex gap-5 overflow-x-auto py-3">
              {sections.map((s) => (
                <li key={s.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => scrollTo(s.id)}
                    className="font-mono text-[11px] tracking-[0.16em] text-[var(--muted)] transition-colors hover:text-[var(--accent-ink)]"
                  >
                    {sectionLabel(s)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* body */}
        <div ref={scrollRef} className="overflow-y-auto px-5 py-7 md:px-8 md:py-9">
          {project.longDescription.trim() && (
            <p className="max-w-3xl text-[16px] leading-relaxed text-[var(--ink-dim)]">
              {project.longDescription}
            </p>
          )}

          {/* tech summary */}
          {project.specs.length > 0 && (
            <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-[var(--line)] bg-[var(--line-soft)] sm:grid-cols-3 lg:grid-cols-5">
              {[...project.specs]
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map((s) => (
                  <div key={s.id} className="bg-[var(--panel)] px-4 py-4">
                    <dd className="text-[15px] font-semibold leading-snug text-[var(--ink)]">
                      {s.value}
                    </dd>
                    <dt className="mt-1 font-mono text-[10px] tracking-[0.18em] text-[var(--muted)]">
                      {s.label.toUpperCase()}
                    </dt>
                  </div>
                ))}
            </dl>
          )}

          {/* pipeline */}
          {project.pipeline && project.pipeline.length > 0 && (
            <ul aria-label="Geliştirme aşamaları" className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {project.pipeline.map((s) => (
                <li
                  key={s.label}
                  className={`inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] ${
                    s.state === "active" ? "text-[var(--accent-ink)]" : "text-[var(--muted)]"
                  }`}
                >
                  <span aria-hidden>{STAGE_MARK[s.state]}</span>
                  {s.label}
                </li>
              ))}
            </ul>
          )}

          {/* sections */}
          {sections.map((s, i) => (
            <section
              key={s.id}
              data-section={s.id}
              aria-label={sectionLabel(s)}
              className={`scroll-mt-4 py-7 ${i > 0 ? "border-t border-[var(--line-soft)]" : ""}`}
            >
              <p className="font-mono text-[11px] tracking-[0.22em] text-[var(--muted)]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-[var(--ink)] md:text-xl">
                {sectionLabel(s)}
              </h3>
              {s.content.trim() && (
                <div className="mt-3 max-w-3xl text-[15px]">
                  <Markdown text={s.content} />
                </div>
              )}
              {s.image && (
                <figure className="mt-5 max-w-3xl">
                  <span className="block overflow-hidden rounded-sm border border-[var(--line)]">
                    <Image
                      src={s.image}
                      alt={s.caption || sectionLabel(s)}
                      width={1200}
                      height={800}
                      sizes="(max-width: 768px) 100vw, 70vw"
                      className="h-auto w-full object-contain"
                      loading="lazy"
                    />
                  </span>
                  {s.caption && (
                    <figcaption className="mt-2 font-mono text-[11px] tracking-[0.1em] text-[var(--muted)]">
                      {s.caption}
                    </figcaption>
                  )}
                </figure>
              )}
            </section>
          ))}

          {/* contribution */}
          {project.contributions.length > 0 && (
            <section aria-label="My contribution" className="border-t border-[var(--line-soft)] py-7">
              <p className="font-mono text-[11px] tracking-[0.22em] text-[var(--muted)]">
                {String(sections.length + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-[var(--ink)] md:text-xl">
                MY CONTRIBUTION
              </h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {project.contributions.map((c) => (
                  <li
                    key={c}
                    className="border-l border-[var(--accent)] py-1 pl-4 text-[14px] text-[var(--ink-dim)]"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* media */}
          {project.media.length > 0 && (
            <section aria-label="Media" className="border-t border-[var(--line-soft)] py-7">
              <p className="font-mono text-[11px] tracking-[0.22em] text-[var(--muted)]">
                {String(sections.length + (project.contributions.length > 0 ? 2 : 1)).padStart(2, "0")}
              </p>
              <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-[var(--ink)] md:text-xl">
                MEDIA
              </h3>
              <div className="mt-4">
                <MediaGallery project={project} />
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
