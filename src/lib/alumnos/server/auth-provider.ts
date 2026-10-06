import "server-only";
import type { StudentSession } from "../types";

/**
 * Contrato que debe cumplir el sistema de autenticación real del Área de
 * Alumnos. Toda la aplicación (DAL, Server Actions) habla solo con esta
 * interfaz: conectar un proveedor consiste en implementarla y sustituir
 * `authProvider` al final de este archivo, sin tocar páginas ni componentes.
 *
 * Requisitos de cualquier implementación real:
 * - Contraseñas almacenadas solo como hash lento con sal (Argon2id o bcrypt),
 *   nunca en texto plano ni en el frontend.
 * - Sesión en cookie HttpOnly + Secure + SameSite=Lax, firmada o respaldada
 *   por una tabla de sesiones revocables, con caducidad.
 * - Límite de intentos de acceso por IP y por cuenta.
 * - Mensaje de error idéntico para "no existe el correo" y "contraseña
 *   incorrecta" (no revelar qué cuentas existen).
 * - Al cambiar la contraseña: verificar la actual e invalidar el resto de
 *   sesiones abiertas.
 */

export type SignInFailure = "invalid_credentials" | "rate_limited" | "not_configured";

export type SignInResult = { ok: true; session: StudentSession } | { ok: false; reason: SignInFailure };

export type ChangePasswordFailure = "invalid_current_password" | "rate_limited" | "not_configured";

export type ChangePasswordResult = { ok: true } | { ok: false; reason: ChangePasswordFailure };

export interface StudentAuthProvider {
  /** false mientras no haya un sistema de autenticación real conectado. */
  readonly configured: boolean;
  /** Lee y verifica la sesión de la petición actual (cookie). */
  getSession(): Promise<StudentSession | null>;
  signInWithPassword(credentials: { email: string; password: string }): Promise<SignInResult>;
  signOut(): Promise<void>;
  changePassword(
    session: Extract<StudentSession, { kind: "student" }>,
    input: { currentPassword: string; newPassword: string }
  ): Promise<ChangePasswordResult>;
}

/**
 * Implementación honesta mientras no exista backend: no hay ninguna sesión
 * válida, ningún acceso tiene éxito y ningún cambio de contraseña se
 * realiza. No acepta credenciales "de prueba" ni guarda nada.
 */
const notConfiguredProvider: StudentAuthProvider = {
  configured: false,
  async getSession() {
    return null;
  },
  async signInWithPassword() {
    return { ok: false, reason: "not_configured" };
  },
  async signOut() {
    // Sin sesiones reales no hay nada que invalidar.
  },
  async changePassword() {
    return { ok: false, reason: "not_configured" };
  },
};

export const authProvider: StudentAuthProvider = notConfiguredProvider;
