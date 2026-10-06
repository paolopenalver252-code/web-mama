"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { isAlumnosPath } from "@/lib/alumnos/routes";

type SiteChromeProps = {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

/**
 * Header + <main> + Footer de la web pública. El Área de Alumnos tiene su
 * propia estructura (barra lateral / navegación inferior), así que en sus
 * rutas se omiten. Así la web pública queda exactamente igual sin tener
 * que mover todas sus carpetas a un grupo de rutas.
 */
export default function SiteChrome({ header, footer, children }: SiteChromeProps) {
  const pathname = usePathname();
  if (isAlumnosPath(pathname)) return children;

  return (
    <>
      {header}
      <main className="flex-1">{children}</main>
      {footer}
    </>
  );
}
