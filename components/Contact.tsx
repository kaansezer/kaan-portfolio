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
        className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28"
      >
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <RevealItem
              as="p"
              y={10}
              duration={0.5}
              className="font-mono text-[11px] tracking-[0.22em] text-[var(--muted)]"
            >
              İLETİŞİM
            </RevealItem>
            <RevealItem
              as="h2"
              y={18}
              duration={0.6}
              className="mt-4 text-balance text-4xl font-semibold tracking-tight text-[var(--ink)] md:text-5xl"
            >
              Birlikte çalışalım.
            </RevealItem>
          </div>

          <ul className="space-y-4 md:pt-9">
            {CONTACTS.map((c) => (
              <RevealItem as="li" key={c.label} y={8} duration={0.5}>
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
              </RevealItem>
            ))}
          </ul>
        </div>

        <RevealItem
          y={8}
          duration={0.5}
          className="mt-16 flex flex-col gap-3 border-t border-[var(--line-soft)] pt-6 font-mono text-[11px] tracking-[0.16em] text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between"
        >
          <span>{footer.left}</span>
          <span>{footer.right}</span>
        </RevealItem>
      </RevealGroup>
    </footer>
  );
}
