import PlaceholderImage from "@/components/ui/PlaceholderImage";
import Button from "@/components/ui/Button";
import { cardHover, cardImageHover } from "@/lib/motion/classNames";

export type Center = {
  name: string;
  location?: string;
  description: string;
  href: string;
};

export default function CardCenter({ name, location, description, href }: Center) {
  return (
    <div className={`group overflow-hidden rounded-2xl border border-primary/5 bg-surface shadow-soft ${cardHover}`}>
      <PlaceholderImage label="Fotografía pendiente" className={`aspect-[16/9] w-full rounded-none ${cardImageHover}`} />
      <div className="flex flex-col gap-3 p-6">
        <div>
          <h3 className="font-heading text-lg text-primary">{name}</h3>
          {location ? <p className="text-xs uppercase tracking-wide text-accent-text">{location}</p> : null}
        </div>
        <p className="text-sm leading-relaxed text-ink/65">{description}</p>
        <Button
          href={href}
          variant="outline"
          size="sm"
          className="mt-2 self-start"
          aria-label={`Más información sobre ${name}`}
        >
          Más información
        </Button>
      </div>
    </div>
  );
}
