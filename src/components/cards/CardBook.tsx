import PlaceholderImage from "@/components/ui/PlaceholderImage";
import Button from "@/components/ui/Button";
import { cardHover, cardImageHover } from "@/lib/motion/classNames";
import type { Book } from "@/lib/books";

type CardBookProps = Book & {
  moreInfoHref?: string;
  purchaseHref?: string;
};

// Sin tienda/enlace de venta aún confirmado por la clienta (ver lib/books.ts):
// en vez de un href="#" que no hace nada al pulsar, ambos botones llevan de
// forma honesta al formulario de contacto (WhatsApp) para consultar el libro.
const DEFAULT_BOOK_HREF = "/contacto#formulario-contacto";

export default function CardBook({
  title,
  description,
  category,
  cover,
  moreInfoHref = DEFAULT_BOOK_HREF,
  purchaseHref = DEFAULT_BOOK_HREF,
}: CardBookProps) {
  const isExternal = (href: string) => href.startsWith("http");

  return (
    <div className={`group flex h-full flex-col gap-4 rounded-2xl border border-primary/5 bg-surface p-5 shadow-soft ${cardHover}`}>
      <PlaceholderImage
        src={cover}
        alt={`Portada del libro ${title}`}
        label="Portada pendiente"
        className={`aspect-[5/8] w-full ${cardImageHover}`}
      />
      <span className="w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-text">
        {category}
      </span>
      <div className="flex-1">
        <h3 className="font-heading text-lg leading-snug text-primary">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted text-body">{description}</p>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          href={moreInfoHref}
          target={isExternal(moreInfoHref) ? "_blank" : undefined}
          rel={isExternal(moreInfoHref) ? "noopener noreferrer" : undefined}
          variant="outline"
          size="sm"
          className="w-full !px-4"
          aria-label={`Más información sobre ${title}`}
        >
          Más información
        </Button>
        <Button
          href={purchaseHref}
          target={isExternal(purchaseHref) ? "_blank" : undefined}
          rel={isExternal(purchaseHref) ? "noopener noreferrer" : undefined}
          variant="accent"
          size="sm"
          className="w-full !pl-4 !pr-1.5"
          aria-label={`Comprar ${title}`}
        >
          Comprar
        </Button>
      </div>
    </div>
  );
}
