import { createTimeline, stagger, type Timeline } from "animejs";
import { easeOut, duration, revealTravel } from "./tokens";
import { prefersReducedMotion, isCompactViewport } from "./environment";

export type EntranceStep = {
  /** Elemento, lista de elementos, o null/undefined (se ignora en ese caso). */
  target: Element | Element[] | NodeListOf<Element> | null | undefined;
  /** Si es true, anima los hijos directos de `target` en cascada (stagger). */
  staggerChildren?: boolean;
  /** Intervalo entre hijos cuando staggerChildren=true, en ms. */
  staggerMs?: number;
  translateY?: number;
  scale?: [number, number];
  duration?: number;
  /** Posición en la timeline: número absoluto en ms o notación relativa "-=200" / "+=100". */
  offset?: number | string;
};

/**
 * Construye y reproduce una secuencia de entrada (Timeline de Anime.js) a
 * partir de una lista ordenada de pasos. Pensado para Heroes y secciones con
 * varios elementos que deben aparecer en cadena, con solape sutil entre
 * pasos (comportamiento "cinematográfico" en lugar de bloques secos).
 *
 * Respeta prefers-reduced-motion (no anima, el contenido permanece visible)
 * y reduce la distancia de desplazamiento en viewports compactos.
 */
export function playEntranceTimeline(steps: EntranceStep[]): Timeline | undefined {
  if (prefersReducedMotion()) return undefined;

  const travel = revealTravel(isCompactViewport());
  const tl = createTimeline({ defaults: { ease: easeOut } });

  steps.forEach((step, index) => {
    if (!step.target) return;
    const targets = step.staggerChildren ? Array.from((step.target as Element).children) : step.target;
    if (step.staggerChildren && (targets as Element[]).length === 0) return;

    tl.add(
      targets,
      {
        opacity: [0, 1],
        translateY: [step.translateY ?? travel, 0],
        ...(step.scale ? { scale: step.scale } : null),
        duration: step.duration ?? duration.heroStep,
        delay: step.staggerChildren ? stagger(step.staggerMs ?? duration.cardStagger) : 0,
      },
      index === 0 ? 0 : (step.offset ?? "-=350")
    );
  });

  return tl;
}
