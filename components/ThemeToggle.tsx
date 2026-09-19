"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

function current(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  // Mount-sync: inline script tema class'ını boyamadan önce uygular;
  // buton etiketini onunla eşitle (tek seferlik, kasti).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(current());
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(next);
    try {
      localStorage.setItem("ks-theme", next);
    } catch {
      /* yok say */
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Aydınlık temaya geç" : "Koyu temaya geç"}
      aria-pressed={theme === "light"}
      className="inline-flex items-center gap-2 rounded-sm border border-[var(--line)] bg-[var(--panel)] px-3.5 py-2 font-mono text-[11px] tracking-[0.18em] text-[var(--ink-dim)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-ink)]"
    >
      {theme === "dark" ? <Sun size={14} aria-hidden /> : <Moon size={14} aria-hidden />}
      {theme === "dark" ? "AYDINLIK" : "KOYU"}
    </button>
  );
}
