import type { ReactNode } from "react";

type FormMessageProps = {
  tone: "error" | "success" | "info";
  children: ReactNode;
  id?: string;
};

const toneClasses: Record<FormMessageProps["tone"], string> = {
  error: "border-red-700/25 bg-red-50 text-red-800",
  success: "border-emerald-700/25 bg-emerald-50 text-emerald-900",
  info: "border-accent/30 bg-accent/[0.07] text-primary",
};

/**
 * Mensaje global de un formulario. Los errores usan role="alert" para que
 * el lector de pantalla los anuncie al aparecer; el resto, role="status".
 */
export default function FormMessage({ tone, children, id }: FormMessageProps) {
  return (
    <div
      id={id}
      role={tone === "error" ? "alert" : "status"}
      className={`rounded-xl border px-4 py-3 text-sm leading-relaxed ${toneClasses[tone]}`}
    >
      {children}
    </div>
  );
}
