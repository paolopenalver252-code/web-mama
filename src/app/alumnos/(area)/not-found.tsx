import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageHeader from "@/components/alumnos/ui/PageHeader";
import { buttonStyles } from "@/components/alumnos/ui/styles";
import { alumnosRoutes } from "@/lib/alumnos/routes";

/**
 * 404 dentro del campus. Se usa tanto para lo que no existe como para lo
 * que existe pero no pertenece al alumno: los dos casos responden igual.
 */
export default function AreaNotFound() {
  return (
    <div className="campus-enter mx-auto flex w-full max-w-4xl flex-col gap-8">
      <PageHeader
        eyebrow="Error 404"
        title="No encontramos esta página"
        description={<p>Puede que el enlace no sea correcto o que este contenido no esté disponible en tu cuenta.</p>}
      />
      <Link href={alumnosRoutes.courses} className={`${buttonStyles.secondary} self-start`}>
        <ArrowLeft size={16} strokeWidth={1.75} aria-hidden />
        Ir a Mis formaciones
      </Link>
    </div>
  );
}
