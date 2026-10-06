type PendingTagProps = {
  children?: string;
};

/** Marca discreta para huecos estructurales sin contenido real todavía. */
export default function PendingTag({ children = "Pendiente" }: PendingTagProps) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full border border-dashed border-primary/20 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-subtle">
      {children}
    </span>
  );
}
