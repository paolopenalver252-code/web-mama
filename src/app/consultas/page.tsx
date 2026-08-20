import type { Metadata } from "next";
import Hero from "@/components/sections/consultas/Hero";
import WhatAreConsultations from "@/components/sections/consultas/WhatAreConsultations";
import SpecialtiesGrid from "@/components/sections/consultas/SpecialtiesGrid";
import ForWhom from "@/components/sections/consultas/ForWhom";
import WhatYouCanWork from "@/components/sections/consultas/WhatYouCanWork";
import Modality from "@/components/sections/consultas/Modality";
import ProcessSteps from "@/components/sections/ProcessSteps";
import FinalCta from "@/components/sections/FinalCta";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/schema";

export const metadata: Metadata = buildPageMetadata({
  title: "Consultas — Acompañamiento personalizado",
  description:
    "Consultas personalizadas que integran Psicotarot, Astrología, Numerología y Coaching dentro del Método PSAI FLOW®. Online o presencial en Mallorca.",
  path: "/consultas",
});

const PROCESS_STEPS = ["Reserva", "Evaluación", "Consulta personalizada", "Orientación", "Plan de acompañamiento"];

export default function ConsultasPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Consultas", path: "/consultas" },
          ])
        )}
      />
      <Hero />
      <WhatAreConsultations />
      <SpecialtiesGrid />
      <ForWhom />
      <WhatYouCanWork />
      <Modality />
      <ProcessSteps eyebrow="El camino" title="¿Cómo es el proceso?" steps={PROCESS_STEPS} />
      <FinalCta
        heading="Reserva tu consulta personalizada"
        description="Un espacio pensado para ti: acompañamiento cercano, profesional y adaptado a tu momento."
        primaryCta={{ label: "Reservar consulta", href: "/contacto#formulario-contacto" }}
        secondaryCta={{ label: "Solicitar información", href: "/contacto" }}
      />
    </>
  );
}
