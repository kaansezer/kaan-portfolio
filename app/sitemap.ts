import type { MetadataRoute } from "next";
import { site } from "@/data/portfolio";
import { getVisibleProjects } from "@/lib/projects-store";

/**
 * Tek sayfalık site: kök URL + her görünür projenin derin bağlantısı
 * (?project=slug — CaseStudyList modalı bu parametreyle açılıyor).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const projects = await getVisibleProjects();

  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((p) => ({
      url: `${site.url}/?project=${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
