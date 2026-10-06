import type { ReactNode } from "react";
import BrandMotif from "./BrandMotif";

type EmptyStateProps = {
  title: string;
  description: ReactNode;
};

/** Estado vacío del campus: honesto, sobrio y con el motivo de marca de fondo. */
export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-dashed border-campus-line-strong px-6 py-14 sm:px-10">
      <BrandMotif className="pointer-events-none absolute -right-16 top-1/2 w-72 -translate-y-1/2 text-campus-ink/[0.05]" />
      <div className="relative max-w-md">
        <p className="text-lg font-medium text-campus-ink">{title}</p>
        <div className="mt-2 text-sm leading-relaxed text-campus-muted">{description}</div>
      </div>
    </div>
  );
}
