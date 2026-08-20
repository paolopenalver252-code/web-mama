import { Quote } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import EmptyState from "@/components/ui/EmptyState";
import Reveal from "@/components/ui/Reveal";

export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
};

// Se rellenará con opiniones reales en cuanto el cliente las facilite.
const TESTIMONIALS: Testimonial[] = [];

export default function TestimonialsSection() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Testimonios" title="Voces de nuestra comunidad" />
        </Reveal>

        <div className="mt-14">
          {TESTIMONIALS.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {TESTIMONIALS.map((testimonial, index) => (
                <Reveal key={testimonial.name} delay={index * 100}>
                  <div className="flex h-full flex-col gap-4 rounded-2xl border border-primary/5 bg-surface-alt p-8 shadow-soft">
                    <Quote className="text-accent" size={22} strokeWidth={1.5} />
                    <p className="flex-1 text-pretty text-sm leading-relaxed text-ink/70">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div>
                      <div className="font-heading text-base text-primary">{testimonial.name}</div>
                      {testimonial.role ? (
                        <div className="text-xs text-ink/50">{testimonial.role}</div>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <EmptyState
                icon={Quote}
                title="Próximamente"
                description="Esta sección está lista para mostrar las opiniones de quienes ya han vivido la experiencia PSAI FLOW."
              />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
