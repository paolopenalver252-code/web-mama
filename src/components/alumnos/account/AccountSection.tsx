import type { ReactNode } from "react";
import { panel } from "@/components/alumnos/ui/styles";

type AccountSectionProps = {
  id: string;
  title: string;
  description: ReactNode;
  children: ReactNode;
};

/**
 * Sección de configuración: título y explicación a la izquierda, panel a la
 * derecha (apilados en móvil). Añadir "Preferencias", "Notificaciones" o
 * "Certificados" es añadir otra sección igual.
 */
export default function AccountSection({ id, title, description, children }: AccountSectionProps) {
  return (
    <section aria-labelledby={id} className="grid grid-cols-1 gap-5 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
      <div className="flex flex-col gap-2 lg:pt-6">
        <h2 id={id} className="text-lg font-medium text-campus-ink">
          {title}
        </h2>
        <div className="text-sm leading-relaxed text-campus-muted">{description}</div>
      </div>
      <div className={`${panel} p-5 sm:p-8`}>{children}</div>
    </section>
  );
}
