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
          <div className="mt-8 flex flex-col gap-5 text-base leading-relaxed text-ink-muted">
            <p className="font-heading text-xl text-primary">
              Una metodología propia de Psicotransformación Integral
            </p>
            <p>
              El Método PSAI FLOW nace con el propósito de acompañar a las personas en su
              proceso de transformación desde una visión integral.
            </p>
            <p>
              Su enfoque contempla a la persona como un todo, integrando el cuerpo, la mente,
              las emociones y la conciencia para favorecer un desarrollo equilibrado.
            </p>
            <p>
              PSAI FLOW reúne diferentes herramientas de evaluación, aprendizaje y
              acompañamiento dentro de una metodología estructurada que busca ayudar a cada
              persona a conocerse mejor, desarrollar sus recursos personales y avanzar hacia
              sus objetivos de crecimiento.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
