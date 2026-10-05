export type NavItem = {
  label: string;
  href: string;
};

/**
 * Fuente única de verdad para el menú principal.
 * Header y Footer consumen esta misma lista para no duplicar rutas.
 *
 * Navegación de 6 ítems (evolución "academia premium"): Cursos, Tratamientos,
 * Libros, Blog y Contacto dejan de ser ítems de primer nivel, pero sus
 * páginas siguen existiendo y son accesibles desde la propia Home y desde
 * los CTA internos — ver docs del cambio en el plan de implementación.
 */
export const NAV_ITEMS: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Academia", href: "/academia" },
  { label: "Métodos", href: "/metodo-psai-flow" },
  { label: "Consultas", href: "/consultas" },
  { label: "Sobre nosotros", href: "/academia#solimar-rengel" },
  { label: "Recursos", href: "/libros" },
];

export const LEGAL_ITEMS: NavItem[] = [
  { label: "Aviso legal", href: "/legal/aviso-legal" },
  { label: "Política de privacidad", href: "/legal/privacidad" },
  { label: "Política de cookies", href: "/legal/cookies" },
];
