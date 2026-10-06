/**
 * Interruptores de funcionalidades del Área de Alumnos que todavía no
 * existen. Se activan aquí, en un solo sitio, el día que su backend esté
 * listo — la interfaz ya sabe mostrarlas u ocultarlas.
 */

/**
 * Enlace "¿Has olvidado tu contraseña?" en la pantalla de acceso. Requiere
 * un flujo real (token de un solo uso con caducidad, enviado por email),
 * así que permanece apagado: nunca se muestra un enlace que no funciona.
 */
export const PASSWORD_RECOVERY_ENABLED = false;

/**
 * Qué formaciones ve cada alumno con sesión iniciada:
 * - "all-students": todas las del catálogo. Modo provisional mientras no
 *   existan matrículas reales y el contenido sean solo marcadores.
 * - "enrollments": solo aquellas en las que esté matriculado (tabla
 *   `enrollments`). OBLIGATORIO antes de publicar contenido real.
 */
export const COURSE_ACCESS_MODE: "all-students" | "enrollments" = "all-students";

/**
 * Política de contraseñas compartida por cliente y servidor. Sigue la guía
 * NIST SP 800-63B: longitud mínima generosa y sin reglas de composición
 * obligatorias (mayúsculas, símbolos…), que empeoran la seguridad real.
 */
export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_MAX_LENGTH = 128;
