import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import EmptyState from "@/components/ui/EmptyState";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog",
  description: "Blog de PSAI FLOW ACADEMY — próximamente disponible.",
  path: "/blog",
  noIndex: true,
});

/**
 * Contenido temporal mientras no exista ningún artículo real del cliente.
 * Nunca se rellena con texto de blog inventado — solo este aviso honesto,
 * para que el enlace del menú no dé 404 (mismo patrón que /legal/*).
 */
export default function BlogPage() {
  return (
    <section className="bg-surface py-32">
      <div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Blog" title="Blog de PSAI FLOW ACADEMY" />
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-10">
            <EmptyState
              icon={Newspaper}
              title="Próximamente"
              description="Estamos preparando artículos sobre Psicotransformación Integral, Magia Universal y el Método PSAI FLOW®. Vuelve pronto."
            />
          </div>
          <div className="mt-8">
            <Button href="/contacto" variant="outline" size="md">
              Contactar
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
