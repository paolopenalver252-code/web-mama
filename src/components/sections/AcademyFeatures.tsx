import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

// Mismos 4 conceptos de siempre, mismo copy prudente: grounded en
// WhyChooseAcademy.tsx ("Método propio", "Formación estructurada", "Más de
// 35 años de experiencia", "Acompañamiento personalizado") y OurMission.tsx
// — sin certificaciones, comunidad, profesores ni cifras que no consten ya
// en el proyecto. Ningún texto nuevo, solo la composición cambia.
const FEATURES = [
  {
    number: "01",
    title: "Formación",
    description: "Programas diseñados para profundizar en los conocimientos y disciplinas de PSAI FLOW®.",
  },
  {
    number: "02",
    title: "Conocimiento",
    description: "Una visión integral que conecta diferentes áreas y herramientas.",
  },
  {
    number: "03",
    title: "Experiencia",
    description: "El conocimiento desarrollado a través de años de práctica y trayectoria.",
  },
  {
    number: "04",
    title: "Acompañamiento",
    description: "Un espacio pensado para avanzar con orientación y claridad.",
  },
];

/**
 * "Qué encontrarás en la Academia" — puente entre "Formación destacada" y
 * "Métodos y disciplinas": no es otra sección de cursos, es una lista
 * editorial de 4 pilares (no 4 cards). Mismo patrón de lista con
 * divisores finos ya usado en CentersSection.tsx ("Red de colaboradores"),
 * reutilizado aquí por coherencia en vez de inventar un lenguaje visual
 * nuevo — números grandes y de baja opacidad en vez de iconos en círculo.
 */
export default function AcademyFeatures() {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-5">
            <Eyebrow>Dentro de la Academia</Eyebrow>
            <h2 className="max-w-2xl font-heading text-4xl leading-tight text-primary sm:text-5xl lg:text-6xl">
              Un espacio para aprender, profundizar y transformar.
            </h2>
          </div>
        </Reveal>

        {/* Una sola columna hasta lg; desde lg, dos columnas que se rellenan
            por columna (grid-flow-col + 2 filas): 01/02 a la izquierda,
            03/04 a la derecha. Cada pilar lleva su filete superior y el
            último de cada columna cierra con uno inferior (no el <ul>, que
            cruzaría el hueco entre columnas). El número tiene ancho fijo
            para que los títulos arranquen en la misma vertical aunque "01"
            sea más estrecho que "02". */}
        <ul className="mt-14 grid grid-cols-1 sm:mt-16 lg:grid-flow-col lg:grid-cols-2 lg:grid-rows-2 lg:gap-x-16 xl:gap-x-24">
          {FEATURES.map((feature, index) => (
            <li
              key={feature.number}
              className={`border-t border-primary/10 ${
                index === FEATURES.length - 1 ? "border-b" : index === 1 ? "lg:border-b" : ""
              }`}
            >
              <Reveal delay={index * 100} className="flex items-start gap-4 py-8 sm:gap-6 sm:py-10">
                <span
                  aria-hidden
                  className="w-16 shrink-0 pt-1 font-heading text-5xl leading-none text-primary/15 sm:w-20 sm:pt-2 sm:text-6xl lg:w-24 lg:text-7xl"
                >
                  {feature.number}
                </span>
                <div className="flex flex-col gap-2 pt-1 sm:gap-3 sm:pt-2">
                  <h3 className="font-heading text-2xl text-primary sm:text-3xl">{feature.title}</h3>
                  <p className="max-w-md text-sm leading-relaxed text-ink-muted text-body sm:text-base">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
