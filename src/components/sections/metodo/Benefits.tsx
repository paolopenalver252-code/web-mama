import { Gift } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import EmptyState from "@/components/ui/EmptyState";
import Reveal from "@/components/ui/Reveal";

// Se rellenará con los beneficios reales en cuanto el cliente los facilite.
export default function Benefits() {
  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Beneficios" title="Lo que el método te aporta" />
        </Reveal>

        <div className="mt-14">
          <Reveal>
            <EmptyState
              icon={Gift}
              title="Próximamente"
              description="Aquí se mostrarán los beneficios del Método PSAI FLOW en cuanto se confirme el listado definitivo."
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
