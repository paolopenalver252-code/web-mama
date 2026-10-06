import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import AreaBrand from "@/components/alumnos/layout/AreaBrand";
import FormMessage from "@/components/alumnos/forms/FormMessage";
import LoginForm from "@/components/alumnos/forms/LoginForm";
import { alumnosRoutes } from "@/lib/alumnos/routes";
import { getSession, isAuthConfigured } from "@/lib/alumnos/server/dal";

export const metadata: Metadata = {
  title: "Acceso",
  description: "Acceso al área privada de alumnos de PSAI FLOW ACADEMY.",
};

/**
 * Pantalla de acceso. Pública por definición: es la única ruta de
 * /alumnos que no exige sesión.
 */
export default async function AccesoPage() {
  const session = await getSession();
  // Con una sesión real ya iniciada, no tiene sentido volver a pedir acceso.
  // (La vista previa de desarrollo no cuenta: aquí se revisa esta pantalla.)
  if (session?.kind === "student") redirect(alumnosRoutes.dashboard);

  const authConfigured = isAuthConfigured();
  const preview = session?.kind === "preview";

  return (
    <div className="grid min-h-dvh flex-1 grid-cols-1 bg-surface lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      {/* Panel de marca — solo escritorio */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-primary px-12 py-12 lg:flex xl:px-16">
        <AreaBrand href="/" tone="dark" />
        <div className="flex flex-col gap-5">
          <span aria-hidden className="h-px w-12 bg-accent" />
          <p className="max-w-sm font-heading text-4xl leading-[1.15] text-white xl:text-5xl">
            Área privada de alumnos
          </p>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">PSAI FLOW ACADEMY</p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 self-start text-sm text-mist-subtle transition-colors duration-300 hover:text-white"
        >
          <ArrowLeft size={16} strokeWidth={1.5} aria-hidden />
          Volver a la web
        </Link>
      </aside>

      {/* Formulario */}
      <main className="flex flex-col px-5 py-8 sm:px-10 sm:py-12 lg:px-16">
        <div className="flex items-center justify-between gap-4 lg:hidden">
          <AreaBrand href="/" />
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm text-ink-muted transition-colors duration-300 hover:text-primary"
          >
            <ArrowLeft size={16} strokeWidth={1.5} aria-hidden />
            Web
            <span className="sr-only">: volver a la web</span>
          </Link>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-text">Área de alumnos</p>
          <h1 className="mt-4 font-heading text-[2.5rem] leading-[1.1] text-primary sm:text-5xl">Acceso alumnos</h1>
          <p className="mt-4 text-ink-muted text-body">
            Entra con el correo electrónico y la contraseña de tu cuenta de alumno.
          </p>

          {!authConfigured ? (
            <div className="mt-8">
              <FormMessage tone="info">
                El acceso de alumnos todavía no está activado. Si ya estás formándote con nosotros y necesitas
                tu material,{" "}
                <Link
                  href="/contacto#formulario-contacto"
                  className="font-medium underline underline-offset-2 hover:text-accent-text"
                >
                  escríbenos
                </Link>
                .
              </FormMessage>
            </div>
          ) : null}

          <div className="mt-8">
            <LoginForm />
          </div>

          {preview ? (
            <div className="mt-10 border-t border-dashed border-primary/20 pt-6">
              <p className="text-xs leading-relaxed text-ink-subtle">
                Vista previa de desarrollo (ALUMNOS_PREVIEW=1). No es un acceso: no comprueba ninguna cuenta y
                no existe en producción.
              </p>
              <Link
                href={alumnosRoutes.dashboard}
                className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-accent-text underline underline-offset-4 hover:text-accent-text-hover"
              >
                Abrir la vista previa del área privada
              </Link>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
