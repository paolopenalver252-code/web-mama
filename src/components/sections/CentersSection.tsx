import { Building2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import EmptyState from "@/components/ui/EmptyState";
import CardCenter, { type Center } from "@/components/cards/CardCenter";
import Reveal from "@/components/ui/Reveal";

// Se rellenará con los centros reales en cuanto el cliente los facilite.
const CENTERS: Center[] = [];

export default function CentersSection() {
  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Red de colaboradores" title="Centros colaboradores" />
        </Reveal>

        <div className="mt-14">
          {CENTERS.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {CENTERS.map((center, index) => (
                <Reveal key={center.name} delay={index * 100}>
                  <CardCenter {...center} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <EmptyState
                icon={Building2}
                title="Red en expansión"
                description="Aquí se mostrarán los centros colaboradores de PSAI FLOW ACADEMY en cuanto se confirme el listado definitivo."
              />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
