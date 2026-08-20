import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function WhatIsMethod() {
  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="El método" title="¿Qué es el Método PSAI FLOW?" />
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-8 text-base italic leading-relaxed text-ink/50">
            Explicación pendiente de contenido definitivo.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
