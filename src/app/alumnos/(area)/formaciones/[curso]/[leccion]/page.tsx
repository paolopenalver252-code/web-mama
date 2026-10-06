import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LessonCompletion from "@/components/alumnos/lessons/LessonCompletion";
import LessonMobileBar from "@/components/alumnos/lessons/LessonMobileBar";
import LessonOutline from "@/components/alumnos/lessons/LessonOutline";
import LessonPager from "@/components/alumnos/lessons/LessonPager";
import LessonPlayer from "@/components/alumnos/lessons/LessonPlayer";
import LessonResources from "@/components/alumnos/lessons/LessonResources";
import Breadcrumbs from "@/components/alumnos/ui/Breadcrumbs";
import { monoLabel } from "@/components/alumnos/ui/styles";
import { flattenLessons, formatDuration, formatOrder } from "@/lib/alumnos/catalog/helpers";
import type { Course } from "@/lib/alumnos/catalog/types";
import { alumnosRoutes } from "@/lib/alumnos/routes";
import { getCourseProgress, requireCourse, requireSession } from "@/lib/alumnos/server/dal";

type Props = {
  params: Promise<{ curso: string; leccion: string }>;
};

function locateLesson(course: Course, lessonSlug: string) {
  const lessons = flattenLessons(course);
  const index = lessons.findIndex((item) => item.lesson.slug === lessonSlug);
  if (index === -1) notFound();
  return {
    location: lessons[index],
    previous: lessons[index - 1]?.lesson ?? null,
    next: lessons[index + 1]?.lesson ?? null,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { curso, leccion } = await params;
  const session = await requireSession();
  const course = await requireCourse(session, curso);
  const { location } = locateLesson(course, leccion);
  return { title: `${location.lesson.title} — ${course.title}` };
}

/**
 * Lección — modo aprendizaje: reproductor grande, ficha de la lección,
 * materiales y, al lado (escritorio ancho) o debajo (resto), el índice de
 * la formación. En móvil, la barra inferior pasa a ser la de la lección.
 */
export default async function LeccionPage({ params }: Props) {
  const { curso, leccion } = await params;
  const session = await requireSession();
  const course = await requireCourse(session, curso);
  const { location, previous, next } = locateLesson(course, leccion);
  const progress = await getCourseProgress(session, course.slug);
  const { lesson, module, moduleIndex, lessonNumber } = location;
  const duration = formatDuration(lesson.durationSeconds);
  const status = progress.tracking
    ? progress.completedLessonSlugs.includes(lesson.slug)
      ? "Completada"
      : "Sin completar"
    : "Sin registrar";

  return (
    <>
      <div className="campus-enter mx-auto flex w-full max-w-[84rem] flex-col gap-6">
        <Breadcrumbs
          trail={[
            { label: "Mis formaciones", href: alumnosRoutes.courses },
            { label: course.title, href: alumnosRoutes.course(course.slug) },
          ]}
          current={lesson.title}
        />

        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_22rem] xl:gap-12">
          <article className="flex min-w-0 flex-col gap-8">
            <LessonPlayer video={lesson.video} title={lesson.title} />

            <header className="flex flex-col gap-6 border-b border-campus-line pb-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex min-w-0 flex-col gap-3">
                <p className={`${monoLabel} text-campus-gold`}>
                  {module.label} {formatOrder(moduleIndex + 1)} · Lección {formatOrder(lessonNumber)}
                </p>
                <h1
                  className={`text-[1.75rem] font-medium leading-tight tracking-tight sm:text-[2.15rem] ${
                    lesson.placeholder ? "text-campus-ink/60" : "text-campus-ink"
                  }`}
                >
                  {lesson.title}
                </h1>
                <dl className="mt-1 flex flex-wrap gap-x-8 gap-y-3">
                  <div className="flex items-baseline gap-2">
                    <dt className={`${monoLabel} text-campus-subtle`}>Duración</dt>
                    <dd className={`text-sm ${duration ? "text-campus-ink" : "text-campus-muted"}`}>{duration ?? "Pendiente"}</dd>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <dt className={`${monoLabel} text-campus-subtle`}>Estado</dt>
                    <dd className="text-sm text-campus-muted">{status}</dd>
                  </div>
                </dl>
              </div>
              <LessonCompletion progress={progress} lessonSlug={lesson.slug} />
            </header>

            <section aria-labelledby="leccion-descripcion" className="flex flex-col gap-3">
              <h2 id="leccion-descripcion" className="text-lg font-medium text-campus-ink">
                Sobre esta lección
              </h2>
              <p className={`max-w-prose text-[15px] leading-relaxed ${lesson.description ? "text-campus-muted" : "text-campus-subtle"}`}>
                {lesson.description ?? "Descripción pendiente de incorporar."}
              </p>
            </section>

            <section aria-labelledby="leccion-materiales" className="flex flex-col gap-4">
              <h2 id="leccion-materiales" className="text-lg font-medium text-campus-ink">
                Materiales
              </h2>
              <LessonResources resources={lesson.resources} />
            </section>

            <div className="hidden lg:block">
              <LessonPager courseSlug={course.slug} previous={previous} next={next} />
            </div>
          </article>

          <aside id="indice" className="scroll-mt-24 xl:sticky xl:top-8 xl:self-start">
            <LessonOutline course={course} progress={progress} activeLessonSlug={lesson.slug} />
          </aside>
        </div>
      </div>

      <LessonMobileBar courseSlug={course.slug} previous={previous} next={next} />
    </>
  );
}
