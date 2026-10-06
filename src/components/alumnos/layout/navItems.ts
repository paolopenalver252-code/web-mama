import { House, Library, UserRound, type LucideIcon } from "lucide-react";
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

/**
 * Navegación principal del campus. Solo secciones con utilidad real hoy;
 * "Progreso", "Recursos" o "Certificados" se añaden aquí cuando existan.
 */
export const AREA_NAV_ITEMS: AreaNavItem[] = [
  { label: "Inicio", shortLabel: "Inicio", href: alumnosRoutes.dashboard, icon: House, matchNested: false },
  { label: "Mis formaciones", shortLabel: "Formaciones", href: alumnosRoutes.courses, icon: Library, matchNested: true },
  { label: "Mi cuenta", shortLabel: "Cuenta", href: alumnosRoutes.account, icon: UserRound, matchNested: true },
];

export function isNavItemActive(item: AreaNavItem, pathname: string): boolean {
  if (pathname === item.href) return true;
  return item.matchNested && pathname.startsWith(`${item.href}/`);
}

/** /alumnos/formaciones/[curso]/[leccion] — modo aprendizaje (navegación propia en móvil). */
export function isLessonPath(pathname: string): boolean {
  return pathname.startsWith(`${alumnosRoutes.courses}/`) && pathname.split("/").filter(Boolean).length === 4;
}
