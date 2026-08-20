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
          <Eyebrow>Hablemos</Eyebrow>
          <h1 className="font-heading text-4xl leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-6xl">
            Contacto
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-ink/70">
            Estamos aquí para acompañarte en tu proceso de transformación
            personal y ayudarte a encontrar la formación o consulta más
            adecuada para ti.
          </p>
        </div>

        <div className="animate-fade-in [animation-delay:200ms] mx-auto mt-12 max-w-6xl pb-16 lg:pb-20">
          <PlaceholderImage
            label="Imagen de atención personalizada pendiente"
            className="aspect-[21/9] w-full shadow-soft"
          />
        </div>
      </div>
    </section>
  );
}
