/**
 * Curva de easing de marca en formato Tailwind arbitrario — la misma que
 * `easeOut` en motion/tokens.ts (ahí en formato Anime.js). Se repite aquí
 * porque las transiciones CSS (hover) y las animadas por Anime.js (reveals,
 * entrada del Hero) son dos mecanismos distintos, pero deben sentirse como
 * el mismo movimiento en toda la web.
 */
export const brandEase = "ease-[cubic-bezier(0.23,1,0.32,1)]";

/**
 * Clases de hover compartidas por las tarjetas del sitio — un solo lugar
 * para la "firma" de microinteracción de marca (elevación mínima, borde
 * dorado sutil, sombra) en vez de repetirla en cada tarjeta.
 * Propiedades nombradas explícitamente (nunca "transition-all"): solo las
 * que de verdad cambian en hover.
 */
export const cardHover =
  `transition-[transform,border-color,box-shadow] duration-300 ${brandEase} hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_20px_45px_rgba(15,45,82,0.1)]`;

export const cardHoverDark =
  `transition-[transform,border-color,background-color] duration-300 ${brandEase} hover:-translate-y-1 hover:border-accent/30 hover:bg-white/[0.08]`;

/** Para la imagen dentro de una tarjeta con className="group": escala mínima, nunca agresiva. */
export const cardImageHover = `transition-transform duration-500 ${brandEase} group-hover:scale-[1.03]`;
