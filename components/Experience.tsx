"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/portfolio";
import SectionHead from "./SectionHead";
import { EASE, RevealGroup, RevealItem, useMotionPrefs } from "./Reveal";

export default function Experience() {
  const { reduce } = useMotionPrefs();

  const dotVariants = reduce
    ? { hidden: {}, show: {} }
    : {
        hidden: { scale: 0 },
        show: { scale: 1, transition: { duration: 0.35, ease: EASE } },
      };

  return (
    <section id="deneyim" aria-label="Deneyim" className="scroll-mt-20" data-reveal-section>
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-36 lg:py-40">
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
          {experiences.map((e, i) => (
            <RevealGroup
              as="li"
              key={`${e.role}-${i}`}
              y={24}
              scaleFrom={1}
              duration={0.7}
              stagger={0.055}
              className="relative"
            >
              {/* Konumlandırma dışta, scale içte: framer-motion'ın inline
                  transform'u -translate-x-1/2'yi ezmesin. */}
              <span
                aria-hidden
                className="absolute -left-8 top-1.5 flex h-4 w-4 -translate-x-1/2 items-center justify-center md:-left-12"
              >
                <motion.span
                  variants={dotVariants}
                  className="h-3 w-3 rounded-full border-2 border-[var(--accent)] bg-[var(--bg)]"
                />
              </span>

              <RevealItem
                as="p"
                y={10}
                className="font-mono text-[11px] tracking-[0.2em] text-[var(--accent-ink)]"
              >
                {e.date}
              </RevealItem>
              <RevealItem
                as="h3"
                y={10}
                className="mt-2 text-balance text-xl font-semibold text-[var(--ink)] md:text-2xl"
              >
                {e.role}
              </RevealItem>
              <RevealItem as="p" y={10} className="mt-1 text-sm text-[var(--ink-dim)]">
                {e.org}
              </RevealItem>
              <RevealItem
                as="p"
                y={10}
                className="mt-3 max-w-[68ch] text-pretty leading-[1.7] text-[var(--muted)]"
              >
                {e.text}
              </RevealItem>
            </RevealGroup>
          ))}
        </ol>
      </div>
    </section>
  );
}
