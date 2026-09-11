import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const PARAGRAPHS = [
  "Te ofrece una visión integral de ti mismo para comprender mejor lo que piensas, sientes y haces, y avanzar hacia una mayor coherencia, equilibrio y propósito.",
  "El Método PSAI FLOW reúne diferentes herramientas y disciplinas de desarrollo personal dentro de una metodología estructurada, ayudándote a identificar patrones, comprender tus procesos internos, potenciar tus recursos personales y afrontar tus objetivos desde una perspectiva más consciente.",
  "Un camino de Psicotransformación Integral diseñado para acompañarte desde el autoconocimiento hacia una transformación más profunda y consciente.",
];

export default function Benefits() {
  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Beneficios" title="Lo que el método te aporta" />
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
