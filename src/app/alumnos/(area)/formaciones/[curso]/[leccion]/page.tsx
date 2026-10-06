import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import LessonCompletion from "@/components/alumnos/lessons/LessonCompletion";
import LessonPager from "@/components/alumnos/lessons/LessonPager";
import LessonResources from "@/components/alumnos/lessons/LessonResources";
import LessonVideo from "@/components/alumnos/lessons/LessonVideo";
import Breadcrumbs from "@/components/alumnos/ui/Breadcrumbs";
import PageHeader from "@/components/alumnos/ui/PageHeader";
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

export default async function LeccionPage({ params }: Props) {
  const { curso, leccion } = await params;
  const session = await requireSession();
  const course = await requireCourse(session, curso);
  const { location, previous, next } = locateLesson(course, leccion);
  const progress = await getCourseProgress(session, course.slug);
  const { lesson, module, moduleIndex, lessonNumber } = location;
  const duration = formatDuration(lesson.durationSeconds);

  return (
    <article className="flex flex-col gap-10 sm:gap-12">
      <PageHeader
        before={
          <Breadcrumbs
            trail={[
              { label: "Mis formaciones", href: alumnosRoutes.courses },
              { label: course.title, href: alumnosRoutes.course(course.slug) },
            ]}
            current={lesson.title}
          />
        }
        eyebrow={`${module.label} ${formatOrder(moduleIndex + 1)} · Lección ${formatOrder(lessonNumber)}`}
        title={<span className={lesson.placeholder ? "text-primary/55" : undefined}>{lesson.title}</span>}
      />

      <LessonVideo video={lesson.video} title={lesson.title} />

      <dl className="grid grid-cols-2 gap-x-8 gap-y-5 border-b border-primary/10 pb-6 sm:flex sm:gap-x-14">
        <div className="flex flex-col gap-1">
          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-subtle">Duración</dt>
          <dd className={`text-[15px] ${duration ? "text-primary" : "text-ink-subtle"}`}>{duration ?? "Pendiente"}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-subtle">Estado</dt>
          <dd className="text-[15px] text-ink-subtle">
            {progress.tracking
              ? progress.completedLessonSlugs.includes(lesson.slug)
                ? "Completada"
                : "Sin completar"
              : "Sin registrar"}
          </dd>
        </div>
      </dl>

      <section aria-labelledby="leccion-descripcion" className="flex flex-col gap-4">
        <h2 id="leccion-descripcion" className="font-heading text-2xl leading-tight text-primary sm:text-3xl">
          Sobre esta lección
        </h2>
        {lesson.description ? (
          <p className="max-w-2xl text-ink-muted text-body">{lesson.description}</p>
        ) : (
          <p className="text-sm text-ink-subtle">Descripción pendiente de incorporar.</p>
        )}
      </section>

      <section aria-labelledby="leccion-materiales" className="flex flex-col gap-4">
        <h2 id="leccion-materiales" className="font-heading text-2xl leading-tight text-primary sm:text-3xl">
          Materiales
        </h2>
        <LessonResources resources={lesson.resources} />
      </section>

      <LessonCompletion progress={progress} lessonSlug={lesson.slug} />

      <div className="flex flex-col gap-6">
        <LessonPager courseSlug={course.slug} previous={previous} next={next} />
        <Link
          href={alumnosRoutes.course(course.slug)}
          className="inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-medium text-ink-muted transition-colors duration-300 hover:text-primary"
        >
          <ArrowLeft size={16} strokeWidth={1.5} aria-hidden />
          Volver al contenido de la formación
        </Link>
      </div>
    </article>
  );
}
