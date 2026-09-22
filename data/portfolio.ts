export const site = {
  /** Canonical origin — nginx conf'taki domain ile aynı olmalı. */
  url: "https://kaansezer.com",
  locale: "tr_TR",
  /** Paylaşım önizlemesi ve arama sonucu için kısa, iddialı özet. */
  description:
    "STM32/ARM tabanlı gömülü sistemler, 4–6 katmanlı PCB tasarımı ve aviyonik uygulamalar. TEKNOFEST'te 5.270 m irtifada uçuş testi geçmiş uçuş kontrol ve görev yükü kartları.",
  keywords: [
    "Kaan Sezer",
    "elektrik elektronik mühendisi",
    "gömülü sistemler",
    "embedded systems",
    "PCB tasarımı",
    "Altium Designer",
    "STM32",
    "ARM Cortex-M4",
    "aviyonik",
    "uçuş kontrol kartı",
    "TEKNOFEST",
    "Embedded Linux",
    "i.MX 8M",
  ],
} as const;

export const profile = {
  brand: "KS · REV-A",
  tag: "EE · GÖMÜLÜ SİSTEMLER · PCB",
  name: "Kaan Sezer",
  title: "Elektrik-Elektronik Mühendisi",
  intro:
    "STM32/ARM tabanlı gömülü sistemler, çok katmanlı PCB tasarımı ve aviyonik uygulamalar üzerine çalışıyorum. Altium Designer ile 4 ve 6 katmanlı uçuş kontrol ve görev yükü kartları tasarladım; C tabanlı gömülü yazılım, SPI/UART/I2C haberleşmesi, LoRa, konum belirleme, sensör entegrasyonu ve güç/anahtarlama devreleri üzerinde deneyim edindim. Şu anda Embedded Linux ve yüksek hızlı PCB tasarımı üzerine çalışıyorum.",
  /** Hero'da kullanılan kısa sürüm — uzun hali `intro`. */
  introShort:
    "STM32/ARM tabanlı gömülü sistemler ve çok katmanlı PCB tasarımı üzerine çalışıyorum. Altium ile 4 ve 6 katmanlı uçuş kontrol ve görev yükü kartları tasarladım; şu anda Embedded Linux ve yüksek hızlı PCB tasarımına odaklanıyorum.",
  email: "kaansezer0594@gmail.com",
  linkedin: "https://www.linkedin.com/in/kaansezer",
  linkedinShort: "linkedin.com/in/kaansezer",
  location: "Ankara / Keçiören, Türkiye",
} as const;

export const navLinks = [
  { label: "Deneyim", href: "#deneyim" },
  { label: "Projeler", href: "#projeler" },
  { label: "Eğitim", href: "#egitim" },
  { label: "Yetenekler", href: "#yetenekler" },
  { label: "İletişim", href: "#iletisim" },
] as const;

export type Experience = {
  date: string;
  role: string;
  org: string;
  text: string;
};

export const experiences: Experience[] = [
  {
    date: "EKİM 2024 — EYLÜL 2025",
    role: "Aviyonik Başkanı",
    org: "Volta Rocket Takımı · Kayseri",
    text: "Aviyonik Başkanı olarak 6 katmanlı görev yükü ve uçuş kontrol bilgisayarını tasarladım ve ürettim. Görev yükü yazılımını geliştirdim, uçuş kontrol yazılımına katkı sağladım. Geliştirilen kartlar 5.270 m irtifada başarıyla çalıştı; takım TEKNOFEST Yüksek İrtifa Roket Yarışması'nı 2. sırada tamamladı.",
  },
  {
    date: "TEMMUZ 2025 — AĞUSTOS 2025",
    role: "Stajyer Mühendis",
    org: "Fotonik Teknoloji · Kayseri",
    text: "Ar-Ge stajında dizgi ve kart üretimi süreçlerinde görev aldım. Aydınlatma sistemleri, su sayacı kartları ve ADC kartlarının üretimi ve testinde deneyim edindim.",
  },
  {
    date: "TEMMUZ 2024 — AĞUSTOS 2024",
    role: "Stajyer Mühendis",
    org: "Bilgin Enerji · Ankara",
    text: "Merkez ofiste rüzgar enerjisi bölümünde çalıştım. Rüzgar türbinleri, türbin parçaları, kullanılan motorlar, enerji dağıtımı, PLC, SCADA sistemleri ve şalt sahaları hakkında detaylı bilgi edindim.",
  },
];

export type ProjectVisual = { src: string; caption: string; alt: string };

export type ProjectStatus = "in-development" | "flight-tested" | "completed" | "prototype";

export type ProjectMediaType = "3d" | "pcb" | "schematic" | "test";

export type ProjectMedia = {
  type: ProjectMediaType;
  label: string;
  src: string;
  alt: string;
};

export type ProjectStage = {
  label: string;
  state: "done" | "active" | "todo";
};

export type Project = {
  ref: string;
  team: string;
  status: ProjectStatus;
  title: string;
  text: string;
  specs: { label: string; value: string }[];
  visuals?: ProjectVisual[];
  /** Sadece dosyası mevcut medyalar listelenir; boşsa sekmeler render edilmez. */
  media?: ProjectMedia[];
  /** Varsa development pipeline göstergesi (örn. U1). */
  pipeline?: ProjectStage[];
};

export const projects: Project[] = [
  {
    ref: "U1",
    team: "DEVAM EDİYOR · EYLÜL 2025",
    status: "in-development",
    title: "MultiLayer TinyAI Board – i.MX 8M",
    text: "Embedded Linux ve yüksek hızlı PCB tasarımı üzerine yürüttüğüm güncel çalışma. i.MX 8M işlemci etrafında çok katmanlı, yüksek hızlı bir kart tasarlıyorum.",
    specs: [
      { label: "İşlemci", value: "i.MX 8M" },
      { label: "Odak", value: "High-Speed PCB" },
      { label: "Yazılım", value: "Embedded Linux" },
    ],
    media: [],
    pipeline: [
      { label: "ARCHITECTURE", state: "done" },
      { label: "SCHEMATIC", state: "active" },
      { label: "LAYOUT", state: "todo" },
      { label: "BRING-UP", state: "todo" },
      { label: "LINUX", state: "todo" },
    ],
  },
  {
    ref: "U2",
    team: "VOLTA ROCKET TAKIMI",
    status: "flight-tested",
    title: "6 Katmanlı Uçuş Kontrol ve Görev Yükü Bilgisayarı",
    text: "Altium üzerinden 6 katmanlı bir devre tasarımı yaparak ARM Cortex M4 işlemcili, gömülü bir roket uçuş kontrol ve görev yükü bilgisayarı geliştirdim. Kart üzerinde RF haberleşme sistemi (10 km menzil), konum belirleme sistemi, ayrılma sistemi için anahtarlama devresi ve irtifa/açı ölçümü için çeşitli sensörler kullandım.",
    specs: [
      { label: "Katman", value: "6" },
      { label: "İşlemci", value: "ARM Cortex M4" },
      { label: "RF Menzil", value: "10 km" },
      { label: "Test İrtifası", value: "5.270 m" },
    ],
  },
  {
    ref: "U3",
    team: "BİTİRME PROJESİ",
    status: "completed",
    title: "Ornithopter Uçuş Kontrol Bilgisayarı ve Güç Kartı",
    text: "Bitirme ödevi kapsamında ornithopter için Altium üzerinden genel amaçlı bir uçuş kontrol bilgisayarı tasarladım. Kompakt olması gerektiğinden 50×30 mm boyutlarında bir ana kart ve aynı boyutlarda bir besleme kartı (PSU) geliştirdim.",
    specs: [
      { label: "Boyut", value: "50 × 30 mm" },
      { label: "Kart Sayısı", value: "Ana kart + PSU" },
    ],
    visuals: [
      { src: "/images/ornifcs-board.png", caption: "OrniFCS — Uçuş Kontrol Kartı", alt: "OrniFCS uçuş kontrol kartı" },
      { src: "/images/ornifcs-exploded.png", caption: "OrniFCS — Bileşen Yerleşimi", alt: "OrniFCS bileşen yerleşimi" },
      { src: "/images/ornipsu-board.png", caption: "OrniPSU — Güç Kartı", alt: "OrniPSU güç kartı" },
    ],
  },
  {
    ref: "U4",
    team: "VOLTA ROCKET TAKIMI",
    status: "completed",
    title: "4 Katmanlı Uçuş Kontrol Bilgisayarı",
    text: "Altium üzerinden 4 katmanlı bir devre tasarımı yaparak ARM Cortex M4 işlemcili, gömülü bir uçuş kontrol bilgisayarı tasarladım. SPI, UART ve I2C haberleşme arayüzleri ile LoRa hakkında bilgi edindim ve yazılım aşamasına katkıda bulundum.",
    specs: [
      { label: "Katman", value: "4" },
      { label: "İşlemci", value: "ARM Cortex M4" },
      { label: "Haberleşme", value: "SPI / UART / I2C / LoRa" },
    ],
  },
  {
    ref: "U5",
    team: "VOLTA ROCKET TAKIMI",
    status: "completed",
    title: "4 Katmanlı Görev Yükü Bilgisayarı",
    text: "Aviyonik biriminin bir üyesi olarak 4 katmanlı bir görev yükü kartı tasarladım. Görevin amacı, ivmenin yapısal parçalar üzerindeki etkisini incelemekti. Bunun için bir ana kart ve buna bağlı strain gage hücre kartı geliştirdim; görevi amacına uygun şekilde tamamlayıp veri kayıtlarını aldım.",
    specs: [
      { label: "Katman", value: "4" },
      { label: "Sensör", value: "Strain Gage" },
      { label: "Amaç", value: "Yapısal ivme analizi" },
    ],
  },
];

export const education = {
  title: "Elektrik Elektronik Mühendisliği — Lisans",
  school: "Erciyes Üniversitesi, Mühendislik Fakültesi",
  date: "EKİM 2021 — KASIM 2025",
  infos: [
    { label: "GPA", value: "3.01 / 4.00" },
    { label: "Kulüpler", value: "Enerji Sistemleri Kulübü, IEEE" },
  ],
} as const;

export const skillRows = [
  { category: "PROGRAM", items: "Altium Designer, PSpice, STM32CubeIDE, Git / GitHub" },
  { category: "TEKNİK", items: "C, STM32 / ARM, PCB Tasarımı, UART / SPI / I2C / RS232, LoRa" },
  { category: "DİL", items: "Türkçe (anadil), İngilizce (B2)" },
  { category: "DİĞER", items: "Takım çalışması" },
] as const;

export const certificates = [
  "Complete Electronics Hardware Design Course — EsteemPCB (2022)",
  "İngilizce B1+ Sertifikası",
] as const;

export const heroBoard = {
  src: "/images/hero-board.png",
  alt: "Uçuş kontrol kartı",
} as const;

export const footer = {
  left: "KAAN SEZER — ELEKTRİK ELEKTRONİK MÜHENDİSİ",
  right: "PORTFOLYO · REV A · 2026",
} as const;
