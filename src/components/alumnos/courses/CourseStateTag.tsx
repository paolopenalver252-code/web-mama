import { COURSE_STATUS_LABEL, LEARNING_STATE_LABEL, type LearningState } from "@/lib/alumnos/catalog/helpers";
import type { Course } from "@/lib/alumnos/catalog/types";
import { monoLabel } from "@/components/alumnos/ui/styles";

type CourseStateTagProps = {
  course: Pick<Course, "status">;
  state: LearningState;
};

const DOT: Record<string, string> = {
  in_progress: "bg-campus-accent",
  completed: "bg-campus-success",
  not_started: "bg-campus-ink/50",
  preparing: "bg-campus-gold",
  available: "bg-campus-ink/50",
  undefined: "border border-dashed border-campus-subtle bg-transparent",
};

/**
 * Estado de una formación. Con progreso real: En curso / No iniciada /
 * Completada. Sin él: el estado editorial (en preparación, pendiente…).
 */
export default function CourseStateTag({ course, state }: CourseStateTagProps) {
  const key = state === "untracked" ? course.status : state;
  const label = state === "untracked" ? COURSE_STATUS_LABEL[course.status] : LEARNING_STATE_LABEL[state];
  return (
    <span className={`inline-flex items-center gap-2 text-campus-muted ${monoLabel}`}>
      <span aria-hidden className={`h-1.5 w-1.5 shrink-0 rounded-full ${DOT[key]}`} />
      {label}
    </span>
  );
}
