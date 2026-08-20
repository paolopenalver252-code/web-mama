import type { LucideIcon } from "lucide-react";

type CardFeatureProps = {
  icon: LucideIcon;
  title: string;
  description?: string;
  tone?: "light" | "dark";
};

/**
 * Tarjeta ligera icono + título + descripción, sin imagen ni enlace.
 * Pensada para cuadrículas de conceptos (letras PSAI, puntos del proceso,
 * beneficios) reutilizable en cualquier página del proyecto.
 */
export default function CardFeature({ icon: Icon, title, description, tone = "light" }: CardFeatureProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={`flex h-full flex-col gap-4 rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 ${
        isDark
          ? "border-white/10 bg-white/5 hover:bg-white/[0.08]"
          : "border-primary/5 bg-surface shadow-soft hover:shadow-[0_20px_45px_rgba(15,45,82,0.1)]"
      }`}
    >
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-full ${
          isDark ? "bg-white/10" : "bg-accent/10"
        }`}
      >
        <Icon className="text-accent" size={20} strokeWidth={1.5} />
      </span>
      <h3 className={`font-heading text-lg ${isDark ? "text-white" : "text-primary"}`}>{title}</h3>
      {description ? (
        <p className={`text-sm leading-relaxed ${isDark ? "text-white/60" : "text-ink/65"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
