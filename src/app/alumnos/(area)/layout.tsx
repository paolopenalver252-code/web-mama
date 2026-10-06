import CampusShell from "@/components/alumnos/layout/CampusShell";
import { courseTone } from "@/components/alumnos/courses/CourseVisual";
import { getAccessibleCourses, requireSession } from "@/lib/alumnos/server/dal";

/**
 * Estructura común de todas las pantallas privadas. La comprobación de
 * sesión de aquí impide pintar el armazón sin sesión, pero NO es la
 * protección principal: los layouts no se vuelven a ejecutar en cada
 * navegación, así que cada página llama también a `requireSession()` (y
 * cada Server Action comprueba la sesión por su cuenta).
 */
export default async function AreaLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();
  const courses = await getAccessibleCourses(session);

  // Solo lo imprescindible viaja al componente cliente de la barra lateral.
  const sidebarCourses = courses.map((course) => ({
    slug: course.slug,
    title: course.title,
    tone: courseTone(course),
    placeholder: Boolean(course.placeholder),
  }));
  const account =
    session.kind === "student"
      ? { label: session.email, initial: session.email.charAt(0).toUpperCase() }
      : { label: "Vista previa", initial: "·" };

  return (
    <CampusShell preview={session.kind === "preview"} courses={sidebarCourses} account={account}>
      {children}
    </CampusShell>
  );
}
