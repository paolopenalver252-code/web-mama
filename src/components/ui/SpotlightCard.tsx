"use client";

import { useRef, useState, type MouseEventHandler, type ReactNode } from "react";
import { brandEase } from "@/lib/motion/classNames";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
};

/**
 * Resplandor dorado que sigue al cursor — inspirado en el componente
 * "Spotlight Card" de React Bits, adaptado al color y radio de marca.
 * Es una capa puramente decorativa que se superpone al fondo/borde ya
 * existente de cada tarjeta (nunca lo sustituye), por lo que las clases
 * de hover propias (cardHover, etc.) siguen aplicándose con normalidad.
 */
export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(200, 163, 95, 0.25)",
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ${brandEase}`}
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}
