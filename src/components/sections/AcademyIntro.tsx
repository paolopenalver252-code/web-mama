import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";

/**
 * "La Academia": la puerta de entrada a la Academia dentro de la Home, no
 * una sección informativa más. Composición asimétrica — espacio, jerarquía
 * y tipografía en vez de una tarjeta o una imagen en caja junto al texto.
 *
 * No se usa ninguna fotografía: la única imagen real "de academia" del
 * proyecto (metodo-psai-flow-academy.jpg, ya usada en el Hero de
 * /metodo-psai-flow) es una composición tipo escudo/insignia con texto de
 * marca incrustado — no encaja con una dirección editorial premium, y el
 * resto de fotografías reales del proyecto ya están reservadas para otras
 * secciones de esta misma Home (Solimar, Formación destacada, Métodos),
 * así que repetirlas aquí las habría duplicado. Siguiendo la propia
 * instrucción del brief para este caso, el "visual" es una composición
 * tipográfica: la misma palabra "PSAI" que ya usa Watermark.tsx como
 * textura de marca en las secciones oscuras del sitio, reimplementada
 * aquí a muy baja opacidad sobre fondo claro (Watermark.tsx en sí no se
 * toca, es un componente compartido con otras secciones).
 */
export default function AcademyIntro() {
  return (
    <section className="relative overflow-hidden bg-surface-alt py-20 sm:py-28 lg:py-32">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 top-1/2 hidden -translate-y-1/2 select-none font-heading font-medium leading-none text-primary/[0.05] sm:block"
        style={{ fontSize: "clamp(10rem, 22vw, 22rem)" }}
      >
        PSAI
      </span>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex max-w-2xl flex-col items-start gap-6">
          <Reveal>
            <Eyebrow>La Academia</Eyebrow>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="font-heading text-4xl leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-6xl">
              Aprende dentro del universo PSAI FLOW®.
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="max-w-md text-base leading-relaxed text-ink-muted text-body sm:text-lg">
              Descubre nuestras formaciones y profundiza en los conocimientos, herramientas y
              disciplinas que forman parte de nuestro método.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <Button href="/academia" variant="accent" size="md">
              Explorar la Academia
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
