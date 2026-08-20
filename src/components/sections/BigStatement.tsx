import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";
import Watermark from "@/components/ui/Watermark";

/**
 * Momento de cifra a pantalla completa: rompe el ritmo de scroll con un
 * único dato real (35+ años de trayectoria de Solimar Rengel) llevado a
 * una escala tipográfica muy superior a la del resto del sitio.
 */
export default function BigStatement() {
  return (
    <section className="relative overflow-hidden bg-primary py-28 lg:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(200,163,95,0.14),transparent_60%)]"
      />
      <Watermark className="-left-16 -top-24 z-0" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center lg:px-8">
        <Reveal variant="scale">
          <div className="font-heading text-[5rem] leading-none text-accent sm:text-[7rem] lg:text-[9rem]">
            <CountUp value={35} suffix="+" />
          </div>
        </Reveal>
        <Reveal delay={150}>
          <p className="max-w-xl font-heading text-2xl leading-snug text-white sm:text-3xl">
            años de experiencia acompañando procesos de transformación personal.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
