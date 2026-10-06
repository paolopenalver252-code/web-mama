import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { monoLabel } from "@/components/alumnos/ui/styles";
import type { Lesson } from "@/lib/alumnos/catalog/types";
import { alumnosRoutes } from "@/lib/alumnos/routes";

type LessonPagerProps = {
  courseSlug: string;
  previous: Lesson | null;
  next: Lesson | null;
};

/** Lección anterior / siguiente (escritorio; en móvil lo cubre LessonMobileBar). */
export default function LessonPager({ courseSlug, previous, next }: LessonPagerProps) {
  if (!previous && !next) return null;

  const base =
    "group flex min-w-0 flex-col gap-2 rounded-2xl border border-campus-line p-5 transition-[border-color,background-color] duration-300 hover:border-campus-line-strong hover:bg-campus-surface";

  return (
    <nav aria-label="Lecciones" className="grid grid-cols-2 gap-4">
      {previous ? (
        <Link href={alumnosRoutes.lesson(courseSlug, previous.slug)} className={base}>
          <span className={`inline-flex items-center gap-2 text-campus-subtle ${monoLabel}`}>
            <ArrowLeft size={14} strokeWidth={1.75} aria-hidden className="transition-[translate] duration-300 group-hover:-translate-x-0.5" />
            Anterior
          </span>
          <span className="truncate text-[15px] text-campus-ink">{previous.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={alumnosRoutes.lesson(courseSlug, next.slug)} className={`${base} items-end text-right`}>
          <span className={`inline-flex items-center gap-2 text-campus-subtle ${monoLabel}`}>
            Siguiente
            <ArrowRight size={14} strokeWidth={1.75} aria-hidden className="transition-[translate] duration-300 group-hover:translate-x-0.5" />
          </span>
          <span className="max-w-full truncate text-[15px] text-campus-ink">{next.title}</span>
        </Link>
      ) : null}
    </nav>
  );
}
