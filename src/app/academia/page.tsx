import type { Metadata } from "next";
import Hero from "@/components/sections/academia/Hero";
import OurHistory from "@/components/sections/academia/OurHistory";
import MeetSolimar from "@/components/sections/academia/MeetSolimar";
import OurMission from "@/components/sections/academia/OurMission";
import OurVision from "@/components/sections/academia/OurVision";
import ValuesGrid from "@/components/sections/academia/ValuesGrid";
import WhyChooseAcademy from "@/components/sections/academia/WhyChooseAcademy";
import FinalCta from "@/components/sections/FinalCta";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLdGraph, personSchema } from "@/lib/schema";

export const metadata: Metadata = buildPageMetadata({
  title: "La Academia",
  description:
    "Conoce PSAI FLOW ACADEMY y a su fundadora, Solimar Rengel: más de 35 años de experiencia, formación estructurada y una visión internacional.",
  path: "/academia",
});

export default function AcademiaPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          personSchema(),
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "La Academia", path: "/academia" },
          ])
        )}
      />
      <Hero />
      <OurHistory />
      <MeetSolimar />
      <OurMission />
      <OurVision />
      <ValuesGrid />
      <WhyChooseAcademy />
      <FinalCta
        heading="Sigue conociendo PSAI FLOW ACADEMY"
        description="Descubre nuestras formaciones o da el primer paso reservando una consulta personalizada."
        primaryCta={{ label: "Ver Cursos", href: "/cursos" }}
        secondaryCta={{ label: "Reservar Consulta", href: "/consultas" }}
      />
    </>
  );
}
