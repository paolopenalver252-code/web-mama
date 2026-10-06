import "server-only";
import type { CourseProgress } from "../catalog/types";
import type { StudentProfile } from "../types";

/**
 * Acceso a los datos de cada alumno (perfil, matrículas, progreso). Igual
 * que con la autenticación, la aplicación solo conoce esta interfaz; la
 * implementación real leerá de la base de datos.
 *
 * Tablas mínimas previstas: students (perfil), enrollments (alumno ↔
 * formación, con fechas de alta/caducidad) y lesson_progress (alumno ↔
 * lección, con fecha de completado).
 */
export interface StudentStore {
  readonly configured: boolean;
  getProfile(studentId: string): Promise<StudentProfile | null>;
  /** Slugs de las formaciones a las que el alumno tiene acceso. */
  getEnrolledCourseSlugs(studentId: string): Promise<string[]>;
  getCourseProgress(studentId: string, courseSlug: string): Promise<CourseProgress>;
}

/**
 * Sin base de datos: no hay perfiles, ni matrículas, ni progreso. Devuelve
 * vacío en lugar de datos inventados, y la interfaz lo muestra como tal.
 */
const notConfiguredStore: StudentStore = {
  configured: false,
  async getProfile() {
    return null;
  },
  async getEnrolledCourseSlugs() {
    return [];
  },
  async getCourseProgress() {
    return { tracking: false };
  },
};

export const studentStore: StudentStore = notConfiguredStore;
