"use client";

import { useActionState, useState, type FormEvent } from "react";
import Link from "next/link";
import { signInAction } from "@/lib/alumnos/actions";
import { PASSWORD_RECOVERY_ENABLED } from "@/lib/alumnos/config";
import { IDLE_FORM_STATE, type FormState } from "@/lib/alumnos/forms";
import { alumnosRoutes } from "@/lib/alumnos/routes";
import { hasErrors, validateSignIn, type SignInField } from "@/lib/alumnos/validation";
import FormMessage from "./FormMessage";
import PasswordField from "./PasswordField";
import SubmitButton from "./SubmitButton";
import TextField from "./TextField";
import { focusFirstInvalid, useFieldErrors } from "./useFieldErrors";

const FIELD_ORDER: SignInField[] = ["email", "password"];

/**
 * Formulario de acceso. Valida en el navegador para responder al momento,
 * pero quien decide es la Server Action `signInAction` (que vuelve a
 * validar y consulta al proveedor de autenticación). No guarda nada en el
 * navegador: ni contraseña, ni token, ni "recordarme".
 */
export default function LoginForm() {
  const [state, formAction, pending] = useActionState<FormState<SignInField>, FormData>(
    signInAction,
    IDLE_FORM_STATE
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { errorFor, clearField, setClientErrors } = useFieldErrors(state);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const errors = validateSignIn({ email, password });
    setClientErrors(errors);
    if (hasErrors(errors)) {
      event.preventDefault();
      focusFirstInvalid(event.currentTarget, FIELD_ORDER, errors);
    }
  };

  return (
    <form action={formAction} onSubmit={handleSubmit} noValidate aria-busy={pending} className="flex flex-col gap-6">
      {state.status === "error" ? <FormMessage tone="error">{state.message}</FormMessage> : null}

      <TextField
        id="email"
        name="email"
        type="email"
        label="Correo electrónico"
        autoComplete="email"
        inputMode="email"
        autoCapitalize="none"
        spellCheck={false}
        required
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          clearField("email");
        }}
        error={errorFor("email")}
      />

      <div className="flex flex-col gap-3">
        <PasswordField
          id="password"
          name="password"
          label="Contraseña"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            clearField("password");
          }}
          error={errorFor("password")}
        />
        {PASSWORD_RECOVERY_ENABLED ? (
          <Link
            href={alumnosRoutes.passwordRecovery}
            className="self-end text-sm text-campus-muted underline-offset-4 transition-colors duration-300 hover:text-campus-ink hover:underline"
          >
            ¿Has olvidado tu contraseña?
          </Link>
        ) : null}
      </div>

      <SubmitButton pending={pending} label="Acceder" pendingLabel="Accediendo…" className="mt-2 w-full" />
    </form>
  );
}
