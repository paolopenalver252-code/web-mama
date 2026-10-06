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
      <p className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-campus-accent/15 px-5 text-sm font-medium text-campus-accent-strong">
        <Check size={16} strokeWidth={2.25} aria-hidden />
        Lección completada
      </p>
    );
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        disabled
        aria-describedby="seguimiento-progreso"
        className="inline-flex min-h-11 cursor-not-allowed items-center gap-2.5 rounded-full border border-dashed border-campus-line-strong px-5 text-sm font-medium text-campus-subtle"
      >
        <span aria-hidden className="h-4 w-4 rounded-full border border-current" />
        Marcar como completada
      </button>
      <p id="seguimiento-progreso" className="max-w-xs text-xs leading-relaxed text-campus-subtle">
        Disponible cuando se active el seguimiento del progreso.
      </p>
    </div>
  );
}
