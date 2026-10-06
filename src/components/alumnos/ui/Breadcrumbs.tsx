import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

export type Crumb = { label: string; href: string };

type BreadcrumbsProps = {
  /** Niveles superiores enlazados (sin incluir la página actual). */
  trail: Crumb[];
  current: string;
};

/**
 * Ubicación dentro del área. En escritorio, la ruta completa; en móvil,
 * solo "← nivel anterior", que es lo que de verdad se usa con el pulgar
 * y nunca desborda por títulos largos.
 */
export default function Breadcrumbs({ trail, current }: BreadcrumbsProps) {
  const parent = trail[trail.length - 1];

  return (
    <>
      {parent ? (
        <Link
          href={parent.href}
          className="-ml-1 inline-flex min-h-11 items-center gap-1.5 self-start px-1 text-sm font-medium text-ink-muted transition-colors duration-300 hover:text-primary sm:hidden"
        >
          <ArrowLeft size={16} strokeWidth={1.5} aria-hidden />
          {parent.label}
        </Link>
      ) : null}

      <nav aria-label="Ruta de navegación" className="hidden sm:block">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-ink-subtle">
          {trail.map((crumb) => (
            <li key={crumb.href} className="flex items-center gap-1.5">
              <Link href={crumb.href} className="transition-colors duration-300 hover:text-primary">
                {crumb.label}
              </Link>
              <ChevronRight size={14} strokeWidth={1.5} aria-hidden className="text-ink-subtle/60" />
            </li>
          ))}
          <li aria-current="page" className="min-w-0 truncate text-ink-muted">
            {current}
          </li>
        </ol>
      </nav>
    </>
  );
}
