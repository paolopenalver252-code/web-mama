import type { Metadata } from "next";
import CourseContents from "@/components/alumnos/courses/CourseContents";
import Breadcrumbs from "@/components/alumnos/ui/Breadcrumbs";
import PageHeader from "@/components/alumnos/ui/PageHeader";
import PendingTag from "@/components/alumnos/ui/PendingTag";
import { COURSE_STATUS_LABEL, formatOrder } from "@/lib/alumnos/catalog/helpers";
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
    <div className="flex flex-col gap-14 sm:gap-16">
      <PageHeader
        before={<Breadcrumbs trail={[{ label: "Mis formaciones", href: alumnosRoutes.courses }]} current={course.title} />}
        eyebrow={`Formación ${formatOrder(course.order)}`}
        title={<span className={course.placeholder ? "text-primary/55" : undefined}>{course.title}</span>}
        description={
          <>
            {course.subtitle ? <p className="font-medium text-primary">{course.subtitle}</p> : null}
            {course.description ? (
              <p className={course.subtitle ? "mt-3" : undefined}>{course.description}</p>
            ) : (
              <p className={`text-ink-subtle ${course.subtitle ? "mt-3" : ""}`}>Descripción pendiente de incorporar.</p>
            )}
          </>
        }
      />

      <dl className="grid grid-cols-1 gap-y-5 border-y border-primary/10 py-6 sm:grid-cols-2 sm:gap-x-10">
        <div className="flex flex-col gap-1">
          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-subtle">Estado</dt>
          <dd className="flex flex-wrap items-center gap-2 text-[15px] text-primary">
            {COURSE_STATUS_LABEL[course.status]}
            {course.placeholder ? <PendingTag>Nombre pendiente</PendingTag> : null}
          </dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-subtle">Tu progreso</dt>
          <dd className="text-[15px] text-primary">
            {progress.tracking ? (
              `${progress.completedLessonSlugs.length} lecciones completadas`
            ) : (
              <span className="text-ink-subtle">Sin registrar todavía</span>
            )}
          </dd>
        </div>
      </dl>

      <section aria-labelledby="contenido-formacion" className="flex flex-col gap-8">
        <h2 id="contenido-formacion" className="font-heading text-3xl leading-tight text-primary">
          Contenido de la formación
        </h2>
        <CourseContents course={course} />
      </section>
    </div>
  );
}
