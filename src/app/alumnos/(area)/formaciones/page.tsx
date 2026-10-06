import type { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import CourseIndex from "@/components/alumnos/courses/CourseIndex";
import PageHeader from "@/components/alumnos/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import { getAccessibleCourses, requireSession } from "@/lib/alumnos/server/dal";

export const metadata: Metadata = {
  title: "Mis formaciones",
};

export default async function MisFormacionesPage() {
  const session = await requireSession();
  const courses = await getAccessibleCourses(session);

  return (
    <div className="flex flex-col gap-12">
      <PageHeader
        eyebrow="Área de alumnos"
        title="Mis formaciones"
        description={<p>Las formaciones a las que tienes acceso. Entra en cada una para ver su contenido.</p>}
      />
      {courses.length > 0 ? (
        <CourseIndex courses={courses} />
      ) : (
        <EmptyState
          icon={GraduationCap}
          title="Todavía no tienes formaciones"
          description="Cuando se te asigne una formación, aparecerá aquí."
        />
      )}
    </div>
  );
}
