import type { Metadata } from "next";
import CourseRow from "@/components/alumnos/courses/CourseRow";
import EmptyState from "@/components/alumnos/ui/EmptyState";
import PageHeader from "@/components/alumnos/ui/PageHeader";
import { monoLabel } from "@/components/alumnos/ui/styles";
import { getLearningState, type LearningState } from "@/lib/alumnos/catalog/helpers";
import { getCoursesWithProgress, requireSession } from "@/lib/alumnos/server/dal";

export const metadata: Metadata = {
  title: "Mis formaciones",
};

/** Agrupación por estado real; "untracked" (sin progreso) va sin encabezado. */
const GROUPS: { state: LearningState; label: string | null }[] = [
  { state: "in_progress", label: "En curso" },
  { state: "not_started", label: "Sin empezar" },
  { state: "completed", label: "Completadas" },
  { state: "untracked", label: null },
];

export default async function MisFormacionesPage() {
  const session = await requireSession();
  const entries = await getCoursesWithProgress(session);

  const groups = GROUPS.map((group) => ({
    ...group,
    entries: entries.filter((entry) => getLearningState(entry.course, entry.progress) === group.state),
  })).filter((group) => group.entries.length > 0);
  const showGroupLabels = groups.length > 1;

  return (
    <div className="campus-enter mx-auto flex w-full max-w-5xl flex-col gap-10 sm:gap-14">
      <PageHeader
        eyebrow="Biblioteca"
        title="Mis formaciones"
        description={<p>Todas las formaciones a las que tienes acceso. Entra en cada una para ver su recorrido.</p>}
      />

      {groups.length === 0 ? (
        <EmptyState
          title="Todavía no tienes formaciones"
          description="Cuando la Academia te asigne una formación, aparecerá aquí."
        />
      ) : (
        groups.map((group) => (
          <section key={group.state} aria-label={group.label ?? "Formaciones"}>
            {showGroupLabels && group.label ? (
              <h2 className={`${monoLabel} mb-1 text-campus-subtle`}>
                {group.label} · {group.entries.length}
              </h2>
            ) : null}
            <ul className="border-t border-campus-line">
              {group.entries.map(({ course, progress }) => (
                <li key={course.slug}>
                  <CourseRow course={course} progress={progress} />
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
