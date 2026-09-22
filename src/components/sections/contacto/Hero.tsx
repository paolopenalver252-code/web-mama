"use client";

import { useRef } from "react";
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

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-14 lg:px-8 lg:pb-28">
        <div ref={textRef} className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <Eyebrow>Hablemos</Eyebrow>
          <h1 className="font-heading text-4xl leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-6xl">
            Contacto
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-ink-muted text-body">
            Estamos aquí para acompañarte en tu proceso de transformación
            personal y ayudarte a encontrar la formación o consulta más
            adecuada para ti.
          </p>
        </div>
      </div>
    </section>
  );
}
