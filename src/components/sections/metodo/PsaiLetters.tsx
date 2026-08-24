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
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Las siglas" title="¿Qué significa PSAI?" />
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {LETTERS.map((item, index) => (
            <Reveal key={item.letter} delay={index * 100} className="h-full">
              <div className="flex h-full flex-col items-center gap-4 rounded-2xl border border-primary/5 bg-surface-alt p-8 text-center shadow-soft">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                  <item.icon className="text-accent" size={24} strokeWidth={1.5} />
                </span>
                <span className="font-heading text-3xl text-primary">{item.letter}</span>
                <p className="text-sm leading-relaxed text-ink/50">{item.meaning}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
