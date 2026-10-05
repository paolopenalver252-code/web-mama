import PlaceholderImage from "@/components/ui/PlaceholderImage";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";

/**
 * "La Academia": composición editorial (texto + imagen a sangre, sin
 * cuadrícula de tarjetas) que presenta la Academia como espacio de
 * formación, no como "un curso suelto". Imagen a la derecha —
 * FounderSpotlight (más abajo en esta misma Home) ya usa imagen a la
 * izquierda, así que alternar el lado evita que ambas secciones con foto
 * se sientan repetidas.
 */
export default function AcademyIntro() {
  return (
    <section className="bg-surface-alt py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-12 lg:gap-20 lg:px-8">
        <Reveal delay={120} className="order-2 md:order-1">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>La Academia</Eyebrow>
            <h2 className="font-heading text-3xl leading-tight text-primary sm:text-4xl lg:text-[2.75rem]">
              Aprende dentro del universo PSAI FLOW®.
            </h2>
            <p className="max-w-md text-base leading-relaxed text-ink-muted text-body">
              Descubre nuestras formaciones y profundiza en los conocimientos, herramientas y
              disciplinas que forman parte de nuestro método.
            </p>
            <Button href="/academia" variant="accent" size="md">
              Explorar la Academia
            </Button>
          </div>
        </Reveal>

        <Reveal className="-mx-6 order-1 md:order-2 md:mx-0">
          <PlaceholderImage
            src="/images/metodo-psai-flow-academy.jpg"
            alt="PSAI FLOW ACADEMY — Academia Internacional de Psicotransformación Integral"
            className="aspect-[4/5] w-full shadow-soft"
          />
        </Reveal>
      </div>
    </section>
  );
}
