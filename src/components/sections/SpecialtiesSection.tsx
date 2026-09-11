import { Compass, Moon, Sparkles } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import CardSpecialty, { type Specialty } from "@/components/cards/CardSpecialty";
import Reveal from "@/components/ui/Reveal";

const SPECIALTIES: Specialty[] = [
  {
    icon: Sparkles,
    title: "Limpieza Energética y Protección",
    description:
      "Armoniza tu energía, libera cargas y fortalece tu protección para recuperar equilibrio y bienestar.",
    href: "/limpieza-energetica-proteccion",
    image: "/images/magia-universal-limpieza-proteccion.jpg",
    imageAlt:
      "Ritual de limpieza energética y protección con velas, salvia y símbolos rituales",
  },
  {
    icon: Compass,
    title: "Método PSAI FLOW® – Código Fuente",
    description: "Descripción pendiente de contenido definitivo.",
    href: "/metodo-psai-flow",
    image: "/images/metodo-psai-flow-codigo-fuente.jpg",
    imageAlt:
      "Doble hélice de ADN luminosa sobre geometría sagrada, rodeada de cuarzos, péndulo y cuenco tibetano",
  },
  {
    icon: Moon,
    title: "Psicotarot, Astrología Cabalística y Feng Shui Integral",
    description:
      "Conecta con tu mundo interior, comprende tus ciclos y armoniza tu entorno para avanzar con mayor claridad y equilibrio.",
    href: "/psicotarot-astrologia-feng-shui",
    image: "/images/psicotarot-astrologia-feng-shui.jpg",
    imageAlt:
      "Cartas de tarot, dados hebreos y símbolos cabalísticos sobre un paño oscuro",
  },
];

export default function SpecialtiesSection() {
  return (
    <section id="especialidades" className="scroll-mt-24 bg-surface-alt py-24">
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
