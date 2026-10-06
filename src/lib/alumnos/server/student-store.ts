import "server-only";
import type { CourseProgress } from "../catalog/types";
import type { StudentProfile } from "../types";

/**
 * Datos académicos y personales de cada alumno (más allá de su cuenta de
 * acceso, que gestiona Supabase Auth). La aplicación solo conoce esta
 * interfaz; la implementación real leerá de Supabase con el cliente de la
 * sesión del alumno, protegida por políticas RLS (cada alumno solo puede
 * leer sus propias filas).
 *
 * Tablas previstas (fase siguiente):
 * - students: id (= auth.users.id), first_name, last_name, phone…
 * - enrollments: student_id ↔ course_slug, con fechas de alta/caducidad.
 * - lesson_progress: student_id ↔ lección, con fecha de completado.
 */
export type StoredStudentData = Omit<StudentProfile, "email">;

export interface StudentStore {
  readonly configured: boolean;
  getProfileData(studentId: string): Promise<StoredStudentData | null>;
  /** Slugs de las formaciones a las que el alumno tiene acceso. */
  getEnrolledCourseSlugs(studentId: string): Promise<string[]>;
  getCourseProgress(studentId: string, courseSlug: string): Promise<CourseProgress>;
}

/**
 * Sin tablas todavía: no hay datos personales extra, ni matrículas, ni
 * progreso. Devuelve vacío en lugar de datos inventados.
 */
const notConfiguredStore: StudentStore = {
  configured: false,
  async getProfileData() {
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
