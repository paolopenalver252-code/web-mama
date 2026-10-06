import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

export type Crumb = { label: string; href: string };

type BreadcrumbsProps = {
  /** Niveles superiores enlazados (sin incluir la página actual). */
  trail: Crumb[];
  current: string;
};

/**
 * Ubicación dentro del campus. En escritorio, la ruta completa; en móvil,
 * solo "← nivel anterior": es lo que se usa con el pulgar y nunca desborda
 * por títulos largos.
 */
export default function Breadcrumbs({ trail, current }: BreadcrumbsProps) {
  const parent = trail[trail.length - 1];

  return (
    <>
      {parent ? (
        <Link
          href={parent.href}
          className="-ml-1 inline-flex min-h-11 max-w-full items-center gap-2 self-start px-1 text-sm font-medium text-campus-muted transition-colors duration-300 hover:text-campus-ink sm:hidden"
        >
          <ArrowLeft size={16} strokeWidth={1.75} aria-hidden className="shrink-0" />
          <span className="truncate">{parent.label}</span>
        </Link>
      ) : null}

      <nav aria-label="Ruta de navegación" className="hidden min-w-0 sm:block">
        <ol className="flex min-w-0 items-center gap-2 text-[13px] text-campus-subtle">
          {trail.map((crumb) => (
            <li key={crumb.href} className="flex min-w-0 shrink items-center gap-2">
              <Link href={crumb.href} className="truncate transition-colors duration-300 hover:text-campus-ink">
                {crumb.label}
              </Link>
              <ChevronRight size={14} strokeWidth={1.5} aria-hidden className="shrink-0 opacity-60" />
            </li>
          ))}
          <li aria-current="page" className="min-w-0 truncate text-campus-muted">
            {current}
          </li>
        </ol>
      </nav>
    </>
  );
}
