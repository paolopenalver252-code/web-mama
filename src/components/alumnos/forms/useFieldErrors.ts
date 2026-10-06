"use client";

import { useState } from "react";
import type { FormState } from "@/lib/alumnos/forms";
import type { FieldErrors } from "@/lib/alumnos/validation";

/**
 * Une los errores de la validación inmediata (navegador) con los que
 * devuelve el servidor. Al editar un campo se borra su error del cliente;
 * el del servidor se sustituye en el siguiente envío.
 */
export function useFieldErrors<Field extends string>(state: FormState<Field>) {
  const [clientErrors, setClientErrors] = useState<FieldErrors<Field>>({});
  // Errores del servidor descartados campo a campo al editar, para no dejar
  // un mensaje obsoleto junto a un valor ya corregido.
  const [dismissed, setDismissed] = useState<{ state: FormState<Field>; fields: Field[] }>({ state, fields: [] });

  const dismissedFields = dismissed.state === state ? dismissed.fields : [];
  const serverErrors: FieldErrors<Field> = state.status === "error" ? (state.fieldErrors ?? {}) : {};

  const errorFor = (field: Field): string | undefined =>
    clientErrors[field] ?? (dismissedFields.includes(field) ? undefined : serverErrors[field]);

  const clearField = (field: Field) => {
    setClientErrors((previous) => {
      if (!previous[field]) return previous;
      const next = { ...previous };
      delete next[field];
      return next;
    });
    setDismissed({ state, fields: [...dismissedFields, field] });
  };

  return { errorFor, clearField, setClientErrors };
}

/** Lleva el foco al primer campo con error (en el orden del formulario). */
export function focusFirstInvalid<Field extends string>(form: HTMLFormElement, order: Field[], errors: FieldErrors<Field>) {
  const first = order.find((field) => errors[field]);
  if (!first) return;
  const element = form.elements.namedItem(first);
  if (element instanceof HTMLElement) element.focus();
}
