import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CourseIndex from "@/components/alumnos/courses/CourseIndex";
import PageHeader from "@/components/alumnos/ui/PageHeader";
import { alumnosRoutes } from "@/lib/alumnos/routes";
import { getAccessibleCourses, getStudentProfile, requireSession } from "@/lib/alumnos/server/dal";

export const metadata: Metadata = {
  title: "Inicio",
};

export default async function AlumnosDashboardPage() {
  const session = await requireSession();
  const [profile, courses] = await Promise.all([getStudentProfile(session), getAccessibleCourses(session)]);

  // El nombre solo aparece si existe en la base de datos; sin él, el saludo
  // queda en "Bienvenido/a" en lugar de usar un nombre inventado.
  const greeting = profile?.firstName ? `Bienvenido/a, ${profile.firstName}` : "Bienvenido/a";

  return (
    <div className="flex flex-col gap-16 sm:gap-20">
      <PageHeader
        eyebrow="Área de alumnos"
        title={greeting}
        description={
          <p>
            Este es tu espacio privado en PSAI FLOW ACADEMY. Desde aquí accedes a tus formaciones y a la
            configuración de tu cuenta.
          </p>
        }
      />

      <section aria-labelledby="dashboard-formaciones">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 id="dashboard-formaciones" className="font-heading text-3xl leading-tight text-primary">
            Mis formaciones
          </h2>
          <Link
            href={alumnosRoutes.courses}
            className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors duration-300 hover:text-accent-text"
          >
            Ver todas
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden />
          </Link>
        </div>
        {courses.length > 0 ? (
          <CourseIndex courses={courses} headingLevel="h3" />
        ) : (
          <p className="border-t border-primary/10 pt-6 text-ink-muted text-body">
            Todavía no tienes formaciones asignadas.
          </p>
        )}
      </section>

      <section aria-labelledby="dashboard-cuenta" className="border-t border-primary/10 pt-10">
        <h2 id="dashboard-cuenta" className="font-heading text-3xl leading-tight text-primary">
          Mi cuenta
        </h2>
        <p className="mt-3 text-ink-muted text-body">Tus datos personales y la seguridad de tu acceso.</p>
        <Link
          href={alumnosRoutes.account}
          className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primary transition-colors duration-300 hover:text-accent-text"
        >
          Ir a Mi cuenta
          <ArrowRight size={16} strokeWidth={1.5} aria-hidden />
        </Link>
      </section>
    </div>
  );
}
