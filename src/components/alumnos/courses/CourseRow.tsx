import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { formatOrder, getCourseCounts, getLearningState, getProgressSummary } from "@/lib/alumnos/catalog/helpers";
import type { Course, CourseProgress as CourseProgressData } from "@/lib/alumnos/catalog/types";
import { alumnosRoutes } from "@/lib/alumnos/routes";
import { monoLabel } from "@/components/alumnos/ui/styles";
import CourseProgress from "./CourseProgress";
import CourseStateTag from "./CourseStateTag";
import CourseVisual from "./CourseVisual";

type CourseRowProps = {
  course: Course;
  progress: CourseProgressData;
};

/**
 * Formación en la biblioteca (/alumnos/formaciones): visual amplio a la
 * izquierda, ficha a la derecha. Los estados reales se diferencian a la
 * vista: completada (sello), en curso (barra de progreso), sin empezar.
 */
export default function CourseRow({ course, progress }: CourseRowProps) {
  const state = getLearningState(course, progress);
  const summary = getProgressSummary(course, progress);
  const counts = getCourseCounts(course);

  return (
    <Link
      href={alumnosRoutes.course(course.slug)}
      className="group grid grid-cols-1 gap-5 border-b border-campus-line py-7 sm:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] sm:items-center sm:gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)_auto] lg:gap-10"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-campus-line">
        <CourseVisual course={course} sizes="(min-width: 1024px) 320px, (min-width: 640px) 272px, 100vw" />
        {state === "completed" ? (
          <span aria-hidden className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-campus-success text-campus-bg">
            <Check size={16} strokeWidth={2.25} />
          </span>
        ) : null}
      </div>

      <div className="flex min-w-0 flex-col gap-3">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className={`${monoLabel} text-campus-gold`}>Formación {formatOrder(course.order)}</span>
          <CourseStateTag course={course} state={state} />
        </div>
        <h2
          className={`hyphens-auto [hyphenate-limit-chars:12_5_5] font-heading text-[1.85rem] leading-[1.08] transition-colors duration-300 sm:text-[2.2rem] ${
            course.placeholder ? "text-campus-ink/55" : "text-campus-ink"
          }`}
        >
          {course.title}
        </h2>
        {course.subtitle ? <p className="text-[15px] text-campus-muted">{course.subtitle}</p> : null}
        {counts ? (
          <p className="text-sm text-campus-subtle">
            {counts.modules} {counts.modules === 1 ? "módulo" : "módulos"} · {counts.lessons}{" "}
            {counts.lessons === 1 ? "lección" : "lecciones"}
          </p>
        ) : null}
        {summary ? <CourseProgress summary={summary} className="mt-2 max-w-sm" /> : null}
      </div>

      <span
        aria-hidden
        className="hidden h-12 w-12 items-center justify-center rounded-full border border-campus-line-strong text-campus-muted transition-[background-color,color,border-color] duration-300 group-hover:border-campus-ink group-hover:bg-campus-ink group-hover:text-campus-bg lg:inline-flex"
      >
        <ArrowRight size={18} strokeWidth={1.75} />
      </span>
    </Link>
  );
}
