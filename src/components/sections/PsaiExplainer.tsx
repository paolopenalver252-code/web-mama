"use client";

import { useRef } from "react";
import { createTimeline } from "animejs";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { easeOut } from "@/lib/motion/tokens";
import { prefersReducedMotion } from "@/lib/motion/environment";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

const LETTERS = [
  { letter: "P", meaning: "Pensamiento" },
  { letter: "S", meaning: "Sentimiento" },
  { letter: "A", meaning: "Acción" },
  { letter: "I", meaning: "Iluminada" },
];

/**
 * Fila P·S·A·I con entrada en cadena: cada letra emerge y "enciende" la
 * línea que la conecta con la siguiente, de izquierda a derecha, para
 * reforzar la idea de progresión/evolución. Controla su propio reveal (no
 * usa <Reveal>) para evitar dos disparadores de scroll compitiendo sobre
 * los mismos elementos.
 */
export default function PsaiExplainer() {
  const rowRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const row = rowRef.current;
    if (!row || prefersReducedMotion()) return;

    const letters = row.querySelectorAll<HTMLElement>("[data-psai-letter]");
    const lines = row.querySelectorAll<HTMLElement>("[data-psai-line]");
    if (letters.length === 0) return;

    // Oculto de inmediato (antes del primer pintado) para que no haya
    // parpadeo cuando el observer dispare la animación más tarde.
    letters.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "scale(0.7)";
    });
    lines.forEach((el) => {
      el.style.transform = "scaleX(0)";
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const tl = createTimeline({ defaults: { ease: easeOut } });
        letters.forEach((letter, index) => {
          tl.add(letter, { scale: [0.7, 1], opacity: [0, 1], duration: 450 }, index === 0 ? 0 : "-=200");
          const line = lines[index];
          if (line) {
            tl.add(line, { scaleX: [0, 1], duration: 350 }, "-=150");
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(row);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-surface py-12">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center gap-2 text-center">
            <Eyebrow>El método</Eyebrow>
            <h2 className="font-heading text-xl text-primary sm:text-2xl">¿Qué es PSAI FLOW?</h2>
          </div>
        </Reveal>

        <div ref={rowRef} className="mt-8 flex flex-col items-center gap-0 sm:flex-row sm:justify-center sm:gap-0">
          {LETTERS.map((item, index) => (
            <div key={item.letter} className="flex items-center">
              <div className="flex flex-col items-center gap-2 px-4 py-2 text-center">
                <span
                  data-psai-letter
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-accent/5 font-heading text-lg font-semibold text-primary"
                >
                  {item.letter}
                </span>
                <span className="max-w-[7rem] text-[11px] leading-relaxed text-ink/45">{item.meaning}</span>
              </div>
              {index < LETTERS.length - 1 ? (
                <span data-psai-line aria-hidden className="hidden h-px w-6 origin-left bg-accent/30 sm:block" />
              ) : null}
            </div>
          ))}
        </div>

        <Reveal delay={100}>
          <p className="mx-auto mt-8 max-w-xl text-center text-sm leading-relaxed text-ink/55">
            Filosofía del método pendiente de contenido definitivo.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
