import {
  BookOpenText,
  Compass,
  HeartHandshake,
  Hash,
  Moon,
  Orbit,
  Sparkles,
  Sun,
  Users,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import SpecialtyCard from "@/components/cards/SpecialtyCard";
import Reveal from "@/components/ui/Reveal";

// TODO: sustituir cada "description" por el texto real de esa especialidad
// en cuanto se defina — de momento se marca explícitamente como pendiente.
const SPECIALTIES = [
  { icon: Sparkles, title: "Psicotarot Evolutivo", description: "Descripción breve pendiente de contenido definitivo." },
  { icon: BookOpenText, title: "Tarot Cabalístico", description: "Descripción breve pendiente de contenido definitivo." },
  { icon: Compass, title: "Astrología Cabalística", description: "Descripción breve pendiente de contenido definitivo." },
  { icon: Orbit, title: "Astrología Evolutiva", description: "Descripción breve pendiente de contenido definitivo." },
  { icon: Moon, title: "Astrología China (BaZi)", description: "Descripción breve pendiente de contenido definitivo." },
  { icon: Hash, title: "Numerología", description: "Descripción breve pendiente de contenido definitivo." },
  { icon: HeartHandshake, title: "Coaching Emocional", description: "Descripción breve pendiente de contenido definitivo." },
  { icon: Sun, title: "Coaching Transpersonal", description: "Descripción breve pendiente de contenido definitivo." },
  { icon: Users, title: "Coaching Transgeneracional", description: "Descripción breve pendiente de contenido definitivo." },
];

export default function SpecialtiesGrid() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Herramientas"
            title="Especialidades que pueden integrarse durante la consulta"
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3">
          {SPECIALTIES.map((item, index) => (
            <Reveal key={item.title} delay={index * 60} className="h-full">
              <SpecialtyCard
                icon={<item.icon className="text-accent" size={20} strokeWidth={1.5} />}
                title={item.title}
                description={item.description}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
