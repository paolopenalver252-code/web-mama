"use client";

import { useActionState, useState, type FormEvent } from "react";
import { changePasswordAction } from "@/lib/alumnos/actions";
import { PASSWORD_MIN_LENGTH } from "@/lib/alumnos/config";
import { IDLE_FORM_STATE, type FormState } from "@/lib/alumnos/forms";
import { hasErrors, validateChangePassword, type ChangePasswordField } from "@/lib/alumnos/validation";
import FormMessage from "./FormMessage";
import PasswordField from "./PasswordField";
import SubmitButton from "./SubmitButton";
import { focusFirstInvalid, useFieldErrors } from "./useFieldErrors";

const FIELD_ORDER: ChangePasswordField[] = ["currentPassword", "newPassword", "confirmPassword"];

type Values = Record<ChangePasswordField, string>;

const EMPTY: Values = { currentPassword: "", newPassword: "", confirmPassword: "" };

/**
 * Cambio de contraseña. La Server Action comprueba la sesión, vuelve a
 * validar y delega en el proveedor de autenticación; mientras no exista
 * uno, responde con un error explícito y no se modifica nada.
 */
export default function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState<FormState<ChangePasswordField>, FormData>(
    changePasswordAction,
    IDLE_FORM_STATE
  );
  const [values, setValues] = useState<Values>(EMPTY);
  const { errorFor, clearField, setClientErrors } = useFieldErrors(state);

  // Tras un cambio correcto, se vacían los campos (ajuste de estado durante
  // el render al detectar un estado nuevo, sin efecto).
  const [handledState, setHandledState] = useState(state);
  if (state !== handledState) {
    setHandledState(state);
    if (state.status === "success") setValues(EMPTY);
  }

  const update = (field: ChangePasswordField, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    clearField(field);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const errors = validateChangePassword(values);
    setClientErrors(errors);
    if (hasErrors(errors)) {
      event.preventDefault();
      focusFirstInvalid(event.currentTarget, FIELD_ORDER, errors);
    }
  };

  return (
    <form action={formAction} onSubmit={handleSubmit} noValidate aria-busy={pending} className="flex flex-col gap-6">
      {state.status === "error" ? <FormMessage tone="error">{state.message}</FormMessage> : null}
      {state.status === "success" ? <FormMessage tone="success">{state.message}</FormMessage> : null}

      <PasswordField
        id="currentPassword"
        name="currentPassword"
        label="Contraseña actual"
        autoComplete="current-password"
        required
        value={values.currentPassword}
        onChange={(event) => update("currentPassword", event.target.value)}
        error={errorFor("currentPassword")}
      />
      <PasswordField
        id="newPassword"
        name="newPassword"
        label="Nueva contraseña"
        autoComplete="new-password"
        required
        minLength={PASSWORD_MIN_LENGTH}
        hint={`Mínimo ${PASSWORD_MIN_LENGTH} caracteres.`}
        value={values.newPassword}
        onChange={(event) => update("newPassword", event.target.value)}
        error={errorFor("newPassword")}
      />
      <PasswordField
        id="confirmPassword"
        name="confirmPassword"
        label="Confirmar nueva contraseña"
        autoComplete="new-password"
        required
        value={values.confirmPassword}
        onChange={(event) => update("confirmPassword", event.target.value)}
        error={errorFor("confirmPassword")}
      />

      <SubmitButton
        pending={pending}
        label="Cambiar contraseña"
        pendingLabel="Guardando…"
        className="w-full sm:w-auto sm:self-start"
      />
    </form>
  );
}
