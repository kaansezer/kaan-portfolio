"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";
import ThemeToggle from "./ThemeToggle";

const SECTION_IDS = ["deneyim", "projeler", "egitim", "yetenekler", "iletisim"];

/** Viewport merkezine en yakın section'ı aktif kabul eder. */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (els.length === 0) return;

    const pick = () => {
      const mid = window.innerHeight * 0.45;
      let best: string | null = null;
      let bestDist = Infinity;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) continue;
        const d = Math.abs((r.top + r.bottom) / 2 - mid);
        if (d < bestDist) {
          bestDist = d;
          best = el.id;
        }
      }
      setActive(best);
    };

    const io = new IntersectionObserver(() => pick(), {
      rootMargin: "-35% 0px -55% 0px",
    });
    els.forEach((el) => io.observe(el));
    pick();

    return () => io.disconnect();
  }, []);

  return active;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = (href: string, mobile = false) =>
    `relative font-mono tracking-[0.14em] transition-colors duration-200 ${
      mobile ? "block py-2 text-[13px]" : "text-[12px]"
    } ${
      active === href.slice(1)
        ? "text-[#dc8b32]"
        : mobile
          ? "text-[var(--ink-dim)] hover:text-[var(--accent-ink)]"
          : "text-[var(--muted)] hover:text-[var(--accent-ink)]"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-[var(--line)]" : "border-transparent"
      } bg-[var(--header-bg)] backdrop-blur-md`}
    >
      <nav
        aria-label="Ana menü"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8"
      >
        <a href="#top" className="font-mono text-[13px] tracking-[0.18em] text-[var(--ink)]">
          {profile.brand}
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                aria-current={active === l.href.slice(1) ? "true" : undefined}
                className={linkClass(l.href)}
              >
                {l.label}
                {active === l.href.slice(1) && (
                  <span
                    aria-hidden
                    className="absolute -bottom-1.5 left-0 h-px w-[60%] bg-[#dc8b32]"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            className="rounded-sm p-2 text-[var(--ink-dim)] lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-[var(--line)] bg-[var(--header-bg)] backdrop-blur-md lg:hidden">
          <ul className="space-y-1 px-5 py-4">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={active === l.href.slice(1) ? "true" : undefined}
                  className={linkClass(l.href, true)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
