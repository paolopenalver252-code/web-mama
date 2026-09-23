import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const PARAGRAPHS = [
  "Las consultas de Psicotarot y Astrología Cabalística están diseñadas para ayudarte a comprender los procesos que estás viviendo, descubrir tu potencial y tomar decisiones con mayor claridad y conciencia.",
  "Cada consulta integra diferentes herramientas de análisis y acompañamiento, ofreciendo una visión profunda de tu historia personal, tus patrones de comportamiento y tus oportunidades de crecimiento.",
  "No se trata únicamente de interpretar símbolos, sino de acompañarte en un proceso de autoconocimiento, comprensión y transformación personal.",
];

export default function Introduction() {
  return (
    <section className="bg-surface-alt py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="La consulta"
            title="Un proceso de autoconocimiento y claridad"
          />
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
