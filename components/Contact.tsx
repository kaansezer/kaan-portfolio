"use client";

import { ExternalLink, Mail, MapPin } from "lucide-react";
import { footer, profile } from "@/data/portfolio";
import { RevealGroup, RevealItem } from "./Reveal";

const CONTACTS = [
  { icon: Mail, href: `mailto:${profile.email}`, label: profile.email, external: false },
  { icon: ExternalLink, href: profile.linkedin, label: profile.linkedinShort, external: true },
  { icon: MapPin, href: null, label: profile.location, external: false },
] as const;

export default function Contact() {
  return (
    <footer id="iletisim" aria-label="İletişim" className="scroll-mt-20 border-t border-[var(--line)]">
      <RevealGroup
        self={false}
        stagger={0.07}
        childrenDelay={0}
        amount={0.25}
        className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-36 lg:py-40"
      >
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <RevealItem
              as="p"
              y={10}
              duration={0.5}
              className="font-mono text-[10px] font-700 tracking-[0.28em] text-[var(--muted)]"
            >
              İLETİŞİM
            </RevealItem>
            <RevealItem
              as="h2"
              y={18}
              duration={0.6}
              className="mt-6 text-balance text-5xl font-bold tracking-[-0.02em] text-[var(--ink)] md:text-6xl"
            >
              Birlikte çalışalım.
            </RevealItem>
          </div>

          <ul className="space-y-5 md:pt-12">
            {CONTACTS.map((c) => (
              <RevealItem as="li" key={c.label} y={8} duration={0.5}>
                {c.href ? (
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group inline-flex items-center gap-4 text-[16px] font-500 text-[var(--ink-dim)] transition-all duration-300 hover:text-[var(--accent-ink)] hover:translate-x-1"
                  >
                    <c.icon size={19} aria-hidden className="shrink-0 text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--accent-ink)]" />
                    {c.label}
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-4 text-[16px] font-500 text-[var(--ink-dim)]">
                    <c.icon size={19} aria-hidden className="shrink-0 text-[var(--muted)]" />
                    {c.label}
                  </span>
                )}
              </RevealItem>
            ))}
          </ul>
        </div>

        <RevealItem
          y={8}
          duration={0.5}
          className="mt-20 flex flex-col gap-4 border-t border-[var(--line-soft)] pt-8 font-mono text-[10px] font-600 tracking-[0.2em] text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between"
        >
          <span>{footer.left}</span>
          <span>{footer.right}</span>
        </RevealItem>
      </RevealGroup>
    </footer>
  );
}
