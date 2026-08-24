/**
 * Comprobaciones de entorno compartidas por todo el sistema de motion.
 * Centralizadas aquí para no repetir `window.matchMedia(...)` en cada
 * componente (antes duplicado en Parallax.tsx y CountUp.tsx).
 */

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Viewport compacto (móvil): las animaciones deben viajar menos distancia y con menos solapamiento. */
export function isCompactViewport(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches;
}
