import type { Course, CourseModule, CourseProgress, CourseStatus, Lesson } from "./types";

/**
 * Utilidades puras sobre el catálogo y el progreso (sin acceso a datos ni a
 * la sesión). Regla común: si un dato no existe, se devuelve null y la
 * interfaz no lo muestra — nunca se rellena con un valor inventado.
 */

export function formatOrder(order: number): string {
  return String(order).padStart(2, "0");
}

export const COURSE_STATUS_LABEL: Record<CourseStatus, string> = {
  preparing: "Contenido en preparación",
  available: "Disponible",
  undefined: "Pendiente de definir",
};

export type LessonLocation = {
  lesson: Lesson;
  module: CourseModule;
  moduleIndex: number;
  /** Posición de la lección dentro de su módulo (1, 2…). */
  lessonNumber: number;
};

/** Todas las lecciones de la formación en orden de estudio. */
export function flattenLessons(course: Course): LessonLocation[] {
  return course.modules.flatMap((module, moduleIndex) =>
    module.lessons.map((lesson, index) => ({ lesson, module, moduleIndex, lessonNumber: index + 1 }))
  );
}

export function countLessons(course: Course): number {
  return course.modules.reduce((total, module) => total + module.lessons.length, 0);
}

/**
 * Nº de módulos y lecciones, solo cuando la formación está publicada: con
 * marcadores provisionales, contar "1 módulo · 1 lección" sería falso.
 */
export function getCourseCounts(course: Course): { modules: number; lessons: number } | null {
  if (course.status !== "available") return null;
  return { modules: course.modules.length, lessons: countLessons(course) };
}

/** "12 min", "1 h 05 min" — o null si la duración no se conoce. */
export function formatDuration(seconds: number | null): string | null {
  if (seconds === null || seconds <= 0) return null;
  const totalMinutes = Math.max(1, Math.round(seconds / 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes} min`;
  return `${hours} h ${String(minutes).padStart(2, "0")} min`;
}

/**
 * Estado de aprendizaje del alumno en una formación.
 * "untracked": no existe seguimiento de progreso → no se afirma nada.
 */
export type LearningState = "untracked" | "not_started" | "in_progress" | "completed";

export const LEARNING_STATE_LABEL: Record<Exclude<LearningState, "untracked">, string> = {
  not_started: "No iniciada",
  in_progress: "En curso",
  completed: "Completada",
};

export type ProgressSummary = { completed: number; total: number; percent: number };

/** Lecciones completadas / totales, o null si no hay datos reales que mostrar. */
export function getProgressSummary(course: Course, progress: CourseProgress): ProgressSummary | null {
  if (!progress.tracking || course.status !== "available") return null;
  const lessons = flattenLessons(course);
  if (lessons.length === 0) return null;
  const done = new Set(progress.completedLessonSlugs);
  const completed = lessons.filter(({ lesson }) => done.has(lesson.slug)).length;
  return { completed, total: lessons.length, percent: Math.round((completed / lessons.length) * 100) };
}

export function getLearningState(course: Course, progress: CourseProgress): LearningState {
  const summary = getProgressSummary(course, progress);
  if (!summary) return "untracked";
  if (summary.completed === 0) return "not_started";
  return summary.completed === summary.total ? "completed" : "in_progress";
}

/**
 * Lección por la que retomar: la última abierta si se conoce; si no, la
 * primera sin completar; si no hay progreso, la primera de la formación.
 */
export function getResumeLesson(course: Course, progress: CourseProgress): LessonLocation | null {
  const lessons = flattenLessons(course);
  if (lessons.length === 0) return null;
  if (progress.tracking) {
    const last = lessons.find(({ lesson }) => lesson.slug === progress.lastLessonSlug);
    if (last && !progress.completedLessonSlugs.includes(last.lesson.slug)) return last;
    const pending = lessons.find(({ lesson }) => !progress.completedLessonSlugs.includes(lesson.slug));
    if (pending) return pending;
  }
  return lessons[0];
}

export type FeaturedMode = "continue" | "start" | "explore";

/**
 * Formación protagonista del inicio y cómo presentarla, sin fingir nada:
 * - "continue": hay progreso real y una formación en curso.
 * - "start": hay una formación publicada que el alumno aún no ha empezado.
 * - "explore": nada publicado todavía → se muestra la primera formación tal
 *   como está (en preparación), invitando solo a verla.
 */
export function pickFeaturedCourse(
  entries: { course: Course; progress: CourseProgress }[]
): { course: Course; progress: CourseProgress; mode: FeaturedMode } | null {
  const inProgress = entries.find((entry) => getLearningState(entry.course, entry.progress) === "in_progress");
  if (inProgress) return { ...inProgress, mode: "continue" };
  const startable = entries.find(
    (entry) => entry.course.status === "available" && getLearningState(entry.course, entry.progress) !== "completed"
  );
  if (startable) return { ...startable, mode: "start" };
  const first = entries.find((entry) => !entry.course.placeholder) ?? entries[0];
  return first ? { ...first, mode: "explore" } : null;
}
