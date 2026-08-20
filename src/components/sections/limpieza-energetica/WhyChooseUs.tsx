import { Award, Fingerprint, HeartHandshake, Layers, Scale, ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import CardFeature from "@/components/cards/CardFeature";
import Reveal from "@/components/ui/Reveal";

const REASONS = [
  { icon: Award, title: "Más de 35 años de experiencia" },
  { icon: HeartHandshake, title: "Atención personalizada" },
  { icon: Fingerprint, title: "Método propio PSAI FLOW®" },
  { icon: Layers, title: "Visión integral" },
  { icon: Scale, title: "Ética profesional" },
  { icon: ShieldCheck, title: "Acompañamiento responsable" },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="La confianza" title="¿Por qué elegir PSAI FLOW?" />
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
