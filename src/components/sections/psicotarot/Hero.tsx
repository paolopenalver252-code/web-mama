"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft } from "lucide-react";
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

      <div className="relative mx-auto max-w-7xl px-6 pt-10 lg:px-8 lg:pt-14">
        <Link
          href="/#especialidades"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary/60 transition-colors duration-300 hover:text-accent-text"
        >
          <ArrowLeft size={16} strokeWidth={1.75} />
          Volver a las especialidades
        </Link>

        <div ref={textRef} className="mx-auto mt-6 flex max-w-2xl flex-col items-center gap-6 text-center">
          <Eyebrow>Una especialidad PSAI FLOW</Eyebrow>
          <h1 className="font-heading text-4xl leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-6xl">
            Consultas de Psicotarot y Astrología Cabalística
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-ink-muted text-body">
            Un espacio de autoconocimiento y acompañamiento para comprender tu momento,
            descubrir tu potencial y tomar decisiones con mayor claridad y conciencia.
          </p>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contacto#formulario-contacto" variant="accent" size="md">
              Reservar una consulta
            </Button>
            <Button href="/consultas" variant="outline" size="md">
              Ir a Consultas
            </Button>
          </div>
        </div>

        <div ref={mediaRef} className="mx-auto mt-12 max-w-6xl pb-16 lg:pb-20">
          <PlaceholderImage
            src="/images/psicotarot-astrologia-feng-shui.jpg"
            alt="Cartas de tarot, dados hebreos y símbolos cabalísticos sobre un paño oscuro"
            priority
            sizes="(max-width: 1280px) 100vw, 72rem"
            className="aspect-[16/9] w-full shadow-soft"
          />
        </div>
      </div>
    </section>
  );
}
