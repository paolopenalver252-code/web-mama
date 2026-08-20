"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

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
 * en el viewport (Scroll Reveal del Design System). Una sola aparición,
 * sin rebote ni movimiento brusco.
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
    if (!node) return;

    setState("hidden");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={state === "pre" ? undefined : state}
      data-reveal-variant={variant === "scale" ? "scale" : undefined}
      style={{ transitionDelay: state === "visible" ? `${delay}ms` : "0ms" }}
      className={className}
    >
      {children}
    </div>
  );
}
