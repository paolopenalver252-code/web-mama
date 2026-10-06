import type { Course, CourseModule, CourseStatus, Lesson } from "./types";

/** Utilidades puras sobre el catálogo (sin acceso a datos ni a la sesión). */

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

/** "12 min", "1 h 05 min" — o null si la duración no se conoce. */
export function formatDuration(seconds: number | null): string | null {
  if (seconds === null || seconds <= 0) return null;
  const totalMinutes = Math.max(1, Math.round(seconds / 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes} min`;
  return `${hours} h ${String(minutes).padStart(2, "0")} min`;
}
