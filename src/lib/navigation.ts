export type NavItem = {
  label: string;
  href: string;
};

/**
 * Fuente única de verdad para el menú principal.
 * Header y Footer consumen esta misma lista para no duplicar rutas.
 */
export const NAV_ITEMS: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Método PSAI FLOW", href: "/metodo-psai-flow" },
  { label: "La Academia", href: "/academia" },
  { label: "Cursos", href: "/cursos" },
  { label: "Consultas", href: "/consultas" },
  { label: "Limpieza Energética", href: "/limpieza-energetica-proteccion" },
  { label: "Libros", href: "/libros" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
];

export const LEGAL_ITEMS: NavItem[] = [
  { label: "Aviso legal", href: "/legal/aviso-legal" },
  { label: "Política de privacidad", href: "/legal/privacidad" },
  { label: "Política de cookies", href: "/legal/cookies" },
];
