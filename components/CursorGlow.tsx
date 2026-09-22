"use client";

import { useEffect, useRef } from "react";

/**
 * Global imleç glow'u: yalnızca CSS custom property günceller (--cursor-x/y),
 * asıl görsel `.cursor-glow` CSS class'ında (globals.css). Bağımsız bir
 * animasyon döngüsü yok — yalnızca `pointermove` olayına tepki verir.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      el.style.setProperty("--cursor-x", `${e.clientX}px`);
      el.style.setProperty("--cursor-y", `${e.clientY}px`);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <div ref={ref} aria-hidden className="cursor-glow" />;
}
