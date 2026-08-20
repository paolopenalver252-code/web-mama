import type { LucideIcon } from "lucide-react";

type CardComingSoonProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

/**
 * Tarjeta "próximamente" con el mismo tamaño/forma que una tarjeta de
 * catálogo real, para que un grid con pocos elementos reales no se vea
 * incompleto ni desequilibrado.
 */
export default function CardComingSoon({ icon: Icon, title, description }: CardComingSoonProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-primary/15 bg-surface-alt p-10 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
        <Icon className="text-accent" size={22} strokeWidth={1.5} />
      </span>
      <p className="font-heading text-lg text-primary">{title}</p>
      <p className="max-w-xs text-sm leading-relaxed text-ink/60">{description}</p>
    </div>
  );
}
