import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import {
  formatOrder,
  getCourseCounts,
  getLearningState,
  getProgressSummary,
  getResumeLesson,
} from "@/lib/alumnos/catalog/helpers";
import type { Course, CourseProgress as CourseProgressData } from "@/lib/alumnos/catalog/types";
import { alumnosRoutes } from "@/lib/alumnos/routes";
import { buttonStyles, monoLabel } from "@/components/alumnos/ui/styles";
import CourseProgress from "./CourseProgress";
import CourseStateTag from "./CourseStateTag";
import CourseVisual from "./CourseVisual";

type CourseHeroProps = {
  course: Course;
  progress: CourseProgressData;
};

/**
 * Cabecera inmersiva de una formación: ficha a la izquierda, visual grande
 * a la derecha (encima en móvil). La acción principal solo lleva a una
 * lección cuando la formación está publicada; mientras se prepara, invita
 * a recorrer su estructura.
 */
export default function CourseHero({ course, progress }: CourseHeroProps) {
  const state = getLearningState(course, progress);
  const counts = getCourseCounts(course);
  const resume = course.status === "available" ? getResumeLesson(course, progress) : null;

  return (
    <section className="group grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-[28px] border border-campus-line bg-campus-surface lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      <div className="relative order-first aspect-[16/9] lg:order-last lg:aspect-auto lg:min-h-[460px]">
        <CourseVisual course={course} priority sizes="(min-width: 1024px) 50vw, 100vw" />
      </div>

      <div className="flex flex-col gap-6 p-6 sm:p-9 xl:p-12">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className={`${monoLabel} text-campus-gold`}>Formación {formatOrder(course.order)}</span>
          <CourseStateTag course={course} state={state} />
        </div>

        <div className="flex flex-col gap-3">
          <h1
            className={`hyphens-auto [hyphenate-limit-chars:12_5_5] font-heading text-[2.25rem] leading-[1.02] sm:text-[3rem] xl:text-[3.25rem] ${
              course.placeholder ? "text-campus-ink/55" : "text-campus-ink"
            }`}
          >
            {course.title}
          </h1>
          {course.subtitle ? <p className="text-base text-campus-muted sm:text-lg">{course.subtitle}</p> : null}
        </div>

        <p className={`max-w-prose text-[15px] leading-relaxed ${course.description ? "text-campus-muted" : "text-campus-subtle"}`}>
          {course.description ?? "Descripción pendiente de incorporar."}
        </p>

        {counts ? (
          <dl className="flex gap-10">
            <div>
              <dt className={`${monoLabel} text-campus-subtle`}>Módulos</dt>
              <dd className="mt-1 font-campus-mono text-xl text-campus-ink">{counts.modules}</dd>
            </div>
            <div>
              <dt className={`${monoLabel} text-campus-subtle`}>Lecciones</dt>
              <dd className="mt-1 font-campus-mono text-xl text-campus-ink">{counts.lessons}</dd>
            </div>
          </dl>
        ) : null}

        <div className="mt-auto flex flex-col gap-7 pt-2">
          <CourseProgress summary={getProgressSummary(course, progress)} />
          {resume ? (
            <Link href={alumnosRoutes.lesson(course.slug, resume.lesson.slug)} className={`${buttonStyles.primary} self-start`}>
              {state === "in_progress" ? "Continuar" : "Comenzar"}
              <ArrowRight size={17} strokeWidth={1.75} aria-hidden />
            </Link>
          ) : course.modules.length > 0 ? (
            <a href="#recorrido" className={`${buttonStyles.secondary} self-start`}>
              Ver el recorrido
              <ArrowDown size={17} strokeWidth={1.75} aria-hidden />
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
