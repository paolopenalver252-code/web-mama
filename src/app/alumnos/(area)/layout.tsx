import AreaShell from "@/components/alumnos/layout/AreaShell";
import { requireSession } from "@/lib/alumnos/server/dal";

/**
 * Estructura común de todas las pantallas privadas. La comprobación de
 * sesión de aquí impide pintar el armazón sin sesión, pero NO es la
 * protección principal: los layouts no se vuelven a ejecutar en cada
 * navegación, así que cada página llama también a `requireSession()` (y
 * cada Server Action comprueba la sesión por su cuenta).
 */
export default async function AreaLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();
  return <AreaShell preview={session.kind === "preview"}>{children}</AreaShell>;
}
