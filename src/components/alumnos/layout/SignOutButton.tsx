import { LogOut } from "lucide-react";
import { signOutAction } from "@/lib/alumnos/actions";

type SignOutButtonProps = {
  /** "full": texto completo (barra lateral, Mi cuenta). "compact": cabecera móvil. */
  variant?: "full" | "compact";
  className?: string;
};

/** Cerrar sesión — formulario con Server Action, funciona también sin JavaScript. */
export default function SignOutButton({ variant = "full", className = "" }: SignOutButtonProps) {
  return (
    <form action={signOutAction} className={className}>
      <button
        type="submit"
        className={`inline-flex items-center gap-2 rounded-lg text-ink-muted transition-colors duration-300 hover:text-primary ${
          variant === "compact" ? "h-11 px-2 text-sm font-medium" : "py-2.5 pl-4 pr-3 text-[15px] font-medium"
        }`}
      >
        <LogOut size={variant === "compact" ? 18 : 16} strokeWidth={1.5} aria-hidden />
        {variant === "compact" ? "Salir" : "Cerrar sesión"}
      </button>
    </form>
  );
}
