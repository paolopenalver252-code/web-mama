import { LoaderCircle } from "lucide-react";
import { buttonStyles } from "@/components/alumnos/ui/styles";

type SubmitButtonProps = {
  pending: boolean;
  label: string;
  pendingLabel: string;
  className?: string;
};

/** Botón de envío con estado de carga (deshabilitado y anunciado mientras envía). */
export default function SubmitButton({ pending, label, pendingLabel, className = "" }: SubmitButtonProps) {
  return (
    <button type="submit" disabled={pending} aria-disabled={pending} className={`${buttonStyles.primary} ${className}`}>
      {pending ? (
        <>
          <LoaderCircle size={18} strokeWidth={1.75} className="animate-spin motion-reduce:animate-none" aria-hidden />
          <span>{pendingLabel}</span>
        </>
      ) : (
        label
      )}
    </button>
  );
}
