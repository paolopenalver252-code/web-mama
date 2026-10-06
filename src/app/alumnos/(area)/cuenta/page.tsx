import type { Metadata } from "next";
import AccountSection from "@/components/alumnos/account/AccountSection";
import ChangePasswordForm from "@/components/alumnos/forms/ChangePasswordForm";
import SignOutButton from "@/components/alumnos/layout/SignOutButton";
import PageHeader from "@/components/alumnos/ui/PageHeader";
import { monoLabel } from "@/components/alumnos/ui/styles";
import { getStudentProfile, requireSession } from "@/lib/alumnos/server/dal";

export const metadata: Metadata = {
  title: "Mi cuenta",
};

/**
 * Mi cuenta. El correo viene de la cuenta de Supabase Auth del alumno;
 * nombre y apellidos, de la futura tabla `students` (hasta entonces se
 * muestran como pendientes, nunca inventados). Teléfono, foto, preferencias
 * o certificados se añadirán como nuevas filas o secciones.
 */
export default async function MiCuentaPage() {
  const session = await requireSession();
  const profile = await getStudentProfile(session);
  const isPreview = session.kind === "preview";

  const personalData = [
    { label: "Nombre", value: profile?.firstName ?? null },
    { label: "Apellidos", value: profile?.lastName ?? null },
    { label: "Correo electrónico", value: profile?.email ?? null },
  ];
  const missingData = personalData.some((item) => !item.value);
  const identity = profile?.email ?? "Vista previa";

  return (
    <div className="campus-enter mx-auto flex w-full max-w-5xl flex-col gap-12 sm:gap-16">
      <PageHeader eyebrow="Configuración" title="Mi cuenta" />

      <div className="-mt-4 flex items-center gap-4 border-y border-campus-line py-5 sm:-mt-6">
        <span
          aria-hidden
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-campus-raised font-campus-mono text-lg text-campus-ink ring-1 ring-campus-line-strong"
        >
          {profile?.email ? profile.email.charAt(0).toUpperCase() : "·"}
        </span>
        <div className="min-w-0">
          <p className="truncate text-base font-medium text-campus-ink">{identity}</p>
          <p className={`${monoLabel} mt-1 text-campus-subtle`}>{isPreview ? "Sin cuenta conectada" : "Cuenta de alumno"}</p>
        </div>
      </div>

      <AccountSection
        id="datos-personales"
        title="Datos personales"
        description={
          isPreview ? (
            <p>Vista previa de desarrollo: no hay ninguna cuenta real conectada.</p>
          ) : missingData ? (
            <p>Los datos pendientes se completarán más adelante desde la Academia.</p>
          ) : (
            <p>Los datos asociados a tu cuenta de alumno.</p>
          )
        }
      >
        <dl className="-my-4 divide-y divide-campus-line">
          {personalData.map((item) => (
            <div key={item.label} className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
              <dt className="text-sm text-campus-subtle">{item.label}</dt>
              <dd className={`min-w-0 break-words text-[15px] ${item.value ? "text-campus-ink" : "text-campus-subtle"}`}>
                {item.value ?? (isPreview ? "No disponible" : "Pendiente")}
              </dd>
            </div>
          ))}
        </dl>
      </AccountSection>

      <AccountSection
        id="seguridad"
        title="Seguridad"
        description={<p>Te pediremos tu contraseña actual antes de cambiarla. Al cambiarla, se cerrarán tus otras sesiones abiertas.</p>}
      >
        <h3 className="text-base font-medium text-campus-ink">Cambiar contraseña</h3>
        <div className="mt-6 max-w-md">
          <ChangePasswordForm />
        </div>
      </AccountSection>

      <AccountSection id="sesion" title="Sesión" description={<p>Cierra la sesión en este dispositivo.</p>}>
        <SignOutButton variant="button" />
      </AccountSection>
    </div>
  );
}
