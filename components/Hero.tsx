"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowDown, CircuitBoard, Cpu, Mail, Radio, Rocket } from "lucide-react";
import { profile } from "@/data/portfolio";
import BoardStack from "./hero/BoardStack";
import { EXPERTISE, HERO_MOTION as M, STACK_LAYERS } from "./hero/config";
import { useHeroScroll, useMouseParallax } from "./hero/useHeroScroll";

const EASE = [0.22, 1, 0.36, 1] as const;

const ICONS = { cpu: Cpu, board: CircuitBoard, radio: Radio, rocket: Rocket } as const;

/** <1024px: yığın metnin altına iner, parallax kapanır. */
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

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const compact = useCompact();

  const animate = !reduce && !compact;
  const { progress, travelled } = useHeroScroll(sectionRef, animate);
  const mouse = useMouseParallax(stageRef, animate, M.mouse.lerp);

  // metin .75'ten sonra yumuşakça çıkar
  const textOpacity = animate
    ? 1 - clamp01((progress - M.explode.textFadeFrom) / (1 - M.explode.textFadeFrom))
    : 1;

  // kart yığını da hero'dan çıkarken yumuşakça solar
  const stackOpacity = animate
    ? 1 - clamp01((progress - M.explode.stackFadeFrom) / (1 - M.explode.stackFadeFrom))
    : 1;

  const shift = (factor: number) => (animate ? -travelled * factor : 0);

  // Açılış: satırlar 24px aşağıdan + blur(8px) → 0
  const rise: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } }
    : {
        hidden: { opacity: 0, y: M.open.y, filter: `blur(${M.open.blur}px)` },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: M.open.duration, ease: EASE },
        },
      };

  // Eyebrow çizgisi soldan büyüyerek çizilir
  const drawLine: Variants = reduce
    ? { hidden: {}, show: {} }
    : {
        hidden: { scaleX: 0 },
        show: { scaleX: 1, transition: { duration: 0.7, ease: EASE } },
      };

  const stackIn: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } }
    : {
        hidden: { opacity: 0, y: M.open.stackY, scale: M.open.stackScaleFrom },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: M.open.stackDuration,
            ease: EASE,
            delay: M.open.stackBackDelay,
          },
        },
      };

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-label="Tanıtım"
      // Yerleşim tamamen CSS breakpoint'leriyle: `compact` state'i yalnızca
      // parallax hesabını kapatmak için kullanılır, ilk boyamada sıçrama olmaz.
      className="relative isolate overflow-x-clip bg-[var(--hero-bg)] text-[var(--hero-ink)] min-h-screen lg:h-[200vh]"
    >
      {/* ——— arka plan: 72px grid + sağ üst turuncu glow ——— */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          transform: `translate3d(0, ${shift(M.parallax.grid).toFixed(2)}px, 0)`,
          opacity: animate
            ? 1 - progress * (1 - M.parallax.gridOpacityTo)
            : 1,
        }}
      >
        <div className="hero-grid absolute inset-0" />
        <div className="hero-glow absolute inset-0" />
      </div>

      <div className="relative lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center">
        <div
          ref={stageRef}
          className="flex flex-col gap-16 px-5 pb-20 pt-28 sm:px-8 lg:mx-auto lg:grid lg:w-full lg:max-w-[1440px] lg:grid-cols-[480px_minmax(0,1fr)] lg:items-center lg:gap-x-10 lg:gap-y-0 lg:px-10 lg:py-0 xl:grid-cols-[592px_minmax(0,1fr)] xl:gap-x-16 xl:px-[72px]"
        >
          {/* ——————————————— SOL SÜTUN ———————————————
              Dış katman scroll parallax'ını taşır, iç katman açılış
              animasyonunu: ikisi aynı elemanda olursa framer-motion'ın
              inline transform'u parallax'ı ezer. */}
          <div
            className="max-w-[592px] lg:w-[480px] lg:max-w-none xl:w-[592px]"
            style={{
              transform: `translate3d(0, ${shift(M.parallax.text).toFixed(2)}px, 0)`,
              opacity: textOpacity,
            }}
          >
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              show: {
                transition: {
                  delayChildren: M.open.delayChildren,
                  staggerChildren: M.open.stagger,
                },
              },
            }}
          >
            {/* 1 — ince çizgi + teknik etiket */}
            <motion.div variants={rise} className="flex items-center gap-4">
              <motion.span
                aria-hidden
                variants={drawLine}
                className="h-px w-12 origin-left bg-[var(--hero-accent)]"
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.34em] text-[var(--hero-accent-ink)]">
                {profile.tag}
              </span>
            </motion.div>

            {/* 2 — isim, iki satır */}
            <h1 className="mt-8 font-display font-semibold leading-[0.92] tracking-[-0.025em] text-[var(--hero-ink)] [font-size:clamp(44px,11vw,104px)] lg:[font-size:104px] lg:[letter-spacing:-2.5px]">
              <motion.span variants={rise} className="block">
                Kaan
              </motion.span>
              <motion.span variants={rise} className="block">
                Sezer
              </motion.span>
            </h1>

            {/* 3 — ayraç + rol */}
            <motion.div variants={rise} className="mt-8 flex items-center gap-4">
              <span aria-hidden className="h-px w-8 bg-[var(--hero-line-strong)]" />
              <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-[var(--hero-accent-ink)]">
                {profile.title}
              </p>
            </motion.div>

            {/* 4 — paragraf */}
            <motion.p
              variants={rise}
              className="mt-7 max-w-[520px] text-pretty text-[16px] leading-[1.72] text-[var(--hero-ink-2)]"
            >
              {profile.introShort}
            </motion.p>

            {/* 5 — CTA'lar */}
            <motion.div
              variants={rise}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
            >
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-[52px] w-full items-center justify-center gap-2.5 rounded-sm bg-[var(--hero-accent)] px-7 font-mono text-[12px] uppercase tracking-[0.16em] text-[#0a1712] transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-[var(--hero-accent-hover)] sm:w-auto"
              >
                <Mail size={16} aria-hidden strokeWidth={1.8} />
                E-posta Gönder
              </a>
              <a
                href="#projeler"
                className="group inline-flex h-[52px] w-full items-center justify-center gap-2.5 rounded-sm border border-[var(--hero-line-strong)] px-7 font-mono text-[12px] uppercase tracking-[0.16em] text-[var(--hero-ink-2)] transition-colors duration-200 hover:border-[var(--hero-accent)] hover:text-[var(--hero-accent-ink)] sm:w-auto"
              >
                Projeleri İncele
                <ArrowDown
                  size={16}
                  aria-hidden
                  strokeWidth={1.8}
                  className="transition-transform duration-200 group-hover:translate-y-0.5"
                />
              </a>
            </motion.div>

            {/* 6 — ayraç + 2x2 uzmanlık grid'i */}
            <motion.div variants={rise} className="mt-12">
              <span aria-hidden className="block h-px w-full bg-[var(--hero-line)]" />
              <ul
                aria-label="Uzmanlık alanları"
                className="mt-7 grid grid-cols-2 gap-x-8 gap-y-7"
              >
                {EXPERTISE.map((e) => {
                  const Icon = ICONS[e.icon];
                  return (
                    <li key={e.top} className="flex items-center gap-3.5">
                      <span
                        aria-hidden
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-[var(--hero-line-strong)] text-[var(--hero-accent-ink)]"
                      >
                        <Icon size={17} strokeWidth={1.5} />
                      </span>
                      <span className="font-mono text-[11px] uppercase leading-[1.55] tracking-[0.16em] text-[var(--hero-ink-2)]">
                        {e.top}
                        <br />
                        {e.bottom}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>
          </div>

          {/* ——————————————— SAĞ: kart yığını ——————————————— */}
          <div
            className="min-w-0 lg:justify-self-start"
            style={{
              transform: `translate3d(0, ${shift(M.parallax.stack).toFixed(2)}px, 0)`,
              opacity: stackOpacity,
            }}
          >
            <motion.div initial="hidden" animate="show" variants={stackIn}>
              <BoardStack
                layers={STACK_LAYERS}
                motion={M}
                progress={progress}
                mouse={mouse}
                compact={compact}
                reduce={reduce}
              />
            </motion.div>
          </div>
        </div>

        {/* ——— sol altta SCROLL göstergesi (yalnızca desktop) ——— */}
        <div
          aria-hidden
          className="hero-scroll-hint pointer-events-none absolute bottom-10 left-[72px] items-center gap-4 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--hero-dim)]"
          style={{ opacity: textOpacity }}
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
