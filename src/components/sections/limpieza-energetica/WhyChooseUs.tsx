import { Award, Fingerprint, HeartHandshake, Layers, Scale, ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FeatureTags from "@/components/ui/FeatureTags";
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
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="La confianza" title="¿Por qué elegir PSAI FLOW?" />
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
