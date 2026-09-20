import type { MetadataRoute } from "next";
import { site } from "@/data/portfolio";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Panel ve yükleme uçları arama sonuçlarında görünmesin.
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
