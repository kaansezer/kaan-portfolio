"use client";

import { motion } from "framer-motion";
import { certificates, skillRows } from "@/data/portfolio";
import SectionHead from "./SectionHead";
import { EASE, RevealGroup, RevealItem, useMotionPrefs } from "./Reveal";
import { Award } from "lucide-react";

export default function Skills() {
  const { reduce } = useMotionPrefs();

  const rowVariants = reduce
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, x: -12 },
        show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
      };

  return (
    <section id="yetenekler" aria-label="Yetenekler" className="scroll-mt-20" data-reveal-section>
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-36 lg:py-40">
        <SectionHead title="Yetenekler" sheet="SHEET 04/04" />

        <RevealGroup className="mt-10" y={24} scaleFrom={1} stagger={0.06}>
          <RevealItem
            as="p"
            y={10}
            className="font-mono text-[11px] tracking-[0.22em] text-[var(--muted)]"
          >
            MALZEME LİSTESİ — BOM / YETENEK DÖKÜMÜ
          </RevealItem>

          <div className="mt-4 overflow-hidden rounded-lg border border-[var(--line)]">
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
                    variants={rowVariants}
                    className={`grid gap-1 px-5 py-4 transition-colors duration-200 sm:table-row md:px-6 ${
                      i % 2 === 0 ? "bg-[var(--panel)]" : "bg-transparent hover:bg-[var(--panel-soft)]"
                    } ${i > 0 ? "border-t border-[var(--line-soft)]" : ""}`}
                  >
                    <th
                      scope="row"
                      className="font-mono text-[12px] tracking-[0.18em] text-[var(--accent-ink)] sm:w-40 sm:px-6 sm:py-4 sm:align-top"
                    >
                      {row.category}
                    </th>
                    <td className="text-[14px] leading-[1.7] text-[var(--ink-dim)] sm:px-6 sm:py-4">
                      {row.items}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </RevealGroup>

        <RevealGroup className="mt-12" y={24} scaleFrom={1} stagger={0.07}>
          <RevealItem
            as="h3"
            y={10}
            className="font-mono text-[12px] tracking-[0.22em] text-[var(--muted)]"
          >
            SERTİFİKALAR
          </RevealItem>
          <ul className="mt-4 space-y-3">
            {certificates.map((c) => (
              <RevealItem
                as="li"
                key={c}
                y={12}
                className="flex items-start gap-3 text-[15px] text-[var(--ink-dim)]"
              >
                <Award size={17} aria-hidden className="mt-0.5 shrink-0 text-[var(--accent-ink)]" />
                {c}
              </RevealItem>
            ))}
          </ul>
        </RevealGroup>
      </div>
    </section>
  );
}
