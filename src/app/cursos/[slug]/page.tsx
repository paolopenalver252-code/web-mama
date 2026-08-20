import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COURSES, getCourseBySlug } from "@/lib/courses";
import DetailHero from "@/components/sections/curso-detalle/DetailHero";
import WhyThisCourse from "@/components/sections/curso-detalle/WhyThisCourse";
import WhatYouLearn from "@/components/sections/curso-detalle/WhatYouLearn";
import CourseInfoBand from "@/components/sections/curso-detalle/CourseInfoBand";
import ContinuityTimeline from "@/components/sections/curso-detalle/ContinuityTimeline";
import InstructorSection from "@/components/sections/curso-detalle/InstructorSection";
import Pricing from "@/components/sections/curso-detalle/Pricing";
import OtherCoursesSection from "@/components/sections/curso-detalle/OtherCoursesSection";
import FinalCta from "@/components/sections/FinalCta";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, courseSchema, jsonLdGraph } from "@/lib/schema";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return COURSES.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};
  return buildPageMetadata({
    title: course.title,
    description: `${course.summary} Duración: ${course.duration}. Modalidad: ${course.modality}.`,
    path: `/cursos/${slug}`,
  });
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          courseSchema(course),
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Cursos", path: "/cursos" },
            { name: course.title, path: `/cursos/${course.slug}` },
          ])
        )}
      />
      <DetailHero course={course} />
      <WhyThisCourse />
      <WhatYouLearn course={course} />
      <CourseInfoBand course={course} />
      <ContinuityTimeline course={course} />
      <InstructorSection course={course} />
      <Pricing course={course} />
      <OtherCoursesSection />
      <FinalCta
        heading={`Empieza ${course.title}`}
        description="Reserva tu plaza o resuelve tus dudas antes de inscribirte."
        primaryCta={{ label: "Inscribirme", href: "/contacto" }}
        secondaryCta={{ label: "Ver otros cursos", href: "/cursos" }}
      />
    </>
  );
}
