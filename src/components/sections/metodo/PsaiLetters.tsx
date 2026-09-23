import { Feather, Sparkle, Sun, Waves } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const LETTERS = [
  { letter: "P", icon: Feather, meaning: "Pensamiento" },
  { letter: "S", icon: Waves, meaning: "Sentimiento" },
  { letter: "A", icon: Sun, meaning: "Acción" },
  { letter: "I", icon: Sparkle, meaning: "Iluminada" },
];

export default function PsaiLetters() {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Las siglas" title="¿Qué significa PSAI?" />
        </Reveal>

        {/* Mobile: fila editorial (icono + letra/palabra) separada por líneas
            finas, sin tarjetas — evita el efecto "cuatro cards genéricas".
            Desde sm: se recupera la cuadrícula de tarjetas original. */}
        <div className="mt-10 flex flex-col divide-y divide-accent/15 sm:mt-14 sm:grid sm:grid-cols-2 sm:gap-6 sm:divide-y-0 lg:grid-cols-4">
          {LETTERS.map((item, index) => (
            <Reveal key={item.letter} delay={index * 100} className="sm:h-full">
              <div className="flex items-center gap-5 py-6 first:pt-0 sm:h-full sm:flex-col sm:items-center sm:gap-4 sm:rounded-2xl sm:border sm:border-primary/5 sm:bg-surface-alt sm:p-8 sm:text-center sm:shadow-soft">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 sm:h-14 sm:w-14">
                  <item.icon className="text-accent" size={22} strokeWidth={1.5} />
                </span>
                <div className="flex flex-col gap-1">
                  <span className="font-heading text-3xl leading-none text-accent-text sm:text-primary">
                    {item.letter}
                  </span>
                  <p className="font-heading text-base uppercase leading-snug tracking-[0.15em] text-primary sm:font-sans sm:text-sm sm:font-normal sm:normal-case sm:leading-relaxed sm:tracking-normal sm:text-ink-muted">
                    {item.meaning}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
