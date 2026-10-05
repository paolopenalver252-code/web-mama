import { GraduationCap, MessageCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

const PATHS = [
  {
    icon: GraduationCap,
    eyebrow: "Quiero formarme",
    title: "Explorar la Academia",
    description: "Formaciones y cursos para profundizar en el Método PSAI FLOW® por tu cuenta.",
    href: "/academia",
  },
  {
    icon: MessageCircle,
    eyebrow: "Quiero una consulta",
    title: "Hablar por WhatsApp",
    description: "Acompañamiento personalizado, adaptado a lo que necesitas en este momento.",
    href: "/contacto#formulario-contacto",
  },
];

/**
 * Distingue con claridad dos intenciones distintas del visitante: aprender
 * por su cuenta (Academia) o recibir acompañamiento (Consulta). Dos bloques
 * lado a lado, nunca mezclados en una misma tarjeta.
 */
export default function LearnOrConsult() {
  return (
    <section className="bg-surface-alt py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Consultas"
            title="No todo el mundo busca formarse. Algunos buscan acompañamiento."
            description="Cada consulta integra distintas herramientas dentro del Método PSAI FLOW®, combinadas y adaptadas a las necesidades de cada persona."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 divide-y divide-primary/10 overflow-hidden rounded-2xl border border-primary/10 bg-surface sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          {PATHS.map((path, index) => (
            <Reveal key={path.title} delay={index * 120}>
              <div className="flex h-full flex-col items-center gap-4 p-10 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                  <path.icon className="text-accent" size={24} strokeWidth={1.5} />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-subtle">
                  {path.eyebrow}
                </span>
                <p className="max-w-xs text-sm leading-relaxed text-ink-muted text-body">{path.description}</p>
                <Button href={path.href} variant={index === 0 ? "accent" : "outline"} size="md" className="mt-2">
                  {path.title}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
