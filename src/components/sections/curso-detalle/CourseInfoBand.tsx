import { CalendarClock, CheckCircle2, Laptop } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import type { Course } from "@/lib/courses";

export default function CourseInfoBand({ course }: { course: Course }) {
  const facts = [
    { icon: CalendarClock, label: "Duración", value: course.duration },
    { icon: Laptop, label: "Modalidad", value: course.modality },
  ];

  return (
    <section className="bg-primary py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Información del curso" title="Lo esencial, de un vistazo" tone="dark" />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {facts.map((fact, index) => (
            <Reveal key={fact.label} delay={index * 100}>
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <fact.icon className="text-accent" size={22} strokeWidth={1.5} />
                </span>
                <div>
                  <div className="text-sm uppercase tracking-[0.2em] text-white/50">{fact.label}</div>
                  <div className="mt-1 font-heading text-xl text-white">{fact.value}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={220}>
          <div className="mt-12">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">Incluye</p>
            <ul className="mt-5 flex flex-wrap gap-3">
              {course.includes.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80"
                >
                  <CheckCircle2 className="text-accent" size={16} strokeWidth={1.75} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
