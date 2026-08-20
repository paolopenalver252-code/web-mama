import { Quote } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function Philosophy() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Filosofía" title="La filosofía del método" />
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 flex flex-col items-center gap-6">
            <Quote className="text-accent" size={32} strokeWidth={1.25} />
            <p className="font-heading text-2xl italic leading-snug text-primary/70 sm:text-3xl">
              &ldquo;Cita pendiente de contenido definitivo.&rdquo;
            </p>
            <span className="text-sm uppercase tracking-[0.2em] text-ink/40">
              Solimar Rengel · Fundadora de PSAI FLOW ACADEMY
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
