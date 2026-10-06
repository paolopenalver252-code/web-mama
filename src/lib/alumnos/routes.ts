/**
 * Rutas del Área de Alumnos — único origen de verdad para todas las URLs
 * privadas. Ningún componente debe escribir "/alumnos/..." a mano: si la
 * estructura cambia, solo se toca este archivo.
 */
export const ALUMNOS_BASE_PATH = "/alumnos";

export const alumnosRoutes = {
  login: `${ALUMNOS_BASE_PATH}/acceso`,
  dashboard: ALUMNOS_BASE_PATH,
  courses: `${ALUMNOS_BASE_PATH}/formaciones`,
  course: (courseSlug: string) => `${ALUMNOS_BASE_PATH}/formaciones/${courseSlug}`,
  lesson: (courseSlug: string, lessonSlug: string) =>
    `${ALUMNOS_BASE_PATH}/formaciones/${courseSlug}/${lessonSlug}`,
  account: `${ALUMNOS_BASE_PATH}/cuenta`,
  // Preparada para la recuperación de contraseña (ver PASSWORD_RECOVERY_ENABLED
  // en ./config.ts). La página todavía no existe: no se enlaza hasta entonces.
  passwordRecovery: `${ALUMNOS_BASE_PATH}/recuperar-contrasena`,
} as const;

/** true para cualquier URL del Área de Alumnos (incluida la pantalla de acceso). */
export function isAlumnosPath(pathname: string): boolean {
  return pathname === ALUMNOS_BASE_PATH || pathname.startsWith(`${ALUMNOS_BASE_PATH}/`);
}
