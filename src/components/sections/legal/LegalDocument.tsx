import type { ReactNode } from "react";
import Eyebrow from "@/components/ui/Eyebrow";

export type LegalSection = {
  heading: string;
  body: ReactNode;
};

type LegalDocumentProps = {
  title: string;
  updated: string;
  intro?: ReactNode;
  sections: LegalSection[];
};

/**
 * Plantilla compartida por las 3 páginas legales (Aviso legal, Privacidad,
 * Cookies): mismo encabezado, misma tipografía y espaciado que el resto del
 * sitio, sin introducir ningún patrón visual nuevo. Un solo sitio para
 * ajustar el estilo de "documento legal" si algún día hace falta.
 */
export default function LegalDocument({ title, updated, intro, sections }: LegalDocumentProps) {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="flex flex-col items-center gap-5 text-center">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="font-heading text-4xl leading-tight text-primary sm:text-5xl">{title}</h1>
          <p className="text-xs uppercase tracking-[0.15em] text-ink-subtle">
            Última actualización: {updated}
          </p>
        </div>

        {intro ? (
          <div className="mt-10 flex flex-col gap-4 text-base leading-relaxed text-ink-muted text-body">
            {intro}
          </div>
        ) : null}

        <div className="mt-12 flex flex-col gap-10">
          {sections.map((section) => (
            <div key={section.heading} className="flex flex-col gap-3 border-t border-primary/10 pt-8">
              <h2 className="font-heading text-xl text-primary">{section.heading}</h2>
              <div className="flex flex-col gap-3 text-sm leading-relaxed text-ink-muted text-body">
                {section.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
