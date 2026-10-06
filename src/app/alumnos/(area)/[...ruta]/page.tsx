import { notFound } from "next/navigation";
import { requireSession } from "@/lib/alumnos/server/dal";

/**
 * Cualquier URL desconocida bajo /alumnos: sin sesión se va a la pantalla
 * de acceso (no se revela nada); con sesión, 404 dentro del área.
 */
export default async function AlumnosCatchAll() {
  await requireSession();
  notFound();
}
