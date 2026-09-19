"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function useMotionPrefs() {
  const reduce = useReducedMotion();
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return { reduce: !!reduce, mobile };
}

type RevealProps = {
  children: ReactNode;
  /** gecikme (sn) — mobilde yarıya iner */
  delay?: number;
  /** süre (sn) — mobilde en fazla 0.55 */
  duration?: number;
  /** dikey kayma (px) — mobilde en fazla 16 */
  y?: number;
  /** başlangıç scale'i (1 = scale animasyonu yok) */
  scaleFrom?: number;
  className?: string;
  as?: "div" | "li" | "article" | "section" | "span";
};

/**
 * Tek scroll-reveal dili: opacity + transform, bir kez çalışır
 * (once + amount 0.2), GPU dostu, reduced-motion'da direkt görünür.
 */
export default function Reveal({
  children,
  delay = 0,
  duration = 0.7,
  y = 24,
  scaleFrom = 1,
  className,
  as = "div",
}: RevealProps) {
  const { reduce, mobile } = useMotionPrefs();
  const Tag = motion[as];

  const dy = mobile ? Math.min(y, 16) : y;
  const dur = mobile ? Math.min(duration, 0.55) : duration;
  const d = mobile ? delay / 2 : delay;

  return (
    <Tag
      initial={
        reduce
          ? false
          : {
              opacity: 0,
              y: dy,
              ...(scaleFrom !== 1 ? { scale: scaleFrom } : {}),
            }
      }
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduce ? 0 : dur, delay: reduce ? 0 : d, ease: EASE }}
      className={className}
    >
      {children}
    </Tag>
  );
}
