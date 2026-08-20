import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

const LETTERS = [
  { letter: "P", meaning: "Significado pendiente" },
  { letter: "S", meaning: "Significado pendiente" },
  { letter: "A", meaning: "Significado pendiente" },
  { letter: "I", meaning: "Significado pendiente" },
];

export default function PsaiExplainer() {
  return (
    <section className="bg-surface py-12">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center gap-2 text-center">
            <Eyebrow>El método</Eyebrow>
            <h2 className="font-heading text-xl text-primary sm:text-2xl">¿Qué es PSAI FLOW?</h2>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-8 flex flex-col items-center gap-0 sm:flex-row sm:justify-center sm:gap-0">
            {LETTERS.map((item, index) => (
              <div key={item.letter} className="flex items-center">
                <div className="flex flex-col items-center gap-2 px-4 py-2 text-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-accent/5 font-heading text-lg font-semibold text-primary">
                    {item.letter}
                  </span>
                  <span className="max-w-[7rem] text-[11px] leading-relaxed text-ink/45">
                    {item.meaning}
                  </span>
                </div>
                {index < LETTERS.length - 1 ? (
                  <span aria-hidden className="hidden h-px w-6 bg-accent/30 sm:block" />
                ) : null}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mt-8 max-w-xl text-center text-sm leading-relaxed text-ink/55">
            Filosofía del método pendiente de contenido definitivo.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
