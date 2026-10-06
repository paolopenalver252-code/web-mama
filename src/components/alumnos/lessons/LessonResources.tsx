import { Download, FileText, Headphones, Link2, type LucideIcon } from "lucide-react";
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
 * almacenamiento privado con una URL firmada y de corta duración,
 * generada en el servidor tras comprobar el acceso del alumno; por eso
 * aquí solo se listan (el enlace de descarga llegará con ese backend).
 */
export default function LessonResources({ resources }: LessonResourcesProps) {
  if (resources.length === 0) {
    return <p className="text-sm text-ink-subtle">Esta lección todavía no tiene materiales.</p>;
  }

  return (
    <ul className="border-t border-primary/10">
      {resources.map((resource) => {
        const { label, icon: Icon } = KIND[resource.kind];
        return (
          <li key={resource.id} className="flex items-center gap-3 border-b border-primary/10 py-4">
            <Icon size={18} strokeWidth={1.5} aria-hidden className="shrink-0 text-accent-text" />
            <span className="min-w-0 flex-1 text-[15px] text-primary">{resource.title}</span>
            <span className="text-xs uppercase tracking-[0.14em] text-ink-subtle">{label}</span>
          </li>
        );
      })}
    </ul>
  );
}
