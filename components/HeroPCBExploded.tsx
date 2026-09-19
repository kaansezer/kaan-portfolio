"use client";

import { useEffect, useState, type RefObject } from "react";

const FINALS_DESKTOP = { gnd: 55, vcc: 110, bottom: 165 };
const FINALS_MOBILE = { gnd: 30, vcc: 60, bottom: 90 };

const LAYERS = [
  { src: "/images/pcb-bottom-v2.png", name: "L4 — BOTTOM", key: "bottom", opacity: 0.6, z: 10 },
  { src: "/images/pcb-vcc-v2.png", name: "L3 — VCC", key: "vcc", opacity: 0.75, z: 20 },
  { src: "/images/pcb-gnd-v2.png", name: "L2 — GND", key: "gnd", opacity: 0.9, z: 30 },
  { src: "/images/pcb-top-v2.png", name: "L1 — TOP", key: "top", opacity: 1, z: 40 },
] as const;

const LABELS = [
  { name: "L1 — TOP", top: "30%", key: "top" },
  { name: "L2 — GND", top: "43%", key: "gnd" },
  { name: "L3 — VCC", top: "56%", key: "vcc" },
  { name: "L4 — BOTTOM", top: "69%", key: "bottom" },
] as const;

function clamp01(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return mobile;
}

/**
 * Pinned-hero exploded PCB.
 * Progress, outer hero section'ın gerçek konumundan hesaplanır:
 * ilk %10 birleşik → %10-80 açılma → son %20 exploded hold.
 * Scroll-controlled, transition yok, loop yok.
 */
export default function HeroPCBExploded({
  sectionRef,
}: {
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const [progress, setProgress] = useState(0);
  const [failed, setFailed] = useState<string[]>([]);
  const mobile = useIsMobile();

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrollableDistance = section.offsetHeight - window.innerHeight;
      if (scrollableDistance <= 0) {
        setProgress(0);
        return;
      }
      const travelled = -rect.top;
      setProgress(clamp01(travelled / scrollableDistance));
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [sectionRef]);

  const explode = clamp01((progress - 0.1) / 0.7);
  const finals = mobile ? FINALS_MOBILE : FINALS_DESKTOP;

  const layerY: Record<string, number> = {
    top: 0,
    gnd: explode * finals.gnd,
    vcc: explode * finals.vcc,
    bottom: explode * finals.bottom,
  };

  const labelsOpacity = clamp01((progress - 0.22) / 0.18);

  const allMissing = failed.length >= LAYERS.length;

  const markFailed = (src: string) =>
    setFailed((prev) => (prev.includes(src) ? prev : [...prev, src]));

  return (
    <div>
      <div className="mx-auto w-full lg:w-[min(780px,50vw)]">
        <div className="flex items-stretch gap-2">
          {/* label rayı — kartın DIŞINDA, HTML overlay */}
          <div
            aria-hidden
            className="pointer-events-none relative hidden w-[104px] shrink-0 md:block"
          >
            {LABELS.map((l, i) => (
              <div
                key={l.name}
                className="absolute right-0 flex items-center gap-2"
                style={{
                  top: l.top,
                  transform: `translate3d(0, ${layerY[l.key]}px, 0)`,
                  opacity: i === 0 ? 0.8 : labelsOpacity,
                }}
              >
                <span className="whitespace-nowrap font-mono text-[11px] tracking-[0.08em] text-[rgba(145,175,160,0.72)]">
                  {l.name}
                </span>
                <span className="inline-block h-px w-[28px] bg-[rgba(120,160,145,.35)]" />
              </div>
            ))}
          </div>

          {/* board container */}
          <div className="relative aspect-[1100/720] w-full flex-1">
            {/* hafif radial glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle, rgba(20,90,65,.18), transparent 65%)",
              }}
            />

            {allMissing ? (
              <div
                role="img"
                aria-label="PCB katman görselleri bekleniyor"
                className="absolute inset-0 flex items-center justify-center border border-dashed border-[var(--line)]"
              >
                <div className="px-6 text-center font-mono text-[11px] leading-relaxed tracking-[0.12em] text-[var(--muted)]">
                  <p>[ PCB LAYERS ]</p>
                  <p className="mt-2 opacity-70">
                    /images/pcb-top-v2.png
                    <br />
                    /images/pcb-gnd-v2.png
                    <br />
                    /images/pcb-vcc-v2.png
                    <br />
                    /images/pcb-bottom-v2.png
                  </p>
                </div>
              </div>
            ) : (
              <>
                {LAYERS.map((l) =>
                  failed.includes(l.src) ? null : (
                    <img
                      key={l.src}
                      src={l.src}
                      alt={l.name}
                      draggable={false}
                      onError={() => markFailed(l.src)}
                      className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain"
                      style={{
                        objectPosition: "center",
                        transform: `translate3d(0, ${layerY[l.key]}px, 0)`,
                        opacity: l.opacity,
                        zIndex: l.z,
                        willChange: "transform",
                      }}
                    />
                  ),
                )}
              </>
            )}

            {/* köşe braketleri */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 hidden lg:block"
            >
              <span className="absolute left-2 top-2 h-[18px] w-[18px] border-l border-t border-[rgba(100,160,135,.25)]" />
              <span className="absolute right-2 top-2 h-[18px] w-[18px] border-r border-t border-[rgba(100,160,135,.25)]" />
              <span className="absolute bottom-2 left-2 h-[18px] w-[18px] border-b border-l border-[rgba(100,160,135,.25)]" />
              <span className="absolute bottom-2 right-2 h-[18px] w-[18px] border-b border-r border-[rgba(100,160,135,.25)]" />
            </div>
          </div>
        </div>
      </div>

      {/* alt label satırı */}
      <div className="mx-auto mt-1 w-full font-mono text-[11px] tracking-[0.18em] text-[var(--muted)] lg:w-[min(780px,50vw)]">
        <div className="flex items-center justify-between">
          <span>FLIGHT-COMPUTER · REV A</span>
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            NOMINAL
          </span>
        </div>
        <p
          className="mt-3 flex items-center justify-end gap-3 font-mono text-[10px] tracking-[0.16em]"
          style={{ color: "rgba(140,170,155,.55)" }}
        >
          FROM IDEAS TO HIGHER ALTITUDES
          <span aria-hidden className="inline-block h-px w-10 bg-[var(--accent)]" />
        </p>
      </div>
    </div>
  );
}
