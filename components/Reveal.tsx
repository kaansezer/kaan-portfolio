"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

type Tag =
  | "div"
  | "li"
  | "ul"
  | "ol"
  | "article"
  | "section"
  | "span"
  | "figure"
  | "h2"
  | "h3"
  | "p";

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
  as?: Tag;
};

/**
 * Tek başına duran bloklar için scroll-reveal: kendi viewport gözlemcisi var.
 * Bir kartın *içindeki* parçalar için bunu kullanma — RevealGroup/RevealItem
 * kullan ki parçalar tek bir zaman çizgisinde, kartla birlikte aksın.
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
  const El = motion[as];

  const dy = mobile ? Math.min(y, 16) : y;
  const dur = mobile ? Math.min(duration, 0.55) : duration;
  const d = mobile ? delay / 2 : delay;

  return (
    <El
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
    </El>
  );
}

type GroupProps = {
  children: ReactNode;
  /** grubun kendi girişi için dikey kayma (px) */
  y?: number;
  /** grubun kendi başlangıç scale'i */
  scaleFrom?: number;
  /** grubun kendi süresi (sn) */
  duration?: number;
  /** grubun kendi gecikmesi (sn) — yan yana kartlarda sıralama için */
  delay?: number;
  /** grup tetiklendikten sonra ilk çocuğa kadar beklenen süre (sn) */
  childrenDelay?: number;
  /** çocuklar arası aralık (sn) */
  stagger?: number;
  /** grubun görünürlük eşiği */
  amount?: number;
  /** false: grup kendisi animasyon yapmaz, yalnızca çocukları sıraya sokar */
  self?: boolean;
  className?: string;
  as?: Tag;
};

/**
 * Bir kartı/bloğu TEK bir zaman çizgisi olarak canlandırır.
 *
 * Grup görünür olunca hem kendisi girer hem de içindeki bütün RevealItem'lar
 * sırayla akar. Böylece uzun bir kartın alt kısmı "daha aşağı kaydırınca
 * ayrı ayrı zıplamak" yerine kartla birlikte, tahmin edilebilir bir ritimde
 * yerine oturur — asıl profesyonel hissi veren şey bu.
 */
export function RevealGroup({
  children,
  y = 34,
  scaleFrom = 0.975,
  duration = 0.85,
  delay = 0,
  childrenDelay = 0.12,
  stagger = 0.065,
  amount = 0.15,
  self = true,
  className,
  as = "div",
}: GroupProps) {
  const { reduce, mobile } = useMotionPrefs();
  const El = motion[as];

  const dy = mobile ? Math.min(y, 18) : y;
  const dur = mobile ? Math.min(duration, 0.6) : duration;
  const step = mobile ? stagger * 0.6 : stagger;
  const d = mobile ? delay / 2 : delay;

  const orchestration = {
    delay: d,
    delayChildren: d + childrenDelay,
    staggerChildren: step,
  };

  const variants: Variants = reduce
    ? { hidden: {}, show: {} }
    : self
      ? {
          hidden: { opacity: 0, y: dy, scale: scaleFrom },
          show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: dur, ease: EASE, ...orchestration },
          },
        }
      : // salt orkestratör: kendi görünümüne dokunmaz, yalnızca ritmi kurar
        { hidden: {}, show: { transition: orchestration } };

  return (
    <El
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={variants}
      className={className}
      // transform'u baştan kendi katmanına al: giriş sırasında metin titremez
      style={{ willChange: reduce || !self ? undefined : "transform, opacity" }}
    >
      {children}
    </El>
  );
}

type ItemProps = {
  children: ReactNode;
  /** dikey kayma (px) */
  y?: number;
  /** süre (sn) */
  duration?: number;
  className?: string;
  as?: Tag;
};

/**
 * RevealGroup'un içindeki parça. Kendi viewport gözlemcisi YOK — varyantları
 * en yakın gruptan miras alır, sırasını grubun stagger'ı belirler.
 */
export function RevealItem({
  children,
  y = 14,
  duration = 0.55,
  className,
  as = "div",
}: ItemProps) {
  const { reduce, mobile } = useMotionPrefs();
  const El = motion[as];

  const dy = mobile ? Math.min(y, 10) : y;

  const variants: Variants = reduce
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, y: dy },
        show: { opacity: 1, y: 0, transition: { duration, ease: EASE } },
      };

  // initial/animate verilmiyor: framer-motion varyant adını gruptan devralır
  return (
    <El variants={variants} className={className}>
      {children}
    </El>
  );
}
