import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import CourseTile from "@/components/alumnos/courses/CourseTile";
import FeaturedCourse from "@/components/alumnos/courses/FeaturedCourse";
import EmptyState from "@/components/alumnos/ui/EmptyState";
import PageHeader from "@/components/alumnos/ui/PageHeader";
import { buttonStyles, monoLabel } from "@/components/alumnos/ui/styles";
import { pickFeaturedCourse } from "@/lib/alumnos/catalog/helpers";
import { alumnosRoutes } from "@/lib/alumnos/routes";
import { getCoursesWithProgress, getStudentProfile, requireSession } from "@/lib/alumnos/server/dal";

export const metadata: Metadata = {
  title: "Inicio",
};

/**
 * Inicio del campus — "tu espacio de aprendizaje": bienvenida, una
 * formación protagonista a gran formato y, debajo, el resto de formaciones.
 */
export default async function AlumnosDashboardPage() {
  const session = await requireSession();
  const [profile, entries] = await Promise.all([getStudentProfile(session), getCoursesWithProgress(session)]);

  // El nombre solo aparece si existe en la base de datos; sin él, el saludo
  // queda en "Bienvenido/a" en lugar de usar un nombre inventado.
  const greeting = profile?.firstName ? `Bienvenido/a, ${profile.firstName}` : "Bienvenido/a";
  const featured = pickFeaturedCourse(entries);
  const others = entries.filter((entry) => entry.course.slug !== featured?.course.slug);

  return (
    <div className="campus-enter mx-auto flex w-full max-w-6xl flex-col gap-14 sm:gap-20">
      <PageHeader
        eyebrow="Campus PSAI FLOW"
        title={greeting}
        description={<p>Tu espacio de aprendizaje en PSAI FLOW ACADEMY.</p>}
      />

      {featured ? (
        <FeaturedCourse course={featured.course} progress={featured.progress} mode={featured.mode} />
      ) : (
        <EmptyState
          title="Todavía no tienes formaciones"
          description="Cuando la Academia te asigne una formación, aparecerá aquí."
        />
      )}

      {others.length > 0 ? (
        <section aria-labelledby="mis-formaciones">
          <div className="mb-6 flex items-end justify-between gap-4 border-b border-campus-line pb-5">
            <div>
              <p className={`${monoLabel} text-campus-subtle`}>Biblioteca</p>
              <h2 id="mis-formaciones" className="mt-2 text-2xl font-medium tracking-tight text-campus-ink sm:text-[1.75rem]">
                Mis formaciones
              </h2>
            </div>
            <Link href={alumnosRoutes.courses} className={buttonStyles.text}>
              Ver todas
              <ArrowRight size={16} strokeWidth={1.75} aria-hidden />
            </Link>
          </div>
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {others.map(({ course, progress }) => (
              <li key={course.slug} className="flex">
                <CourseTile course={course} progress={progress} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section
        aria-labelledby="ayuda"
        className="flex flex-col gap-4 border-t border-campus-line pt-8 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h2 id="ayuda" className="text-base font-medium text-campus-ink">
            ¿Necesitas ayuda con tu formación?
          </h2>
          <p className="mt-1 text-sm text-campus-muted">El equipo de la Academia te atiende personalmente.</p>
        </div>
        <Link href="/contacto#formulario-contacto" className={`${buttonStyles.secondary} self-start sm:self-auto`}>
          Escribir a la Academia
          <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden />
        </Link>
      </section>
    </div>
  );
}
