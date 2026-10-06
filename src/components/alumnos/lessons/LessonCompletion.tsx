import { Check } from "lucide-react";
import type { CourseProgress } from "@/lib/alumnos/catalog/types";

type LessonCompletionProps = {
  progress: CourseProgress;
  lessonSlug: string;
};

/**
 * Estado "Completada" de la lección. Sin almacenamiento de progreso, el
 * control se muestra deshabilitado y explicado — nunca se marca nada que
 * después no se vaya a recordar. Con progreso real, el botón pasará a ser
 * un formulario con su Server Action (que comprobará sesión y acceso).
 */
export default function LessonCompletion({ progress, lessonSlug }: LessonCompletionProps) {
  if (progress.tracking && progress.completedLessonSlugs.includes(lessonSlug)) {
    return (
      <p className="inline-flex items-center gap-2 text-sm font-medium text-primary">
        <Check size={16} strokeWidth={2} aria-hidden className="text-accent-text" />
        Lección completada
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
      <button
        type="button"
        disabled
        aria-describedby="seguimiento-progreso"
        className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-primary/15 px-6 py-2.5 text-sm font-medium text-ink-subtle"
      >
        <Check size={16} strokeWidth={1.75} aria-hidden />
        Marcar como completada
      </button>
      <p id="seguimiento-progreso" className="text-xs leading-relaxed text-ink-subtle">
        El seguimiento del progreso estará disponible cuando el área de alumnos esté conectada a su base de datos.
      </p>
    </div>
  );
}
