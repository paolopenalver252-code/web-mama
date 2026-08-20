import { Users } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import EmptyState from "@/components/ui/EmptyState";
import Reveal from "@/components/ui/Reveal";

export default function ForWhom() {
  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Perfiles" title="¿Para quién son estas consultas?" />
        </Reveal>
        <div className="mt-14">
          <Reveal>
            <EmptyState
              icon={Users}
              title="Próximamente"
              description="Aquí se mostrarán, en bloques visuales, los distintos perfiles de personas que encuentran acompañamiento en estas consultas."
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
