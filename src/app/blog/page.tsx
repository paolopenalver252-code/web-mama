import type { Metadata } from "next";
import Hero from "@/components/sections/blog/Hero";
import FeaturedArticle from "@/components/sections/blog/FeaturedArticle";
import ArticlesExplorer from "@/components/sections/blog/ArticlesExplorer";
import Newsletter from "@/components/sections/blog/Newsletter";
import FinalCta from "@/components/sections/FinalCta";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { blogSchema, breadcrumbSchema, jsonLdGraph } from "@/lib/schema";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog — Centro de conocimiento",
  description:
    "Artículos y recursos sobre Psicotransformación Integral, Método PSAI FLOW®, Magia Universal, Astrología, Psicotarot y desarrollo personal.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      {/* Nota: sin schema BlogPosting individual a propósito — los artículos
          del listado son contenido de ejemplo, no publicaciones reales;
          marcarlos como tal induciría a error a los buscadores. */}
      <JsonLd
        data={jsonLdGraph(
          blogSchema(),
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
          ])
        )}
      />
      <Hero />
      <FeaturedArticle />
      <ArticlesExplorer />
      <Newsletter />
      <FinalCta
        heading="Lleva el conocimiento a la práctica"
        description="Descubre nuestras formaciones o da el primer paso reservando una consulta personalizada."
        primaryCta={{ label: "Ver Cursos", href: "/cursos" }}
        secondaryCta={{ label: "Reservar Consulta", href: "/consultas" }}
      />
    </>
  );
}
