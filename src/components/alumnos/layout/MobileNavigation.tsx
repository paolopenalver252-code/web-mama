"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AREA_NAV_ITEMS, isLessonPath, isNavItemActive } from "./navItems";

/**
 * Navegación inferior del campus (móvil y tablet): tres destinos al alcance
 * del pulgar, áreas táctiles de 64px y zona segura de iOS. Dentro de una
 * lección se retira y deja paso a la barra propia de la lección
 * (anterior · índice · siguiente).
 */
export default function MobileNavigation() {
  const pathname = usePathname();
  if (isLessonPath(pathname)) return null;

  return (
    <nav
      aria-label="Campus"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-campus-line bg-campus-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
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
                className={`group flex h-16 flex-col items-center justify-center gap-1.5 text-[11px] font-medium tracking-wide transition-colors duration-300 ${
                  active ? "text-campus-ink" : "text-campus-subtle hover:text-campus-ink"
                }`}
              >
                <span
                  className={`flex h-8 w-14 items-center justify-center rounded-full transition-colors duration-300 ${
                    active ? "bg-campus-accent/15 text-campus-accent-strong" : ""
                  }`}
                >
                  <Icon size={20} strokeWidth={active ? 1.75 : 1.5} aria-hidden />
                </span>
                {item.shortLabel}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
