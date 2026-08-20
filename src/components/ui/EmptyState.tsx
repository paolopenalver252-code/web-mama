import type { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  tone?: "light" | "dark";
};

/**
 * Estado vacío elegante para secciones preparadas para contenido futuro
 * (testimonios, FAQ, libros, centros) — nunca se rellena con datos de
 * relleno inventados, solo con este aviso honesto y bien diseñado.
 */
export default function EmptyState({ icon: Icon, title, description, tone = "light" }: EmptyStateProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={`flex flex-col items-center gap-4 rounded-2xl border border-dashed px-8 py-16 text-center ${
        isDark ? "border-white/15 bg-white/5" : "border-primary/10 bg-surface-alt"
      }`}
    >
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-full ${
          isDark ? "bg-white/10" : "bg-accent/10"
        }`}
      >
        <Icon className="text-accent" size={22} strokeWidth={1.5} />
      </span>
      <p className={`font-heading text-xl ${isDark ? "text-white" : "text-primary"}`}>{title}</p>
      <p className={`max-w-md text-sm leading-relaxed ${isDark ? "text-white/60" : "text-ink/60"}`}>
        {description}
      </p>
    </div>
  );
}
