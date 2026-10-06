import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AreaBrand from "./AreaBrand";
import PreviewBanner from "./PreviewBanner";
import SidebarNav from "./SidebarNav";
import SignOutButton from "./SignOutButton";
import TabBarNav from "./TabBarNav";

type AreaShellProps = {
  children: ReactNode;
  preview: boolean;
};

/**
 * Estructura del Área de Alumnos:
 * - Escritorio (≥1024px): barra lateral fija con marca, navegación, "Volver
 *   a la web" y "Cerrar sesión"; contenido a la derecha.
 * - Móvil y tablet: cabecera compacta (marca + Salir) y barra de
 *   navegación inferior, al alcance del pulgar.
 */
export default function AreaShell({ children, preview }: AreaShellProps) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col bg-surface lg:flex-row">
      <a
        href="#contenido"
        className="sr-only z-[60] rounded-full bg-primary px-5 py-3 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>

      {/* Columna a toda la altura (fondo + filete) con el panel fijo dentro,
          para que el fondo no se corte en páginas largas. */}
      <div className="hidden shrink-0 border-r border-primary/10 bg-surface-alt lg:block lg:w-64 xl:w-72">
        <aside className="sticky top-0 flex h-dvh flex-col px-5 py-8 xl:px-7">
          <div className="px-1">
            <AreaBrand />
          </div>
          <div className="mt-12">
            <SidebarNav />
          </div>
          <div className="mt-auto flex flex-col gap-1 border-t border-primary/10 pt-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg py-2.5 pl-4 pr-3 text-sm text-ink-subtle transition-colors duration-300 hover:text-primary"
            >
              <ArrowLeft size={16} strokeWidth={1.5} aria-hidden />
              Volver a la web
            </Link>
            <SignOutButton />
          </div>
        </aside>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        {preview ? <PreviewBanner /> : null}

        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-primary/10 bg-surface/95 px-5 backdrop-blur-md sm:px-8 lg:hidden">
          <AreaBrand />
          <SignOutButton variant="compact" />
        </header>

        <main
          id="contenido"
          tabIndex={-1}
          className="flex-1 px-5 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-8 outline-none sm:px-8 sm:pt-12 lg:px-12 lg:pb-20 lg:pt-14 xl:px-16"
        >
          <div className="mx-auto w-full max-w-4xl">{children}</div>
        </main>
      </div>

      <TabBarNav />
    </div>
  );
}
