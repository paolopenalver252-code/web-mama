"use client";

import { useRef, type ElementType } from "react";
import { animate, splitText, stagger } from "animejs";
import { easeOut, duration } from "@/lib/motion/tokens";
import { prefersReducedMotion, isCompactViewport } from "@/lib/motion/environment";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

type SplitTextProps = {
  children: string;
  as?: ElementType;
  className?: string;
  /** "words" (por defecto) o "chars" — usar "chars" con moderación, solo en titulares muy cortos. */
  by?: "words" | "chars";
  /** Retraso antes de empezar el stagger, en ms. */
  delay?: number;
};

/**
 * Titular que se revela palabra a palabra (o carácter a carácter) al
 * montar. Reservado para titulares seleccionados de alto impacto — no
 * pensado para aplicarse a todo el texto del sitio. `accessible: true`
 * mantiene el texto original disponible para lectores de pantalla mientras
 * se anima visualmente la versión fragmentada.
 */
export default function SplitText({
  children,
  as: Tag = "span",
  className = "",
  by = "words",
  delay = 0,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;

    const splitter = splitText(node, {
      words: by === "words",
      chars: by === "chars",
      accessible: true,
    });
    const targets = by === "words" ? splitter.words : splitter.chars;
    const compact = isCompactViewport();

    animate(targets, {
      opacity: [0, 1],
      translateY: [compact ? 12 : 20, 0],
      duration: duration.reveal,
      ease: easeOut,
      delay: stagger((by === "words" ? duration.wordStagger : duration.charStagger) * (compact ? 0.7 : 1), {
        start: delay,
      }),
    });

    return () => {
      splitter.revert();
    };
  }, [by, delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
