import { Award, CalendarClock, ListChecks, Repeat, Laptop } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Watermark from "@/components/ui/Watermark";

const COURSE_FACTS = [
  { icon: CalendarClock, label: "Duración", value: "Pendiente de confirmar" },
  { icon: Laptop, label: "Modalidad", value: "Pendiente de confirmar" },
  { icon: Award, label: "Certificado", value: "Pendiente de confirmar" },
  { icon: Repeat, label: "Continuidad del programa", value: "Pendiente de confirmar" },
];

export default function CourseSpotlight() {
  return (
    <section className="relative overflow-hidden bg-primary py-24">
      <Watermark className="-bottom-24 -right-6 z-0" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Curso destacado"
            title="Curso de Magia Universal Cuántica"
            tone="dark"
            align="left"
            description="El programa más importante de PSAI FLOW ACADEMY."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-2">
          <Reveal>
            <ul className="flex flex-col gap-6">
              {COURSE_FACTS.map((fact) => (
                <li key={fact.label} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <fact.icon className="text-accent" size={20} strokeWidth={1.5} />
                  </span>
                  <div>
                    <div className="text-sm uppercase tracking-[0.2em] text-white/50">{fact.label}</div>
                    <div className="mt-1 font-heading text-lg text-white/90">{fact.value}</div>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={150}>
            <div className="flex h-full flex-col gap-6 rounded-2xl border border-white/10 bg-white/5 p-8">
              <div className="flex items-center gap-3">
                <ListChecks className="text-accent" size={22} strokeWidth={1.5} />
                <h3 className="font-heading text-xl text-white">Qué aprenderás</h3>
              </div>
              <p className="text-sm leading-relaxed text-white/60">
                Temario detallado próximamente. Esta sección está lista para
                mostrar el listado completo de contenidos en cuanto se
                confirme el programa definitivo del curso.
              </p>
              <div className="mt-auto pt-4">
                <Button href="/cursos/magia-universal-cuantica" variant="accent" size="md">
                  Inscribirme
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
