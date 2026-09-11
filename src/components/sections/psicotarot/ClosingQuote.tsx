import { Quote } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Watermark from "@/components/ui/Watermark";

export default function ClosingQuote() {
  return (
    <section className="relative overflow-hidden bg-primary py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(200,163,95,0.15),transparent_60%)]"
      />
      <Watermark className="-bottom-20 -right-10 z-0" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center lg:px-8">
        <Reveal>
          <Quote className="text-accent" size={32} strokeWidth={1.25} />
        </Reveal>
        <Reveal delay={100}>
          <p className="font-heading text-2xl italic leading-snug text-white/80 sm:text-3xl">
            &ldquo;Nuestra misión es ayudarte a comprender tu camino para que puedas tomar
            decisiones con mayor conciencia, equilibrio y confianza.&rdquo;
          </p>
        </Reveal>
      </div>
    </section>
  );
}
