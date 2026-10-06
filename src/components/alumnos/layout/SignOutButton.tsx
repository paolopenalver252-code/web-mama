import { LogOut } from "lucide-react";
import { signOutAction } from "@/lib/alumnos/actions";
import { buttonStyles } from "@/components/alumnos/ui/styles";

type SignOutButtonProps = {
  /** "row": barra lateral · "icon": cabecera móvil · "button": Mi cuenta. */
  variant?: "row" | "icon" | "button";
  className?: string;
};

const variants = {
  row: "flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm text-campus-muted transition-colors duration-300 hover:bg-campus-raised hover:text-campus-ink",
  icon: "flex h-11 w-11 items-center justify-center rounded-full text-campus-muted transition-colors duration-300 hover:bg-campus-raised hover:text-campus-ink",
  button: buttonStyles.secondary,
};

/**
 * Cerrar sesión — formulario con la Server Action `signOutAction` (revoca la
 * sesión en Supabase y vuelve a /alumnos/acceso). Funciona también sin JS.
 */
export default function SignOutButton({ variant = "row", className = "" }: SignOutButtonProps) {
  return (
    <form action={signOutAction} className={className}>
      <button type="submit" className={variants[variant]} aria-label={variant === "icon" ? "Cerrar sesión" : undefined}>
        <LogOut size={variant === "icon" ? 19 : 17} strokeWidth={1.5} aria-hidden />
        {variant === "icon" ? null : "Cerrar sesión"}
      </button>
    </form>
  );
}
