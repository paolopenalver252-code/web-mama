"use client";

import { useRef } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { brandEase } from "@/lib/motion/classNames";
import { prefersReducedMotion } from "@/lib/motion/environment";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

const PROCESS_POINTS = [
  "Gestión emocional",
  "Coaching",
  "Transformación de patrones",
  "Autoestima",
  "Propósito",
  "Y mucho más",
];

/**
 * "¿Qué se trabaja durante el proceso?" — composición asimétrica tipo índice
 * de revista: encabezado en una columna estrecha y, a su lado, las áreas en
 * tipografía grande con el número pequeño al final de cada fila. A
 * propósito distinta de "Nuestros Valores" (índice de 2 columnas con número
 * a la izquierda) y de "¿Por qué elegir?" (rejilla con número encima).
 * "Y mucho más" no es un área concreta, así que va atenuado.
 *
 * Única interacción: cada área sube desde una máscara (overflow-hidden +
 * translateY, solo transform → sin layout shift), en cascada de 60ms, una
 * sola vez al entrar en pantalla. El contenido se renderiza visible en
 * servidor; solo se "arma" (se oculta) tras montar y si no hay
 * reduced-motion, así que sin JS o con reduced-motion se ve todo directo.
 */
export default function ProcessGrid() {
  const listRef = useRef<HTMLOListElement>(null);

  useIsomorphicLayoutEffect(() => {
    const list = listRef.current;
    if (!list || prefersReducedMotion()) return;
    list.dataset.armed = "";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        delete list.dataset.armed;
        observer.disconnect();
      },
      { threshold: 0.15 }
    );
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-surface-alt py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 sm:gap-14 lg:grid-cols-12 lg:items-start lg:gap-16 lg:px-8">
        {/* Sticky solo desde lg. `lg:items-start` es imprescindible: sin él,
            el stretch por defecto de CSS Grid hace que este item ya mida lo
            mismo que su propia área de anclaje (la altura de toda la
            columna de la lista), así que no le queda recorrido para fijarse
            y se movería 1:1 con el scroll. Con items-start el bloque
            conserva su altura natural (compacta) dentro de un área tan alta
            como la lista, y entonces sí puede quedar "anclado" mientras se
            recorren los 6 puntos y soltarse justo al terminar esa columna
            — sin invadir la siguiente sección. Mismo top (112px, bajo el
            header) que ya usa la foto sticky de "Conoce a Solimar
            Rengel", que sigue el mismo patrón. */}
        <Reveal className="lg:col-span-4 lg:sticky lg:top-28">
          <div className="flex flex-col items-start gap-5">
            <Eyebrow>El proceso</Eyebrow>
            <h2 className="max-w-md font-heading text-3xl leading-tight text-primary sm:text-4xl lg:text-5xl">
              ¿Qué se trabaja durante el proceso?
            </h2>
          </div>
        </Reveal>

        <ol ref={listRef} className="group border-t border-primary/10 lg:col-span-8">
          {PROCESS_POINTS.map((point, index) => {
            const isOpenEnded = index === PROCESS_POINTS.length - 1;
            return (
              <li
                key={point}
                className="flex items-baseline justify-between gap-6 border-b border-primary/10 py-5 sm:py-6"
              >
                <span className="min-w-0 overflow-hidden pb-[0.12em]">
                  <span
                    style={{ transitionDelay: `${index * 60}ms` }}
                    className={`block font-heading text-[1.75rem] leading-tight transition-transform duration-[650ms] ${brandEase} group-data-[armed]:translate-y-full group-data-[armed]:transition-none sm:text-4xl lg:text-5xl ${
                      isOpenEnded ? "text-primary/45" : "text-primary"
                    }`}
                  >
                    {point}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="shrink-0 text-xs font-semibold tracking-[0.2em] text-accent-text sm:text-sm"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
