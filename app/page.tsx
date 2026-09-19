import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Header />
      {/* Sabit teknik grid zemin */}
      <div aria-hidden className="tech-grid tech-grid-fade pointer-events-none fixed inset-0 z-0" />
      <main className="relative z-10">
        <Hero />
        <Experience />
        <Projects />
        <Education />
        <Skills />
      </main>
      <div className="relative z-10">
        <Contact />
      </div>
    </>
  );
}
