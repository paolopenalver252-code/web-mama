import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { duration } from "@/lib/motion/tokens";

const VALUES = [
  "Ética",
  "Respeto",
  "Integridad",
  "Aprendizaje continuo",
  "Desarrollo personal",
  "Excelencia",
  "Innovación",
  "Compromiso",
  "Servicio",
  "Conciencia",
];

/**
 * Los 10 valores como índice editorial numerado (no como píldoras ni como
 * lista de características). Desde md, dos columnas que se rellenan por
 * columna (grid-flow-col + 5 filas): 01–05 a la izquierda, 06–10 a la
 * derecha. Cada valor lleva filete superior y el último de cada columna
 * cierra con uno inferior, para que las líneas no crucen el hueco central.
 *
 * Única interacción: el Reveal compartido del sitio, en cascada por filas
 * (70ms, token cardStagger) — las dos columnas entran a la vez fila a fila.
 * Reveal ya respeta prefers-reduced-motion (sin animación, contenido
 * visible).
 */
export default function ValuesGrid() {
  return (
    <section className="bg-surface-alt py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Lo que nos guía" title="Nuestros Valores" align="left" />
        </Reveal>

        <ol className="mt-12 grid grid-cols-1 sm:mt-14 md:grid-flow-col md:grid-cols-2 md:grid-rows-5 md:gap-x-16 lg:gap-x-24">
          {VALUES.map((value, index) => (
            <li
              key={value}
              className={`border-t border-primary/10 ${
                index === VALUES.length - 1 ? "border-b" : index === 4 ? "md:border-b" : ""
              }`}
            >
              <Reveal delay={(index % 5) * duration.cardStagger} className="flex items-baseline gap-4 py-5 sm:gap-6 sm:py-6">
                <span
                  aria-hidden
                  className="w-10 shrink-0 font-heading text-2xl leading-none text-primary/20 sm:w-14 sm:text-3xl"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-heading text-xl leading-snug text-primary sm:text-2xl">{value}</span>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
