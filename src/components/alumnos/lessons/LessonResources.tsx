import { Download, FileText, Headphones, Link2, type LucideIcon } from "lucide-react";
import { monoLabel } from "@/components/alumnos/ui/styles";
import type { LessonResource, LessonResourceKind } from "@/lib/alumnos/catalog/types";

const KIND: Record<LessonResourceKind, { label: string; icon: LucideIcon }> = {
  pdf: { label: "PDF", icon: FileText },
  audio: { label: "Audio", icon: Headphones },
  download: { label: "Descarga", icon: Download },
  link: { label: "Enlace", icon: Link2 },
};

type LessonResourcesProps = {
  resources: LessonResource[];
};

/**
 * Materiales de la lección. Cada material se servirá desde el
 * almacenamiento privado con una URL firmada y de corta duración, generada
 * en el servidor tras comprobar el acceso del alumno; por eso aquí solo se
 * listan (el enlace de descarga llegará con ese backend).
 */
export default function LessonResources({ resources }: LessonResourcesProps) {
  if (resources.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-campus-line-strong px-5 py-4 text-sm text-campus-subtle">
        Esta lección todavía no tiene materiales.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {resources.map((resource) => {
        const { label, icon: Icon } = KIND[resource.kind];
        return (
          <li key={resource.id} className="flex items-center gap-4 rounded-xl border border-campus-line bg-campus-surface px-4 py-3.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-campus-raised text-campus-gold">
              <Icon size={17} strokeWidth={1.5} aria-hidden />
            </span>
            <span className="min-w-0 flex-1 truncate text-[15px] text-campus-ink">{resource.title}</span>
            <span className={`${monoLabel} text-campus-subtle`}>{label}</span>
          </li>
        );
      })}
    </ul>
  );
}
