"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { ProjectMedia } from "@/data/portfolio";

/**
 * Generic proje görsel sekmeleri. SADECE data'da dosyası listelenen
 * sekmeler render olur — dosyasız tab, placeholder ve "coming soon" yok.
 * Media listesi boşsa hiçbir şey render etmez.
 */
export default function ProjectMediaTabs({ media }: { media: ProjectMedia[] }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const current = media[active];

  const close = useCallback(() => setLightbox(false), []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightbox, close]);

  if (media.length === 0 || !current) return null;

  return (
    <div className="mt-6 border-t border-[var(--line-soft)] pt-6">
      <div
        role="tablist"
        aria-label="Proje görselleri"
        className="flex gap-6 overflow-x-auto"
      >
        {media.map((m, i) => {
          const selected = i === active;
          return (
            <button
              key={m.src}
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(i)}
              className={`relative shrink-0 pb-2 font-mono text-[12px] tracking-[0.16em] transition-colors duration-200 ${
                selected
                  ? "text-[var(--accent-ink)]"
                  : "text-[var(--muted)] hover:text-[var(--ink-dim)]"
              }`}
            >
              {m.label}
              <span
                aria-hidden
                className={`absolute inset-x-0 -bottom-px h-px bg-[var(--accent)] transition-opacity duration-200 ${
                  selected ? "opacity-100" : "opacity-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setLightbox(true)}
        aria-label={`${current.alt} — büyüt`}
        className="group relative mt-4 block aspect-[16/9] w-full cursor-zoom-in overflow-hidden rounded-md border border-[rgba(100,150,130,.25)] bg-[var(--panel)]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={current.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0"
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-contain p-3"
              loading="lazy"
            />
          </motion.span>
        </AnimatePresence>
      </button>

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-10"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Kapat"
            className="absolute right-4 top-4 rounded-sm border border-white/20 p-2 text-zinc-300 transition-colors hover:border-white/50 hover:text-white"
          >
            <X size={18} aria-hidden />
          </button>
          <div
            className="relative h-[80vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}
