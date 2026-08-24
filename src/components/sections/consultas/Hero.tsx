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

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 py-16 md:grid-cols-2 md:gap-12 lg:px-8 lg:py-24">
        <div ref={textRef} className="flex flex-col items-start gap-6">
          <Eyebrow>Acompañamiento personalizado</Eyebrow>
          <h1 className="font-heading text-4xl leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-6xl">
            Consultas
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-ink/70">
            Cada consulta es un proceso personalizado de acompañamiento y
            autoconocimiento, adaptado a ti.
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-4">
            <Button href="/contacto#formulario-contacto" variant="accent" size="md">
              Reservar una consulta
            </Button>
            <Button href="/contacto" variant="outline" size="md">
              Solicitar información
            </Button>
          </div>
        </div>

        <div ref={mediaRef}>
          <PlaceholderImage
            src="/images/solimar-rengel.jpg"
            alt="Solimar Rengel, acompañándote en tu proceso de consulta"
            className="aspect-[4/5] w-full shadow-soft"
          />
        </div>
      </div>
    </section>
  );
}
