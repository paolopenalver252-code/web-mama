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
        className="pointer-events-none absolute -right-32 -top-20 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(200,163,95,0.14),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-14 lg:px-8">
        <div ref={textRef} className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <Eyebrow>Una especialidad PSAI FLOW</Eyebrow>
          <h1 className="font-heading text-4xl leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-6xl">
            Limpieza Energética y Protección
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-ink/70">
            Un proceso personalizado de evaluación, armonización y protección
            energética basado en el Método PSAI FLOW®.
          </p>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contacto#formulario-contacto" variant="accent" size="md">
              Solicitar una evaluación
            </Button>
            <Button href="/contacto" variant="outline" size="md">
              Contactar
            </Button>
          </div>
        </div>

        <div ref={mediaRef} className="mx-auto mt-12 max-w-6xl pb-16 lg:pb-20">
          <PlaceholderImage label="Imagen profesional pendiente" className="aspect-[21/9] w-full shadow-soft" />
        </div>
      </div>
    </section>
  );
}
