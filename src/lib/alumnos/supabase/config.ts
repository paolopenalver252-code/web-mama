import type { CookieOptionsWithName } from "@supabase/ssr";
import { ALUMNOS_BASE_PATH } from "../routes";

/**
 * Configuración de Supabase Auth, leída SOLO de variables de entorno del
 * servidor (sin prefijo NEXT_PUBLIC_: nunca entran en el JavaScript del
 * navegador). Ninguna clave vive en el código.
 *
 * - SUPABASE_URL: URL del proyecto (https://<ref>.supabase.co).
 * - SUPABASE_PUBLISHABLE_KEY: clave publicable (sb_publishable_…) o, en
 *   proyectos antiguos, la "anon key". No es secreta por diseño: lo que
 *   protege los datos es la sesión del usuario y las políticas RLS.
 *
 * La clave secreta / service_role NO se usa en la web. Solo la necesita el
 * script local de creación de alumnos (scripts/crear-alumno.mjs).
 *
 * Sin estas dos variables, el Área de Alumnos se comporta como "acceso no
 * activado" (nadie puede entrar), en vez de fallar.
 */
export type SupabaseConfig = { url: string; publishableKey: string };

export function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.SUPABASE_URL?.trim();
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!url || !publishableKey) return null;
  return { url, publishableKey };
}

/**
 * Cookies de sesión:
 * - httpOnly: el JavaScript del navegador no puede leerlas (la web nunca
 *   usa el cliente de Supabase en el navegador; todo pasa por el servidor).
 * - secure en producción: solo viajan por HTTPS.
 * - sameSite "lax": no se envían en peticiones de terceros (CSRF).
 * - path /alumnos: no se envían al navegar por la web pública.
 */
export const SESSION_COOKIE_OPTIONS: CookieOptionsWithName = {
  path: ALUMNOS_BASE_PATH,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};
