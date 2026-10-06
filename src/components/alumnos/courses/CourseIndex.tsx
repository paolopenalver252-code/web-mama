import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COURSE_STATUS_LABEL, countLessons, formatOrder } from "@/lib/alumnos/catalog/helpers";
import type { Course } from "@/lib/alumnos/catalog/types";
import { alumnosRoutes } from "@/lib/alumnos/routes";
import { brandEase } from "@/lib/motion/classNames";

type CourseIndexProps = {
  courses: Course[];
  /** Nivel del título de cada formación según la página que lo contenga. */
  headingLevel?: "h2" | "h3";
};

/**
 * Índice de formaciones: filas editoriales separadas por filetes (no
 * tarjetas), número de orden en dorado y la fila entera como enlace.
 */
export default function CourseIndex({ courses, headingLevel: Heading = "h2" }: CourseIndexProps) {
  return (
    <ol className="border-t border-primary/10">
      {courses.map((course) => {
        const lessons = course.status === "available" ? countLessons(course) : 0;
        const meta =
          course.status === "available"
            ? `${lessons} ${lessons === 1 ? "lección" : "lecciones"}`
            : COURSE_STATUS_LABEL[course.status];
        return (
          <li key={course.slug} className="border-b border-primary/10">
            <Link
              href={alumnosRoutes.course(course.slug)}
              className="group grid grid-cols-[2.25rem_1fr_auto] items-start gap-x-3 py-6 sm:grid-cols-[3.5rem_1fr_auto] sm:gap-x-5 sm:py-7"
            >
              <span aria-hidden className="pt-1.5 text-xs font-semibold tracking-[0.2em] text-accent-text sm:text-sm">
                {formatOrder(course.order)}
              </span>
              <span className="flex min-w-0 flex-col gap-1.5">
                <Heading
                  className={`font-heading text-2xl leading-snug transition-colors duration-300 sm:text-[1.75rem] ${
                    course.placeholder ? "text-primary/55" : "text-primary group-hover:text-accent-text"
                  }`}
                >
                  {course.title}
                </Heading>
                {course.subtitle ? <span className="text-sm text-ink-muted sm:text-[15px]">{course.subtitle}</span> : null}
                <span className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-ink-subtle">{meta}</span>
              </span>
              <ArrowRight
                size={20}
                strokeWidth={1.5}
                aria-hidden
                className={`mt-1.5 text-primary/30 transition-[translate,color] duration-300 ${brandEase} group-hover:translate-x-1 group-hover:text-accent-text`}
              />
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
