/**
 * Sesión del Área de Alumnos.
 *
 * - "student": sesión real, emitida y verificada por el proveedor de
 *   autenticación (hoy no existe ninguno conectado, ver server/auth-provider.ts).
 * - "preview": vista previa de desarrollo para revisar la interfaz en local.
 *   No representa a ninguna persona ni da acceso a datos reales, y nunca
 *   existe en un build de producción (ver server/preview.ts).
 */
export type StudentSession =
  | { kind: "student"; studentId: string; email: string }
  | { kind: "preview" };

/** Datos personales del alumno, tal como los devuelva la base de datos. */
export type StudentProfile = {
  firstName: string;
  lastName: string;
  email: string;
};
