import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import ScrollCraftInit from "@/components/ScrollCraftInit";
import CursorGlow from "@/components/CursorGlow";
import ProjectViewGate from "@/components/ProjectViewGate";
import { getVisibleProjects } from "@/lib/projects-store";
import { education, profile, site, skillRows } from "@/data/portfolio";

/**
 * Google'ın "kişi" bilgi kartı için yapılandırılmış veri.
 * Arama sonucunda isim + unvan + kurum eşleşmesini sağlamlaştırır.
 */
const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  description: site.description,
  url: site.url,
  email: `mailto:${profile.email}`,
  sameAs: [profile.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ankara",
    addressCountry: "TR",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: education.school,
  },
  knowsAbout: skillRows.flatMap((r) => r.items.split(", ")),
};

export default async function Home() {
  const projects = await getVisibleProjects();

  return (
    <>
      <script
        type="application/ld+json"
        // JSON içindeki "<" kaçırılır: script etiketinin erken kapanmasını önler.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personLd).replace(/</g, "\\u003c"),
        }}
      />
      <CursorGlow />
      <Header />
      {/* Sabit teknik grid zemin — proje detay sayfasında da devam eder, dokunulmadı */}
      <div aria-hidden className="tech-grid tech-grid-fade pointer-events-none fixed inset-0 z-0" />
      {/* Çok soluk ambient gradient + noise — ayrı katmanlar, grid'in üstünde */}
      <div aria-hidden className="ambient-gradient pointer-events-none fixed inset-0 z-0" />
      <div aria-hidden className="noise-overlay pointer-events-none fixed inset-0 z-0" />
      <ProjectViewGate projects={projects}>
        {/* KRİTİK: ScrollCraftInit burada, `children` içinde — ProjectViewGate
            proje açıp kapatırken bu içeriği tamamen unmount/remount ediyor.
            Dışarıda (bir kez, sayfa yüklenince) çalışsaydı, gözlemcileri ESKİ
            DOM düğümlerine bağlı kalır; anasayfaya dönüldüğünde YENİ
            düğümler hiç gözlemlenmez ve data-reveal-section'lar sonsuza kadar
            opacity:0'da takılı kalırdı (asıl "boş sayfa" hatası buydu). */}
        <ScrollCraftInit />
        <main className="relative z-10">
          <Hero />
          <Experience />
          <Projects projects={projects} />
          <Education />
          <Skills />
        </main>
        <div className="relative z-10">
          <Contact />
        </div>
      </ProjectViewGate>
    </>
  );
}
