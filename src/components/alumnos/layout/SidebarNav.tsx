"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { brandEase } from "@/lib/motion/classNames";
import { AREA_NAV_ITEMS, isNavItemActive } from "./navItems";

/**
 * Navegación lateral (escritorio). Solo texto: la jerarquía la marcan el
 * peso, el color y un filete dorado a la izquierda de la sección activa.
 */
export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Área de alumnos">
      <ul className="flex flex-col gap-1">
        {AREA_NAV_ITEMS.map((item) => {
          const active = isNavItemActive(item, pathname);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative flex items-center rounded-lg py-2.5 pl-4 pr-3 text-[15px] transition-colors duration-300 ${brandEase} before:absolute before:inset-y-2 before:left-0 before:w-0.5 before:rounded-full before:transition-colors before:duration-300 ${
                  active
                    ? "font-semibold text-primary before:bg-accent"
                    : "font-medium text-ink-muted before:bg-transparent hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
