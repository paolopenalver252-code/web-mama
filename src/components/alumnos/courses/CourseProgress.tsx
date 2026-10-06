import type { ProgressSummary } from "@/lib/alumnos/catalog/helpers";
import { monoLabel } from "@/components/alumnos/ui/styles";

type CourseProgressProps = {
  summary: ProgressSummary | null;
  className?: string;
};

/**
 * Progreso de una formación. Solo pinta una barra y un porcentaje cuando
 * hay datos reales (`summary`); si no, lo dice — nunca un 0 % ni un valor
 * inventado que pueda leerse como dato.
 */
export default function CourseProgress({ summary, className = "" }: CourseProgressProps) {
  if (!summary) {
    return <p className={`${monoLabel} text-campus-subtle ${className}`}>Progreso · aún sin registrar</p>;
  }

  const label = `${summary.completed} de ${summary.total} ${summary.total === 1 ? "lección" : "lecciones"}`;
  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm text-campus-muted">{label}</span>
        <span className="font-campus-mono text-sm text-campus-ink">{summary.percent}%</span>
      </div>
      <div
        role="progressbar"
        aria-label="Progreso de la formación"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={summary.percent}
        aria-valuetext={label}
        className="h-1 overflow-hidden rounded-full bg-campus-line-strong"
      >
        <div className="h-full origin-left rounded-full bg-campus-accent" style={{ scale: `${summary.percent / 100} 1` }} />
      </div>
    </div>
  );
}
