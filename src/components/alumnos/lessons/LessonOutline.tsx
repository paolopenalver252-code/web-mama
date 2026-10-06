import Link from "next/link";
import LessonItem, { type LessonItemState } from "@/components/alumnos/courses/LessonItem";
import CourseProgress from "@/components/alumnos/courses/CourseProgress";
import { monoLabel, panel } from "@/components/alumnos/ui/styles";
import { formatOrder, getProgressSummary } from "@/lib/alumnos/catalog/helpers";
import type { Course, CourseProgress as CourseProgressData } from "@/lib/alumnos/catalog/types";
import { alumnosRoutes } from "@/lib/alumnos/routes";

type LessonOutlineProps = {
  course: Course;
  progress: CourseProgressData;
  activeLessonSlug: string;
};

/**
 * Índice de la formación junto a la lección: dónde estás, qué viene y
 * cuánto llevas (si hay progreso real). Fijo en escritorio ancho, con
 * scroll propio para formaciones con cientos de lecciones.
 */
export default function LessonOutline({ course, progress, activeLessonSlug }: LessonOutlineProps) {
  const completed = new Set(progress.tracking ? progress.completedLessonSlugs : []);

  return (
    <nav aria-label="Contenido de la formación" className={`${panel} flex flex-col xl:max-h-[calc(100dvh-6rem)]`}>
      <div className="flex flex-col gap-3 border-b border-campus-line p-5">
        <p className={`${monoLabel} text-campus-subtle`}>Contenido de la formación</p>
        <Link
          href={alumnosRoutes.course(course.slug)}
          className="font-heading text-[1.45rem] leading-tight text-campus-ink transition-colors duration-300 hover:text-campus-accent-strong"
        >
          {course.title}
        </Link>
        <CourseProgress summary={getProgressSummary(course, progress)} />
      </div>

      <ol className="flex min-h-0 flex-col gap-5 overflow-y-auto p-3 pb-4">
        {course.modules.map((module, moduleIndex) => (
          <li key={module.id}>
            <p className={`${monoLabel} px-3 pb-2 pt-2 text-campus-subtle`}>
              {module.label} {formatOrder(moduleIndex + 1)}
              <span className="mt-1 block font-campus text-[13px] normal-case tracking-normal text-campus-muted">
                {module.title}
              </span>
            </p>
            <ol className="flex flex-col gap-0.5">
              {module.lessons.map((lesson, lessonIndex) => {
                const state: LessonItemState = completed.has(lesson.slug) ? "completed" : "default";
                return (
                  <li key={lesson.slug}>
                    <LessonItem
                      compact
                      href={alumnosRoutes.lesson(course.slug, lesson.slug)}
                      lesson={lesson}
                      number={lessonIndex + 1}
                      state={state}
                      active={lesson.slug === activeLessonSlug}
                    />
                  </li>
                );
              })}
            </ol>
          </li>
        ))}
      </ol>
    </nav>
  );
}
