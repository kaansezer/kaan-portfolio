"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, X } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { RevealGroup, RevealItem } from "./Reveal";
import {
  MEDIA_TYPES,
  sectionLabel,
  type CaseStudyProject,
  type MediaType,
} from "@/lib/case-study-types";

const STAGE_MARK = { done: "✓", active: "●", todo: "○" } as const;

function Markdown({ text }: { text: string }) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => (
          <p className="mt-4 text-pretty text-[16px] leading-[1.75] text-[var(--ink-dim)] first:mt-0">
            {children}
          </p>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-[var(--ink)]">{children}</strong>
        ),
        ul: ({ children }) => (
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--ink-dim)]">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-[var(--ink-dim)]">{children}</ol>
        ),
        h3: ({ children }) => (
          <h4 className="mt-6 text-[16px] font-semibold text-[var(--ink)]">{children}</h4>
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

/** 0N — bölüm başlığı, ince ayraç ile: tüm case-study bölümlerinde ortak. */
function SectionNumber({ n, label }: { n: number; label: string }) {
  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.22em] text-[var(--muted)]">
        {String(n).padStart(2, "0")}
      </p>
      <h2 className="mt-1.5 font-mono text-[13px] font-600 uppercase tracking-[0.16em] text-[var(--ink)]">
        {label}
      </h2>
    </div>
  );
}

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
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
        <Image src={src} alt={alt} fill sizes="100vw" className="object-contain" priority />
      </div>
    </div>
  );
}

/** 03 — Medya: sekme (tip) seçimi + altında BÜYÜK sahne. Küçük grid yok. */
function MediaSection({ project, n }: { project: CaseStudyProject; n: number }) {
  const types = MEDIA_TYPES.map((t) => t.value).filter((t) =>
    project.media.some((m) => m.type === t),
  );
  const [tab, setTab] = useState<MediaType | undefined>(types[0]);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  if (types.length === 0) return null;
  const items = project.media
    .filter((m) => m.type === tab)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section
      data-reveal-section
      aria-label="Medya"
      className="grid gap-8 border-t border-[var(--line-soft)] py-16 md:grid-cols-[30%_70%] md:py-20"
    >
      <SectionNumber n={n} label="Medya" />
      <div>
        <div role="tablist" aria-label="Medya türü" className="flex flex-wrap gap-6">
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

        <div className="mt-6 flex flex-col gap-10">
          {items.map((m) => (
            <figure key={m.id}>
              <button
                type="button"
                onClick={() => setLightbox({ src: m.image, alt: m.alt })}
                aria-label={`${m.title} — büyüt`}
                className="group relative block aspect-[16/9] w-full cursor-zoom-in overflow-hidden"
              >
                {/* Şeffaf PNG'lerde kart zemini yok — sadece çok soluk glow. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10"
                  style={{
                    background: "radial-gradient(circle, rgba(224,139,69,0.08), transparent 65%)",
                  }}
                />
                <Image
                  src={m.image}
                  alt={m.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 65vw"
                  className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </button>
              {m.title && (
                <figcaption className="mt-3 font-mono text-[11px] tracking-[0.14em] text-[var(--muted)]">
                  {m.title}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>

      {lightbox && (
        <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}
    </section>
  );
}

/**
 * Proje case-study sayfası — MODAL DEĞİL. Navbar'ın altında, sayfanın kendisi
 * bu içerik; tek scroll container tarayıcı/sayfa scroll'u. Aynı bileşen her
 * proje için kullanılır — hardcode veri yok, yalnızca `project`'te var olanlar
 * render olur.
 */
export default function ProjectDetail({
  project,
  onBack,
}: {
  project: CaseStudyProject;
  onBack: () => void;
}) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = project.seoTitle?.trim() || `${project.title} — Kaan Sezer`;
    return () => {
      document.title = prevTitle;
    };
  }, [project.seoTitle, project.title]);

  const sections = [...project.sections]
    .filter((s) => s.visible)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const specs = [...project.specs].sort((a, b) => a.sortOrder - b.sortOrder);

  const heroMedia = [...project.media].sort((a, b) => a.sortOrder - b.sortOrder)[0];
  const heroImage = project.coverImage || heroMedia?.image;
  const heroImageAlt = heroMedia?.alt || project.title;

  // Bölüm numaralandırması: mutasyon yok, saf aritmetik (React Compiler
  // render sırasında değişken reassignment'a izin vermiyor).
  const hasMedia = project.media.length > 0;
  const hasSpecs = specs.length > 0;
  const hasContributions = project.contributions.length > 0;
  const mediaN = sections.length + 1;
  const specsN = sections.length + (hasMedia ? 1 : 0) + 1;
  const contributionsN =
    sections.length + (hasMedia ? 1 : 0) + (hasSpecs ? 1 : 0) + 1;

  return (
    <div className="relative z-10 isolate overflow-x-clip bg-[var(--bg)] text-[var(--ink)]">
      <div className="mx-auto max-w-[1280px] px-5 pb-24 pt-24 sm:px-8 md:pt-28 lg:px-10 lg:pt-32">
        {/* ← geri */}
        <button
          type="button"
          onClick={onBack}
          className="group inline-flex items-center gap-2.5 font-mono text-[12px] font-600 uppercase tracking-[0.16em] text-[var(--muted)] transition-colors hover:text-[var(--accent-ink)]"
        >
          <ArrowLeft
            size={15}
            aria-hidden
            strokeWidth={2.2}
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />
          Projelere Dön
        </button>

        {/* ——— HERO ——— */}
        <RevealGroup
          as="div"
          y={20}
          stagger={0.07}
          className="mt-10 grid items-center gap-12 md:mt-14 lg:grid-cols-[52%_46%] lg:gap-x-[2%] lg:mt-16"
        >
          {/* SOL: proje bilgisi */}
          <div>
            <RevealItem
              as="p"
              y={10}
              duration={0.5}
              className="font-mono text-[11px] font-600 uppercase tracking-[0.24em] text-[var(--accent-ink)]"
            >
              {[project.projectCode, project.organization].filter(Boolean).join(" / ")}
            </RevealItem>

            <RevealItem
              as="h1"
              y={16}
              duration={0.6}
              className="mt-4 text-balance font-display font-bold leading-[0.98] tracking-[-0.02em] text-[var(--ink)] [font-size:clamp(40px,7vw,76px)] md:leading-[0.95]"
            >
              {project.title}
            </RevealItem>

            <RevealItem as="div" y={10} duration={0.5} className="mt-5 flex flex-wrap items-center gap-3">
              <StatusBadge status={project.status} />
            </RevealItem>

            {project.shortDescription && (
              <RevealItem
                as="p"
                y={10}
                duration={0.5}
                className="mt-5 max-w-[54ch] text-pretty text-[17px] leading-[1.65] text-[var(--ink-dim)]"
              >
                {project.shortDescription}
              </RevealItem>
            )}

            {project.tags && project.tags.length > 0 && (
              <RevealItem as="ul" y={8} duration={0.5} aria-label="Teknolojiler" className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-sm border border-[var(--line)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]"
                  >
                    {t}
                  </li>
                ))}
              </RevealItem>
            )}

            {project.pipeline && project.pipeline.length > 0 && (
              <RevealItem as="div" y={8} duration={0.5} className="mt-6">
                <ul aria-label="Geliştirme aşamaları" className="flex flex-wrap gap-x-5 gap-y-2">
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
              </RevealItem>
            )}

            {specs.length > 0 && (
              <RevealItem
                as="dl"
                y={10}
                duration={0.5}
                className="mt-8 flex flex-wrap gap-x-10 gap-y-6 border-t border-[var(--line-soft)] pt-7"
              >
                {specs.map((s) => (
                  <div key={s.id}>
                    <dd className="text-[17px] font-semibold leading-snug text-[var(--ink)]">
                      {s.value}
                    </dd>
                    <dt className="mt-1 font-mono text-[10px] tracking-[0.2em] text-[var(--muted)]">
                      {s.label.toUpperCase()}
                    </dt>
                  </div>
                ))}
              </RevealItem>
            )}
          </div>

          {/* SAĞ: büyük görsel — kart yok, grid üzerinde yüzer */}
          {heroImage && (
            <RevealItem as="div" y={24} duration={0.7} className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                  background: "radial-gradient(circle, rgba(224,139,69,0.09), transparent 65%)",
                }}
              />
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={heroImage}
                  alt={heroImageAlt}
                  fill
                  priority
                  sizes="(max-width: 1023px) 92vw, 46vw"
                  className="object-contain"
                />
              </div>
            </RevealItem>
          )}
        </RevealGroup>

        {/* ——— Bölümler (Overview, Architecture, vb. — veriden) ———
            `layout` yalnızca görsel VARSA anlamlıdır; yoksa her zaman metin. */}
        {sections.map((s, i) => {
          const layout = s.image ? s.layout ?? "text" : "text";
          const text = s.content.trim() && <Markdown text={s.content} />;
          const media = s.image && (
            <figure className={layout === "full-media" ? "" : "mt-6 sm:mt-0"}>
              <div
                className={`relative w-full overflow-hidden ${
                  layout === "full-media" ? "aspect-[16/9]" : "aspect-[16/10]"
                }`}
              >
                <Image
                  src={s.image}
                  alt={s.caption || sectionLabel(s)}
                  fill
                  sizes="(max-width: 768px) 100vw, 65vw"
                  className="object-contain"
                  loading="lazy"
                />
              </div>
              {s.caption && (
                <figcaption className="mt-3 font-mono text-[11px] tracking-[0.1em] text-[var(--muted)]">
                  {s.caption}
                </figcaption>
              )}
            </figure>
          );

          return (
            <section
              key={s.id}
              data-reveal-section
              aria-label={sectionLabel(s)}
              className="grid gap-8 border-t border-[var(--line-soft)] py-16 md:grid-cols-[30%_70%] md:py-20"
            >
              <SectionNumber n={i + 1} label={sectionLabel(s)} />

              {layout === "full-media" ? (
                <div>
                  {text && <div className="max-w-[68ch]">{text}</div>}
                  <div className={text ? "mt-8" : ""}>{media}</div>
                </div>
              ) : layout === "text-image" || layout === "image-text" ? (
                <div className="grid gap-8 sm:grid-cols-2">
                  <div className={layout === "image-text" ? "sm:order-2" : ""}>{text}</div>
                  <div className={layout === "image-text" ? "sm:order-1" : ""}>{media}</div>
                </div>
              ) : (
                <div className="max-w-[68ch]">
                  {text}
                  {media}
                </div>
              )}
            </section>
          );
        })}

        {/* ——— Medya ——— */}
        {hasMedia && <MediaSection project={project} n={mediaN} />}

        {/* ——— Teknik özellikler tablosu ——— */}
        {hasSpecs && (
          <section
            data-reveal-section
            aria-label="Teknik özellikler"
            className="grid gap-8 border-t border-[var(--line-soft)] py-16 md:grid-cols-[30%_70%] md:py-20"
          >
            <SectionNumber n={specsN} label="Teknik Özellikler" />
            <dl className="max-w-[56ch]">
              {specs.map((s, i) => (
                <div
                  key={s.id}
                  className={`flex items-baseline justify-between gap-6 py-3.5 ${
                    i > 0 ? "border-t border-[var(--line-soft)]" : ""
                  }`}
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {s.label}
                  </dt>
                  <dd className="text-right text-[15px] font-medium text-[var(--ink)]">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* ——— Katkı ——— */}
        {hasContributions && (
          <section
            data-reveal-section
            aria-label="Katkım"
            className="grid gap-8 border-t border-[var(--line-soft)] py-16 md:grid-cols-[30%_70%] md:py-20"
          >
            <SectionNumber n={contributionsN} label="Katkım" />
            <ul className="grid max-w-[68ch] gap-2.5 sm:grid-cols-2">
              {project.contributions.map((c) => (
                <li
                  key={c}
                  className="border-l border-[var(--accent)] py-1 pl-4 text-[15px] text-[var(--ink-dim)]"
                >
                  {c}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
