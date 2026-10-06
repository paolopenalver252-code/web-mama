import "server-only";
import { cache } from "react";
import { connection } from "next/server";
import { notFound, redirect } from "next/navigation";
import { STUDENT_COURSES } from "../catalog/courses";
import type { Course, CourseProgress } from "../catalog/types";
import { COURSE_ACCESS_MODE } from "../config";
import { alumnosRoutes } from "../routes";
import type { StudentProfile, StudentSession } from "../types";
import { getAuthProvider } from "./auth-provider";
import { isPreviewMode } from "./preview";
import { studentStore } from "./student-store";

/**
 * Capa de acceso a datos (DAL) del Área de Alumnos — el ÚNICO camino para
 * leer la sesión y cualquier dato privado. Sigue la guía de autenticación
 * de Next.js: la comprobación vive junto a los datos, no solo en el layout
 * (que no se vuelve a renderizar en cada navegación), así que cada página
 * privada, cada metadato y cada Server Action llama aquí por su cuenta.
 *
 * `import "server-only"` hace que importar este archivo desde un Client
 * Component rompa el build: nada de esto puede llegar al navegador.
 */

/**
 * Sesión de la petición actual (memorizada durante un mismo render).
 * Primero la sesión real de Supabase; la vista previa de desarrollo solo
 * entra si no hay sesión real, y nunca en producción.
 */
export const getSession = cache(async (): Promise<StudentSession | null> => {
  // Las páginas privadas siempre se renderizan por petición, nunca se
  // pre-generan en el build con el resultado de una comprobación de sesión.
  await connection();
  const session = await getAuthProvider().getSession();
  if (session) return session;
  if (isPreviewMode()) return { kind: "preview" };
  return null;
});

/** Exige sesión: sin ella, redirige a la pantalla de acceso. */
export async function requireSession(): Promise<StudentSession> {
  const session = await getSession();
  if (!session) redirect(alumnosRoutes.login);
  return session;
}

export const getStudentProfile = cache(async (session: StudentSession): Promise<StudentProfile | null> => {
  if (session.kind === "preview") return null;
  const stored = await studentStore.getProfileData(session.studentId);
  return {
    email: session.email,
    firstName: stored?.firstName ?? null,
    lastName: stored?.lastName ?? null,
    phone: stored?.phone ?? null,
  };
});

/** Formaciones a las que el alumno de la sesión tiene acceso (autorización por alumno). */
export const getAccessibleCourses = cache(async (session: StudentSession): Promise<Course[]> => {
  // La vista previa de desarrollo muestra el catálogo completo para poder
  // revisar todas las pantallas; no existe en producción.
  if (session.kind === "preview" || COURSE_ACCESS_MODE === "all-students") return STUDENT_COURSES;
  const enrolled = new Set(await studentStore.getEnrolledCourseSlugs(session.studentId));
  return STUDENT_COURSES.filter((course) => enrolled.has(course.slug));
});

/**
 * Devuelve la formación solo si el alumno tiene acceso. Una formación que
 * no existe y una a la que no tiene acceso responden igual (404): cambiar
 * la URL no revela qué formaciones existen ni da acceso a ellas.
 */
export async function requireCourse(session: StudentSession, courseSlug: string): Promise<Course> {
  const courses = await getAccessibleCourses(session);
  const course = courses.find((item) => item.slug === courseSlug);
  if (!course) notFound();
  return course;
}

export async function getCourseProgress(session: StudentSession, courseSlug: string): Promise<CourseProgress> {
  // Sin almacenamiento de progreso (ni en la vista previa) no se muestra ninguno.
  if (session.kind === "preview") return { tracking: false };
  return studentStore.getCourseProgress(session.studentId, courseSlug);
}

/** Formaciones accesibles junto con el progreso del alumno en cada una. */
export const getCoursesWithProgress = cache(
  async (session: StudentSession): Promise<{ course: Course; progress: CourseProgress }[]> => {
    const courses = await getAccessibleCourses(session);
    return Promise.all(
      courses.map(async (course) => ({ course, progress: await getCourseProgress(session, course.slug) }))
    );
  }
);

/** true si hay un sistema de autenticación real configurado. */
export function isAuthConfigured(): boolean {
  return getAuthProvider().configured;
}
