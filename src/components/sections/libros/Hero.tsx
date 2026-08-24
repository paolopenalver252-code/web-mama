"use client";

import { useRef } from "react";
import Button from "@/components/ui/Button";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import Parallax from "@/components/ui/Parallax";
import Eyebrow from "@/components/ui/Eyebrow";
import { useHeroEntrance } from "@/hooks/useHeroEntrance";

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  useHeroEntrance({ text: textRef, media: mediaRef });

  return (
    <section className="relative overflow-hidden">
      <Parallax
        speed={10}
        className="pointer-events-none absolute -left-32 -top-20 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(200,163,95,0.14),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-14 lg:px-8">
        <div ref={textRef} className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <Eyebrow>Biblioteca PSAI FLOW</Eyebrow>
          <h1 className="font-heading text-4xl leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-6xl">
            Libros de Solimar Rengel
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-ink/70">
            Más de 35 años de investigación, aprendizaje y experiencia
            reunidos en publicaciones orientadas al desarrollo personal, la
            Psicotransformación Integral y el Método PSAI FLOW®.
          </p>

          <div className="mt-2">
            <Button href="/academia" variant="accent" size="md">
              Conocer la Academia
            </Button>
          </div>
        </div>

        <div ref={mediaRef} className="mx-auto mt-12 max-w-6xl pb-16 lg:pb-20">
          <PlaceholderImage label="Imagen de libros pendiente" className="aspect-[21/9] w-full shadow-soft" />
        </div>
      </div>
    </section>
  );
}
