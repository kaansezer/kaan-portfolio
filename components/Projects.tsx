import SectionHead from "./SectionHead";
import CaseStudyList from "./CaseStudyList";
import type { CaseStudyProject } from "@/lib/case-study-types";

export default function Projects({ projects }: { projects: CaseStudyProject[] }) {
  return (
    <section id="projeler" aria-label="Projeler" className="scroll-mt-20" data-reveal-section>
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-36 lg:py-40">
        <SectionHead title="Projeler" sheet="SHEET 02/04" />
        <CaseStudyList projects={projects} />
      </div>
    </section>
  );
}
