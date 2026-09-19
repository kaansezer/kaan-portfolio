"use client";

import { motion } from "framer-motion";
import { certificates, skillRows } from "@/data/portfolio";
import SectionHead from "./SectionHead";
import Reveal, { EASE, useMotionPrefs } from "./Reveal";
import { Award } from "lucide-react";

export default function Skills() {
  const { reduce } = useMotionPrefs();

  return (
    <section id="yetenekler" aria-label="Yetenekler" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <SectionHead title="Yetenekler" sheet="SHEET 04/04" />

        <Reveal className="mt-10">
          <p className="font-mono text-[11px] tracking-[0.22em] text-[var(--muted)]">
            MALZEME LİSTESİ — BOM / YETENEK DÖKÜMÜ
          </p>

          <div className="mt-4 overflow-hidden rounded-md border border-[var(--line)]">
            <table className="w-full border-collapse text-left">
              <thead className="sr-only">
                <tr>
                  <th scope="col">Kategori</th>
                  <th scope="col">İçerik</th>
                </tr>
              </thead>
              <tbody>
                {skillRows.map((row, i) => (
                  <motion.tr
                    key={row.category}
                    initial={reduce ? false : { opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.07, ease: EASE }}
                    className={`grid gap-1 px-5 py-4 sm:table-row md:px-6 ${
                      i % 2 === 0 ? "bg-[var(--panel)]" : "bg-transparent"
                    } ${i > 0 ? "border-t border-[var(--line-soft)]" : ""}`}
                  >
                    <th
                      scope="row"
                      className="font-mono text-[12px] tracking-[0.18em] text-[var(--accent-ink)] sm:w-40 sm:px-6 sm:py-4 sm:align-top"
                    >
                      {row.category}
                    </th>
                    <td className="text-[14px] leading-relaxed text-[var(--ink-dim)] sm:px-6 sm:py-4">
                      {row.items}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal className="mt-10">
          <h3 className="font-mono text-[12px] tracking-[0.22em] text-[var(--muted)]">
            SERTİFİKALAR
          </h3>
          <ul className="mt-4 space-y-3">
            {certificates.map((c, i) => (
              <motion.li
                key={c}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.08, ease: EASE }}
                className="flex items-start gap-3 text-[15px] text-[var(--ink-dim)]"
              >
                <Award size={17} aria-hidden className="mt-0.5 shrink-0 text-[var(--accent-ink)]" />
                {c}
              </motion.li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
