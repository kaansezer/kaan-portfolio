"use client";

import { motion } from "framer-motion";
import Reveal, { EASE, useMotionPrefs } from "./Reveal";

export default function SectionHead({ title, sheet }: { title: string; sheet: string }) {
  const { reduce } = useMotionPrefs();

  return (
    <div>
      <Reveal y={18} duration={0.6}>
        <div className="flex items-end justify-between pb-4">
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
            {title}
          </h2>
          <motion.span
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-mono text-[11px] tracking-[0.22em] text-[var(--muted)]"
          >
            {sheet}
          </motion.span>
        </div>
      </Reveal>
      {/* başlıktan ~100ms sonra soldan açılan çizgi */}
      <motion.div
        aria-hidden
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: reduce ? 0 : 0.1, ease: EASE }}
        className="h-px origin-left bg-[var(--line)]"
      />
    </div>
  );
}
