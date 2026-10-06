import type { Metadata } from "next";
import { Geist_Mono, Instrument_Sans } from "next/font/google";

/**
 * Raíz del campus de alumnos (/alumnos/*). Nada de aquí se indexa: además de
 * `noindex`, robots.ts excluye la ruta completa.
 *
 * El campus tiene su propio sistema visual (tokens `campus-*` en
 * globals.css) y sus propias fuentes, que solo se descargan en estas rutas:
 * - Instrument Sans: interfaz (legible, contemporánea).
 * - Geist Mono: índices, metadatos y progreso.
 * Cormorant Garamond (ya cargada en el layout raíz) queda para momentos de
 * marca: bienvenida y títulos de formación.
 *
 * La protección de acceso NO vive aquí (ver app/alumnos/(area)/layout.tsx y
 * lib/alumnos/server/dal.ts): la pantalla de acceso también cuelga de esta
 * carpeta y debe ser pública.
 */
const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s · Campus | PSAI FLOW ACADEMY",
    default: "Campus | PSAI FLOW ACADEMY",
  },
  robots: { index: false, follow: false },
};

export default function AlumnosLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`campus ${instrumentSans.variable} ${geistMono.variable} flex min-h-dvh flex-1 flex-col bg-campus-bg font-campus text-[15px] text-campus-ink antialiased`}
    >
      {children}
    </div>
  );
}
