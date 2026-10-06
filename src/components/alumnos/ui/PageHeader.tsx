import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Elemento encima del título (migas de pan / volver). */
  before?: ReactNode;
};

/**
 * Cabecera de cada pantalla privada: etiqueta pequeña, título serif y
 * entradilla. Sin la píldora de Eyebrow de la web pública: dentro de la
 * plataforma, la etiqueta es solo una línea de contexto.
 */
export default function PageHeader({ eyebrow, title, description, before }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-4">
      {before}
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-text">{eyebrow}</p>
      ) : null}
      <h1 className="font-heading text-[2.25rem] leading-[1.1] text-primary sm:text-5xl">{title}</h1>
      {description ? <div className="max-w-2xl text-ink-muted text-body">{description}</div> : null}
    </header>
  );
}
