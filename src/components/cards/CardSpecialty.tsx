import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { brandEase, cardHover, cardImageHover } from "@/lib/motion/classNames";

export type Specialty = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  image?: string;
  imageAlt?: string;
  /** "01", "02"... — solo se usa en la composición editorial de móvil. */
  number?: string;
};

export default function CardSpecialty({
  icon: Icon,
  title,
  description,
  href,
  image,
  imageAlt,
  number,
}: Specialty) {
  return (
    <SpotlightCard
      spotlightColor="rgba(200, 163, 95, 0.16)"
      className={`group flex h-full flex-col rounded-none border-0 bg-transparent shadow-none sm:rounded-2xl sm:border sm:border-primary/5 sm:bg-surface sm:shadow-soft ${cardHover}`}
    >
      <div className="overflow-hidden rounded-2xl sm:rounded-none">
        <PlaceholderImage
          src={image}
          alt={imageAlt ?? title}
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`aspect-[4/3] w-full rounded-none ${cardImageHover}`}
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 pt-5 sm:gap-4 sm:p-7 sm:pt-7">
        {number ? (
          <div className="flex items-center gap-3 sm:hidden">
            <span className="font-heading text-sm text-accent-text">{number}</span>
            <span aria-hidden className="h-px flex-1 bg-accent/25" />
          </div>
        ) : null}
        <span className="hidden h-12 w-12 items-center justify-center rounded-full bg-accent/10 sm:flex">
          <Icon className="text-accent" size={20} strokeWidth={1.5} />
        </span>
        <h3 className="font-heading text-2xl leading-tight text-primary sm:text-xl">{title}</h3>
        <p className="flex-1 text-sm leading-relaxed text-ink-muted text-body">{description}</p>
        <Link
          href={href}
          aria-label={`Más información sobre ${title}`}
          className="-my-2 inline-flex items-center gap-2 py-2 text-sm font-medium text-primary transition-colors duration-300 group-hover:text-accent-text"
        >
          Más información
          <ArrowRight size={16} strokeWidth={1.75} className={`transition-transform duration-300 ${brandEase} group-hover:translate-x-1`} />
        </Link>
      </div>
    </SpotlightCard>
  );
}
