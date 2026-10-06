import Image from "next/image";
import Link from "next/link";
import { alumnosRoutes } from "@/lib/alumnos/routes";

type CampusBrandProps = {
  href?: string;
  /** Oculta el texto secundario "Campus" (cabecera móvil muy estrecha). */
  compact?: boolean;
};

/** Marca del campus: emblema + "PSAI FLOW" (serif de marca) + "Campus" en mono. */
export default function CampusBrand({ href = alumnosRoutes.dashboard, compact = false }: CampusBrandProps) {
  return (
    <Link href={href} className="group inline-flex items-center gap-3">
      <Image
        src="/logo-psai-flow.png"
        alt=""
        width={44}
        height={44}
        className="h-9 w-9 object-contain transition-[rotate] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-[20deg]"
      />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-[1.35rem] text-campus-ink">PSAI FLOW</span>
        {compact ? null : (
          <span className="mt-1 font-campus-mono text-[10px] uppercase tracking-[0.3em] text-campus-gold">Campus</span>
        )}
      </span>
    </Link>
  );
}
