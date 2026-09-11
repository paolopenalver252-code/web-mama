import {
  Briefcase,
  Building2,
  BedDouble,
  Car,
  Compass,
  Gem,
  Home as HomeIcon,
  Shield,
  Sparkles,
  Wand2,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FeatureTags from "@/components/ui/FeatureTags";
import Reveal from "@/components/ui/Reveal";

const SPECIALTIES = [
  { icon: Sparkles, title: "Limpieza energética de personas" },
  { icon: HomeIcon, title: "Viviendas" },
  { icon: Briefcase, title: "Negocios" },
  { icon: Building2, title: "Empresas" },
  { icon: BedDouble, title: "Hoteles" },
  { icon: Car, title: "Vehículos" },
  { icon: Shield, title: "Protección energética" },
  { icon: Compass, title: "Radiestesia" },
  { icon: Gem, title: "Péndulo Hebreo" },
  { icon: Wand2, title: "Magia Universal Cuántica" },
];

export default function SpecialtiesGrid() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Alcance" title="Especialidades" />
        </Reveal>

        <Reveal>
          <div className="mx-auto mt-14 max-w-4xl">
            <FeatureTags items={SPECIALTIES} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
