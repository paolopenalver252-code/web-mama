import type { Metadata } from "next";

/**
 * Raíz del Área de Alumnos (/alumnos/*). Nada de aquí se indexa: además de
 * `noindex` en cada página, robots.ts excluye la ruta completa.
 * La protección de acceso NO vive aquí (ver app/alumnos/(area)/layout.tsx y
 * lib/alumnos/server/dal.ts): la pantalla de acceso también cuelga de esta
 * carpeta y debe ser pública.
 */
export const metadata: Metadata = {
  title: {
    template: "%s · Área de alumnos | PSAI FLOW ACADEMY",
    default: "Área de alumnos | PSAI FLOW ACADEMY",
  },
  robots: { index: false, follow: false },
};

export default function AlumnosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
