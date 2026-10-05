import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

// Copy deliberadamente prudente: grounded en WhyChooseAcademy.tsx ("Método
// propio", "Formación estructurada", "Más de 35 años de experiencia",
// "Acompañamiento personalizado") y OurMission.tsx — sin certificaciones,
// resultados ni cifras que no consten ya en el proyecto.
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
 * Refuerza que la Academia es "algo más que una página de cursos" — tarjetas
 * editoriales numeradas (mismo lenguaje visual que CardSpecialty.tsx en
 * móvil), sin bordes ni sombras de card SaaS.
 */
export default function AcademyFeatures() {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="La experiencia"
            title="Un espacio para aprender, profundizar y transformar."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {FEATURES.map((feature, index) => (
            <Reveal key={feature.number} delay={index * 100}>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-heading text-sm text-accent-text">{feature.number}</span>
                  <span aria-hidden className="h-px flex-1 bg-accent/25" />
                </div>
                <h3 className="font-heading text-xl text-primary">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted text-body">{feature.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
