import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "./config";

/**
 * Validación compartida de los formularios del Área de Alumnos. Se ejecuta
 * en el navegador (respuesta inmediata) y otra vez en el servidor, que es
 * la única que cuenta: la del cliente se puede saltar.
 */

export type FieldErrors<Field extends string> = Partial<Record<Field, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SignInField = "email" | "password";

export function validateSignIn(input: { email: string; password: string }): FieldErrors<SignInField> {
  const errors: FieldErrors<SignInField> = {};
  const email = input.email.trim();

  if (!email) {
    errors.email = "Introduce tu correo electrónico.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Introduce un correo electrónico válido.";
  }

  // En el acceso solo se comprueba que no esté vacía: la política de
  // longitud se aplica al crearla o cambiarla, no al iniciar sesión.
  if (!input.password) {
    errors.password = "Introduce tu contraseña.";
  } else if (input.password.length > PASSWORD_MAX_LENGTH) {
    errors.password = "La contraseña es demasiado larga.";
  }

  return errors;
}

export type ChangePasswordField = "currentPassword" | "newPassword" | "confirmPassword";

export function validateChangePassword(input: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}): FieldErrors<ChangePasswordField> {
  const errors: FieldErrors<ChangePasswordField> = {};

  if (!input.currentPassword) {
    errors.currentPassword = "Introduce tu contraseña actual.";
  }

  if (!input.newPassword) {
    errors.newPassword = "Introduce la nueva contraseña.";
  } else if (input.newPassword.length < PASSWORD_MIN_LENGTH) {
    errors.newPassword = `Debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres.`;
  } else if (input.newPassword.length > PASSWORD_MAX_LENGTH) {
    errors.newPassword = `Debe tener como máximo ${PASSWORD_MAX_LENGTH} caracteres.`;
  } else if (input.currentPassword && input.newPassword === input.currentPassword) {
    errors.newPassword = "La nueva contraseña debe ser distinta de la actual.";
  }

  if (!input.confirmPassword) {
    errors.confirmPassword = "Repite la nueva contraseña.";
  } else if (input.newPassword && input.confirmPassword !== input.newPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden.";
  }

  return errors;
}

export function hasErrors(errors: Record<string, string | undefined>): boolean {
  return Object.values(errors).some(Boolean);
}
