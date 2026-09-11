import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const PARAGRAPHS = [
  "Porque no se trata solo de aprender técnicas energéticas, sino de adquirir una metodología integral para comprender, armonizar y transformar la energía de personas y espacios de manera consciente y profesional.",
  "Durante seis meses combinarás conocimientos, práctica y acompañamiento para desarrollar herramientas como la limpieza y protección energética, la radiestesia, el Péndulo Hebreo y la armonización, integrando diferentes tradiciones desde una perspectiva ética y responsable.",
  "Una formación pensada para quienes quieren profundizar en el trabajo energético, desarrollar su percepción y construir una base sólida para continuar su camino de especialización.",
];

export default function WhyThisCourse() {
  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="La diferencia" title="¿Por qué este curso?" />
        </Reveal>
        <div className="mt-10 flex flex-col gap-5 text-base leading-relaxed text-ink-muted text-body">
          {PARAGRAPHS.map((paragraph, index) => (
            <Reveal key={paragraph} delay={index * 100}>
              <p>{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
