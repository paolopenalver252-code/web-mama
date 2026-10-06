import type { ReactNode } from "react";
import CampusBrand from "./CampusBrand";
import CampusSidebar, { type SidebarAccount, type SidebarCourse } from "./CampusSidebar";
import MobileNavigation from "./MobileNavigation";
import PreviewBanner from "./PreviewBanner";
import SignOutButton from "./SignOutButton";

type CampusShellProps = {
  children: ReactNode;
  preview: boolean;
  courses: SidebarCourse[];
  account: SidebarAccount;
};

/**
 * Estructura del campus:
 * - Escritorio (≥1024px): barra lateral fija + lienzo de contenido.
 * - Móvil y tablet: cabecera compacta (marca + cerrar sesión) y navegación
 *   inferior; en las lecciones, barra propia de la lección.
 * Cada página decide su anchura de lectura; el armazón solo da márgenes.
 */
export default function CampusShell({ children, preview, courses, account }: CampusShellProps) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col lg:flex-row">
      <a
        href="#contenido"
        className="sr-only z-[60] rounded-full bg-campus-ink px-5 py-3 text-sm font-medium text-campus-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>

      <CampusSidebar courses={courses} account={account} />

      <div className="flex min-w-0 flex-1 flex-col">
        {preview ? <PreviewBanner /> : null}

        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-campus-line bg-campus-bg/90 px-4 backdrop-blur-md sm:px-8 lg:hidden">
          <CampusBrand />
          <SignOutButton variant="icon" />
        </header>

        <main
          id="contenido"
          tabIndex={-1}
          className="min-w-0 flex-1 px-4 pb-[calc(7rem+env(safe-area-inset-bottom))] pt-7 outline-none sm:px-8 sm:pt-10 lg:px-10 lg:pb-20 lg:pt-12 xl:px-14"
        >
          {children}
        </main>
      </div>

      <MobileNavigation />
    </div>
  );
}
