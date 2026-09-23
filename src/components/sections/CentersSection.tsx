import { ArrowUpRight, Building2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import EmptyState from "@/components/ui/EmptyState";
import Reveal from "@/components/ui/Reveal";

type Center = {
  name: string;
  description: string;
  href?: string;
};

const CENTERS: Center[] = [
  {
    name: "Centro de Seleni",
    description: "Especializado en bienestar, estética, spa y cuidado corporal.",
    href: "https://tubellezaholistica.com/",
  },
  {
    name: "Centro de Carolina",
    description: "Especializado en Medicina Tradicional China, acupuntura y bienestar integral.",
    href: "https://centroqiromass.com/",
  },
  {
    name: "Centro de Zaida",
    description: "Especialización pendiente de confirmar.",
  },
];

/**
 * Lista editorial abierta en vez de tarjetas: con solo nombre + descripción
 * (y a veces ni eso, ni enlace), un grid de cajas con sombra se sentía
 * sobredimensionado para la cantidad real de información. Una lista con
 * separadores finos comunica "red de confianza cuidadosamente listada" en
 * vez de "cuadrícula de producto", y aporta variedad de composición frente
 * a las secciones con cards que la rodean en la Home.
 */
export default function CentersSection() {
  return (
    <section className="bg-surface-alt py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Red de colaboradores" title="Nuestros centros colaboradores" />
        </Reveal>

        <div className="mx-auto mt-14 max-w-3xl">
          {CENTERS.length > 0 ? (
            <ul className="divide-y divide-primary/10 border-y border-primary/10">
              {CENTERS.map((center, index) => (
                <Reveal key={center.name} delay={index * 90}>
                  <li className="flex flex-col gap-3 py-8 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                    <h3 className="font-heading text-xl text-primary sm:w-1/3">{center.name}</h3>
                    <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm leading-relaxed text-ink-muted text-body">{center.description}</p>
                      {center.href ? (
                        <a
                          href={center.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary transition-colors duration-300 hover:text-accent-text"
                        >
                          Más información
                          <ArrowUpRight size={14} strokeWidth={2} />
                        </a>
                      ) : null}
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          ) : (
            <Reveal>
              <EmptyState
                icon={Building2}
                title="Red en expansión"
                description="Aquí se mostrarán los centros colaboradores de PSAI FLOW ACADEMY en cuanto se confirme el listado definitivo."
              />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
