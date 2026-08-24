"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate } from "animejs";
import { easeOut, duration, revealTravel, compactDelay } from "@/lib/motion/tokens";
import { prefersReducedMotion, isCompactViewport } from "@/lib/motion/environment";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Retraso en ms, útil para escalonar varios elementos (stagger). */
  delay?: number;
  /** "up": fade + desplazamiento vertical (por defecto). "scale": además
   * emerge desde un 94% de escala, para momentos con más ambición visual. */
  variant?: "up" | "scale";
};

/**
 * Envuelve contenido que debe aparecer con un fade-up suave al entrar
 * en el viewport (Scroll Reveal del Design System, sobre Anime.js). Una
 * sola aparición, sin rebote ni movimiento brusco.
 */
export default function Reveal({ children, className = "", delay = 0, variant = "up" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // "pre": ni servidor ni JS han decidido nada aún -> contenido visible por
  // defecto (sin JS, el contenido nunca debe quedar oculto). Solo una vez
  // montado en el cliente pasamos a "hidden" y empezamos a observar, para
  // animar la aparición sin arriesgar contenido invisible si algo falla.
  const [state, setState] = useState<"pre" | "hidden" | "visible">("pre");

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return; // sin nodo, o reduced-motion: se queda "pre" = visible, sin animar

    setState("hidden");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const compact = isCompactViewport();
        const travel = revealTravel(compact);
        animate(node, {
          opacity: [0, 1],
          translateY: variant === "scale" ? 0 : [travel, 0],
          scale: variant === "scale" ? [0.94, 1] : 1,
          duration: duration.reveal,
          delay: compactDelay(delay, compact),
          ease: easeOut,
          onBegin: () => setState("visible"),
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay, variant]);

  return (
    <div
      ref={ref}
      data-reveal={state === "pre" ? undefined : state}
      data-reveal-variant={variant === "scale" ? "scale" : undefined}
      className={className}
    >
      {children}
    </div>
  );
}
