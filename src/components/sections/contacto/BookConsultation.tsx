import { CalendarHeart } from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Watermark from "@/components/ui/Watermark";

export default function BookConsultation() {
  return (
    <section className="relative overflow-hidden bg-primary py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(200,163,95,0.15),transparent_60%)]"
      />
      <Watermark className="-left-12 -top-16 z-0" />
      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 text-center lg:px-8">
        <Reveal>
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <CalendarHeart className="text-accent" size={26} strokeWidth={1.5} />
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="font-heading text-3xl leading-tight text-white sm:text-4xl">
            ¿Prefieres reservar directamente?
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="max-w-lg text-base leading-relaxed text-white/70">
            Si ya sabes que quieres una consulta personalizada, reserva tu
            plaza directamente, sin esperar respuesta al formulario.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <Button href="#formulario-contacto" variant="accent" size="md">
            Reservar consulta
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
