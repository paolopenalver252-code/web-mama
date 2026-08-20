"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/**
 * Cifra que cuenta desde 0 hasta `value` al entrar en el viewport.
 * Sin JS, o con prefers-reduced-motion, muestra el valor final directamente
 * (mismo principio que Reveal: nunca ocultar contenido sin garantía de animación).
 */
export default function CountUp({ value, prefix = "", suffix = "", duration = 1600, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // El estado ya inicia en `value` — no hace falta tocarlo.
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        setDisplay(0);
        const startTime = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(value * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
