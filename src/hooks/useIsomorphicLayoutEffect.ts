"use client";

import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect en cliente (se ejecuta antes del primer pintado, evitando
 * el parpadeo de "visible → oculto → animado" en animaciones de entrada
 * inmediata como el Hero) y useEffect normal en servidor, para no disparar
 * el warning de React sobre useLayoutEffect en SSR.
 */
export const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
