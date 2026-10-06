"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AREA_NAV_ITEMS, isNavItemActive } from "./navItems";

/**
 * Barra de navegación inferior (móvil y tablet): al alcance del pulgar,
 * tres destinos con icono + texto y áreas táctiles de 56px de alto.
 * Respeta la zona segura inferior de iOS.
 */
export default function TabBarNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Área de alumnos"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-primary/10 bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-3">
        {AREA_NAV_ITEMS.map((item) => {
          const active = isNavItemActive(item, pathname);
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative flex h-14 flex-col items-center justify-center gap-1 text-[11px] font-medium tracking-wide transition-colors duration-300 before:absolute before:inset-x-6 before:top-0 before:h-0.5 before:rounded-full ${
                  active ? "text-primary before:bg-accent" : "text-ink-subtle hover:text-primary"
                }`}
              >
                <Icon size={20} strokeWidth={active ? 1.75 : 1.5} aria-hidden />
                {item.shortLabel}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
