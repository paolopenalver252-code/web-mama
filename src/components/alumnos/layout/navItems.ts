import { BookOpen, House, UserRound, type LucideIcon } from "lucide-react";
import { alumnosRoutes } from "@/lib/alumnos/routes";

export type AreaNavItem = {
  label: string;
  /** Etiqueta corta para la barra inferior móvil. */
  shortLabel: string;
  href: string;
  icon: LucideIcon;
  /** Activo también en sus subrutas (p. ej. una formación dentro de "Mis formaciones"). */
  matchNested: boolean;
};

/** Navegación principal del Área de Alumnos — ampliable añadiendo entradas aquí. */
export const AREA_NAV_ITEMS: AreaNavItem[] = [
  { label: "Inicio", shortLabel: "Inicio", href: alumnosRoutes.dashboard, icon: House, matchNested: false },
  { label: "Mis formaciones", shortLabel: "Formaciones", href: alumnosRoutes.courses, icon: BookOpen, matchNested: true },
  { label: "Mi cuenta", shortLabel: "Cuenta", href: alumnosRoutes.account, icon: UserRound, matchNested: true },
];

export function isNavItemActive(item: AreaNavItem, pathname: string): boolean {
  if (pathname === item.href) return true;
  return item.matchNested && pathname.startsWith(`${item.href}/`);
}
