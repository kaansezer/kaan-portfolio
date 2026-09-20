import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
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

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // JSON içindeki "<" kaçırılır: script etiketinin erken kapanmasını önler.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personLd).replace(/</g, "\\u003c"),
        }}
      />
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
