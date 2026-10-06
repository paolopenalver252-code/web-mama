"use server";

import { redirect } from "next/navigation";
import type { FormState } from "./forms";
import { alumnosRoutes } from "./routes";
import { getAuthProvider, type ChangePasswordFailure, type SignInFailure } from "./server/auth-provider";
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

const RATE_LIMITED = "Demasiados intentos. Espera unos minutos antes de volver a intentarlo.";
const UNAVAILABLE = "No hemos podido completar la operación. Inténtalo de nuevo en unos minutos.";

const SIGN_IN_ERRORS: Record<SignInFailure, string> = {
  not_configured:
    "El acceso de alumnos todavía no está activado. Si ya estás formándote con nosotros y necesitas tu material, escríbenos y te ayudamos.",
  // Mismo mensaje exista o no el correo: no se revela qué cuentas existen.
  invalid_credentials: "El correo o la contraseña no son correctos.",
  rate_limited: RATE_LIMITED,
  unavailable: UNAVAILABLE,
};

export async function signInAction(_previous: FormState<SignInField>, formData: FormData): Promise<FormState<SignInField>> {
  const email = readText(formData, "email").trim().toLowerCase();
  const password = readText(formData, "password");

  const fieldErrors = validateSignIn({ email, password });
  if (hasErrors(fieldErrors)) {
    return { status: "error", message: "Revisa los campos marcados.", fieldErrors };
  }

  const result = await getAuthProvider().signInWithPassword({ email, password });
  if (!result.ok) return { status: "error", message: SIGN_IN_ERRORS[result.reason] };

  // redirect() fuera de cualquier try/catch (lanza internamente).
  redirect(alumnosRoutes.dashboard);
}

export async function signOutAction(): Promise<void> {
  await getAuthProvider().signOut();
  redirect(alumnosRoutes.login);
}

const CHANGE_PASSWORD_ERRORS: Record<ChangePasswordFailure, FormState<ChangePasswordField>> = {
  not_configured: {
    status: "error",
    message: "El cambio de contraseña todavía no está disponible. No se ha modificado nada.",
  },
  invalid_current_password: {
    status: "error",
    message: "La contraseña actual no es correcta.",
    fieldErrors: { currentPassword: "La contraseña actual no es correcta." },
  },
  same_password: {
    status: "error",
    message: "La nueva contraseña debe ser distinta de la actual.",
    fieldErrors: { newPassword: "La nueva contraseña debe ser distinta de la actual." },
  },
  weak_password: {
    status: "error",
    message: "La nueva contraseña es demasiado débil. Elige una más larga o menos predecible.",
    fieldErrors: { newPassword: "Elige una contraseña más larga o menos predecible." },
  },
  reauthentication_needed: {
    status: "error",
    message: "Por seguridad, cierra sesión y vuelve a entrar antes de cambiar la contraseña.",
  },
  rate_limited: { status: "error", message: RATE_LIMITED },
  unavailable: { status: "error", message: UNAVAILABLE },
};

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

  const result = await getAuthProvider().changePassword(session, {
    currentPassword: input.currentPassword,
    newPassword: input.newPassword,
  });

  if (result.ok) {
    return {
      status: "success",
      message: "Tu contraseña se ha actualizado. Las sesiones abiertas en otros dispositivos se han cerrado.",
    };
  }
  return CHANGE_PASSWORD_ERRORS[result.reason];
}
