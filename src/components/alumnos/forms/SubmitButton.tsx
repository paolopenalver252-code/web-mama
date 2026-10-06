import { LoaderCircle } from "lucide-react";
import Button from "@/components/ui/Button";

type SubmitButtonProps = {
  pending: boolean;
  label: string;
  pendingLabel: string;
  className?: string;
};

/** Botón de envío con estado de carga (deshabilitado y anunciado mientras envía). */
export default function SubmitButton({ pending, label, pendingLabel, className = "" }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      variant="primary"
      size="md"
      disabled={pending}
      aria-disabled={pending}
      className={`disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:bg-primary ${className}`}
    >
      {pending ? (
        <>
          <LoaderCircle size={18} strokeWidth={1.75} className="animate-spin motion-reduce:animate-none" aria-hidden />
          <span>{pendingLabel}</span>
        </>
      ) : (
        label
      )}
    </Button>
  );
}
