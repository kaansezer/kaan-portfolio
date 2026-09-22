import type { ProjectStatus } from "@/lib/case-study-types";

const STATUS_UI: Record<
  ProjectStatus,
  { label: string; mark: string; className: string; dotClassName: string }
> = {
  "flight-tested": {
    label: "FLIGHT TESTED",
    mark: "●",
    className: "border-[rgba(120,160,140,.35)] bg-[rgba(120,160,140,.08)] text-[var(--muted)]",
    dotClassName: "text-[rgba(120,160,140,.9)]",
  },
  completed: {
    label: "COMPLETED",
    mark: "✓",
    className: "border-[rgba(120,160,140,.35)] bg-[rgba(120,160,140,.08)] text-[var(--muted)]",
    dotClassName: "text-[rgba(120,160,140,.9)]",
  },
  "in-development": {
    label: "IN DEVELOPMENT",
    mark: "◌",
    className: "border-[rgba(220,139,50,.45)] bg-[rgba(220,139,50,.08)] text-[var(--accent-ink)]",
    dotClassName: "text-[var(--accent)]",
  },
  prototype: {
    label: "PROTOTYPE",
    mark: "●",
    className: "border-[rgba(220,139,50,.3)] bg-[rgba(220,139,50,.06)] text-[var(--accent-ink)]",
    dotClassName: "text-[var(--accent)] opacity-70",
  },
};

/** Teknik durum etiketi — engineering documentation label tonunda. */
export default function StatusBadge({ status }: { status: ProjectStatus }) {
  const ui = STATUS_UI[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 font-mono text-[10px] font-600 uppercase tracking-[0.1em] transition-colors duration-200 md:text-[11px] ${ui.className}`}
    >
      <span aria-hidden className={ui.dotClassName}>
        {ui.mark}
      </span>
      {ui.label}
    </span>
  );
}
