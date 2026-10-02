"use client";

import { useRef } from "react";
import Button from "@/components/ui/Button";
import Parallax from "@/components/ui/Parallax";
import Eyebrow from "@/components/ui/Eyebrow";
import { useHeroEntrance } from "@/hooks/useHeroEntrance";

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  useHeroEntrance({ text: textRef });

  return (
    <section className="relative overflow-hidden">
      <Parallax
        speed={10}
        className="pointer-events-none absolute -left-32 -top-20 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(200,163,95,0.14),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-14 lg:px-8 lg:pb-20">
        {/* Sin foto de Solimar aquí: esta cabecera presenta la Academia en
            general (el texto ni siquiera la menciona por nombre) y su
            retrato ya protagoniza la sección "Conoce a Solimar Rengel" más
            abajo en esta misma página — repetirlo aquí se leía como un
            duplicado, no como dos momentos distintos. */}
        <div ref={textRef} className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <Eyebrow>La Academia</Eyebrow>
          <h1 className="font-heading text-4xl leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-6xl">
            PSAI FLOW ACADEMY
          </h1>
          <p className="font-heading text-xl text-secondary">
            Academia Internacional de Psicotransformación Integral
          </p>
          <p className="max-w-xl text-base leading-relaxed text-ink-muted text-body">
            Una academia dedicada a la psicotransformación integral, con base
            en el Método PSAI FLOW®.
          </p>

          <div className="mt-2">
            <Button href="/metodo-psai-flow" variant="accent" size="md">
              Conocer el Método PSAI FLOW®
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
