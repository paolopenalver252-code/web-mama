import "server-only";
import { createServerClient } from "@supabase/ssr";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { getSupabaseConfig, SESSION_COOKIE_OPTIONS } from "./config";

/**
 * Cliente de Supabase ligado a las cookies de la petición actual (Server
 * Components, Server Actions). null si Supabase no está configurado.
 */
export async function createSupabaseServerClient(): Promise<SupabaseClient | null> {
  const config = getSupabaseConfig();
  if (!config) return null;

  const cookieStore = await cookies();

  return createServerClient(config.url, config.publishableKey, {
    cookieOptions: SESSION_COOKIE_OPTIONS,
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) cookieStore.set(name, value, options);
        } catch {
          // Los Server Components no pueden escribir cookies. No pasa nada:
          // el proxy (src/proxy.ts) ya renueva la sesión antes de renderizar.
        }
      },
    },
  });
}

/**
 * Cliente sin cookies ni sesión persistente. Solo para comprobar la
 * contraseña actual antes de cambiarla, sin tocar la sesión del navegador.
 */
export function createSupabaseStatelessClient(): SupabaseClient | null {
  const config = getSupabaseConfig();
  if (!config) return null;
  return createClient(config.url, config.publishableKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}
