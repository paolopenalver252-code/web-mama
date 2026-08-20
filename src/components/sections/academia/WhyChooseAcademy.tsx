import { CalendarClock, Fingerprint, GraduationCap, Globe, Layers, Users } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import CardFeature from "@/components/cards/CardFeature";
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
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="La diferencia" title="¿Por qué elegir PSAI FLOW ACADEMY?" />
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3">
          {REASONS.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 80} className="h-full">
              <CardFeature icon={reason.icon} title={reason.title} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
