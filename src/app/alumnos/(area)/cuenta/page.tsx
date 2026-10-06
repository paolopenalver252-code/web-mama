import type { Metadata } from "next";
import ChangePasswordForm from "@/components/alumnos/forms/ChangePasswordForm";
import SignOutButton from "@/components/alumnos/layout/SignOutButton";
import PageHeader from "@/components/alumnos/ui/PageHeader";
import { getStudentProfile, requireSession } from "@/lib/alumnos/server/dal";

export const metadata: Metadata = {
  title: "Mi cuenta",
};

/**
 * Mi cuenta. Los datos personales se muestran tal como estén en la base de
 * datos (hoy no hay ninguna conectada, así que aparecen como no
 * disponibles). La edición de datos, la foto, el teléfono y las
 * preferencias se añadirán como nuevas secciones de esta misma página.
 */
export default async function MiCuentaPage() {
  const session = await requireSession();
  const profile = await getStudentProfile(session);
  const sessionEmail = session.kind === "student" ? session.email : null;

  const personalData = [
    { label: "Nombre", value: profile?.firstName ?? null },
    { label: "Apellidos", value: profile?.lastName ?? null },
    { label: "Correo electrónico", value: profile?.email ?? sessionEmail },
  ];

  return (
    <div className="flex flex-col gap-16">
      <PageHeader eyebrow="Área de alumnos" title="Mi cuenta" />

      <section aria-labelledby="datos-personales" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 id="datos-personales" className="font-heading text-3xl leading-tight text-primary">
            Datos personales
          </h2>
          {!profile ? (
            <p className="text-sm text-ink-subtle">
              {session.kind === "preview"
                ? "Vista previa de desarrollo: no hay ninguna cuenta real conectada."
                : "Tus datos aparecerán aquí cuando el área de alumnos esté conectada a su base de datos."}
            </p>
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
                {item.value ?? "No disponible"}
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
