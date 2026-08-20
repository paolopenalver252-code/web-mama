import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import type { BlogPost } from "@/lib/blog";

type CardArticleProps = BlogPost & {
  featured?: boolean;
};

export default function CardArticle({
  slug,
  title,
  category,
  excerpt,
  date,
  readTime,
  featured = false,
}: CardArticleProps) {
  if (featured) {
    return (
      <div className="group grid grid-cols-1 gap-8 overflow-hidden rounded-3xl border border-primary/5 bg-surface shadow-soft lg:grid-cols-2 lg:gap-0">
        <PlaceholderImage
          label="Imagen del artículo pendiente"
          className="aspect-[16/10] w-full rounded-none lg:aspect-auto lg:h-full"
        />
        <div className="flex flex-col justify-center gap-4 p-8 lg:p-12">
          <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-ink/50">
            <span className="rounded-full bg-accent/10 px-3 py-1 font-semibold text-accent-text">
              {category}
            </span>
            <span>{date}</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={13} strokeWidth={1.75} />
              {readTime}
            </span>
          </div>
          <h3 className="font-heading text-2xl leading-snug text-primary sm:text-3xl">{title}</h3>
          <p className="text-sm leading-relaxed text-ink/65">{excerpt}</p>
          <Link
            href={`/blog/${slug}`}
            aria-label={`Leer artículo: ${title}`}
            className="mt-2 inline-flex w-fit items-center gap-2 text-sm font-medium text-primary transition-colors duration-300 group-hover:text-accent-text"
          >
            Leer artículo
            <ArrowRight
              size={16}
              strokeWidth={1.75}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-primary/5 bg-surface shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(15,45,82,0.1)]">
      <PlaceholderImage
        className="aspect-[16/10] w-full rounded-none transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-ink/50">
          <span className="rounded-full bg-accent/10 px-3 py-1 font-semibold text-accent-text">
            {category}
          </span>
          <span>{date}</span>
        </div>
        <h3 className="font-heading text-lg leading-snug text-primary">{title}</h3>
        <p className="flex-1 text-sm leading-relaxed text-ink/65">{excerpt}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="inline-flex items-center gap-1 text-xs text-ink/50">
            <Clock size={13} strokeWidth={1.75} />
            {readTime}
          </span>
          <Link
            href={`/blog/${slug}`}
            aria-label={`Leer más: ${title}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors duration-300 group-hover:text-accent-text"
          >
            Leer más
            <ArrowRight
              size={15}
              strokeWidth={1.75}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
