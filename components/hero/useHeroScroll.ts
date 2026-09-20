"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export type HeroScroll = {
  /** 0 → 1, hero'nun scroll edilebilir mesafesi boyunca */
  progress: number;
  /** hero'nun tepesinden kaç px kaydırıldı (parallax için) */
  travelled: number;
};

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/**
 * Hero'nun scroll ilerlemesi.
 *
 * - scroll dinleyicisi passive, hesap requestAnimationFrame ile throttle'lı
 * - IntersectionObserver hero görünürden çıkınca hesabı tamamen durdurur
 * - `enabled` false ise (reduced-motion / mobil) hiç dinleyici bağlanmaz
 */
export function useHeroScroll(
  sectionRef: RefObject<HTMLElement | null>,
  enabled: boolean,
): HeroScroll {
  const [state, setState] = useState<HeroScroll>({ progress: 0, travelled: 0 });
  const rafRef = useRef(0);
  const visibleRef = useRef(true);

  useEffect(() => {
    if (!enabled) return;
    const section = sectionRef.current;
    if (!section) return;

    const measure = () => {
      rafRef.current = 0;
      const rect = section.getBoundingClientRect();
      const distance = section.offsetHeight - window.innerHeight;
      const travelled = -rect.top;
      setState({
        travelled: travelled > 0 ? travelled : 0,
        progress: distance > 0 ? clamp01(travelled / distance) : 0,
      });
    };

    const schedule = () => {
      // görünür değilse hiç hesaplama
      if (!visibleRef.current || rafRef.current) return;
      rafRef.current = requestAnimationFrame(measure);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) schedule();
      },
      { threshold: 0 },
    );
    io.observe(section);

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [sectionRef, enabled]);

  // kapalıyken state'i sıfırlamak yerine doğrudan nötr değeri döndür:
  // effect içinde setState çağırmaya gerek kalmaz
  return enabled ? state : { progress: 0, travelled: 0 };
}

/**
 * İmleç parallax'ı: -1..1 aralığında yumuşatılmış (lerp) x/y.
 * Dokunmatik cihazlarda ve `enabled` false iken kapalı.
 */
export function useMouseParallax(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
  lerp: number,
) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    // yalnızca gerçek işaretleyici (mouse/trackpad) varsa
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const el = ref.current;
    if (!el) return;

    const tick = () => {
      const c = current.current;
      const t = target.current;
      c.x += (t.x - c.x) * lerp;
      c.y += (t.y - c.y) * lerp;
      setPos({ x: c.x, y: c.y });
      // hedefe oturduysa döngüyü bırak
      if (Math.abs(t.x - c.x) < 0.001 && Math.abs(t.y - c.y) < 0.001) {
        rafRef.current = 0;
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.current = {
        x: ((e.clientX - r.left) / r.width) * 2 - 1,
        y: ((e.clientY - r.top) / r.height) * 2 - 1,
      };
      start();
    };

    const onLeave = () => {
      target.current = { x: 0, y: 0 };
      start();
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [ref, enabled, lerp]);

  return enabled ? pos : { x: 0, y: 0 };
}
