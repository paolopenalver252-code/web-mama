"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ParallaxProps = {
  children?: ReactNode;
  className?: string;
  /** Intensidad del desplazamiento (px por cada 100px de scroll). Mantener bajo para que sea muy sutil. */
  speed?: number;
};

/**
 * Parallax decorativo muy sutil — pensado únicamente para formas de fondo
 * (nunca para contenido real). Solo escucha scroll mientras el elemento
 * está cerca del viewport (IntersectionObserver) y actualiza vía
 * requestAnimationFrame, así que el coste fuera del Hero es cero. Respeta
 * prefers-reduced-motion (sin desplazamiento).
 */
export default function Parallax({ children, className = "", speed = 10 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    let scrollAttached = false;

    const update = () => {
      const rect = node.getBoundingClientRect();
      const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
      const translate = (-centerOffset / 100) * speed;
      node.style.transform = `translate3d(0, ${translate}px, 0)`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    const attach = () => {
      if (scrollAttached) return;
      scrollAttached = true;
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
    };

    const detach = () => {
      if (!scrollAttached) return;
      scrollAttached = false;
      window.removeEventListener("scroll", onScroll);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          attach();
        } else {
          detach();
        }
      },
      { rootMargin: "50% 0px" }
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      detach();
    };
  }, [speed]);

  return (
    <div ref={ref} aria-hidden className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
