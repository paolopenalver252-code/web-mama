import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Watermark from "@/components/ui/Watermark";

type CtaLink = {
  label: string;
  href: string;
};

type FinalCtaProps = {
  heading: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
};

/**
 * Bloque de cierre reutilizable (fondo navy + resplandor dorado sutil).
 * Cada página le pasa su propio mensaje y pareja de CTAs — la estructura
 * y el tono visual se mantienen idénticos en toda la web.
 */
export default function FinalCta({ heading, description, primaryCta, secondaryCta }: FinalCtaProps) {
  return (
    <section className="relative overflow-hidden bg-primary py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(200,163,95,0.15),transparent_60%)]"
      />
      <Watermark className="-bottom-20 -right-10 z-0" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-8 px-6 text-center lg:px-8">
        <Reveal>
          <h2 className="font-heading text-3xl leading-tight text-white sm:text-4xl">{heading}</h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="max-w-xl text-base leading-relaxed text-white/70">{description}</p>
        </Reveal>
        <Reveal delay={200}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href={primaryCta.href} variant="accent" size="md">
              {primaryCta.label}
            </Button>
            <Button
              href={secondaryCta.href}
              variant="outline"
              size="md"
              className="border-white/30 text-white hover:border-accent hover:text-accent"
            >
              {secondaryCta.label}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
