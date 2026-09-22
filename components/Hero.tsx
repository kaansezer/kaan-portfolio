"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowDown, CircuitBoard, Cpu, Mail, Radio, Rocket } from "lucide-react";
import { profile } from "@/data/portfolio";
import PCBScrollStage from "./hero/PCBScrollStage";
import { EXPERTISE, HERO_MOTION as M } from "./hero/config";
import { mapRange, revealStyle } from "./hero/heroMath";
import { useHeroScroll, useMouseParallax } from "./hero/useHeroScroll";
import { useSmoothedProgress } from "./hero/useSmoothedProgress";

const ICONS = { cpu: Cpu, board: CircuitBoard, radio: Radio, rocket: Rocket } as const;

/** <1024px: metin+PCB dikey akışa döner, scroll-scrub kapanır. */
function useCompact() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return compact;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const compact = useCompact();

  // Yalnızca desktop + motion izinliyken scroll dinlenir; hafifçe yumuşatılır
  // (bkz. useSmoothedProgress) ama HİÇBİR bağımsız zamanlayıcı yok — animasyon
  // birebir scroll konumunun türevi. Yukarı kaydırma otomatik olarak tersine
  // sarar, scroll durunca animasyon da durur.
  const animate = !reduce && !compact;
  const { progress: rawProgress, travelled } = useHeroScroll(sectionRef, animate);
  const smoothedProgress = useSmoothedProgress(rawProgress, 0.12, animate);
  // reduced-motion: nihai kompozisyonu anında göster (accessibility gereği).
  const heroProgress = reduce ? 1 : smoothedProgress;

  // İmleç tabanlı hafif 3D eğim — scroll'dan TAMAMEN bağımsız, kullanıcı
  // etkileşimine tepki verir (autoplay değil). Yalnızca fare/trackpad'i olan
  // cihazlarda çalışır (bkz. useMouseParallax: pointer:fine guard).
  const mouse = useMouseParallax(stageRef, animate, 0.08);

  // Metin grupları: mobil/tablet veya reduced-motion'da her zaman tam görünür
  // (bkz. AGENTS: "mobil deneyim kasıtlı tasarlanmalı, masaüstünün küçültülmüş
  // hali olmamalı"); desktop'ta yalnızca `heroProgress`'in bir fonksiyonu.
  const group = (start: number, end: number) =>
    compact || reduce
      ? { opacity: 1, transform: "none" }
      : revealStyle(heroProgress, start, end, 18);

  const eyebrowLineScale = compact || reduce ? 1 : mapRange(heroProgress, 0.7, 0.78);
  const scrollHintOpacity = compact || reduce ? 0 : 1 - mapRange(heroProgress, 0, 0.15);

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-label="Tanıtım"
      className="relative isolate overflow-x-clip bg-[var(--hero-bg)] text-[var(--hero-ink)] min-h-screen lg:h-[220vh]"
    >
      {/* ——— arka plan: 72px grid + sağ üst turuncu glow ——— */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          transform: `translate3d(0, ${(animate ? -travelled * M.parallax.grid : 0).toFixed(2)}px, 0)`,
          opacity: animate ? 1 - rawProgress * (1 - M.parallax.gridOpacityTo) : 1,
        }}
      >
        <div className="hero-grid absolute inset-0" />
        <div className="hero-glow absolute inset-0" />
      </div>

      <div ref={stageRef} className="relative lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:overflow-hidden">
        <div className="flex flex-col gap-16 px-5 pb-20 pt-28 sm:px-8 lg:mx-auto lg:w-full lg:max-w-[1440px] lg:px-10 lg:py-0 xl:px-[72px]">
          {/* ——————————————— METİN ——————————————— */}
          <div className="max-w-[592px] lg:w-[480px] xl:w-[592px]">
            {/* 1 — ince çizgi + teknik etiket */}
            <div style={group(0.7, 0.78)} className="flex items-center gap-4">
              <span
                aria-hidden
                className="h-px w-12 origin-left bg-[var(--hero-accent)]"
                style={{ transform: `scaleX(${eyebrowLineScale})` }}
              />
              <span className="font-mono text-[10px] font-500 uppercase tracking-[0.38em] text-[var(--hero-accent-ink)]">
                {profile.tag}
              </span>
            </div>

            {/* 2 — isim, iki satır */}
            <h1 className="mt-12 font-display font-bold leading-[0.88] tracking-[-0.03em] text-[var(--hero-ink)] [font-size:clamp(48px,13vw,112px)] lg:[font-size:120px] lg:[letter-spacing:-3px]">
              <span style={group(0.7, 0.78)} className="block">
                Kaan
              </span>
              <span style={group(0.7, 0.78)} className="block">
                Sezer
              </span>
            </h1>

            {/* 3 — ayraç + rol */}
            <div style={group(0.76, 0.83)} className="mt-10 flex items-center gap-4">
              <span aria-hidden className="h-px w-8 bg-[var(--hero-line-strong)]" />
              <p className="font-mono text-[12px] font-600 uppercase tracking-[0.24em] text-[var(--hero-accent-ink)]">
                {profile.title}
              </p>
            </div>

            {/* 4 — paragraf */}
            <p
              style={group(0.81, 0.87)}
              className="mt-8 max-w-[540px] text-pretty text-[17px] font-400 leading-[1.7] text-[var(--hero-ink-2)]"
            >
              {profile.introShort}
            </p>

            {/* 5 — CTA'lar */}
            <div
              style={group(0.85, 0.92)}
              className="mt-14 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
            >
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-lg bg-[var(--hero-accent)] px-8 font-mono text-[12px] font-700 uppercase tracking-[0.18em] text-[#0a1712] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_32px_rgba(217,138,77,0.35)] active:translate-y-0 active:shadow-md sm:w-auto"
              >
                <Mail size={17} aria-hidden strokeWidth={2.2} />
                E-posta Gönder
              </a>
              <a
                href="#projeler"
                className="group inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-lg border-2 border-[var(--hero-line-strong)] bg-transparent px-8 font-mono text-[12px] font-700 uppercase tracking-[0.18em] text-[var(--hero-ink-2)] transition-all duration-300 hover:border-[var(--hero-accent)] hover:bg-[var(--hero-accent)]/8 hover:text-[var(--hero-accent-ink)] hover:shadow-[0_8px_24px_rgba(217,138,77,0.25)] sm:w-auto"
              >
                Projeleri İncele
                <ArrowDown
                  size={17}
                  aria-hidden
                  strokeWidth={2.2}
                  className="transition-transform duration-300 group-hover:translate-y-1.5"
                />
              </a>
            </div>

            {/* 6 — ayraç + 2x2 uzmanlık grid'i */}
            <div style={group(0.9, 0.96)} className="mt-16">
              <span aria-hidden className="block h-px w-full bg-[var(--hero-line)]" />
              <ul aria-label="Uzmanlık alanları" className="mt-8 grid grid-cols-2 gap-x-10 gap-y-9">
                {EXPERTISE.map((e) => {
                  const Icon = ICONS[e.icon];
                  return (
                    <li key={e.top} className="flex items-start gap-4">
                      <span
                        aria-hidden
                        className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--hero-line-strong)] text-[var(--hero-accent-ink)] bg-[var(--hero-accent)]/5"
                      >
                        <Icon size={18} strokeWidth={1.8} />
                      </span>
                      <span className="font-mono text-[11px] font-600 uppercase leading-[1.6] tracking-[0.18em] text-[var(--hero-ink-2)]">
                        {e.top}
                        <br />
                        {e.bottom}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* ——— Mobil/tablet: statik PCB, metnin altında akışta ———
                Masaüstündeki scroll-scrub kompozisyonu (mutlak konumlu overlay)
                küçük ekranlarda anlamsız; burada sade, animasyonsuz tek görsel. */}
            <div className="mt-16 flex justify-center lg:hidden">
              {/* eslint-disable-next-line @next/next/no-img-element -- basit, animasyonsuz statik görsel */}
              <img
                src="/images/pcb-2.png"
                alt="PCB görseli"
                style={{ width: "clamp(280px, 92vw, 560px)", height: "auto" }}
              />
            </div>
          </div>
        </div>

        {/* ——————————————— Masaüstü: scroll-scrub PCB overlay ———————————————
            Metin sütununun layout akışına katılmaz — mutlak konumlu, tüm
            sticky sahneyi kaplar; konumu/ölçeği tamamen `heroProgress`'ten. */}
        <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
          <PCBScrollStage progress={heroProgress} mouse={reduce ? { x: 0, y: 0 } : mouse} />
        </div>

        {/* ——— sol altta SCROLL göstergesi (yalnızca desktop) ——— */}
        <div
          aria-hidden
          className="hero-scroll-hint pointer-events-none absolute bottom-10 left-[72px] items-center gap-4 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--hero-dim)]"
          style={{ opacity: scrollHintOpacity }}
        >
          Scroll
          <span className="relative block h-px w-14 bg-[var(--hero-line-strong)]">
            <span className="hero-scroll-dot absolute top-1/2 block h-[5px] w-[5px] rounded-full bg-[var(--hero-accent)]" />
          </span>
        </div>
      </div>
    </section>
  );
}
