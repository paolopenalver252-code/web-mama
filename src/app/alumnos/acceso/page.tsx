import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import CampusBrand from "@/components/alumnos/layout/CampusBrand";
import FormMessage from "@/components/alumnos/forms/FormMessage";
import LoginForm from "@/components/alumnos/forms/LoginForm";
import BrandMotif from "@/components/alumnos/ui/BrandMotif";
import { monoLabel } from "@/components/alumnos/ui/styles";
import { alumnosRoutes } from "@/lib/alumnos/routes";
import { getSession, isAuthConfigured } from "@/lib/alumnos/server/dal";

export const metadata: Metadata = {
  title: "Acceso",
  description: "Acceso al campus privado de alumnos de PSAI FLOW ACADEMY.",
};

/**
 * Pantalla de acceso — la puerta del campus. Pública por definición: es la
 * única ruta de /alumnos que no exige sesión. Escritorio: panel de marca a
 * la izquierda y acceso a la derecha. Móvil: directo al formulario.
 */
export default async function AccesoPage() {
  const session = await getSession();
  // Con una sesión real ya iniciada, no tiene sentido volver a pedir acceso.
  // (La vista previa de desarrollo no cuenta: aquí se revisa esta pantalla.)
  if (session?.kind === "student") redirect(alumnosRoutes.dashboard);

  const authConfigured = isAuthConfigured();
  const preview = session?.kind === "preview";

  return (
    <div className="grid min-h-dvh flex-1 grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      {/* Panel de marca — escritorio */}
      <aside className="relative hidden flex-col justify-between overflow-hidden border-r border-campus-line px-12 py-11 lg:flex xl:px-16">
        <BrandMotif className="pointer-events-none absolute -right-[38%] top-1/2 w-[125%] max-w-none -translate-y-1/2 text-campus-ink/[0.07]" />
        <div className="relative">
          <CampusBrand href="/" />
        </div>

        <div className="relative flex max-w-lg flex-col gap-6">
          <p className={`${monoLabel} text-campus-gold`}>Campus de alumnos</p>
          <p className="font-heading text-[3.4rem] leading-[1.02] text-campus-ink xl:text-[4.2rem]">
            Tu espacio de aprendizaje.
          </p>
          <p className="max-w-sm text-base leading-relaxed text-campus-muted">
            Acceso privado para alumnos de PSAI FLOW ACADEMY.
          </p>
        </div>

        <Link
          href="/"
          className="relative inline-flex min-h-11 items-center gap-2 self-start text-sm text-campus-muted transition-colors duration-300 hover:text-campus-ink"
        >
          <ArrowLeft size={16} strokeWidth={1.75} aria-hidden />
          Volver a psaiflow.com
        </Link>
      </aside>

      {/* Acceso */}
      <main className="flex flex-col bg-campus-surface px-5 py-5 sm:px-10 sm:py-8 lg:px-16">
        <div className="flex items-center justify-between gap-4 lg:hidden">
          <CampusBrand href="/" />
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm text-campus-muted transition-colors duration-300 hover:text-campus-ink"
          >
            <ArrowLeft size={16} strokeWidth={1.75} aria-hidden />
            Web
            <span className="sr-only">: volver a psaiflow.com</span>
          </Link>
        </div>

        <div className="campus-enter mx-auto flex w-full max-w-[25rem] flex-1 flex-col justify-center py-12 sm:py-16">
          <p className={`${monoLabel} inline-flex items-center gap-2 text-campus-gold`}>
            <LockKeyhole size={13} strokeWidth={1.75} aria-hidden />
            Acceso privado
          </p>
          <h1 className="mt-4 font-heading text-[2.6rem] leading-[1.04] text-campus-ink sm:text-[3rem]">
            Entra en tu campus
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-campus-muted">
            Con el correo electrónico y la contraseña de tu cuenta de alumno.
          </p>

          {!authConfigured ? (
            <div className="mt-8">
              <FormMessage tone="info">
                El acceso de alumnos todavía no está activado. Si ya estás formándote con nosotros y necesitas
                tu material,{" "}
                <Link href="/contacto#formulario-contacto" className="font-medium underline underline-offset-2 hover:text-campus-gold">
                  escríbenos
                </Link>
                .
              </FormMessage>
            </div>
          ) : null}

          <div className="mt-9">
            <LoginForm />
          </div>

          <p className="mt-8 border-t border-campus-line pt-6 text-sm leading-relaxed text-campus-subtle">
            Las cuentas de alumno las crea la Academia. ¿Aún no tienes acceso?{" "}
            <Link href="/contacto#formulario-contacto" className="text-campus-muted underline underline-offset-2 hover:text-campus-ink">
              Escríbenos
            </Link>
            .
          </p>

          {preview ? (
            <div className="mt-8 rounded-xl border border-dashed border-campus-gold/40 p-4">
              <p className="text-xs leading-relaxed text-campus-muted">
                Vista previa de desarrollo (ALUMNOS_PREVIEW=1). No es un acceso: no comprueba ninguna cuenta y no
                existe en producción.
              </p>
              <Link
                href={alumnosRoutes.dashboard}
                className="mt-2 inline-flex min-h-11 items-center text-sm font-medium text-campus-gold underline underline-offset-4"
              >
                Abrir la vista previa del campus
              </Link>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
