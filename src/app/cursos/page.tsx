import type { Metadata } from "next";
import { getFeaturedCourse } from "@/lib/courses";
import DetailHero from "@/components/sections/curso-detalle/DetailHero";
import WhyThisCourse from "@/components/sections/curso-detalle/WhyThisCourse";
import WhatYouLearn from "@/components/sections/curso-detalle/WhatYouLearn";
import CourseInfoBand from "@/components/sections/curso-detalle/CourseInfoBand";
import ContinuityTimeline from "@/components/sections/curso-detalle/ContinuityTimeline";
import OtherCoursesSection from "@/components/sections/curso-detalle/OtherCoursesSection";
import FinalCta from "@/components/sections/FinalCta";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, courseSchema, jsonLdGraph } from "@/lib/schema";

export const metadata: Metadata = buildPageMetadata({
  title: "Cursos — Curso de Magia Universal Cuántica",
  description:
    "Formación profesional de 6 meses en Magia Universal Cuántica: fundamentos, protección energética, radiestesia y más, con certificado incluido.",
  path: "/cursos",
});

export default function CursosPage() {
  const course = getFeaturedCourse();

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          courseSchema(course),
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Cursos", path: "/cursos" },
          ])
        )}
      />
      <DetailHero
        course={{ category: course.category, title: course.title, level: course.level, summary: course.summary }}
        showBackLink={false}
      />
      <WhyThisCourse />
      <WhatYouLearn course={course} />
      <CourseInfoBand course={course} />
      <ContinuityTimeline course={course} />
      <OtherCoursesSection />
      <FinalCta
        heading="Da el siguiente paso"
        description="Solicita información o reserva una entrevista antes de inscribirte: te ayudamos a resolver cualquier duda."
        primaryCta={{ label: "Solicitar información", href: "/contacto" }}
        secondaryCta={{ label: "Reservar una entrevista", href: "/consultas" }}
      />
    </>
  );
}
