import { ChevronDown } from "lucide-react";
import EmptyState from "@/components/alumnos/ui/EmptyState";
import PendingTag from "@/components/alumnos/ui/PendingTag";
import { monoLabel } from "@/components/alumnos/ui/styles";
import { formatOrder, getResumeLesson } from "@/lib/alumnos/catalog/helpers";
import type { Course, CourseProgress } from "@/lib/alumnos/catalog/types";
import { alumnosRoutes } from "@/lib/alumnos/routes";
import LessonItem, { type LessonItemState } from "./LessonItem";

type ModuleListProps = {
  course: Course;
  progress: CourseProgress;
};

/**
 * "Tu recorrido": los módulos como etapas de un camino (nodo numerado sobre
 * una línea vertical), cada uno desplegable con sus lecciones. Usa
 * <details> nativo: accesible con teclado y sin JavaScript. Se abre por
 * defecto el módulo donde continuar (o el primero), para que con decenas de
 * módulos la página siga siendo legible.
 */
export default function ModuleList({ course, progress }: ModuleListProps) {
  if (course.modules.length === 0) {
    return (
      <EmptyState
        title="Recorrido en preparación"
        description="Los módulos y lecciones de esta formación aparecerán aquí en cuanto se publiquen."
      />
    );
  }

  const resume = progress.tracking ? getResumeLesson(course, progress) : null;
  const openIndex = resume?.moduleIndex ?? 0;
  const completed = new Set(progress.tracking ? progress.completedLessonSlugs : []);

  return (
    <ol className="relative flex flex-col gap-3 before:absolute before:bottom-6 before:left-[1.4rem] before:top-6 before:w-px before:bg-campus-line-strong sm:before:left-[1.65rem]">
      {course.modules.map((module, moduleIndex) => {
        const realCount = module.placeholder ? null : module.lessons.length;
        return (
          <li key={module.id} className="relative">
            <details open={moduleIndex === openIndex} className="group/module">
              <summary className="grid cursor-pointer list-none grid-cols-[2.8rem_minmax(0,1fr)_auto] items-center gap-4 rounded-2xl py-3 pr-2 transition-colors duration-300 hover:bg-campus-surface sm:grid-cols-[3.3rem_minmax(0,1fr)_auto] sm:pr-4">
                <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-campus-line-strong bg-campus-bg font-campus-mono text-sm text-campus-ink transition-colors duration-300 group-open/module:border-campus-accent sm:h-[3.3rem] sm:w-[3.3rem]">
                  {formatOrder(moduleIndex + 1)}
                </span>
                <span className="flex min-w-0 flex-col gap-1">
                  <span className={`${monoLabel} text-campus-subtle`}>
                    {module.label} {formatOrder(moduleIndex + 1)}
                    {realCount !== null ? ` · ${realCount} ${realCount === 1 ? "lección" : "lecciones"}` : ""}
                  </span>
                  <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span
                      className={`text-lg font-medium leading-snug sm:text-xl ${
                        module.placeholder ? "text-campus-ink/55" : "text-campus-ink"
                      }`}
                    >
                      {module.title}
                    </span>
                    {module.placeholder ? <PendingTag /> : null}
                  </span>
                </span>
                <ChevronDown
                  size={20}
                  strokeWidth={1.5}
                  aria-hidden
                  className="text-campus-subtle transition-[rotate] duration-300 group-open/module:rotate-180"
                />
              </summary>

              {module.lessons.length === 0 ? (
                <p className="pb-4 pl-[4.2rem] pt-1 text-sm text-campus-subtle sm:pl-[4.9rem]">
                  Este módulo todavía no tiene lecciones publicadas.
                </p>
              ) : (
                <ol className="flex flex-col gap-0.5 pb-3 pl-[3.6rem] pt-1 sm:pl-[4.3rem]">
                  {module.lessons.map((lesson, lessonIndex) => {
                    const state: LessonItemState = completed.has(lesson.slug)
                      ? "completed"
                      : resume?.lesson.slug === lesson.slug
                        ? "current"
                        : "default";
                    return (
                      <li key={lesson.slug}>
                        <LessonItem
                          href={alumnosRoutes.lesson(course.slug, lesson.slug)}
                          lesson={lesson}
                          number={lessonIndex + 1}
                          state={state}
                        />
                      </li>
                    );
                  })}
                </ol>
              )}
            </details>
          </li>
        );
      })}
    </ol>
  );
}
