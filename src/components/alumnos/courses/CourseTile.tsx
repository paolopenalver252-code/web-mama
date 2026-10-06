import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatOrder, getLearningState, getProgressSummary } from "@/lib/alumnos/catalog/helpers";
import type { Course, CourseProgress as CourseProgressData } from "@/lib/alumnos/catalog/types";
import { alumnosRoutes } from "@/lib/alumnos/routes";
import { monoLabel } from "@/components/alumnos/ui/styles";
import CourseProgress from "./CourseProgress";
import CourseStateTag from "./CourseStateTag";
import CourseVisual from "./CourseVisual";

type CourseTileProps = {
  course: Course;
  progress: CourseProgressData;
};

/**
 * Formación como pieza visual (inicio). En móvil es una fila compuesta
 * (miniatura + texto) en vez de una tarjeta apilada; desde sm, bloque
 * vertical con visual grande. Todo el bloque es un único enlace.
 */
export default function CourseTile({ course, progress }: CourseTileProps) {
  const summary = getProgressSummary(course, progress);
  return (
    <Link
      href={alumnosRoutes.course(course.slug)}
      className="group grid w-full grid-cols-[6.5rem_minmax(0,1fr)] items-center gap-4 rounded-2xl py-1 sm:flex sm:flex-col sm:items-stretch sm:gap-0 sm:overflow-hidden sm:border sm:border-campus-line sm:bg-campus-surface sm:py-0 sm:transition-[border-color] sm:duration-300 sm:hover:border-campus-line-strong"
    >
      <div className="relative aspect-square overflow-hidden rounded-xl sm:aspect-[16/10] sm:rounded-none">
        <CourseVisual course={course} showNumber sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 104px" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2 sm:gap-3 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className={`${monoLabel} text-campus-gold`}>Formación {formatOrder(course.order)}</span>
          <ArrowUpRight
            size={18}
            strokeWidth={1.5}
            aria-hidden
            className="hidden shrink-0 text-campus-subtle transition-[translate,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-campus-ink sm:block"
          />
        </div>
        <h3
          className={`hyphens-auto [hyphenate-limit-chars:12_5_5] font-heading text-[1.4rem] leading-[1.12] sm:text-[1.7rem] ${
            course.placeholder ? "text-campus-ink/55" : "text-campus-ink"
          }`}
        >
          {course.title}
        </h3>
        {course.subtitle ? <p className="text-sm text-campus-muted">{course.subtitle}</p> : null}
        <div className="mt-1 flex flex-col gap-3 sm:mt-auto sm:pt-3">
          <CourseStateTag course={course} state={getLearningState(course, progress)} />
          {summary ? <CourseProgress summary={summary} /> : null}
        </div>
      </div>
    </Link>
  );
}
