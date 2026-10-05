"use client";

import { useRef, useState, useEffect } from "react";
import { animate } from "animejs";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import CountUp from "@/components/ui/CountUp";
import SplitText from "@/components/ui/SplitText";
import StarField from "@/components/ui/StarField";
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

  // Secuencia de entrada ligeramente más lenta y con desplazamientos más
  // cortos que antes: la misma coreografía (imagen → overlay → eyebrow →
  // texto → CTAs → estadística), pero el movimiento se nota menos y se lee
  // más como un fundido cinematográfico que como una animación de interfaz.
  useIsomorphicLayoutEffect(() => {
    playEntranceTimeline([
      { target: imageRef.current, translateY: 0, duration: 1800 },
      { target: overlayRef.current, translateY: 0, duration: 1000, offset: "-=1400" },
      { target: eyebrowRef.current, duration: 800, offset: "-=700" },
      { target: metaRef.current, translateY: 14, duration: 800, offset: "-=450" },
      { target: ctasRef.current, staggerChildren: true, staggerMs: 120, duration: 750, offset: "-=400" },
      { target: statRef.current, translateY: 10, duration: 750, offset: "-=300" },
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
        ) : (
          // Sin vídeo (móvil, por peso de datos): un cielo estrellado muy
          // sutil da profundidad y protagonismo cinematográfico al fondo en
          // vez de un degradado plano — mismo componente ya usado en
          // FinalCta.tsx/BigStatement.tsx, coherente con la identidad
          // "Magia Universal" de la marca.
          <StarField count={36} />
        )}
      </div>

      {/* Degradados azul profundo — el propio vídeo (silueta a contraluz, ya
          oscuro) aporta la mayor parte del contraste. Se refuerza algo más
          que antes bajo el texto (izquierda) y bajo la estadística (abajo),
          con un alcance un poco más largo para una lectura inmediata del
          H1, sin convertir el vídeo en un fondo plano: naturaleza y persona
          siguen bien visibles en el resto del encuadre. */}
      <div
        ref={overlayRef}
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(100deg,rgba(11,27,49,0.66)_0%,rgba(11,27,49,0.38)_42%,rgba(11,27,49,0.16)_65%,transparent_85%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(0deg,rgba(11,27,49,0.5)_0%,transparent_100%)]"
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-center px-6 pb-14 pt-32 sm:justify-start sm:px-10 sm:pb-14 lg:px-16 lg:pb-20 lg:pt-44">
        {/* max-w-2xl (antes max-w-xl): el H1 a gran escala necesitaba más
            anchura para que las palabras se agrupen en líneas más largas y
            seguras — menos "apilado", más titular editorial. El párrafo
            conserva su propio max-w-md más abajo, a propósito más estrecho
            que el titular, para que la longitud de línea de lectura siga
            siendo cómoda. */}
        <div className="max-w-2xl">
          <div ref={eyebrowRef}>
            <Eyebrow tone="dark">PSAI FLOW® ACADEMY</Eyebrow>
          </div>

          <SplitText
            as="h1"
            delay={500}
            className="mt-6 block font-heading text-[2.75rem] leading-[1.05] tracking-tight text-white sm:mt-7 sm:text-6xl lg:text-[5.75rem]"
          >
            Transformando cuerpo, mente, emociones y conciencia.
          </SplitText>

          <div ref={metaRef} className="mt-6 flex flex-col gap-3 sm:mt-8 sm:gap-4">
            <p className="max-w-md text-base leading-relaxed text-mist text-body sm:text-lg">
              Un espacio de formación y conocimiento dedicado a la Psicotransformación Integral y
              al desarrollo de las disciplinas que forman parte del Método PSAI FLOW®.
            </p>
          </div>

          <div ref={ctasRef} className="mt-9 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4">
            <Button href="/academia" variant="accent" size="md">
              Explorar la Academia
            </Button>
            <Button
              href="/metodo-psai-flow"
              variant="outline"
              size="md"
              className="border-white/40 text-white hover:border-accent hover:text-accent"
            >
              Conocer PSAI FLOW®
            </Button>
          </div>
        </div>

        {/* Estadística — el único dato real que tenemos, con el mismo
            tratamiento tipográfico (cifra grande + etiqueta) que la fila de
            estadísticas de la referencia, sin tarjeta ni cristal encima.
            La marca de scroll comparte fila y entrada con la estadística:
            un gesto discreto que invita a seguir, sin animación en bucle
            (aparece una vez con el resto del Hero y queda estático).
            Oculta en móvil: la composición mobile prioriza eyebrow + H1 +
            un único subtítulo + CTA, sin elementos adicionales compitiendo
            por la atención en una pantalla pequeña. */}
        <div ref={statRef} className="mt-auto hidden items-end justify-between gap-6 pt-16 sm:flex">
          <div>
            <div className="font-heading text-4xl leading-none text-white sm:text-5xl">
              <CountUp value={35} suffix="+" />
            </div>
            <div className="mt-2 text-xs uppercase tracking-[0.2em] text-mist-subtle sm:text-sm">
              Años transformando vidas
            </div>
          </div>
          <span
            aria-hidden
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-white/70 transition-colors duration-300"
          >
            <ChevronDown size={18} strokeWidth={1.5} />
          </span>
        </div>
      </div>
    </section>
  );
}
