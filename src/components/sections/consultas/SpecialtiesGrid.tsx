"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SectionHeading from "@/components/ui/SectionHeading";
import SpecialtyCard from "@/components/cards/SpecialtyCard";
import Reveal from "@/components/ui/Reveal";
import { SPECIALTIES } from "./specialtiesData";

// Carga diferida y solo en cliente: el Scroll Stack (y su dependencia Lenis)
// nunca se descarga en tablet/desktop, donde se usa la cuadrícula de siempre.
const SpecialtiesStackMobile = dynamic(() => import("./SpecialtiesStackMobile"), { ssr: false });

export default function SpecialtiesGrid() {
  // Mismo umbral que el paso de la propia cuadrícula (grid-cols-2 → sm:grid-cols-3,
  // 640px): por debajo de eso se considera "móvil" en todo el proyecto.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 639px)");
    const sync = () => setIsMobile(mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);

  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Herramientas"
            title="Especialidades que pueden integrarse durante la consulta"
          />
        </Reveal>

        {isMobile ? (
          <div className="mt-14">
            <SpecialtiesStackMobile />
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3">
            {SPECIALTIES.map((item, index) => (
              <Reveal key={item.title} delay={index * 60} className="h-full">
                <SpecialtyCard
                  icon={<item.icon className="text-accent" size={20} strokeWidth={1.5} />}
                  title={item.title}
                  description={item.description}
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
