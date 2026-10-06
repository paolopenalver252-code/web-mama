import type { ReactNode } from "react";

type FormMessageProps = {
  tone: "error" | "success" | "info";
  children: ReactNode;
  id?: string;
};

const toneClasses: Record<FormMessageProps["tone"], string> = {
  error: "border-campus-danger/30 bg-campus-danger/10 text-campus-ink",
  success: "border-campus-success/30 bg-campus-success/10 text-campus-ink",
  info: "border-campus-gold/30 bg-campus-gold/10 text-campus-ink",
};

const barClasses: Record<FormMessageProps["tone"], string> = {
  error: "bg-campus-danger",
  success: "bg-campus-success",
  info: "bg-campus-gold",
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
      className={`relative overflow-hidden rounded-xl border py-3 pl-5 pr-4 text-sm leading-relaxed ${toneClasses[tone]}`}
    >
      <span aria-hidden className={`absolute inset-y-0 left-0 w-1 ${barClasses[tone]}`} />
      {children}
    </div>
  );
}
