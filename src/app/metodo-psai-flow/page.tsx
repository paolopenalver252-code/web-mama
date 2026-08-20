import type { Metadata } from "next";
import Hero from "@/components/sections/metodo/Hero";
import WhatIsMethod from "@/components/sections/metodo/WhatIsMethod";
import PsaiLetters from "@/components/sections/metodo/PsaiLetters";
import SourceCode from "@/components/sections/metodo/SourceCode";
import ProcessGrid from "@/components/sections/metodo/ProcessGrid";
import Philosophy from "@/components/sections/metodo/Philosophy";
import Benefits from "@/components/sections/metodo/Benefits";
import FinalCta from "@/components/sections/FinalCta";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/schema";

export const metadata: Metadata = buildPageMetadata({
  title: "Método PSAI FLOW®",
  description:
    "Descubre el Método PSAI FLOW®, la base de PSAI FLOW ACADEMY: gestión emocional, coaching, transformación de patrones y desarrollo personal.",
  path: "/metodo-psai-flow",
});

export default function MetodoPsaiFlowPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Método PSAI FLOW®", path: "/metodo-psai-flow" },
          ])
        )}
      />
      <Hero />
      <WhatIsMethod />
      <PsaiLetters />
      <SourceCode />
      <ProcessGrid />
      <Philosophy />
      <Benefits />
      <FinalCta
        heading="Vive el Método PSAI FLOW®"
        description="Reserva una consulta para experimentarlo de forma personalizada o descubre las formaciones que lo desarrollan en profundidad."
        primaryCta={{ label: "Reservar una consulta", href: "/consultas" }}
        secondaryCta={{ label: "Ver cursos", href: "/cursos" }}
      />
    </>
  );
}
