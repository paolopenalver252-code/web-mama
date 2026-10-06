import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Lesson } from "@/lib/alumnos/catalog/types";
import { alumnosRoutes } from "@/lib/alumnos/routes";

type LessonPagerProps = {
  courseSlug: string;
  previous: Lesson | null;
  next: Lesson | null;
};

/** Lección anterior / siguiente dentro de la misma formación. */
export default function LessonPager({ courseSlug, previous, next }: LessonPagerProps) {
  if (!previous && !next) return null;

  const linkClasses =
    "group flex min-w-0 flex-col gap-1 py-5 transition-colors duration-300 hover:text-accent-text";

  return (
    <nav aria-label="Lecciones" className="grid grid-cols-1 gap-x-8 border-y border-primary/10 sm:grid-cols-2">
      {previous ? (
        <Link href={alumnosRoutes.lesson(courseSlug, previous.slug)} className={linkClasses}>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink-subtle">
            <ArrowLeft size={14} strokeWidth={1.5} aria-hidden />
            Anterior
          </span>
          <span className="truncate text-[15px] font-medium text-primary group-hover:text-accent-text">{previous.title}</span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}
      {next ? (
        <Link
          href={alumnosRoutes.lesson(courseSlug, next.slug)}
          className={`${linkClasses} border-t border-primary/10 sm:items-end sm:border-t-0 sm:text-right`}
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink-subtle">
            Siguiente
            <ArrowRight size={14} strokeWidth={1.5} aria-hidden />
          </span>
          <span className="truncate text-[15px] font-medium text-primary group-hover:text-accent-text">{next.title}</span>
        </Link>
      ) : null}
    </nav>
  );
}
