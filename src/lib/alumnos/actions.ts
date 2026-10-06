"use server";

import { redirect } from "next/navigation";
import type { FormState } from "./forms";
import { alumnosRoutes } from "./routes";
import { authProvider } from "./server/auth-provider";
import { getSession } from "./server/dal";
import {
  hasErrors,
  validateChangePassword,
  validateSignIn,
  type ChangePasswordField,
  type SignInField,
} from "./validation";

/**
 * Server Actions del Área de Alumnos. Cada una es, a efectos de seguridad,
 * un endpoint público: valida de nuevo todo lo que recibe y comprueba la
 * sesión por su cuenta, sin fiarse de lo que haya hecho el formulario.
 * Las contraseñas no se registran en logs ni se devuelven al navegador.
 */

function readText(formData: FormData, field: string): string {
  const value = formData.get(field);
  return typeof value === "string" ? value : "";
}

const NOT_CONFIGURED_SIGN_IN =
  "El acceso de alumnos todavía no está activado. Si ya estás formándote con nosotros y necesitas tu material, escríbenos y te ayudamos.";

export async function signInAction(_previous: FormState<SignInField>, formData: FormData): Promise<FormState<SignInField>> {
  const email = readText(formData, "email").trim();
  const password = readText(formData, "password");

  const fieldErrors = validateSignIn({ email, password });
  if (hasErrors(fieldErrors)) {
    return { status: "error", message: "Revisa los campos marcados.", fieldErrors };
  }

  const result = await authProvider.signInWithPassword({ email, password });

  if (!result.ok) {
    switch (result.reason) {
      case "not_configured":
        return { status: "error", message: NOT_CONFIGURED_SIGN_IN };
      case "rate_limited":
        return { status: "error", message: "Demasiados intentos. Espera unos minutos antes de volver a intentarlo." };
      case "invalid_credentials":
        // Mismo mensaje exista o no el correo: no se revela qué cuentas existen.
        return { status: "error", message: "El correo o la contraseña no son correctos." };
    }
  }

  // redirect() fuera de cualquier try/catch (lanza internamente).
  redirect(alumnosRoutes.dashboard);
}

export async function signOutAction(): Promise<void> {
  await authProvider.signOut();
  redirect(alumnosRoutes.login);
}

export async function changePasswordAction(
  _previous: FormState<ChangePasswordField>,
  formData: FormData
): Promise<FormState<ChangePasswordField>> {
  const session = await getSession();
  if (!session) redirect(alumnosRoutes.login);

  const input = {
    currentPassword: readText(formData, "currentPassword"),
    newPassword: readText(formData, "newPassword"),
    confirmPassword: readText(formData, "confirmPassword"),
  };

  const fieldErrors = validateChangePassword(input);
  if (hasErrors(fieldErrors)) {
    return { status: "error", message: "Revisa los campos marcados.", fieldErrors };
  }

  if (session.kind === "preview") {
    return {
      status: "error",
      message: "Vista previa de desarrollo: no hay ninguna cuenta real conectada, así que no se ha cambiado ninguna contraseña.",
    };
  }

  const result = await authProvider.changePassword(session, {
    currentPassword: input.currentPassword,
    newPassword: input.newPassword,
  });

  if (result.ok) {
    return { status: "success", message: "Tu contraseña se ha actualizado." };
  }

  switch (result.reason) {
    case "not_configured":
      return {
        status: "error",
        message: "El cambio de contraseña todavía no está disponible. No se ha modificado nada.",
      };
    case "rate_limited":
      return { status: "error", message: "Demasiados intentos. Espera unos minutos antes de volver a intentarlo." };
    case "invalid_current_password":
      return {
        status: "error",
        message: "La contraseña actual no es correcta.",
        fieldErrors: { currentPassword: "La contraseña actual no es correcta." },
      };
  }
}
