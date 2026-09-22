"use client";

import { keyframes } from "./heroMath";

type Props = {
  /** 0 → 1, tamamen scroll'dan türetilmiş (bkz. Hero.tsx: useSmoothedProgress) */
  progress: number;
  /** -1..1, imleç konumu (bkz. useMouseParallax) — scroll'dan bağımsız,
      yalnızca kullanıcı etkileşimine tepki verir; autoplay değildir. */
  mouse?: { x: number; y: number };
};

const TILT_DEG = 5;

/**
 * pcb-1 ve pcb-2 TAMAMEN BAĞIMSIZ konumlanır — paylaşılan bir "sahne"
 * dönüşümü YOK. Bu, ikisinin asla aynı anda görünür olmamasını (crossfade
 * yasak) matematiksel olarak garanti eder: pcb-1'in opacity'si 0.42'de tam
 * 0'a iner ve ondan sonraki her progress için 0'da kalır (keyframes() son
 * duraktan sonra sabit değeri korur); pcb-2'nin opacity'si 0.46'dan önceki
 * her progress için 0'dır (keyframes() ilk duraktan önce de sabit değeri
 * korur). [0.42, 0.46] aralığında ikisi de kesin 0 — kasıtlı "boş kare".
 */

// ——— pcb-1: sabit merkezde (50vw/52vh) büyüyüp söner, HİÇ sağa kaymaz ———
const PCB1_OPACITY = [
  [0, 1],
  [0.25, 1],
  [0.42, 0],
] as const;
const PCB1_SCALE = [
  [0, 0.96],
  [0.25, 1.08],
  [0.42, 1.16],
] as const;
const PCB1_Y = [
  [0, 10],
  [0.25, 0],
  [0.42, -20],
] as const;

// ——— pcb-2: viewport'un SOL DIŞINDAN girer, merkezden geçer, sağa yerleşir ———
const PCB2_OPACITY = [
  [0.46, 0],
  [0.49, 0.25],
  [0.54, 1],
  [0.68, 1],
] as const;
const PCB2_X_VW = [
  [0.46, -15],
  [0.68, 50],
  [0.88, 74],
  [1, 74],
] as const;
const PCB2_SCALE = [
  [0.46, 0.88],
  [0.68, 1.03],
  [0.88, 0.92],
  [1, 0.92],
] as const;

const CENTER_X_VW = 50;
const CENTER_Y_VH = 52;

export default function PCBScrollStage({ progress: p, mouse = { x: 0, y: 0 } }: Props) {
  const pcb1Opacity = keyframes(p, PCB1_OPACITY);
  const pcb1Scale = keyframes(p, PCB1_SCALE);
  const pcb1Y = keyframes(p, PCB1_Y);

  const pcb2Opacity = keyframes(p, PCB2_OPACITY);
  const pcb2X = keyframes(p, PCB2_X_VW);
  const pcb2Scale = keyframes(p, PCB2_SCALE);

  // İmleç eğimi: yalnızca hangi PCB o an görünürse onda uygulanır.
  const tiltTransform = `rotateX(${(-mouse.y * TILT_DEG).toFixed(2)}deg) rotateY(${(mouse.x * TILT_DEG).toFixed(2)}deg)`;
  const imgGlow =
    "drop-shadow(0 18px 36px rgba(0,0,0,0.42)) drop-shadow(0 0 44px rgba(224,139,69,0.10))";

  return (
    <div className="hero-pcb-stage pointer-events-none absolute inset-0 h-full w-full overflow-hidden">
      {/* ——— pcb-1: merkez kahraman çekimi, hiç yatay hareket etmez ——— */}
      <div
        aria-hidden={pcb1Opacity <= 0}
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          width: "clamp(680px, 52vw, 920px)",
          aspectRatio: "1100 / 720",
          perspective: "1200px",
          transform: `translate3d(calc(-50% + ${CENTER_X_VW - 50}vw), calc(-50% + ${CENTER_Y_VH - 50}vh + ${pcb1Y}px), 0) scale(${pcb1Scale})`,
          opacity: pcb1Opacity,
          willChange: "transform, opacity",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: "radial-gradient(circle, rgba(224, 139, 69, 0.10), transparent 62%)",
            opacity: pcb1Opacity,
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- absolute konumlu,
            transform/opacity ile scroll'a bağlı anime edilen katman */}
        <img
          src="/images/pcb-1.png"
          alt="PCB görseli — açılı görünüm"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
            transform: tiltTransform,
            filter: imgGlow,
            willChange: "transform",
          }}
        />
      </div>

      {/* ——— pcb-2: sol dışından girer, merkezden geçer, sağda oturur ——— */}
      <div
        aria-hidden={pcb2Opacity <= 0}
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          width: "clamp(620px, 44vw, 820px)",
          aspectRatio: "1100 / 720",
          perspective: "1200px",
          transform: `translate3d(calc(-50% + ${pcb2X - 50}vw), calc(-50% + ${CENTER_Y_VH - 50}vh), 0) scale(${pcb2Scale})`,
          opacity: pcb2Opacity,
          willChange: "transform, opacity",
          pointerEvents: pcb2Opacity > 0.5 ? "auto" : "none",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: "radial-gradient(circle, rgba(224, 139, 69, 0.10), transparent 62%)",
            opacity: pcb2Opacity,
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- yukarıdaki gerekçe */}
        <img
          src="/images/pcb-2.png"
          alt="PCB görseli — cepheden görünüm"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
            transform: tiltTransform,
            filter: imgGlow,
            willChange: "transform",
          }}
        />
      </div>
    </div>
  );
}
