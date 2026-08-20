import { Clock } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import EmptyState from "@/components/ui/EmptyState";
import Reveal from "@/components/ui/Reveal";

export default function OurHistory() {
  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Trayectoria" title="Nuestra Historia" />
        </Reveal>
        <div className="mt-14">
          <Reveal>
            <EmptyState
              icon={Clock}
              title="Cronología en preparación"
              description="Aquí se mostrará, con una línea temporal, cómo nace PSAI FLOW ACADEMY y su evolución hasta convertirse en una academia internacional, en cuanto se confirmen los hitos definitivos."
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
