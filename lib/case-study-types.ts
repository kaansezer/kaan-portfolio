/**
 * Case Study veri modeli — JSON dosya store'da saklanır.
 * Relational karşılığı: Project 1—N ProjectSpec/Section/Media/Contribution.
 */
export type ProjectStatus = "in-development" | "prototype" | "completed" | "flight-tested";

export type CaseSectionType =
  | "overview"
  | "problem"
  | "architecture"
  | "pcb"
  | "firmware"
  | "software"
  | "test"
  | "result"
  | "contribution"
  | "custom";

export type MediaType = "3d" | "pcb" | "schematic" | "test" | "photo" | "other";

export type ProjectSpec = {
  id: string;
  label: string;
  value: string;
  sortOrder: number;
};

export type ProjectSection = {
  id: string;
  type: CaseSectionType;
  /** custom type ise admin başlığı; diğerlerinde boş olabilir (otomatik etiket). */
  title: string;
  /** Markdown: paragraph, bold, italic, listeler, heading, link. */
  content: string;
  image?: string;
  caption?: string;
  visible: boolean;
  sortOrder: number;
};

export type ProjectStage = {
  label: string;
  state: "done" | "active" | "todo";
};

export type ProjectMediaItem = {
  id: string;
  type: MediaType;
  image: string;
  title: string;
  caption?: string;
  alt: string;
  sortOrder: number;
};

export type CaseStudyProject = {
  id: string;
  projectCode: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  status: ProjectStatus;
  category: string;
  organization: string;
  date: string;
  coverImage?: string;
  thumbnail?: string;
  featured: boolean;
  visible: boolean;
  sortOrder: number;
  seoTitle?: string;
  seoDescription?: string;
  specs: ProjectSpec[];
  sections: ProjectSection[];
  media: ProjectMediaItem[];
  contributions: string[];
  pipeline?: ProjectStage[];
  createdAt: string;
  updatedAt: string;
};

export const SECTION_TYPES: { value: CaseSectionType; label: string }[] = [
  { value: "overview", label: "OVERVIEW" },
  { value: "problem", label: "PROBLEM" },
  { value: "architecture", label: "ARCHITECTURE" },
  { value: "pcb", label: "PCB DESIGN" },
  { value: "firmware", label: "FIRMWARE" },
  { value: "software", label: "SOFTWARE" },
  { value: "test", label: "TEST" },
  { value: "result", label: "RESULT" },
  { value: "contribution", label: "MY CONTRIBUTION" },
  { value: "custom", label: "CUSTOM" },
];

export const STATUS_OPTIONS: { value: ProjectStatus; label: string }[] = [
  { value: "in-development", label: "IN DEVELOPMENT" },
  { value: "prototype", label: "PROTOTYPE" },
  { value: "completed", label: "COMPLETED" },
  { value: "flight-tested", label: "FLIGHT TESTED" },
];

export const MEDIA_TYPES: { value: MediaType; label: string }[] = [
  { value: "3d", label: "3D" },
  { value: "pcb", label: "PCB" },
  { value: "schematic", label: "SCHEMATIC" },
  { value: "test", label: "TEST" },
  { value: "photo", label: "PHOTO" },
  { value: "other", label: "OTHER" },
];

/** Otomatik section başlığı (custom değilse). */
export function sectionLabel(s: Pick<ProjectSection, "type" | "title">): string {
  if (s.type === "custom") return s.title || "CUSTOM";
  return SECTION_TYPES.find((t) => t.value === s.type)?.label ?? s.type.toUpperCase();
}

/** Kart tıklanabilir mi / modal açılmalı mı? */
export function hasCaseDetail(p: CaseStudyProject): boolean {
  return (
    p.sections.some((s) => s.visible) ||
    p.specs.length > 0 ||
    p.media.length > 0 ||
    p.contributions.length > 0 ||
    p.longDescription.trim().length > 0
  );
}
