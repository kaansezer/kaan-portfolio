/**
 * Hero scroll-scrub matematiği: tek kaynak `heroProgress` (0 → 1) değerinden
 * PCB ve metin dönüşümlerini türetmek için saf, durumsuz yardımcılar.
 * Zamanlayıcı YOK — her şey `progress` değerinin bir fonksiyonu.
 */

export const clamp = (v: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** value'yu [inMin,inMax] aralığından [outMin,outMax] aralığına eşler, clamp'li. */
export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin = 0,
  outMax = 1,
) => {
  const t = clamp((value - inMin) / (inMax - inMin));
  return lerp(outMin, outMax, t);
};

export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

type Stop = readonly [progress: number, value: number];

/**
 * Çok-duraklı (piecewise) lineer interpolasyon: `stops` progress'e göre artan
 * sırada olmalı. İlk duraktan önce ilk değer, sonuncudan sonra son değer
 * sabit kalır (clamp).
 */
export function keyframes(progress: number, stops: readonly Stop[]): number {
  if (stops.length === 0) return 0;
  if (progress <= stops[0][0]) return stops[0][1];
  for (let i = 0; i < stops.length - 1; i++) {
    const [p0, v0] = stops[i];
    const [p1, v1] = stops[i + 1];
    if (progress <= p1) return lerp(v0, v1, mapRange(progress, p0, p1));
  }
  return stops[stops.length - 1][1];
}

/** Metin/eleman reveal'i: [start,end] aralığında opacity 0→1, y 20px→0. */
export function revealStyle(
  progress: number,
  start: number,
  end: number,
  distance = 20,
): { opacity: number; transform: string } {
  const t = mapRange(progress, start, end);
  return {
    opacity: t,
    transform: `translate3d(0, ${lerp(distance, 0, t)}px, 0)`,
  };
}
