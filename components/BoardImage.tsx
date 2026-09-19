"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";

type BoardImageProps = {
  src: string;
  alt: string;
  caption?: string;
  eager?: boolean;
  className?: string;
  /** yan yana görsellerde stagger için */
  delay?: number;
};

/**
 * PNG sonradan eklenecek görseller için güvenli görsel bileşeni.
 * Dosya yoksa dosya adını gösteren teknik placeholder basar — site bozulmaz.
 * Saydam PNG: object-contain, ezilme yok, glow ile öne çıkar.
 * Scroll'da: fade + 18px + 0.97 scale ile belirir.
 */
export default function BoardImage({ src, alt, caption, eager = false, className = "", delay = 0 }: BoardImageProps) {
  const [missing, setMissing] = useState(false);

  return (
    <Reveal y={18} scaleFrom={0.97} duration={0.7} delay={delay}>
      <figure className={className}>
        <div
          className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-md border border-[var(--line)] bg-[var(--panel)]"
          style={{ boxShadow: "0 0 42px var(--glow-green), 0 18px 44px var(--shadow)" }}
        >
          {!missing ? (
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-contain p-4"
              priority={eager}
              loading={eager ? undefined : "lazy"}
              onError={() => setMissing(true)}
            />
          ) : (
            <div className="px-6 text-center" role="img" aria-label={`${alt} — yakında eklenecek`}>
              <div className="mx-auto h-px w-20 bg-[var(--line)]" />
              <p className="mt-4 font-mono text-xs tracking-[0.2em] text-[var(--muted)]">
                [ GÖRSEL ]
              </p>
              <p className="mt-2 break-all font-mono text-[11px] text-[var(--muted)] opacity-70">
                {src}
              </p>
              <div className="mx-auto mt-4 h-px w-20 bg-[var(--line)]" />
            </div>
          )}
          {/* köşe işaretleri */}
          <span aria-hidden className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-[var(--line)]" />
          <span aria-hidden className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r border-t border-[var(--line)]" />
          <span aria-hidden className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b border-l border-[var(--line)]" />
          <span aria-hidden className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r border-[var(--line)]" />
        </div>
        {caption && (
          <figcaption className="mt-2.5 font-mono text-[11px] tracking-[0.14em] text-[var(--muted)]">
            {caption}
          </figcaption>
        )}
      </figure>
    </Reveal>
  );
}
