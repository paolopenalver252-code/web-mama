import PlaceholderImage from "@/components/ui/PlaceholderImage";
import Button from "@/components/ui/Button";
import type { Book } from "@/lib/books";

type CardBookProps = Book & {
  moreInfoHref?: string;
  purchaseHref?: string;
};

export default function CardBook({
  title,
  description,
  category,
  cover,
  moreInfoHref = "#",
  purchaseHref = "#",
}: CardBookProps) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl border border-primary/5 bg-surface p-5 shadow-soft">
      <PlaceholderImage
        src={cover}
        alt={`Portada del libro ${title}`}
        label="Portada pendiente"
        className="aspect-[5/8] w-full"
      />
      <span className="w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-text">
        {category}
      </span>
      <div className="flex-1">
        <h3 className="font-heading text-lg leading-snug text-primary">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/65">{description}</p>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          href={moreInfoHref}
          variant="outline"
          size="sm"
          className="w-full"
          aria-label={`Más información sobre ${title}`}
        >
          Más información
        </Button>
        <Button
          href={purchaseHref}
          variant="accent"
          size="sm"
          className="w-full"
          aria-label={`Comprar ${title}`}
        >
          Comprar
        </Button>
      </div>
    </div>
  );
}

/**
 * Misma silueta de tarjeta que CardBook, para que "Próximamente" se vea
 * como parte del mismo catálogo y no como un componente distinto.
 */
export function CardBookComingSoon() {
  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl border border-dashed border-primary/15 bg-surface-alt p-5">
      <PlaceholderImage label="Próximamente" className="aspect-[3/4] w-full" tone="light" />
      <div className="flex flex-1 flex-col items-center justify-center py-4 text-center">
        <p className="font-heading text-lg text-primary">Próximamente</p>
      </div>
    </div>
  );
}
