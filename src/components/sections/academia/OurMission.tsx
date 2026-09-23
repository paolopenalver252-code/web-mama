import { Compass } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function OurMission() {
  return (
    <section className="bg-surface-alt py-16 sm:py-24">
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
          <p className="mt-6 text-base leading-relaxed text-ink-muted text-body">
            Formar, acompañar e inspirar a las personas para que desarrollen una vida más
            consciente, equilibrada y coherente, integrando conocimiento, experiencia y
            crecimiento personal.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
