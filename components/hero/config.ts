/**
 * Hero'nun bütün animasyon ve yerleşim sayıları burada.
 * Görünümü ayarlamak için yalnızca bu dosyayı düzenlemen yeterli.
 */

export type StackLayer = {
  src: string;
  alt: string;
  /** px — desktop'ta katmanın genişliği */
  width: number;
  /** yığının içindeki taban kayması (px) */
  baseX: number;
  baseY: number;
  /** scroll ilerledikçe uygulanan dikey ayrışma (px) */
  explodeY: number;
  opacity: number;
  /** scroll ilerledikçe ulaşılan opacity — verilmezse explode.backOpacityTo */
  opacityTo?: number;
  blur: number;
  z: number;
  /** imleç parallax katsayısı — derinlik hissi için katmanlar farklı hızda */
  mouseFactor: number;
  /** true: arka katman — <1024px'te gizlenir, scroll'da netleşir */
  secondary?: boolean;
  shadow?: boolean;
  priority?: boolean;
};

/**
 * 4 katmanlı PCB stack-up — dizi ARKADAN ÖNE sıralı.
 * Görünen sıra (önden arkaya): L1 üst bakır → L2 VCC → L3 GND → L4 alt bakır.
 *
 * Dört PNG aynı 1100x720 tuvalde birbirine hizalı üretilmiş: hepsi aynı
 * genişlikte ve aynı noktada durur, yalnızca dikeyde ayrılır. Farklı
 * genişlik/ofset vermek bu hizayı bozar. Başlangıçta arka katmanlar opacity 0
 * (sahnede yalnızca ön kart), scroll'da belirir ve ayrışır.
 */
export const STACK_LAYERS: readonly StackLayer[] = [
  {
    src: "/images/pcb-bottom-v2.png",
    alt: "Kartın alt bakır katmanı (L4), çıplak PCB",
    width: 700,
    baseX: 0,
    baseY: 0,
    explodeY: 105,
    opacity: 0,
    opacityTo: 0.7,
    blur: 1.4,
    z: 10,
    mouseFactor: 0.3,
    secondary: true,
  },
  {
    src: "/images/pcb-gnd-v2.png",
    alt: "Kartın GND düzlemi (L3), çıplak PCB",
    width: 700,
    baseX: 0,
    baseY: 0,
    explodeY: 35,
    opacity: 0,
    opacityTo: 0.78,
    blur: 1,
    z: 20,
    mouseFactor: 0.45,
    secondary: true,
  },
  {
    src: "/images/pcb-vcc-v2.png",
    alt: "Kartın VCC düzlemi (L2), çıplak PCB",
    width: 700,
    baseX: 0,
    baseY: 0,
    explodeY: -35,
    opacity: 0,
    opacityTo: 0.86,
    blur: 0.5,
    z: 30,
    mouseFactor: 0.68,
    secondary: true,
  },
  {
    src: "/images/pcb-top-v2.png",
    alt: "Kartın üst bakır katmanı (L1), çıplak PCB",
    width: 700,
    baseX: 0,
    baseY: 0,
    explodeY: -105,
    opacity: 1,
    blur: 0,
    z: 40,
    mouseFactor: 1,
    shadow: true,
    priority: true,
  },
] as const;

export type HeroMotion = typeof HERO_MOTION;

export const HERO_MOTION = {
  /** Açılış (sayfa yüklenince) */
  open: {
    stagger: 0.08,
    delayChildren: 0.05,
    duration: 0.75,
    /** metin satırlarının aşağıdan gelişi (px) */
    y: 24,
    /** blur(8px) → 0 */
    blur: 8,
    /** kart yığını */
    stackY: 40,
    stackScaleFrom: 0.96,
    stackDuration: 0.95,
    /** arka katmanların ek gecikmesi (sn) */
    stackBackDelay: 0.18,
  },

  /** Scroll'a bağlı exploded stack-up */
  explode: {
    /** katmanda opacityTo yoksa kullanılan hedef */
    backOpacityTo: 0.75,
    /** künye maddelerinin vurgulanma eşikleri (caption ile aynı sırada) */
    thresholds: [0.15, 0.4, 0.65, 0.85] as const,
    /** hero metninin solmaya başladığı ilerleme */
    textFadeFrom: 0.7,
    /** kart yığınının (ve künyenin) solmaya başladığı ilerleme; 1'de tamamen kaybolur */
    stackFadeFrom: 0.8,
  },

  /** Scroll parallax katsayıları (kaydırılan px ile çarpılır) */
  parallax: {
    text: 0.18,
    stack: 0.05,
    grid: 0.02,
    /** grid opacity 1 → bu değere iner */
    gridOpacityTo: 0.6,
  },

  /** İmleç parallax */
  mouse: {
    /** katmanların en fazla kayması (px) */
    shift: 8,
    /** yığının en fazla eğilmesi (deg) */
    tilt: 3,
    perspective: 1200,
    /** yumuşatma — küçük değer = daha ağır takip */
    lerp: 0.08,
  },

  stack: {
    /** ön katmanın px genişliği; diğerleri buna oranlanır */
    frontWidth: 700,
  },

  /** Yığının altındaki künye maddeleri (eşiklerle aynı sırada) */
  caption: [
    "L1 — Üst Bakır",
    "L2 — VCC",
    "L3 — GND",
    "L4 — Alt Bakır",
  ] as const,
} as const;

export const EXPERTISE = [
  { top: "Gömülü", bottom: "Sistemler", icon: "cpu" },
  { top: "PCB", bottom: "Tasarımı", icon: "board" },
  { top: "RF &", bottom: "Telemetri", icon: "radio" },
  { top: "Aviyonik", bottom: "Uygulamalar", icon: "rocket" },
] as const;
