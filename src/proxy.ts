import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseConfig, SESSION_COOKIE_OPTIONS } from "@/lib/alumnos/supabase/config";

/**
 * Proxy del Área de Alumnos: antes de cada petición a /alumnos/*, renueva la
 * sesión de Supabase si el token de acceso ha caducado y reescribe las
 * cookies en la respuesta (los Server Components no pueden escribirlas).
 *
 * NO es la protección de las rutas: esa vive en la DAL
 * (lib/alumnos/server/dal.ts), que verifica la sesión contra Supabase en
 * cada página y acción. Solo corre en /alumnos: la web pública no se toca.
 */
export async function proxy(request: NextRequest) {
  const config = getSupabaseConfig();
  if (!config) return NextResponse.next();

  let response = NextResponse.next({ request });

  const supabase = createServerClient(config.url, config.publishableKey, {
    cookieOptions: SESSION_COOKIE_OPTIONS,
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        for (const { name, value } of cookiesToSet) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) response.cookies.set(name, value, options);
        // Cabeceras anti-caché que indica Supabase al renovar la sesión.
        for (const [key, value] of Object.entries(headers ?? {})) response.headers.set(key, value);
      },
    },
  });

  // Dispara la renovación del token si hace falta. No decide el acceso.
  await supabase.auth.getClaims();

  return response;
}

export const config = {
  matcher: ["/alumnos", "/alumnos/:path*"],
};
