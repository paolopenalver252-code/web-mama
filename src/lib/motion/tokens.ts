import { cubicBezier } from "animejs";

/**
 * Tokens de motion — única fuente de verdad para curvas y duraciones.
 * Cualquier animación nueva debe consumir esto en lugar de valores sueltos.
 * Curvas alineadas con .claude/skills/animate/SKILL.md.
 */

// Ease-out fuerte: para todo lo que entra o sale de pantalla.
export const easeOut = cubicBezier(0.23, 1, 0.32, 1);
// Ease-in-out fuerte: para movimiento/morphing ya en pantalla.
export const easeInOut = cubicBezier(0.77, 0, 0.175, 1);

export const duration = {
  /** Microinteracciones (hover, press) */
  micro: 180,
  /** Revelado estándar al hacer scroll */
  reveal: 700,
  /** Un paso dentro de una secuencia de Hero */
  heroStep: 650,
  /** Palabra a palabra en SplitText */
  wordStagger: 60,
  /** Carácter a carácter en SplitText */
  charStagger: 18,
  /** Tarjetas en cuadrícula */
  cardStagger: 70,
} as const;

/** Distancia de desplazamiento vertical del reveal — más corta en móvil. */
export function revealTravel(compact: boolean): number {
  return compact ? 14 : 24;
}

/**
 * Reduce el stagger en móvil: mismo orden de aparición, pero con menos
 * espera acumulada entre el primer y el último elemento de una lista larga.
 */
export function compactDelay(delayMs: number, compact: boolean): number {
  if (!compact) return delayMs;
  return Math.min(delayMs * 0.6, 300);
}
