import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { cardHover, cardImageHover } from "@/lib/motion/classNames";

export type Specialty = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
};

export default function CardSpecialty({ icon: Icon, title, description, href }: Specialty) {
  return (
    <div className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-primary/5 bg-surface shadow-soft ${cardHover}`}>
      <div className="overflow-hidden">
        <PlaceholderImage className={`aspect-[4/3] w-full rounded-none ${cardImageHover}`} />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-7">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
          <Icon className="text-accent" size={20} strokeWidth={1.5} />
        </span>
        <h3 className="font-heading text-xl text-primary">{title}</h3>
        <p className="flex-1 text-sm leading-relaxed text-ink/65">{description}</p>
        <Link
          href={href}
          aria-label={`Más información sobre ${title}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors duration-300 group-hover:text-accent-text"
        >
          Más información
          <ArrowRight size={16} strokeWidth={1.75} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
