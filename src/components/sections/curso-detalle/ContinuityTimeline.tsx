import { ArrowRight, GraduationCap, Sparkles } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import type { Course } from "@/lib/courses";

export default function ContinuityTimeline({ course }: { course: Course }) {
  const steps = [
    { icon: GraduationCap, label: "Ahora", value: course.continuity.current },
    { icon: Sparkles, label: "Continuidad", value: course.continuity.next },
  ];

  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="El camino continúa" title="Continuidad" />
        </Reveal>

        <div className="mt-14 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center">
          {steps.map((step, index) => (
            <div key={step.label} className="flex items-center gap-4">
              <Reveal delay={index * 150} className="h-full">
                <div className="flex h-full min-h-[11rem] w-full flex-col justify-center gap-4 rounded-2xl border border-primary/5 bg-surface p-8 shadow-soft sm:w-72">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                    <step.icon className="text-accent" size={20} strokeWidth={1.5} />
                  </span>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-text">
                      {step.label}
                    </div>
                    <p className="mt-2 font-heading text-lg leading-snug text-primary">{step.value}</p>
                  </div>
                </div>
              </Reveal>
              {index < steps.length - 1 ? (
                <ArrowRight
                  aria-hidden
                  className="hidden shrink-0 text-accent sm:block"
                  size={22}
                  strokeWidth={1.5}
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
