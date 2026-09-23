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

        <div ref={rowRef} className="mt-10 flex flex-col sm:mt-8 sm:flex-row sm:items-center sm:justify-center">
          {LETTERS.map((item, index) => (
            <div
              key={item.letter}
              className="flex items-center border-t border-accent/15 py-5 first:border-t-0 sm:border-t-0 sm:py-0"
            >
              <div className="flex flex-1 items-baseline gap-5 px-1 sm:flex-none sm:flex-col sm:items-center sm:gap-2 sm:px-4 sm:py-2 sm:text-center">
                <span
                  data-psai-letter
                  className="font-heading text-4xl leading-none text-accent-text sm:flex sm:h-10 sm:w-10 sm:items-center sm:justify-center sm:rounded-full sm:border sm:border-accent/30 sm:bg-accent/5 sm:text-lg sm:font-semibold sm:text-primary"
                >
                  {item.letter}
                </span>
                <span className="font-heading text-lg uppercase leading-snug tracking-[0.18em] text-primary sm:max-w-[7rem] sm:font-sans sm:text-[11px] sm:font-normal sm:normal-case sm:leading-relaxed sm:tracking-normal sm:text-ink-subtle">
                  {item.meaning}
                </span>
              </div>
              {index < LETTERS.length - 1 ? (
                <span data-psai-line aria-hidden className="hidden h-px w-6 origin-left bg-accent/30 sm:block" />
              ) : null}
            </div>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-4 text-center text-sm leading-relaxed text-ink-muted text-body">
            <p>Creemos que la transformación comienza en el interior.</p>
            <p>
              Nuestra filosofía parte de una visión integral de la persona, entendiendo que
              pensamiento, emociones, acciones y conciencia están conectados.
            </p>
            <p>
              Por eso, el Método PSAI FLOW busca acompañar cada proceso desde el
              autoconocimiento, la coherencia y el equilibrio, respetando el ritmo y la
              experiencia única de cada persona.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
