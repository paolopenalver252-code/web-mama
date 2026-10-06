import Link from "next/link";
import { Check, ChevronRight, Play } from "lucide-react";
import { formatDuration, formatOrder } from "@/lib/alumnos/catalog/helpers";
import type { Lesson } from "@/lib/alumnos/catalog/types";

export type LessonItemState = "default" | "completed" | "current";

type LessonItemProps = {
  href: string;
  lesson: Lesson;
  number: number;
  state: LessonItemState;
  /** Página de esta lección abierta ahora mismo (índice lateral). */
  active?: boolean;
  compact?: boolean;
};

/**
 * Fila de lección: indicador de estado (anillo, "reproduciendo" o
 * completada), número, título y duración si se conoce. "completed" y
 * "current" solo llegan con progreso real; sin él, todas son "default".
 */
export default function LessonItem({ href, lesson, number, state, active = false, compact = false }: LessonItemProps) {
  const duration = formatDuration(lesson.durationSeconds);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`group/lesson relative grid grid-cols-[1.75rem_minmax(0,1fr)_auto] items-center gap-3.5 rounded-xl transition-colors duration-300 ${
        compact ? "px-3 py-2.5" : "px-3 py-3.5 sm:px-4"
      } ${active ? "bg-campus-raised" : "hover:bg-campus-raised/70"}`}
    >
      {active ? <span aria-hidden className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-campus-accent" /> : null}

      <span
        aria-hidden
        className={`flex h-7 w-7 items-center justify-center rounded-full ${
          state === "completed"
            ? "bg-campus-accent text-campus-bg"
            : state === "current" || active
              ? "border border-campus-accent text-campus-accent"
              : "border border-campus-line-strong text-campus-subtle"
        }`}
      >
        {state === "completed" ? (
          <Check size={14} strokeWidth={2.25} />
        ) : state === "current" ? (
          <Play size={11} strokeWidth={2} className="translate-x-px fill-current" />
        ) : (
          <span className="font-campus-mono text-[10px]">{formatOrder(number)}</span>
        )}
      </span>

      <span className="flex min-w-0 flex-col gap-0.5">
        <span
          className={`${compact ? "truncate text-sm" : "break-words text-[15px] leading-snug"} ${
            lesson.placeholder ? "text-campus-ink/55" : "text-campus-ink"
          } ${active ? "font-medium" : ""}`}
        >
          {lesson.title}
        </span>
        {state === "completed" ? <span className="sr-only">Completada</span> : null}
        {state === "current" ? <span className="sr-only">Lección por la que continuar</span> : null}
      </span>

      <span className="flex items-center gap-3">
        {duration ? <span className="font-campus-mono text-xs text-campus-subtle">{duration}</span> : null}
        {compact ? null : (
          <ChevronRight
            size={16}
            strokeWidth={1.5}
            aria-hidden
            className="text-campus-subtle transition-[translate,color] duration-300 group-hover/lesson:translate-x-0.5 group-hover/lesson:text-campus-ink"
          />
        )}
      </span>
    </Link>
  );
}
