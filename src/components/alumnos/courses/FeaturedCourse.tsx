import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  formatOrder,
  getLearningState,
  getProgressSummary,
  getResumeLesson,
  type FeaturedMode,
} from "@/lib/alumnos/catalog/helpers";
import type { Course, CourseProgress as CourseProgressData } from "@/lib/alumnos/catalog/types";
import { alumnosRoutes } from "@/lib/alumnos/routes";
import { buttonStyles, monoLabel } from "@/components/alumnos/ui/styles";
import CourseProgress from "./CourseProgress";
import CourseStateTag from "./CourseStateTag";
import CourseVisual from "./CourseVisual";

type FeaturedCourseProps = {
  course: Course;
  progress: CourseProgressData;
  mode: FeaturedMode;
};

const COPY: Record<FeaturedMode, { heading: string; cta: string }> = {
  continue: { heading: "Continuar aprendiendo", cta: "Continuar formación" },
  start: { heading: "Empieza tu formación", cta: "Comenzar formación" },
  explore: { heading: "Descubre tu formación", cta: "Ver la formación" },
};

/**
 * Protagonista del inicio: una formación a gran formato (visual + datos +
 * acción principal). El texto y el destino de la acción dependen del modo:
 * solo se habla de "continuar" cuando existe progreso real.
 */
export default function FeaturedCourse({ course, progress, mode }: FeaturedCourseProps) {
  const resume = mode === "explore" ? null : getResumeLesson(course, progress);
  const href = resume ? alumnosRoutes.lesson(course.slug, resume.lesson.slug) : alumnosRoutes.course(course.slug);
  const copy = COPY[mode];

  return (
    <section aria-labelledby="destacada">
      <h2 id="destacada" className={`${monoLabel} mb-5 text-campus-muted`}>
        {copy.heading}
      </h2>

      <article className="group relative grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-[28px] border border-campus-line bg-campus-surface lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[440px]">
          <CourseVisual course={course} priority sizes="(min-width: 1024px) 55vw, 100vw" />
        </div>

        <div className="flex flex-col gap-6 p-6 sm:p-9 xl:p-12">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className={`${monoLabel} text-campus-gold`}>Formación {formatOrder(course.order)}</span>
            <CourseStateTag course={course} state={getLearningState(course, progress)} />
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="hyphens-auto [hyphenate-limit-chars:12_5_5] font-heading text-[2.1rem] leading-[1.04] text-campus-ink sm:text-[2.75rem] xl:text-[3.1rem]">
              {course.title}
            </h3>
            {course.subtitle ? <p className="text-base text-campus-muted sm:text-lg">{course.subtitle}</p> : null}
          </div>

          {course.description ? (
            <p className="max-w-prose text-[15px] leading-relaxed text-campus-muted">{course.description}</p>
          ) : null}

          {mode === "continue" && resume ? (
            <div className="border-l border-campus-accent/60 pl-4">
              <p className={`${monoLabel} text-campus-subtle`}>
                {resume.module.label} {formatOrder(resume.moduleIndex + 1)} · Lección {formatOrder(resume.lessonNumber)}
              </p>
              <p className="mt-1.5 text-[15px] text-campus-ink">{resume.lesson.title}</p>
            </div>
          ) : null}

          <div className="mt-auto flex flex-col gap-7 pt-2">
            <CourseProgress summary={getProgressSummary(course, progress)} />
            <Link href={href} className={`${buttonStyles.primary} self-start`}>
              {copy.cta}
              <ArrowRight size={17} strokeWidth={1.75} aria-hidden className="transition-[translate] duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
}
