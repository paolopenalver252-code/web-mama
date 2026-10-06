import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import PendingTag from "@/components/alumnos/ui/PendingTag";
import { formatDuration, formatOrder } from "@/lib/alumnos/catalog/helpers";
import type { Course } from "@/lib/alumnos/catalog/types";
import { alumnosRoutes } from "@/lib/alumnos/routes";
import { brandEase } from "@/lib/motion/classNames";

type CourseContentsProps = {
  course: Course;
};

/**
 * "Contenido de la formación": módulos (o bloques) y, dentro, sus lecciones
 * en orden. Cada lección es un enlace a su propia página.
 */
export default function CourseContents({ course }: CourseContentsProps) {
  if (course.modules.length === 0) {
    return (
      <EmptyState
        icon={BookOpen}
        title="Contenido en preparación"
        description="Los módulos y lecciones de esta formación aparecerán aquí en cuanto se publiquen."
      />
    );
  }

  return (
    <div className="flex flex-col gap-12">
      {course.modules.map((module, moduleIndex) => (
        <section key={module.id} aria-labelledby={`modulo-${module.id}`}>
          <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-b border-primary/15 pb-4">
            <div className="flex min-w-0 flex-col gap-1.5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-text">
                {module.label} {formatOrder(moduleIndex + 1)}
              </p>
              <h3
                id={`modulo-${module.id}`}
                className={`font-heading text-2xl leading-snug ${module.placeholder ? "text-primary/55" : "text-primary"}`}
              >
                {module.title}
              </h3>
            </div>
            {module.placeholder ? <PendingTag /> : null}
          </header>

          {module.lessons.length === 0 ? (
            <p className="py-5 text-sm text-ink-subtle">Este módulo todavía no tiene lecciones publicadas.</p>
          ) : (
            <ol>
              {module.lessons.map((lesson, lessonIndex) => {
                const duration = formatDuration(lesson.durationSeconds);
                return (
                  <li key={lesson.slug} className="border-b border-primary/10">
                    <Link
                      href={alumnosRoutes.lesson(course.slug, lesson.slug)}
                      className="group grid grid-cols-[2.25rem_1fr_auto] items-center gap-x-3 py-4 sm:grid-cols-[3rem_1fr_auto] sm:gap-x-4 sm:py-5"
                    >
                      <span aria-hidden className="text-xs font-semibold tracking-[0.18em] text-ink-subtle">
                        {formatOrder(lessonIndex + 1)}
                      </span>
                      <span className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
                        <span
                          className={`text-[15px] font-medium transition-colors duration-300 sm:text-base ${
                            lesson.placeholder ? "text-primary/55" : "text-primary group-hover:text-accent-text"
                          }`}
                        >
                          {lesson.title}
                        </span>
                        {duration ? <span className="text-xs text-ink-subtle">{duration}</span> : null}
                      </span>
                      <ArrowRight
                        size={18}
                        strokeWidth={1.5}
                        aria-hidden
                        className={`text-primary/30 transition-[translate,color] duration-300 ${brandEase} group-hover:translate-x-1 group-hover:text-accent-text`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ol>
          )}
        </section>
      ))}
    </div>
  );
}
