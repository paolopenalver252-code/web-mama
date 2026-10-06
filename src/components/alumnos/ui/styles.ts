/**
 * Piezas de estilo compartidas por todo el campus. Un solo origen para que
 * botones, etiquetas y paneles se comporten igual en todas las pantallas.
 */

const ease = "ease-[cubic-bezier(0.23,1,0.32,1)]";

/** Etiqueta técnica en monoespaciada (índices, metadatos, secciones). */
export const monoLabel = "font-campus-mono text-[11px] font-medium uppercase tracking-[0.16em]";

export const buttonStyles = {
  /** Acción principal: marfil sobre obsidiana, máximo contraste. */
  primary: `inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-campus-ink px-6 text-[15px] font-medium text-campus-bg transition-[background-color,scale] duration-300 ${ease} hover:bg-white active:scale-[0.98] disabled:cursor-wait disabled:opacity-70 disabled:hover:bg-campus-ink`,
  /** Acción secundaria: contorno fino. */
  secondary: `inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-campus-line-strong px-6 text-[15px] font-medium text-campus-ink transition-[background-color,border-color] duration-300 ${ease} hover:border-campus-ink/35 hover:bg-campus-raised`,
  /** Enlace de texto con flecha. */
  text: `inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-campus-muted transition-colors duration-300 hover:text-campus-ink`,
};

/** Panel de superficie elevada (cuenta, índice de lección…). */
export const panel = "rounded-2xl border border-campus-line bg-campus-surface";

export const easeClass = ease;
