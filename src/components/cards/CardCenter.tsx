import Button from "@/components/ui/Button";
import { cardHover } from "@/lib/motion/classNames";

export type Center = {
  name: string;
  location?: string;
  description: string;
  href?: string;
};

export default function CardCenter({ name, location, description, href }: Center) {
  const isExternal = href?.startsWith("http");

  return (
    <div
      className={`group flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-primary/5 bg-surface p-7 shadow-soft ${cardHover}`}
    >
      <div>
        <h3 className="font-heading text-lg text-primary">{name}</h3>
        {location ? <p className="text-xs uppercase tracking-wide text-accent-text">{location}</p> : null}
      </div>
      <p className="text-sm leading-relaxed text-ink-muted">{description}</p>
      {href ? (
        <Button
          href={href}
          variant="outline"
          size="sm"
          className="mt-2 self-start"
          aria-label={`Más información sobre ${name}`}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          Más información
        </Button>
      ) : null}
    </div>
  );
}
