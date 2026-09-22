import { FileClock } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";

/**
 * Contenido temporal de las páginas legales mientras no exista el texto
 * definitivo del cliente. Nunca se rellena con texto legal inventado — solo
 * este aviso honesto, para que el enlace del footer no dé 404.
 */
export default function PendingLegalNotice({ title }: { title: string }) {
  return (
    <section className="bg-surface py-32">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 text-center lg:px-8">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="font-heading text-4xl leading-tight text-primary sm:text-5xl">{title}</h1>
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
          <FileClock className="text-accent-text" size={22} strokeWidth={1.5} />
        </span>
        <p className="max-w-md text-base leading-relaxed text-ink-muted text-body">
          Este documento está en preparación y se publicará próximamente. Si necesitas esta
          información ahora, puedes escribirnos directamente.
        </p>
        <Button href="/contacto" variant="outline" size="md">
          Contactar
        </Button>
      </div>
    </section>
  );
}
