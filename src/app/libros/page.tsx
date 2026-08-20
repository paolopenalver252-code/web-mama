import type { Metadata } from "next";
import Hero from "@/components/sections/libros/Hero";
import Library from "@/components/sections/libros/Library";
import Philosophy from "@/components/sections/libros/Philosophy";
import UpcomingReleases from "@/components/sections/libros/UpcomingReleases";
import FinalCta from "@/components/sections/FinalCta";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { bookSchema, breadcrumbSchema, jsonLdGraph } from "@/lib/schema";
import { BOOKS } from "@/lib/books";

export const metadata: Metadata = buildPageMetadata({
  title: "Libros de Solimar Rengel",
  description:
    "Descubre las publicaciones de Solimar Rengel: Curso de Auto-Control, Psico-Transformación y El Código de Jesús, fruto de más de 35 años de experiencia.",
  path: "/libros",
});

export default function LibrosPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          ...BOOKS.map((book) => bookSchema(book)),
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Libros", path: "/libros" },
          ])
        )}
      />
      <Hero />
      <Library />
      <Philosophy />
      <UpcomingReleases />
      <FinalCta
        heading="Sigue profundizando en el Método PSAI FLOW®"
        description="Descubre nuestras formaciones o da el primer paso reservando una consulta personalizada."
        primaryCta={{ label: "Ver Cursos", href: "/cursos" }}
        secondaryCta={{ label: "Reservar Consulta", href: "/consultas" }}
      />
    </>
  );
}
