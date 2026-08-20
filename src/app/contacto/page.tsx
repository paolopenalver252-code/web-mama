import type { Metadata } from "next";
import Hero from "@/components/sections/contacto/Hero";
import ContactForm from "@/components/sections/contacto/ContactForm";
import ContactInfo from "@/components/sections/contacto/ContactInfo";
import BookConsultation from "@/components/sections/contacto/BookConsultation";
import FaqSection from "@/components/sections/FaqSection";
import FinalCta from "@/components/sections/FinalCta";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/schema";

export const metadata: Metadata = buildPageMetadata({
  title: "Contacto",
  description:
    "Escríbenos para resolver tus dudas o reserva directamente una consulta personalizada con PSAI FLOW ACADEMY. Atención online internacional y en Mallorca.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Contacto", path: "/contacto" },
          ])
        )}
      />
      <Hero />
      <ContactForm />
      <ContactInfo />
      <BookConsultation />
      <FaqSection />
      <FinalCta
        heading="Transformando cuerpo, mente, emociones y conciencia."
        description="Da el siguiente paso: conoce la Academia o descubre las formaciones que pueden acompañarte."
        primaryCta={{ label: "Conocer la Academia", href: "/academia" }}
        secondaryCta={{ label: "Ver Cursos", href: "/cursos" }}
      />
    </>
  );
}
