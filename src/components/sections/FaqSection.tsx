import SectionHeading from "@/components/ui/SectionHeading";
import FaqAccordion, { type FaqItem } from "@/components/ui/FaqAccordion";
import Reveal from "@/components/ui/Reveal";

// Se rellenará con preguntas reales en cuanto el cliente las facilite.
// El primer ítem es una vista previa del componente, no una pregunta real,
// para que el acordeón se pueda ver y probar mientras no hay contenido definitivo.
const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Aquí aparecerá tu primera pregunta frecuente",
    answer:
      "Esto es una vista previa del diseño del acordeón. En cuanto recibamos las preguntas y respuestas reales, sustituirán este ejemplo.",
  },
];

export default function FaqSection() {
  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Dudas frecuentes" title="Preguntas frecuentes" />
        </Reveal>

        <div className="mt-14">
          <Reveal>
            <FaqAccordion items={FAQ_ITEMS} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
