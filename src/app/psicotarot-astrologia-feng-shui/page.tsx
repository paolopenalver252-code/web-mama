import type { Metadata } from "next";
import Hero from "@/components/sections/psicotarot/Hero";
import Introduction from "@/components/sections/psicotarot/Introduction";
import WhatIncludes from "@/components/sections/psicotarot/WhatIncludes";
import ForWhom from "@/components/sections/psicotarot/ForWhom";
import Modality from "@/components/sections/consultas/Modality";
import ClosingQuote from "@/components/sections/psicotarot/ClosingQuote";
import KeepExploring from "@/components/sections/psicotarot/KeepExploring";
import FinalCta from "@/components/sections/FinalCta";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/schema";

export const metadata: Metadata = buildPageMetadata({
  title: "Consultas de Psicotarot y Astrología Cabalística",
  description:
    "Consultas de Psicotarot y Astrología Cabalística: Psicotarot Evolutivo, Tarot Cabalístico, Astrología Evolutiva y China (BaZi), Numerología y Coaching. Online o presencial en Mallorca, unos 90 minutos.",
  path: "/psicotarot-astrologia-feng-shui",
});

export default function PsicotarotAstrologiaFengShuiPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            {
              name: "Psicotarot, Astrología Cabalística y Feng Shui Integral",
              path: "/psicotarot-astrologia-feng-shui",
            },
          ])
        )}
      />
      <Hero />
      <Introduction />
      <WhatIncludes />
      <ForWhom />
      <Modality />
      <ClosingQuote />
      <KeepExploring />
      <FinalCta
        heading="Reserva tu consulta de Psicotarot y Astrología Cabalística"
        description="Un espacio para comprender tu camino y avanzar con mayor conciencia, equilibrio y confianza."
        primaryCta={{ label: "Reservar una consulta", href: "/contacto#formulario-contacto" }}
        secondaryCta={{ label: "Ir a Consultas", href: "/consultas" }}
      />
    </>
  );
}
