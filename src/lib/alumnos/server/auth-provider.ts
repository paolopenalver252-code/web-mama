import "server-only";
import { isAuthApiError, type AuthError } from "@supabase/supabase-js";
import { getSupabaseConfig } from "../supabase/config";
import { createSupabaseServerClient, createSupabaseStatelessClient } from "../supabase/server";
import type { StudentSession } from "../types";

/**
 * Contrato del sistema de autenticación del Área de Alumnos. Toda la
 * aplicación (DAL, Server Actions) habla solo con esta interfaz.
 *
 * Implementación actual: Supabase Auth. Las contraseñas las guarda y
 * verifica Supabase (hash bcrypt en auth.users); esta aplicación nunca las
 * almacena, ni las registra en logs, ni las devuelve al navegador.
 */

export type SignInFailure = "invalid_credentials" | "rate_limited" | "not_configured" | "unavailable";

export type SignInResult = { ok: true } | { ok: false; reason: SignInFailure };

export type ChangePasswordFailure =
  | "invalid_current_password"
  | "same_password"
  | "weak_password"
  | "reauthentication_needed"
  | "rate_limited"
  | "not_configured"
  | "unavailable";

export type ChangePasswordResult = { ok: true } | { ok: false; reason: ChangePasswordFailure };

type StudentAccount = Extract<StudentSession, { kind: "student" }>;

export interface StudentAuthProvider {
  /** false mientras no haya un sistema de autenticación real configurado. */
  readonly configured: boolean;
  /** Lee la sesión de la petición actual y la VERIFICA con el servidor de Auth. */
  getSession(): Promise<StudentAccount | null>;
  signInWithPassword(credentials: { email: string; password: string }): Promise<SignInResult>;
  signOut(): Promise<void>;
  changePassword(
    session: StudentAccount,
    input: { currentPassword: string; newPassword: string }
  ): Promise<ChangePasswordResult>;
}

function isRateLimited(error: AuthError): boolean {
  return error.status === 429 || error.code === "over_request_rate_limit";
}

/** Sin variables de entorno de Supabase: nadie puede entrar y nada se guarda. */
const notConfiguredProvider: StudentAuthProvider = {
  configured: false,
  async getSession() {
    return null;
  },
  async signInWithPassword() {
    return { ok: false, reason: "not_configured" };
  },
  async signOut() {},
  async changePassword() {
    return { ok: false, reason: "not_configured" };
  },
};

const supabaseProvider: StudentAuthProvider = {
  configured: true,

  async getSession() {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return null;
    // getUser() valida el token contra el servidor de Supabase Auth en cada
    // petición (detecta sesiones revocadas o usuarios borrados). Nunca se
    // confía en el contenido de la cookie sin verificar (getSession()).
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user?.email) return null;
    return { kind: "student", studentId: data.user.id, email: data.user.email };
  },

  async signInWithPassword({ email, password }) {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return { ok: false, reason: "not_configured" };

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) return { ok: true };
    if (isRateLimited(error)) return { ok: false, reason: "rate_limited" };
    // Correo inexistente, contraseña incorrecta o correo sin confirmar
    // responden igual: no se revela qué cuentas existen.
    if (isAuthApiError(error) && error.status >= 400 && error.status < 500) {
      return { ok: false, reason: "invalid_credentials" };
    }
    return { ok: false, reason: "unavailable" };
  },

  async signOut() {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return;
    // "local": revoca SOLO esta sesión (refresh token) en Supabase y borra
    // las cookies. Las sesiones en otros dispositivos siguen abiertas.
    await supabase.auth.signOut({ scope: "local" });
  },

  async changePassword(session, { currentPassword, newPassword }) {
    const supabase = await createSupabaseServerClient();
    const verifier = createSupabaseStatelessClient();
    if (!supabase || !verifier) return { ok: false, reason: "not_configured" };

    // 1. Verificar la contraseña actual con un cliente aparte (sin cookies),
    //    para no tocar la sesión del navegador. Esa sesión de comprobación se
    //    revoca justo después.
    const verification = await verifier.auth.signInWithPassword({ email: session.email, password: currentPassword });
    if (verification.error) {
      if (isRateLimited(verification.error)) return { ok: false, reason: "rate_limited" };
      if (isAuthApiError(verification.error) && verification.error.status < 500) {
        return { ok: false, reason: "invalid_current_password" };
      }
      return { ok: false, reason: "unavailable" };
    }
    await verifier.auth.signOut({ scope: "local" });

    // 2. Cambiar la contraseña con la sesión del propio alumno.
    //    `current_password` solo lo usa Supabase si se activa "Require
    //    current password when updating"; si no, se ignora.
    const { error } = await supabase.auth.updateUser({ password: newPassword, current_password: currentPassword });
    if (error) {
      if (isRateLimited(error)) return { ok: false, reason: "rate_limited" };
      if (error.code === "same_password") return { ok: false, reason: "same_password" };
      if (error.code === "weak_password") return { ok: false, reason: "weak_password" };
      if (error.code === "reauthentication_needed") return { ok: false, reason: "reauthentication_needed" };
      return { ok: false, reason: "unavailable" };
    }

    // 3. Cerrar el resto de sesiones abiertas (otros dispositivos).
    await supabase.auth.signOut({ scope: "others" });
    return { ok: true };
  },
};

/** Proveedor activo: Supabase si está configurado; si no, "no configurado". */
export function getAuthProvider(): StudentAuthProvider {
  return getSupabaseConfig() ? supabaseProvider : notConfiguredProvider;
}
