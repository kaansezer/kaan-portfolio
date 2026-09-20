"use client";

import { useState } from "react";
import Image from "next/image";
import type { HeroMotion, StackLayer } from "./config";

type Props = {
  layers: readonly StackLayer[];
  motion: HeroMotion;
  /** 0 → 1, exploded stack-up ilerlemesi */
  progress: number;
  /** -1..1 yumuşatılmış imleç konumu */
  mouse: { x: number; y: number };
  /** <1024px: arka katmanlar gizli, parallax yok */
  compact: boolean;
  reduce: boolean;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Katmanlı PCB stack-up.
 *
 * Yalnızca transform / opacity / filter anime edilir; genişlik ve yükseklik
 * sabittir (next/image'e width+height verilir) — bu yüzden layout shift olmaz.
 */
export default function BoardStack({
  layers,
  motion,
  progress,
  mouse,
  compact,
  reduce,
}: Props) {
  const [failed, setFailed] = useState<string[]>([]);
  const markFailed = (src: string) =>
    setFailed((prev) => (prev.includes(src) ? prev : [...prev, src]));

  // reduced-motion: exploded stack ve parallax tamamen kapalı
  const p = reduce ? 0 : progress;
  const mx = reduce || compact ? 0 : mouse.x;
  const my = reduce || compact ? 0 : mouse.y;

  // Arka katmanlar CSS ile gizlenir (hidden lg:block) — JS state'i beklemediği
  // için <1024px'te ilk boyamada görünüp kaybolma olmaz.
  const allMissing = layers.every((l) => failed.includes(l.src));

  const tilt = motion.mouse.tilt;

  return (
    <div className="hero-stack flex w-full min-w-0 flex-col items-center lg:items-start">
      <div
        // kutu ön katmana göre boyutlanır (--k ile ölçeklenir); arka katmanlar taşar
        className="relative w-[min(92vw,560px)] lg:w-[calc(700px*var(--k))]"
        style={{ perspective: `${motion.mouse.perspective}px` }}
      >
        <div
          className="relative aspect-[1100/720] w-full"
          style={{
            transform: `rotateY(${(mx * tilt).toFixed(3)}deg) rotateX(${(-my * tilt).toFixed(3)}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {allMissing ? (
            <div
              role="img"
              aria-label="Kart görselleri henüz eklenmedi"
              className="absolute inset-0 flex items-center justify-center rounded-md border border-dashed border-[var(--hero-line-strong)]"
            >
              <div className="px-6 text-center font-mono text-[11px] leading-[2] tracking-[0.14em] text-[var(--hero-dim)]">
                <p className="text-[var(--hero-accent-ink)]">[ KART GÖRSELLERİ ]</p>
                {layers.map((l) => (
                  <p key={l.src} className="opacity-70">
                    {l.src}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            layers.map((l) => {
              if (failed.includes(l.src)) return null;

              // arka katmanlar opacity 0'dan başlar: sahnede yalnızca ön kart
              // durur, scroll ilerledikçe katmanlar belirir ve netleşir
              const opacity = l.secondary
                ? lerp(l.opacity, l.opacityTo ?? motion.explode.backOpacityTo, p)
                : l.opacity;
              const blur = l.blur * (1 - p);

              const x = l.baseX + mx * motion.mouse.shift * l.mouseFactor;
              const y =
                l.baseY +
                l.explodeY * p +
                my * motion.mouse.shift * l.mouseFactor;

              return (
                <Image
                  key={l.src}
                  src={l.src}
                  alt={l.alt}
                  width={1100}
                  height={720}
                  priority={l.priority}
                  loading={l.priority ? undefined : "lazy"}
                  sizes={`(max-width: 1023px) 92vw, ${Math.round(l.width)}px`}
                  draggable={false}
                  onError={() => markFailed(l.src)}
                  className={`pointer-events-none absolute left-0 top-0 h-auto select-none ${
                    l.secondary ? "hidden lg:block" : ""
                  }`}
                  style={{
                    width: `${(l.width / motion.stack.frontWidth) * 100}%`,
                    zIndex: l.z,
                    opacity,
                    // kaymalar da --k ile ölçeklenir: yığın küçüldüğünde basamaklar
                    // aynı oranda kalır
                    transform: `translate3d(calc(${x.toFixed(2)}px * var(--k, 1)), calc(${y.toFixed(2)}px * var(--k, 1)), 0)`,
                    filter: [
                      blur > 0.01 ? `blur(${blur.toFixed(2)}px)` : "",
                      l.shadow ? `drop-shadow(0 34px 48px var(--hero-board-shadow))` : "",
                    ]
                      .filter(Boolean)
                      .join(" "),
                    willChange: reduce ? undefined : "transform, opacity",
                  }}
                />
              );
            })
          )}
        </div>
      </div>

      {/* Künye en alt katmanla birlikte iner: aksi halde ayrışan katmanlar
          künyenin üstüne biner. Yalnızca transform anime edilir. */}
      <StackCaption
        motion={motion}
        progress={p}
        drop={p * Math.max(0, ...layers.map((l) => l.explodeY))}
      />
    </div>
  );
}

/** Yığının altındaki künye — maddeler ilerlemeye göre sırayla vurgulanır. */
function StackCaption({
  motion,
  progress,
  drop,
}: {
  motion: HeroMotion;
  progress: number;
  /** px — künyenin, ayrışan en alt katmanla birlikte ineceği mesafe */
  drop: number;
}) {
  return (
    <div
      className="mt-7 flex w-full flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em]"
      style={{ transform: `translate3d(0, calc(${drop.toFixed(2)}px * var(--k, 1)), 0)` }}
    >
      {motion.caption.map((c, i) => {
        const on = progress >= motion.explode.thresholds[i];
        return (
          <span
            key={c}
            // <1280px'te katman listesi gizlenir; yalnızca "4 KATMAN · ALTIUM" kalır
            className="hidden items-center gap-2 transition-colors duration-300 min-[1280px]:inline-flex"
            style={{ color: on ? "var(--hero-ink)" : "var(--hero-dim)" }}
          >
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full transition-colors duration-300"
              style={{
                background: on ? "var(--hero-accent)" : "var(--hero-line-strong)",
              }}
            />
            {c}
          </span>
        );
      })}
      <span className="hidden text-[var(--hero-dim)] min-[1280px]:inline" aria-hidden>
        |
      </span>
      <span className="text-[var(--hero-dim)]">4 Katman · Altium</span>
    </div>
  );
}
