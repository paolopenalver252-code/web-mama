/**
 * Estado que devuelven las Server Actions de los formularios del Área de
 * Alumnos a `useActionState`. Nunca incluye contraseñas: el servidor no
 * devuelve al navegador nada de lo que recibió en esos campos.
 */
export type FormState<Field extends string = string> =
  | { status: "idle" }
  | { status: "error"; message: string; fieldErrors?: Partial<Record<Field, string>> }
  | { status: "success"; message: string };

export const IDLE_FORM_STATE: FormState = { status: "idle" };
