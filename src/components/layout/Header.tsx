"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/navigation";
import Button from "@/components/ui/Button";

/**
 * Header global — fijo (sticky), fondo blanco con efecto glass y sombra
 * sutil al hacer scroll. Elemento obligatorio: no eliminar ni alterar su
 * estructura sin instrucción explícita del cliente.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Cierra el menú móvil al cambiar de página (patrón de ajuste de estado
  // durante el render, sin efecto, para evitar renders en cascada).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    if (menuOpen) setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-surface/80 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-header border-primary/5" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[90rem] items-center justify-between gap-6 px-6 lg:px-10">
        {/* Logo — wordmark de texto en tanto no se reciba el logotipo definitivo */}
        <Link
          href="/"
          className="flex shrink-0 flex-col leading-none transition-opacity duration-300 hover:opacity-75"
        >
          <span className="font-heading text-2xl text-primary">PSAI FLOW</span>
          <span className="text-[0.65rem] font-sans uppercase tracking-[0.3em] text-accent-text">
            Academy
          </span>
        </Link>

        {/* Navegación desktop — a partir de xl: por debajo, 10 ítems no caben
            con elegancia en una sola línea, así que se usa el menú hamburguesa.
            prefetch={false}: el Header está siempre en el viewport (sticky),
            así que por defecto Next.js precargaría las 10 rutas (con datos)
            en cuanto carga cualquier página — compite por ancho de banda con
            los recursos críticos del primer render. Se sigue navegando al
            instante al hacer clic, solo se evita la precarga automática. */}
        <nav aria-label="Principal" className="hidden min-w-0 flex-1 justify-center xl:flex">
          <ul className="flex items-center gap-4 2xl:gap-7">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    prefetch={false}
                    className={`relative whitespace-nowrap text-[13px] font-medium transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-accent after:transition-all after:duration-300 hover:text-accent-text hover:after:w-full ${
                      active ? "text-primary after:w-full" : "text-primary/70 after:w-0"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CTA desktop — orientado a conversión (motor comercial: servicios
            1:1), coherente con el CTA principal del Hero de la Home. Antes
            era "Contacto", genérico; ver docs/estrategia-comunicacion.md §6. */}
        <div className="hidden shrink-0 xl:block">
          <Button href="/consultas" variant="accent" size="sm">
            Reservar consulta
          </Button>
        </div>

        {/* Botón hamburguesa */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          className="relative flex h-10 w-10 shrink-0 items-center justify-center xl:hidden"
        >
          <span
            className={`absolute h-px w-6 bg-primary transition-all duration-300 ${
              menuOpen ? "rotate-45" : "-translate-y-2"
            }`}
          />
          <span
            className={`absolute h-px w-6 bg-primary transition-opacity duration-200 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-px w-6 bg-primary transition-all duration-300 ${
              menuOpen ? "-rotate-45" : "translate-y-2"
            }`}
          />
        </button>
      </div>

      {/* Panel móvil */}
      <div
        id="mobile-menu"
        className={`overflow-hidden bg-surface/95 backdrop-blur-md transition-[max-height,opacity] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] xl:hidden ${
          menuOpen ? "max-h-[36rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="Principal (móvil)" className="px-6 pb-8 pt-2">
          <ul className="flex flex-col divide-y divide-primary/10">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  prefetch={false}
                  className="block py-3 text-base font-medium text-primary transition-colors duration-300 hover:text-accent-text"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Button href="/consultas" variant="accent" size="sm" className="w-full">
              Reservar consulta
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
