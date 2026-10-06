import Link from "next/link";
import { ArrowLeft, ArrowRight, ListOrdered } from "lucide-react";
import type { Lesson } from "@/lib/alumnos/catalog/types";
import { alumnosRoutes } from "@/lib/alumnos/routes";

type LessonMobileBarProps = {
  courseSlug: string;
  previous: Lesson | null;
  next: Lesson | null;
};

const item =
  "flex h-14 flex-1 flex-col items-center justify-center gap-1 text-[11px] font-medium tracking-wide transition-colors duration-300";

/**
 * Barra inferior de la lección en móvil y tablet: sustituye a la navegación
 * general mientras se estudia (modo aprendizaje). Anterior · Índice ·
 * Siguiente, al alcance del pulgar.
 */
export default function LessonMobileBar({ courseSlug, previous, next }: LessonMobileBarProps) {
  return (
    <nav
      aria-label="Navegación de la lección"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-campus-line bg-campus-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      <div className="mx-auto flex max-w-md">
        {previous ? (
          <Link href={alumnosRoutes.lesson(courseSlug, previous.slug)} className={`${item} text-campus-muted hover:text-campus-ink`}>
            <ArrowLeft size={20} strokeWidth={1.5} aria-hidden />
            Anterior
          </Link>
        ) : (
          <span aria-disabled="true" className={`${item} text-campus-ink/25`}>
            <ArrowLeft size={20} strokeWidth={1.5} aria-hidden />
            Anterior
          </span>
        )}
        <a href="#indice" className={`${item} text-campus-muted hover:text-campus-ink`}>
          <ListOrdered size={20} strokeWidth={1.5} aria-hidden />
          Índice
        </a>
        {next ? (
          <Link href={alumnosRoutes.lesson(courseSlug, next.slug)} className={`${item} text-campus-ink`}>
            <ArrowRight size={20} strokeWidth={1.5} aria-hidden />
            Siguiente
          </Link>
        ) : (
          <span aria-disabled="true" className={`${item} text-campus-ink/25`}>
            <ArrowRight size={20} strokeWidth={1.5} aria-hidden />
            Siguiente
          </span>
        )}
      </div>
    </nav>
  );
}
