"use client";

import { useEffect, useRef } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { brandEase } from "@/lib/motion/classNames";

const REASONS = [
  "Método propio",
  "Formación estructurada",
  "Más de 35 años de experiencia",
  "Visión integral",
  "Acompañamiento personalizado",
  "Academia internacional",
];

/**
 * Seis razones como composición editorial 2 × 3 (3 columnas desde lg, 2 en
 * tablet, 1 en móvil), cada una con su número y su propio filete superior.
 *
 * Única interacción — distinta de la de "Nuestros Valores": el texto queda
 * quieto y lo que entra es la línea, que se dibuja de izquierda a derecha
 * (scaleX, solo transform → sin layout shift) en cascada de 70ms cuando el
 * bloque entra en pantalla, una sola vez. Transición CSS con la curva de
 * marca; el observer solo pone un data-attribute. Con reduced-motion las
 * líneas aparecen ya dibujadas.
 */
export default function WhyChooseAcademy() {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        list.dataset.visible = "";
        observer.disconnect();
      },
      { threshold: 0.2 }
    );
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="La diferencia" title="¿Por qué elegir PSAI FLOW ACADEMY?" align="left" />
        </Reveal>

        <ol
          ref={listRef}
          className="group mt-12 grid grid-cols-1 gap-x-12 sm:mt-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-16"
        >
          {REASONS.map((reason, index) => (
            <li key={reason} className="relative pb-10 pt-7 sm:pb-12 sm:pt-8">
              <span
                aria-hidden
                style={{ transitionDelay: `${index * 70}ms` }}
                className={`absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-primary/15 transition-transform duration-[900ms] ${brandEase} group-data-[visible]:scale-x-100 motion-reduce:scale-x-100 motion-reduce:transition-none`}
              />
              <span aria-hidden className="block font-heading text-4xl leading-none text-accent-text/60 sm:text-5xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 max-w-xs font-heading text-2xl leading-snug text-primary sm:text-[1.75rem]">
                {reason}
              </h3>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
