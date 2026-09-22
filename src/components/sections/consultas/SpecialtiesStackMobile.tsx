"use client";

import { useState } from "react";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import CardFeature from "@/components/cards/CardFeature";
import { prefersReducedMotion } from "@/lib/motion/environment";
import { SPECIALTIES } from "./specialtiesData";

/**
 * Versión móvil (< 640px) de "Especialidades que pueden integrarse durante
 * la consulta": las mismas tarjetas que la cuadrícula de tablet/desktop
 * (mismos datos, mismo componente visual CardFeature), presentadas como un
 * Scroll Stack — cada tarjeta se apila progresivamente mientras el usuario
 * hace scroll con el dedo, en vez de mostrarse en una cuadrícula estática.
 *
 * Con prefers-reduced-motion no se monta el contenedor de altura acotada
 * (necesario para el efecto de pila): se usa flujo normal de página, sin
 * scroll interno ni animación, para no dejar a estos usuarios atrapados en
 * una caja de scroll anidada.
 */
export default function SpecialtiesStackMobile() {
  const [reducedMotion] = useState(() => prefersReducedMotion());

  if (reducedMotion) {
    return (
      <div className="flex flex-col gap-6">
        {SPECIALTIES.map((specialty) => (
          <CardFeature
            key={specialty.title}
            icon={specialty.icon}
            title={specialty.title}
            description={specialty.description}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="h-[min(78vh,600px)] min-h-[420px] overflow-hidden">
      <ScrollStack>
        {SPECIALTIES.map((specialty) => (
          <ScrollStackItem key={specialty.title}>
            <CardFeature icon={specialty.icon} title={specialty.title} description={specialty.description} />
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </div>
  );
}
