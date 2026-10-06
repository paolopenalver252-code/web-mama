import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageHeader from "@/components/alumnos/ui/PageHeader";
import { alumnosRoutes } from "@/lib/alumnos/routes";

/**
 * 404 dentro del área privada. Se usa tanto para lo que no existe como para
 * lo que existe pero no pertenece al alumno: los dos casos responden igual.
 */
export default function AreaNotFound() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Área de alumnos"
        title="No encontramos esta página"
        description={<p>Puede que el enlace no sea correcto o que este contenido no esté disponible en tu cuenta.</p>}
      />
      <Link
        href={alumnosRoutes.courses}
        className="inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-medium text-primary transition-colors duration-300 hover:text-accent-text"
      >
        <ArrowLeft size={16} strokeWidth={1.5} aria-hidden />
        Ir a Mis formaciones
      </Link>
    </div>
  );
}
