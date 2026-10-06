"use client";

import { useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
import { fieldErrorClasses, fieldHintClasses, inputClasses, inputErrorClasses, labelClasses } from "./fieldStyles";

type PasswordFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "id" | "type"> & {
  id: string;
  label: string;
  autoComplete: "current-password" | "new-password";
  error?: string;
  hint?: string;
};

/**
 * Campo de contraseña con botón mostrar/ocultar. El botón es un control
 * real (aria-pressed + etiqueta que cambia), alcanzable con teclado y con
 * un área táctil de 44px.
 */
export default function PasswordField({ id, label, error, hint, ...inputProps }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`${inputClasses} pr-14 ${error ? inputErrorClasses : ""}`}
          {...inputProps}
        />
        <button
          type="button"
          onClick={() => setVisible((value) => !value)}
          aria-pressed={visible}
          aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
          aria-controls={id}
          className="absolute inset-y-0 right-1 my-auto flex h-11 w-11 items-center justify-center rounded-lg text-campus-subtle transition-colors duration-300 hover:text-campus-ink"
        >
          {visible ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
        </button>
      </div>
      {hint ? (
        <p id={hintId} className={fieldHintClasses}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className={fieldErrorClasses}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
