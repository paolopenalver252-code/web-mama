import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

type ProcessStepsProps = {
  eyebrow?: string;
  title: string;
  steps: string[];
  bg?: "surface" | "surface-alt";
};

const BG_CLASS = {
  surface: "bg-surface",
  "surface-alt": "bg-surface-alt",
};

/**
 * Línea temporal numerada y elegante, reutilizable en cualquier página
 * que necesite explicar "cómo funciona" un proceso paso a paso.
 */
export default function ProcessSteps({ eyebrow, title, steps, bg = "surface-alt" }: ProcessStepsProps) {
  return (
    <section className={`${BG_CLASS[bg]} py-24`}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} />
        </Reveal>

        <div className="mt-16 flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          {steps.map((step, index) => (
            <div key={step} className="flex flex-1 items-center sm:contents">
              <Reveal delay={index * 100} className="flex flex-1 flex-col items-center gap-3 text-center">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-text font-heading text-lg text-white">
                  {index + 1}
                </span>
                <p className="max-w-[9rem] text-sm font-medium leading-snug text-primary">{step}</p>
              </Reveal>
              {index < steps.length - 1 ? (
                <div
                  aria-hidden
                  className="hidden flex-1 border-t border-dashed border-accent/30 sm:mt-6 sm:block"
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
