/**
 * Sesión del Área de Alumnos.
 *
 * - "student": sesión real de Supabase Auth, verificada con su servidor en
 *   cada petición (ver server/auth-provider.ts).
 * - "preview": vista previa de desarrollo para revisar la interfaz en local
 *   sin iniciar sesión. No representa a ninguna persona ni da acceso a datos
 *   reales, y nunca existe en un build de producción (ver server/preview.ts).
 */
export type StudentSession =
  | { kind: "student"; studentId: string; email: string }
  | { kind: "preview" };

/**
 * Datos personales del alumno. El correo viene de su cuenta de Supabase
 * Auth; el resto vendrá de la tabla `students` (ver server/student-store.ts)
 * y vale null mientras no exista. Nunca se rellenan con datos inventados.
 */
export type StudentProfile = {
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
};
