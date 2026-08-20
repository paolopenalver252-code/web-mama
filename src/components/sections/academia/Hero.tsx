import Button from "@/components/ui/Button";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import Parallax from "@/components/ui/Parallax";
import Eyebrow from "@/components/ui/Eyebrow";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Parallax
        speed={10}
        className="pointer-events-none absolute -left-32 -top-20 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(200,163,95,0.14),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-14 lg:px-8">
        <div className="animate-fade-up mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <Eyebrow>La Academia</Eyebrow>
          <h1 className="font-heading text-4xl leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-6xl">
            PSAI FLOW ACADEMY
          </h1>
          <p className="font-heading text-xl text-secondary">
            Academia Internacional de Psicotransformación Integral
          </p>
          <p className="max-w-xl text-base leading-relaxed text-ink/70">
            Una academia dedicada a la psicotransformación integral, con base
            en el Método PSAI FLOW®.
          </p>

          <div className="mt-2">
            <Button href="/metodo-psai-flow" variant="accent" size="md">
              Conocer el Método PSAI FLOW
            </Button>
          </div>
        </div>

        <div className="animate-fade-in [animation-delay:200ms] mx-auto mt-12 max-w-6xl pb-16 lg:pb-20">
          <PlaceholderImage
            label="Fotografía de Solimar Rengel pendiente"
            className="aspect-[21/9] w-full shadow-soft"
          />
        </div>
      </div>
    </section>
  );
}
