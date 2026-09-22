import type { LucideIcon } from "lucide-react";

export type FeatureTag = {
  icon: LucideIcon;
  title: string;
};

type FeatureTagsProps = {
  items: FeatureTag[];
  tone?: "light" | "dark";
  /** "center" para bloques con SectionHeading centrado; "left" para
   * composiciones editoriales junto a una columna de texto. */
  align?: "center" | "left";
};

/**
 * Lista de conceptos breves (icono + una etiqueta corta, sin descripción
 * real) presentados como píldoras — la misma firma visual que ya usan los
 * roles de Solimar en MeetSolimar.tsx. Mucho más ligera y editorial que
 * una cuadrícula de tarjetas idénticas para el mismo contenido, y evita
 * que varias páginas repitan la misma composición de "grid de cards".
 */
export default function FeatureTags({ items, tone = "light", align = "center" }: FeatureTagsProps) {
  const isDark = tone === "dark";

  return (
    <ul className={`flex flex-wrap gap-3 ${align === "center" ? "justify-center" : "justify-start"}`}>
      {items.map((item) => (
        <li key={item.title}>
          <span
            className={`inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm ${
              isDark ? "border-white/15 bg-white/5 text-white/90" : "border-primary/10 bg-surface-alt text-primary"
            }`}
          >
            <item.icon className={isDark ? "text-accent" : "text-accent-text"} size={16} strokeWidth={1.5} />
            {item.title}
          </span>
        </li>
      ))}
    </ul>
  );
}
