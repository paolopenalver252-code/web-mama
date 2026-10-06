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
 * Política de contraseñas compartida por cliente y servidor. Sigue la guía
 * NIST SP 800-63B: longitud mínima generosa y sin reglas de composición
 * obligatorias (mayúsculas, símbolos…), que empeoran la seguridad real.
 */
export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_MAX_LENGTH = 128;
