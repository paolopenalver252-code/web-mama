import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Área privada de alumnos: además de `noindex` en cada página.
      disallow: "/alumnos",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
