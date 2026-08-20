import { Gem as GemIcon } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import EmptyState from "@/components/ui/EmptyState";
import Reveal from "@/components/ui/Reveal";

export default function WhyThisCourse() {
  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="La diferencia" title="¿Por qué este curso?" />
        </Reveal>
        <div className="mt-14">
          <Reveal>
            <EmptyState
              icon={GemIcon}
              title="Próximamente"
              description="Aquí se mostrarán, con tarjetas e iconos, los factores que hacen única a esta formación en cuanto se confirme el contenido definitivo."
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
