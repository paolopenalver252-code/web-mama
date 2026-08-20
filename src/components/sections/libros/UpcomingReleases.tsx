import SectionHeading from "@/components/ui/SectionHeading";
import { CardBookComingSoon } from "@/components/cards/CardBook";
import Reveal from "@/components/ui/Reveal";

// Número de tarjetas "Próximamente" a mostrar mientras no haya más libros anunciados.
const PLACEHOLDER_COUNT = 4;

export default function UpcomingReleases() {
  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Lo que viene" title="Próximas publicaciones" />
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {Array.from({ length: PLACEHOLDER_COUNT }).map((_, index) => (
            <Reveal key={index} delay={index * 100} className="h-full">
              <CardBookComingSoon />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
