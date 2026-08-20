import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function WhatAreConsultations() {
  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="El espacio"
            title="¿Qué son las Consultas PSAI FLOW?"
            description="Cada consulta integra distintas herramientas dentro del Método PSAI FLOW®, combinadas y adaptadas a las necesidades de cada persona."
          />
        </Reveal>
      </div>
    </section>
  );
}
