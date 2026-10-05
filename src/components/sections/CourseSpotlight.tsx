import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import Reveal from "@/components/ui/Reveal";
import Watermark from "@/components/ui/Watermark";
import { getFeaturedCourse } from "@/lib/courses";

/**
 * "Formación destacada": presentación editorial de un programa concreto
 * (no una tarjeta de curso ni una página de venta). Responde a "¿qué puedo
 * estudiar aquí?" justo después de que "La Academia" presente el espacio
 * en general — por eso no repite esa explicación, y tampoco anticipa el
 * desglose completo de "Qué encontrarás en la Academia" (la sección
 * siguiente). Todo el contenido (título, nivel, descripción, duración,
 * modalidad) sale de lib/courses.ts, única fuente real del curso.
 */
export default function CourseSpotlight() {
  const course = getFeaturedCourse();

  return (
    <section className="relative overflow-hidden bg-primary py-16 sm:py-24">
      <Watermark className="-bottom-24 -right-6 z-0" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-12 lg:gap-20 lg:px-8">
        <div className="flex flex-col items-start gap-6">
          <Reveal>
            <Eyebrow tone="dark">Formación destacada</Eyebrow>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="font-heading text-4xl uppercase leading-tight tracking-wide text-white sm:text-5xl">
              Magia Universal Cuántica
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="font-heading text-lg text-accent sm:text-xl">Nivel I · Formación Profesional</p>
          </Reveal>

          <Reveal delay={200}>
            <p className="max-w-md text-base leading-relaxed text-mist text-body sm:text-lg">
              {course.summary}
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[0.25em] text-mist-subtle sm:text-sm">
              <span className="whitespace-nowrap">{course.duration}</span>
              <span aria-hidden className="text-accent">
                ·
              </span>
              <span className="whitespace-nowrap">{course.modality}</span>
              <span aria-hidden className="text-accent">
                ·
              </span>
              <span className="whitespace-nowrap">Formación profesional</span>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-2 flex flex-wrap items-center gap-4">
              <Button href={`/cursos/${course.slug}`} variant="accent" size="md">
                Conocer la formación
              </Button>
              <Button
                href="/contacto#formulario-contacto"
                variant="ghost"
                size="md"
                className="text-white hover:text-accent"
              >
                Solicitar información por WhatsApp
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <PlaceholderImage
            src={course.image}
            alt={course.imageAlt ?? course.title}
            tone="dark"
            className="aspect-[4/5] w-full shadow-soft"
          />
        </Reveal>
      </div>
    </section>
  );
}
