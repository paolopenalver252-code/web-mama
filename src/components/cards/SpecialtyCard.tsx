"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type SpecialtyCardProps = {
  // Recibe el icono ya renderizado (no el componente): al ser este un
  // Client Component, no se le puede pasar una referencia de función desde
  // el Server Component que lo usa.
  icon: ReactNode;
  title: string;
  description: string;
  bookingHref?: string;
};

/**
 * Tarjeta de especialidad con reverso informativo: al pasar el cursor (o
 * al tocar, en móvil) revela una breve descripción y un acceso directo a
 * reservar esa consulta en concreto.
 */
export default function SpecialtyCard({
  icon,
  title,
  description,
  bookingHref = "/contacto#formulario-contacto",
}: SpecialtyCardProps) {
  const [active, setActive] = useState(false);

  return (
    <div
      className="group relative h-full min-h-[11.5rem] overflow-hidden rounded-2xl border border-primary/5 bg-surface shadow-soft transition-shadow duration-300 hover:shadow-[0_20px_45px_rgba(15,45,82,0.12)]"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <button
        type="button"
        onClick={() => setActive(true)}
        aria-expanded={active}
        className="flex h-full w-full flex-col items-start gap-4 p-7 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
          {icon}
        </span>
        <h3 className="font-heading text-lg text-primary">{title}</h3>
      </button>

      <div
        onClick={() => setActive(false)}
        className={`absolute inset-0 flex flex-col items-start justify-between gap-4 rounded-2xl bg-primary p-6 text-left transition-all duration-300 ease-out ${
          active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-2">
          <h3 className="font-heading text-base text-white">{title}</h3>
          <p className="text-xs leading-relaxed text-white/70">{description}</p>
        </div>
        <Link
          href={bookingHref}
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-accent transition-colors duration-300 hover:text-accent-text-hover"
        >
          Reservar esta consulta
          <ArrowUpRight size={14} strokeWidth={2} />
        </Link>
      </div>
    </div>
  );
}
