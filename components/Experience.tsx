"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/portfolio";
import SectionHead from "./SectionHead";
import Reveal, { EASE, useMotionPrefs } from "./Reveal";

const DELAYS = [0, 0.08, 0.16];

export default function Experience() {
  const { reduce } = useMotionPrefs();

  return (
    <section id="deneyim" aria-label="Deneyim" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <SectionHead title="Deneyim" sheet="SHEET 01/04" />

        <ol className="relative mt-10 space-y-12 pl-8 md:pl-12">
          {/* dikey çizgi: üstten subtle açılış */}
          <motion.span
            aria-hidden
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, ease: EASE }}
            className="absolute bottom-2 left-0 top-2 w-px origin-top bg-[var(--line)]"
          />
          {experiences.map((e, i) => {
            const d = DELAYS[i] ?? 0.16;
            return (
              <Reveal as="li" key={`${e.role}-${i}`} delay={d} y={22} className="relative">
                <motion.span
                  aria-hidden
                  initial={reduce ? false : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: reduce ? 0 : d + 0.1, ease: EASE }}
                  className="absolute -left-8 top-1.5 flex h-4 w-4 -translate-x-1/2 items-center justify-center md:-left-12"
                >
                  <span className="h-3 w-3 rounded-full border-2 border-[var(--accent)] bg-[var(--bg)]" />
                </motion.span>
                <p className="font-mono text-[11px] tracking-[0.2em] text-[var(--accent-ink)]">
                  {e.date}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-[var(--ink)] md:text-2xl">
                  {e.role}
                </h3>
                <p className="mt-1 text-sm text-[var(--ink-dim)]">{e.org}</p>
                <p className="mt-3 max-w-3xl leading-relaxed text-[var(--muted)]">{e.text}</p>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
