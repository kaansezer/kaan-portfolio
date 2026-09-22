"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Ham scroll progress'i (0→1) hafifçe yumuşatır — projede zaten var olan
 * `useMouseParallax`'taki lerp+rAF deseninin aynısı. Bağımsız bir saat YOK:
 * döngü yalnızca `raw` her değiştiğinde hedefe doğru "current += (target -
 * current) * factor" ile yaklaşır ve hedefe oturunca kendini durdurur. Scroll
 * durursa animasyon da durur; yukarı kaydırılırsa geri sarar.
 */
export function useSmoothedProgress(raw: number, factor: number, enabled: boolean) {
  const [smoothed, setSmoothed] = useState(raw);
  const current = useRef(raw);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      // Devre dışıyken render zaten `raw`'ı döndürür (aşağıya bakın) — burada
      // yalnızca ref'i senkron tutuyoruz ki tekrar etkinleşince yumuşatma
      // doğru temelden başlasın.
      current.current = raw;
      return;
    }

    const tick = () => {
      const c = current.current;
      const next = c + (raw - c) * factor;
      current.current = next;
      setSmoothed(next);

      if (Math.abs(raw - next) < 0.0005) {
        rafRef.current = 0;
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [raw, factor, enabled]);

  return enabled ? smoothed : raw;
}
