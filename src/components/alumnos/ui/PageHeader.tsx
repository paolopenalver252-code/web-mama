import type { ReactNode } from "react";
import { monoLabel } from "./styles";

type PageHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Elemento encima del título (migas de pan / volver). */
  before?: ReactNode;
  /** Acciones alineadas a la derecha en escritorio. */
  actions?: ReactNode;
};

/**
 * Cabecera de las pantallas del campus: etiqueta técnica en oro, título en
 * la serif de marca (único momento editorial de cada pantalla) y entradilla.
 */
export default function PageHeader({ eyebrow, title, description, before, actions }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-4">
      {before}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex min-w-0 flex-col gap-4">
          {eyebrow ? <p className={`${monoLabel} text-campus-gold`}>{eyebrow}</p> : null}
          <h1 className="font-heading text-[2.5rem] leading-[1.04] text-campus-ink sm:text-[3.25rem] lg:text-[3.6rem]">
            {title}
          </h1>
          {description ? (
            <div className="max-w-2xl text-base leading-relaxed text-campus-muted sm:text-[17px]">{description}</div>
          ) : null}
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>
    </header>
  );
}
