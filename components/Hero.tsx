"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, CircuitBoard, Cpu, Mail, Radio, Rocket } from "lucide-react";
import { profile } from "@/data/portfolio";
import HeroPCBExploded from "./HeroPCBExploded";

const EASE = [0.16, 1, 0.3, 1] as const;

const EXPERTISE = [
  { icon: Cpu, top: "Embedded", bottom: "Systems" },
  { icon: CircuitBoard, top: "PCB", bottom: "Design" },
  { icon: Radio, top: "RF &", bottom: "Telemetry" },
  { icon: Rocket, top: "Avionics", bottom: "Applications" },
] as const;

function Rise({
  children,
  delay,
  y = 22,
}: {
  children: React.ReactNode;
  delay: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: reduce ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const heroScrollRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={heroScrollRef}
      id="top"
      aria-label="Tanıtım"
      className="relative min-h-[130vh] overflow-x-clip md:min-h-[160vh] lg:min-h-[180vh]"
    >
      {/* hero'ya özel 64px major/minor grid + sağda silik trace dekoru */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(70,120,102,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(70,120,102,.08) 1px, transparent 1px), linear-gradient(rgba(70,120,102,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(70,120,102,.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px, 64px 64px, 16px 16px, 16px 16px",
        }}
      />
      <svg
        aria-hidden
        viewBox="0 0 600 620"
        fill="none"
        preserveAspectRatio="xMaxYMid slice"
        className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[55%] opacity-60 lg:block"
      >
        <g stroke="rgba(100,160,135,.16)" strokeWidth={1}>
          <path d="M480 80 H380 L340 120 H220" />
          <path d="M520 200 H420 L390 230 H300" />
          <path d="M500 420 H400 L370 450 H260" />
          <path d="M540 540 H440 L410 510 H320" />
        </g>
        <g fill="rgba(100,160,135,.22)">
          <circle cx="480" cy="80" r="3" />
          <circle cx="520" cy="200" r="3" />
          <circle cx="500" cy="420" r="3" />
          <circle cx="540" cy="540" r="3" />
        </g>
      </svg>

      <div className="md:sticky md:top-0 md:flex md:h-screen md:items-center">
      <div className="relative mx-auto grid w-full max-w-[1500px] items-center gap-[20px] px-5 pb-16 pt-32 md:px-10 lg:grid-cols-[0.82fr_1.18fr] lg:px-[72px] lg:pt-36">
        {/* ——— SOL (590-620px) ——— */}
        <div className="max-w-[620px]">
          <Rise delay={0} y={14}>
            <p className="mb-[26px] font-mono text-[12px] uppercase tracking-[0.25em] text-[#e09335]">
              {profile.tag}
            </p>
          </Rise>

          <Rise delay={0.08}>
            <h1 className="text-[clamp(64px,5.2vw,82px)] font-semibold leading-[0.95] tracking-[-0.04em] text-[var(--ink)]">
              {profile.name}
            </h1>
          </Rise>

          <Rise delay={0.16}>
            <p className="mt-[18px] text-[25px] font-medium text-[var(--ink-dim)]">
              {profile.title}
            </p>
          </Rise>

          <Rise delay={0.24}>
            <p className="mt-[30px] max-w-[610px] text-[16px] leading-[1.65] text-[var(--muted)]">
              {profile.intro}
            </p>
          </Rise>

          <Rise delay={0.32}>
            <div className="mt-[34px] flex flex-col gap-[18px] sm:flex-row sm:flex-wrap">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-[52px] min-w-[170px] items-center justify-center gap-2 rounded-sm bg-[var(--accent)] px-6 text-sm font-semibold text-[#0b1512] shadow-[0_10px_28px_var(--accent-soft)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
              >
                <Mail size={16} aria-hidden />
                E-posta Gönder
              </a>
              <a
                href="#projeler"
                className="group inline-flex h-[52px] min-w-[175px] items-center justify-center gap-2 rounded-sm border border-[var(--line)] bg-transparent px-6 text-sm font-medium text-[var(--ink-dim)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent-ink)]"
              >
                Projeleri İncele
                <ArrowDown
                  size={16}
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-y-0.5"
                />
              </a>
            </div>
          </Rise>

          <Rise delay={0.4}>
            <ul
              aria-label="Uzmanlık alanları"
              className="mt-[55px] flex flex-wrap gap-x-[34px] gap-y-4 lg:grid lg:grid-cols-[repeat(4,max-content)]"
            >
              {EXPERTISE.map((e) => (
                <li key={e.top} className="flex items-start gap-2.5">
                  <e.icon size={16} aria-hidden className="mt-0.5 shrink-0 text-[var(--accent-ink)]" />
                  <span className="font-mono text-[12px] leading-[1.5] tracking-[0.04em] text-[var(--muted)]">
                    {e.top}
                    <br />
                    {e.bottom}
                  </span>
                </li>
              ))}
            </ul>
          </Rise>

          <Rise delay={0.48}>
            <p className="mt-10 inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] text-[var(--muted)]">
              SCROLL
              <span aria-hidden className="relative h-px w-14 overflow-hidden bg-[var(--line)]">
                <span className="scroll-hint-dot absolute top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full bg-[var(--accent)]" />
              </span>
              <span aria-hidden className="inline-block h-[5px] w-[5px] rounded-full bg-[var(--accent)]" />
            </p>
          </Rise>
        </div>

        {/* ——— SAĞ: scroll-controlled exploded PCB ——— */}
        <div className="w-full min-w-0">
          <HeroPCBExploded sectionRef={heroScrollRef} />
        </div>
      </div>
      </div>
    </section>
  );
}
