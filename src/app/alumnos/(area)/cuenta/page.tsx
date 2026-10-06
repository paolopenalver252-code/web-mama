import type { Metadata } from "next";
import ChangePasswordForm from "@/components/alumnos/forms/ChangePasswordForm";
import SignOutButton from "@/components/alumnos/layout/SignOutButton";
import PageHeader from "@/components/alumnos/ui/PageHeader";
import { getStudentProfile, requireSession } from "@/lib/alumnos/server/dal";

export const metadata: Metadata = {
  title: "Mi cuenta",
};

/**
 * Mi cuenta. El correo viene de la cuenta de Supabase Auth del alumno;
 * nombre y apellidos, de la futura tabla `students` (hasta entonces se
 * muestran como pendientes, nunca inventados). Teléfono, foto, edición de
 * datos y preferencias se añadirán como nuevas filas o secciones aquí.
 */
export default async function MiCuentaPage() {
  const session = await requireSession();
  const profile = await getStudentProfile(session);

  const personalData = [
    { label: "Nombre", value: profile?.firstName ?? null },
    { label: "Apellidos", value: profile?.lastName ?? null },
    { label: "Correo electrónico", value: profile?.email ?? null },
  ];
  const missingData = personalData.some((item) => !item.value);

  return (
    <div className="flex flex-col gap-16">
      <PageHeader eyebrow="Área de alumnos" title="Mi cuenta" />

      <section aria-labelledby="datos-personales" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 id="datos-personales" className="font-heading text-3xl leading-tight text-primary">
            Datos personales
          </h2>
          {session.kind === "preview" ? (
            <p className="text-sm text-ink-subtle">Vista previa de desarrollo: no hay ninguna cuenta real conectada.</p>
          ) : missingData ? (
            <p className="text-sm text-ink-subtle">Los datos pendientes se completarán más adelante desde la Academia.</p>
          ) : null}
        </div>
        <dl className="border-t border-primary/10">
          {personalData.map((item) => (
            <div
              key={item.label}
              className="grid grid-cols-1 gap-1 border-b border-primary/10 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6"
            >
              <dt className="text-sm font-medium text-ink-muted">{item.label}</dt>
              <dd className={`min-w-0 break-words text-[15px] ${item.value ? "text-primary" : "text-ink-subtle"}`}>
                {item.value ?? (session.kind === "preview" ? "No disponible" : "Pendiente")}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="seguridad" className="flex flex-col gap-6">
        <h2 id="seguridad" className="font-heading text-3xl leading-tight text-primary">
          Seguridad
        </h2>
        <div className="border-t border-primary/10 pt-6">
          <h3 className="font-heading text-2xl leading-tight text-primary">Cambiar contraseña</h3>
          <p className="mt-1.5 text-sm text-ink-muted">
            Por seguridad, te pediremos tu contraseña actual antes de cambiarla.
          </p>
          <div className="mt-6 max-w-md">
            <ChangePasswordForm />
          </div>
        </div>
      </section>

      <section aria-labelledby="sesion" className="flex flex-col gap-4 border-t border-primary/10 pt-8">
        <h2 id="sesion" className="font-heading text-2xl leading-tight text-primary">
          Sesión
        </h2>
        <SignOutButton className="-ml-4" />
      </section>
    </div>
  );
}
