"use client";

import { useRef, useState, useEffect } from "react";
import { animate } from "animejs";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import CountUp from "@/components/ui/CountUp";
import SplitText from "@/components/ui/SplitText";
import { playEntranceTimeline } from "@/lib/motion/timeline";
import { easeOut } from "@/lib/motion/tokens";
import { prefersReducedMotion } from "@/lib/motion/environment";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

// Mismo degradado de marca que usa PlaceholderImage en tono oscuro: se
// mantiene detrás del vídeo (fallback en móvil, y visible un instante
// mientras el vídeo carga en desktop/tablet) para no romper la identidad.
const FALLBACK_GRADIENT =
  "radial-gradient(circle at 30% 20%, rgba(200,163,95,0.25), transparent 60%), linear-gradient(135deg, #163B67, #0F2D52)";

/**
 * Hero editorial a pantalla completa — dirección visual de referencia:
 * plantilla "Holistic" de Framer (composición y experiencia, no código ni
 * assets). La fotografía es la protagonista absoluta; el contenido vive en
 * una columna izquierda sobre un degradado azul profundo que integra la
 * imagen con la identidad de marca. `-mt-20` hace que el fondo se extienda
 * detrás del header (transparente aquí, ver Header.tsx) hasta el borde
 * superior real de la ventana.
 */
export default function Hero() {
  const imageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);

  // El vídeo de fondo pesa ~18MB: en móvil no compensa la factura de datos
  // frente al degradado de marca, así que solo se monta en pantallas amplias.
  // Se suscribe a la media query (no solo la comprueba una vez) para
  // reaccionar también a un cambio de orientación o de tamaño de ventana.
  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 641px)");
    const syncFromQuery = () => setShowVideo(mql.matches);
    syncFromQuery();
    mql.addEventListener("change", syncFromQuery);
    return () => mql.removeEventListener("change", syncFromQuery);
  }, []);

  useIsomorphicLayoutEffect(() => {
    playEntranceTimeline([
      { target: imageRef.current, translateY: 0, duration: 1600 },
      { target: overlayRef.current, translateY: 0, duration: 900, offset: "-=1300" },
      { target: eyebrowRef.current, offset: "-=650" },
      { target: metaRef.current, translateY: 18, offset: "-=400" },
      { target: ctasRef.current, staggerChildren: true, staggerMs: 100, offset: "-=350" },
      { target: statRef.current, translateY: 14, offset: "-=250" },
    ]);
  }, []);

  // Zoom cinematográfico muy lento y continuo sobre el vídeo (scale 1 → 1.04),
  // independiente de la secuencia de entrada. Se omite con reduced-motion.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showVideo || prefersReducedMotion()) return;

    animate(video, {
      scale: [1, 1.04],
      duration: 24000,
      ease: easeOut,
    });
  }, [showVideo]);

  return (
    <section className="relative -mt-20 min-h-[100svh] w-full overflow-hidden bg-primary">
      {/* Vídeo — protagonista absoluto de la composición. El degradado de
          marca queda debajo como fondo: se ve en móvil (sin vídeo, por
          peso/datos) y durante el instante de carga en desktop/tablet. */}
      <div ref={imageRef} className="absolute inset-0 h-full w-full overflow-hidden" style={{ background: FALLBACK_GRADIENT }}>
        {showVideo ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            style={{ transformOrigin: "center" }}
            src="/videos/psai-flow-hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
          />
        ) : null}
      </div>

      {/* Degradados azul profundo — muy sutiles: el propio vídeo (silueta a
          contraluz, ya oscuro) aporta la mayor parte del contraste. Solo se
          refuerza donde hace falta: bajo el texto (izquierda) y bajo la
          estadística (abajo), dejando naturaleza y persona bien visibles
          en el resto del encuadre. */}
      <div
        ref={overlayRef}
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(100deg,rgba(11,27,49,0.55)_0%,rgba(11,27,49,0.28)_38%,rgba(11,27,49,0.12)_60%,transparent_80%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(0deg,rgba(11,27,49,0.4)_0%,transparent_100%)]"
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col px-6 pb-12 pt-32 sm:px-10 lg:px-16 lg:pb-16 lg:pt-40">
        <div className="max-w-xl">
          <div ref={eyebrowRef}>
            <Eyebrow tone="dark">Academia Internacional</Eyebrow>
          </div>

          <SplitText
            as="h1"
            delay={450}
            className="mt-6 block font-heading text-5xl leading-[1.03] tracking-tight text-white sm:text-6xl lg:text-[5rem]"
          >
            PSAI FLOW ACADEMY
          </SplitText>

          <div ref={metaRef} className="mt-7 flex flex-col gap-4">
            <p className="font-heading text-xl text-white/90 sm:text-2xl">
              Academia Internacional de Psicotransformación Integral
            </p>
            <p className="max-w-md text-base leading-relaxed text-white/70">
              Especialistas en Magia Universal, Limpieza Energética y Protección.
            </p>
            <p className="border-l-2 border-accent pl-4 font-heading text-lg italic text-white/80">
              Transformando cuerpo, mente, emociones y conciencia.
            </p>
          </div>

          <div ref={ctasRef} className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="/consultas" variant="accent" size="md">
              Reservar una consulta
            </Button>
            <Button
              href="/metodo-psai-flow"
              variant="outline"
              size="md"
              className="border-white/40 text-white hover:border-accent hover:text-accent"
            >
              Conocer el Método PSAI FLOW
            </Button>
          </div>
        </div>

        {/* Estadística — el único dato real que tenemos, con el mismo
            tratamiento tipográfico (cifra grande + etiqueta) que la fila de
            estadísticas de la referencia, sin tarjeta ni cristal encima. */}
        <div ref={statRef} className="mt-auto pt-16">
          <div className="font-heading text-4xl leading-none text-white sm:text-5xl">
            <CountUp value={35} suffix="+" />
          </div>
          <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/60 sm:text-sm">
            Años transformando vidas
          </div>
        </div>
      </div>
    </section>
  );
}
