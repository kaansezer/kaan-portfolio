"use client";

import { motion } from "framer-motion";
import { EASE, RevealGroup, RevealItem, useMotionPrefs } from "./Reveal";

/**
 * Bölüm başlığı: başlık → sayfa numarası → alt çizgi, tek bir zaman
 * çizgisinde akar. Üçü de ayrı ayrı tetiklenmez.
 */
export default function SectionHead({ title, sheet }: { title: string; sheet: string }) {
  const { reduce } = useMotionPrefs();

  return (
    <RevealGroup self={false} stagger={0.08} childrenDelay={0} amount={0.4}>
      <div className="flex items-end justify-between gap-4 pb-4">
        <RevealItem
          as="h2"
          y={16}
          duration={0.6}
          className="text-balance text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl"
        >
          {title}
        </RevealItem>
        <RevealItem
          as="span"
          y={0}
          duration={0.6}
          className="whitespace-nowrap font-mono text-[11px] tracking-[0.22em] text-[var(--muted)]"
        >
          {sheet}
        </RevealItem>
      </div>
      {/* alt çizgi soldan açılır — sırasını gruptan alır */}
      <motion.div
        aria-hidden
        variants={
          reduce
            ? { hidden: {}, show: {} }
            : {
                hidden: { scaleX: 0 },
                show: { scaleX: 1, transition: { duration: 0.8, ease: EASE } },
              }
        }
        className="h-px origin-left bg-[var(--line)]"
      />
    </RevealGroup>
  );
}
