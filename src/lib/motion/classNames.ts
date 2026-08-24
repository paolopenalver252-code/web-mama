/**
 * Clases de hover compartidas por las tarjetas del sitio — un solo lugar
 * para la "firma" de microinteracción de marca (elevación mínima, borde
 * dorado sutil, sombra) en vez de repetirla en cada tarjeta.
 */
export const cardHover =
  "transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_20px_45px_rgba(15,45,82,0.1)]";

export const cardHoverDark =
  "transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-white/[0.08]";

/** Para la imagen dentro de una tarjeta con className="group": escala mínima, nunca agresiva. */
export const cardImageHover = "transition-transform duration-500 group-hover:scale-[1.03]";
