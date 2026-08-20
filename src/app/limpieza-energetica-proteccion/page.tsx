import type { Metadata } from "next";
import Hero from "@/components/sections/limpieza-energetica/Hero";
import WhatItConsists from "@/components/sections/limpieza-energetica/WhatItConsists";
import SpecialtiesGrid from "@/components/sections/limpieza-energetica/SpecialtiesGrid";
import WhyChooseUs from "@/components/sections/limpieza-energetica/WhyChooseUs";
import ProcessSteps from "@/components/sections/ProcessSteps";
import FaqSection from "@/components/sections/FaqSection";
import FinalCta from "@/components/sections/FinalCta";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/schema";

export const metadata: Metadata = buildPageMetadata({
  title: "Limpieza Energética y Protección",
  description:
    "Evaluación, armonización y protección energética personalizada basada en el Método PSAI FLOW®, para personas, viviendas, negocios y más.",
  path: "/limpieza-energetica-proteccion",
});

const PROCESS_STEPS = [
  "Testaje Energético Integral",
  "Evaluación personalizada",
  "Limpieza y armonización",
  "Protección energética",
  "Seguimiento personalizado",
];

export default function LimpiezaEnergeticaPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Limpieza Energética y Protección", path: "/limpieza-energetica-proteccion" },
          ])
        )}
      />
      <Hero />
      <WhatItConsists />
      <SpecialtiesGrid />
      <ProcessSteps eyebrow="Cómo trabajamos" title="Nuestro proceso" steps={PROCESS_STEPS} />
      <WhyChooseUs />
      <FaqSection />
      <FinalCta
        heading="Solicita tu evaluación personalizada"
        description="Da el primer paso hacia la limpieza y protección energética que necesitas, acompañado por el Método PSAI FLOW®."
        primaryCta={{ label: "Solicitar una evaluación", href: "/contacto#formulario-contacto" }}
        secondaryCta={{ label: "Contactar", href: "/contacto" }}
      />
    </>
  );
}
