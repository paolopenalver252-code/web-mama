import Image from "next/image";
import Link from "next/link";
import { alumnosRoutes } from "@/lib/alumnos/routes";

type AreaBrandProps = {
  href?: string;
  tone?: "light" | "dark";
};

/** Marca del Área de Alumnos: emblema + "PSAI FLOW" + "Área de alumnos". */
export default function AreaBrand({ href = alumnosRoutes.dashboard, tone = "light" }: AreaBrandProps) {
  const dark = tone === "dark";
  return (
    <Link href={href} className="flex items-center gap-2.5 transition-opacity duration-300 hover:opacity-75">
      <Image src="/logo-psai-flow.png" alt="" width={44} height={44} className="h-9 w-9 object-contain" />
      <span className="flex flex-col leading-none">
        <span className={`font-heading text-xl ${dark ? "text-white" : "text-primary"}`}>PSAI FLOW</span>
        <span
          className={`mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.28em] ${dark ? "text-accent" : "text-accent-text"}`}
        >
          Área de alumnos
        </span>
      </span>
    </Link>
  );
}
