"use client";

import { type RefObject } from "react";
import { playEntranceTimeline } from "@/lib/motion/timeline";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

type HeroEntranceRefs = {
  /** Bloque de texto (eyebrow + título + descripción + CTAs), aparece primero. */
  text: RefObject<HTMLElement | null>;
  /** Imagen o media del Hero, aparece justo después con leve solape. */
  media?: RefObject<HTMLElement | null>;
};

/**
 * Secuencia de entrada estándar para los Heroes "simples" del sitio (texto
 * centrado + imagen debajo). El Hero cinematográfico de la Home usa su
 * propia secuencia, más elaborada, directamente con playEntranceTimeline.
 */
export function useHeroEntrance({ text, media }: HeroEntranceRefs) {
  useIsomorphicLayoutEffect(() => {
    playEntranceTimeline([
      { target: text.current },
      { target: media?.current, translateY: 16, duration: 800, offset: "-=400" },
    ]);
    // Se ejecuta una sola vez al montar — es una secuencia de entrada, no debe re-dispararse.
  }, []);
}
