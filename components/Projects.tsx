import SectionHead from "./SectionHead";
import CaseStudyList from "./CaseStudyList";
import { getVisibleProjects } from "@/lib/projects-store";

export default async function Projects() {
  const projects = await getVisibleProjects();

  return (
    <section id="projeler" aria-label="Projeler" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <SectionHead title="Projeler" sheet="SHEET 02/04" />
        <CaseStudyList projects={projects} />
      </div>
    </section>
  );
}
