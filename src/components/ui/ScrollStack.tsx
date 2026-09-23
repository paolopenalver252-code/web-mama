"use client";

import { useLayoutEffect, useRef, useCallback, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/motion/environment";
import "./ScrollStack.css";

/**
 * Adaptación del componente "Scroll Stack" de React Bits
 * (https://www.reactbits.dev/components/scroll-stack): mismo mecanismo de
 * scroll-driven stacking (posición/escala por tarjeta calculada en cada
 * scroll), pero con una diferencia deliberada respecto a la demo oficial —
 * la demo usa la librería Lenis para "suavizar" el scroll del contenedor.
 * Probado en este proyecto, Lenis intercepta los eventos de wheel/touch y
 * no los libera hacia la página aunque el contenedor ya haya llegado al
 * final de su recorrido: el usuario se queda "atrapado" dentro del
 * componente. Por eso aquí se usa scroll nativo del contenedor (sin
 * librería), que encadena de forma nativa hacia la página en cuanto se
 * agota — más ligero, sin dependencias nuevas, y sin ese bloqueo.
 *
 * Respeta prefers-reduced-motion: si está activo, no se calculan
 * transforms — las tarjetas se muestran en flujo normal, con todo su
 * contenido visible sin animación.
 */

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export function ScrollStackItem({ children, itemClassName = "" }: ScrollStackItemProps) {
  return <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>;
}

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  onStackComplete?: () => void;
}

type CardTransform = { translateY: number; scale: number; rotation: number; blur: number };

export default function ScrollStack({
  children,
  className = "",
  itemDistance = 70,
  itemScale = 0.02,
  itemStackDistance = 20,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.9,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
}: ScrollStackProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef(new Map<number, CardTransform>());

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === "string" && value.includes("%")) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  const updateCardTransforms = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !cardsRef.current.length) return;

    const scrollTop = scroller.scrollTop;
    const containerHeight = scroller.clientHeight;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const endElement = scroller.querySelector(".scroll-stack-end") as HTMLElement | null;
    const endElementTop = endElement ? endElement.offsetTop : 0;

    cardsRef.current.forEach((card, i) => {
      const cardTop = card.offsetTop;
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      // Math.min(1, ...): sin este tope, las últimas tarjetas (targetScale
      // pasado 1 para índices altos) se agrandaban en vez de encogerse al
      // asentarse — un pequeño "pop" visual. Ninguna tarjeta debe superar su
      // tamaño natural.
      const targetScale = Math.min(1, baseScale + i * itemScale);
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jTriggerStart = cardsRef.current[j].offsetTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) topCardIndex = j;
        }
        if (i < topCardIndex) blur = Math.max(0, (topCardIndex - i) * blurAmount);
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;
      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform: CardTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };

      const last = lastTransformsRef.current.get(i);
      const changed =
        !last ||
        Math.abs(last.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(last.scale - newTransform.scale) > 0.001 ||
        Math.abs(last.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(last.blur - newTransform.blur) > 0.1;

      if (changed) {
        card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        card.style.filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : "";
        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
  ]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll(".scroll-stack-card")) as HTMLElement[];
    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    // Con reduced-motion, las tarjetas quedan en flujo normal (sin pin, sin
    // escala, sin blur): se ven todas seguidas, tal cual el contenido.
    if (prefersReducedMotion()) {
      cards.forEach((card) => {
        card.style.transform = "";
        card.style.filter = "";
        card.style.marginBottom = "";
      });
      return;
    }

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = "transform, filter";
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
    });

    // Bucle continuo de rAF en vez de recalcular solo en el evento "scroll":
    // en scroll nativo (momentum/inercia táctil) el navegador no siempre
    // dispara "scroll" en cada frame, lo que puede notarse como pequeños
    // "escalones". Leer scrollTop en cada frame mantiene la pila
    // perfectamente sincronizada con el dedo. Solo corre mientras la
    // sección está cerca del viewport (IntersectionObserver, igual que
    // Parallax.tsx), así que no consume nada fuera de esta pantalla.
    const loop = () => {
      updateCardTransforms();
      rafRef.current = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(loop);
    };
    const stopLoop = () => {
      if (rafRef.current === null) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? startLoop() : stopLoop()),
      { rootMargin: "50% 0px" }
    );
    observer.observe(scroller);
    updateCardTransforms();

    return () => {
      observer.disconnect();
      stopLoop();
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
    };
  }, [itemDistance, updateCardTransforms]);

  return (
    <div ref={scrollerRef} className={`scroll-stack-scroller ${className}`.trim()}>
      <div className="scroll-stack-inner">
        {children}
        {/* Espaciador para que el pin de la última tarjeta se libere con limpieza */}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
}
