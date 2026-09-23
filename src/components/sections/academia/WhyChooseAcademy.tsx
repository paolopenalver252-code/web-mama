import { CalendarClock, Fingerprint, GraduationCap, Globe, Layers, Users } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FeatureTags from "@/components/ui/FeatureTags";
import Reveal from "@/components/ui/Reveal";

const REASONS = [
  { icon: Fingerprint, title: "Método propio" },
  { icon: GraduationCap, title: "Formación estructurada" },
  { icon: CalendarClock, title: "Más de 35 años de experiencia" },
  { icon: Layers, title: "Visión integral" },
  { icon: Users, title: "Acompañamiento personalizado" },
  { icon: Globe, title: "Academia internacional" },
];

export default function WhyChooseAcademy() {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="La diferencia" title="¿Por qué elegir PSAI FLOW ACADEMY?" />
        </Reveal>

        <Reveal>
          <div className="mx-auto mt-14 max-w-3xl">
            <FeatureTags items={REASONS} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
