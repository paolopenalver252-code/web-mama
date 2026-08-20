import { Compass, Moon, Sparkles } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import CardSpecialty, { type Specialty } from "@/components/cards/CardSpecialty";
import Reveal from "@/components/ui/Reveal";

const SPECIALTIES: Specialty[] = [
  {
    icon: Sparkles,
    title: "Magia Universal, Limpieza Energética y Protección",
    description: "Descripción pendiente de contenido definitivo.",
    href: "/limpieza-energetica-proteccion",
  },
  {
    icon: Compass,
    title: "Método PSAI FLOW® – Código Fuente",
    description: "Descripción pendiente de contenido definitivo.",
    href: "/metodo-psai-flow",
  },
  {
    icon: Moon,
    title: "Psicotarot, Astrología Cabalística y Feng Shui Integral",
    description: "Descripción pendiente de contenido definitivo.",
    href: "/psicotarot-astrologia-feng-shui",
  },
];

export default function SpecialtiesSection() {
  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Especialidades"
            title="Tres caminos, un mismo método"
            description="Cada especialidad de PSAI FLOW ACADEMY responde a una necesidad distinta del proceso de transformación."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {SPECIALTIES.map((specialty, index) => (
            <Reveal key={specialty.title} delay={index * 120} className="h-full">
              <CardSpecialty {...specialty} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
