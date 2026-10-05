import type { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import EmptyState from "@/components/ui/EmptyState";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Acceso alumnos",
  description: "Área privada de alumnos de PSAI FLOW ACADEMY — próximamente disponible.",
  path: "/acceso-alumnos",
  noIndex: true,
});

/**
 * Contenido temporal mientras no exista la zona privada de alumnos (login,
 * dashboard, cursos). Mismo patrón honesto que /blog: nunca se simula un
 * login que no existe, solo este aviso con una vía de contacto real
 * mientras tanto. El botón "Acceso alumnos" del Header/Footer ya apunta
 * aquí, listo para redirigir a /login el día que esa zona se construya.
 */
export default function AccesoAlumnosPage() {
  return (
    <section className="bg-surface py-20 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center gap-5">
            <Eyebrow>Acceso alumnos</Eyebrow>
            <h1 className="font-heading text-3xl leading-tight text-primary sm:text-4xl">
              Área de alumnos
            </h1>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-10">
            <EmptyState
              icon={GraduationCap}
              title="Próximamente"
              description="Estamos preparando el espacio privado de la Academia. Si ya estás formándote con nosotros y necesitas tu material, escríbenos y te lo facilitamos."
            />
          </div>
          <div className="mt-8">
            <Button href="/contacto#formulario-contacto" variant="outline" size="md">
              Contactar
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
