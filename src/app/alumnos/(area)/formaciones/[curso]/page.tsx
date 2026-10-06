import type { Metadata } from "next";
import CourseHero from "@/components/alumnos/courses/CourseHero";
import ModuleList from "@/components/alumnos/courses/ModuleList";
import Breadcrumbs from "@/components/alumnos/ui/Breadcrumbs";
import { monoLabel } from "@/components/alumnos/ui/styles";
import { alumnosRoutes } from "@/lib/alumnos/routes";
import { getCourseProgress, requireCourse, requireSession } from "@/lib/alumnos/server/dal";

type Props = {
  params: Promise<{ curso: string }>;
};

// Los metadatos también pasan por la DAL: el título de una formación no
// debe llegar a quien no tenga acceso a ella.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { curso } = await params;
  const session = await requireSession();
  const course = await requireCourse(session, curso);
  return { title: course.title };
}

export default async function FormacionPage({ params }: Props) {
  const { curso } = await params;
  const session = await requireSession();
  const course = await requireCourse(session, curso);
  const progress = await getCourseProgress(session, course.slug);

  return (
    <div className="campus-enter mx-auto flex w-full max-w-6xl flex-col gap-6">
      <Breadcrumbs trail={[{ label: "Mis formaciones", href: alumnosRoutes.courses }]} current={course.title} />

      <CourseHero course={course} progress={progress} />

      <section id="recorrido" aria-labelledby="recorrido-titulo" className="mt-10 scroll-mt-24 sm:mt-14">
        <div className="mb-6 flex flex-col gap-2 border-b border-campus-line pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={`${monoLabel} text-campus-subtle`}>Contenido de la formación</p>
            <h2 id="recorrido-titulo" className="mt-2 text-2xl font-medium tracking-tight text-campus-ink sm:text-[1.75rem]">
              Tu recorrido
            </h2>
          </div>
        </div>
        <div className="max-w-4xl">
          <ModuleList course={course} progress={progress} />
        </div>
      </section>
    </div>
  );
}
