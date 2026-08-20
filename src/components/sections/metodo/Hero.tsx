import PlaceholderImage from "@/components/ui/PlaceholderImage";
import Parallax from "@/components/ui/Parallax";
import Eyebrow from "@/components/ui/Eyebrow";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Parallax
        speed={10}
        className="pointer-events-none absolute -right-40 -top-20 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(200,163,95,0.14),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="animate-fade-up mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <Eyebrow>El origen de PSAI FLOW ACADEMY</Eyebrow>
          <h1 className="font-heading text-4xl leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-6xl">
            Método PSAI FLOW®
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-ink/70">
            La base de todo lo que ocurre en PSAI FLOW ACADEMY: el hilo
            conductor que sostiene cada curso, consulta y tratamiento.
          </p>
        </div>

        <div className="animate-fade-in [animation-delay:200ms] mx-auto mt-14 max-w-4xl">
          <PlaceholderImage
            label="Imagen del Método PSAI FLOW pendiente"
            className="aspect-[21/9] w-full shadow-soft"
          />
        </div>
      </div>
    </section>
  );
}
