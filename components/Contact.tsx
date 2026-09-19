"use client";

import { motion } from "framer-motion";
import { ExternalLink, Mail, MapPin } from "lucide-react";
import { footer, profile } from "@/data/portfolio";
import Reveal, { EASE, useMotionPrefs } from "./Reveal";

const CONTACTS = [
  { icon: Mail, href: `mailto:${profile.email}`, label: profile.email, external: false },
  { icon: ExternalLink, href: profile.linkedin, label: profile.linkedinShort, external: true },
  { icon: MapPin, href: null, label: profile.location, external: false },
] as const;

export default function Contact() {
  const { reduce } = useMotionPrefs();

  return (
    <footer id="iletisim" aria-label="İletişim" className="scroll-mt-20 border-t border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <Reveal y={0} duration={0.5}>
              <p className="font-mono text-[11px] tracking-[0.22em] text-[var(--muted)]">
                İLETİŞİM
              </p>
            </Reveal>
            <Reveal y={18} duration={0.6} delay={0.08}>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--ink)] md:text-5xl">
                Birlikte çalışalım.
              </h2>
            </Reveal>
          </div>

          <ul className="space-y-4 md:pt-9">
            {CONTACTS.map((c, i) => (
              <motion.li
                key={c.label}
                initial={reduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.08, ease: EASE }}
              >
                {c.href ? (
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group inline-flex items-center gap-3 text-[15px] text-[var(--ink-dim)] transition-colors hover:text-[var(--accent-ink)]"
                  >
                    <c.icon size={17} aria-hidden className="shrink-0 text-[var(--muted)] transition-colors group-hover:text-[var(--accent-ink)]" />
                    {c.label}
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-3 text-[15px] text-[var(--ink-dim)]">
                    <c.icon size={17} aria-hidden className="shrink-0 text-[var(--muted)]" />
                    {c.label}
                  </span>
                )}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-[var(--line-soft)] pt-6 font-mono text-[11px] tracking-[0.16em] text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>{footer.left}</span>
          <span>{footer.right}</span>
        </div>
      </div>
    </footer>
  );
}
