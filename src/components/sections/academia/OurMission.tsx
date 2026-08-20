import { Compass } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function OurMission() {
  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
        <Reveal>
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
            <Compass className="text-accent" size={26} strokeWidth={1.5} />
          </span>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-6">
            <SectionHeading eyebrow="Nuestro propósito" title="Nuestra Misión" />
          </div>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 text-base italic leading-relaxed text-ink/50">
            Declaración de misión pendiente de contenido definitivo.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
