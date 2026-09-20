import { education } from "@/data/portfolio";
import SectionHead from "./SectionHead";
import { RevealGroup, RevealItem } from "./Reveal";

export default function Education() {
  return (
    <section id="egitim" aria-label="Eğitim" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <SectionHead title="Eğitim" sheet="SHEET 03/04" />

        <RevealGroup className="mt-10" y={28} scaleFrom={0.98}>
          <div className="rounded-md border border-[var(--line)] bg-[var(--panel)] p-6 md:p-10">
            <RevealItem
              as="p"
              y={12}
              duration={0.5}
              className="font-mono text-[11px] tracking-[0.2em] text-[var(--accent-ink)]"
            >
              {education.date}
            </RevealItem>

            <RevealItem
              as="h3"
              y={12}
              duration={0.5}
              className="mt-3 text-balance text-2xl font-semibold tracking-tight text-[var(--ink)] md:text-3xl"
            >
              {education.title}
            </RevealItem>

            <RevealItem as="p" y={12} duration={0.5} className="mt-2 text-[var(--ink-dim)]">
              {education.school}
            </RevealItem>

            <RevealItem y={12} duration={0.5}>
              <dl className="mt-8 grid gap-6 border-t border-[var(--line-soft)] pt-6 sm:grid-cols-2">
                {education.infos.map((info) => (
                  <div key={info.label}>
                    <dt className="font-mono text-[10px] tracking-[0.2em] text-[var(--muted)]">
                      {info.label.toUpperCase()}
                    </dt>
                    <dd className="mt-1.5 text-[15px] text-[var(--ink-dim)]">{info.value}</dd>
                  </div>
                ))}
              </dl>
            </RevealItem>
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}
