import type { ReactNode } from "react";
import Eyebrow from "@/components/ui/Eyebrow";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Cabecera de sección reutilizable: eyebrow + título + descripción corta.
 * `tone="dark"` se usa sobre los bloques spotlight de fondo navy.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  const alignClasses = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  const titleColor = tone === "dark" ? "text-white" : "text-primary";
  const descColor = tone === "dark" ? "text-white/70" : "text-ink/70";

  return (
    <div className={`flex flex-col gap-5 ${alignClasses} ${className}`}>
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2 className={`font-heading text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight ${titleColor}`}>
        {title}
      </h2>
      {description ? (
        <p className={`max-w-2xl text-base leading-relaxed ${descColor}`}>{description}</p>
      ) : null}
    </div>
  );
}
