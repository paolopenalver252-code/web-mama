import {
  Award,
  BookOpen,
  Brain,
  Handshake,
  Heart,
  HeartHandshake,
  Lightbulb,
  Scale,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import CardFeature from "@/components/cards/CardFeature";
import Reveal from "@/components/ui/Reveal";

const VALUES = [
  { icon: Scale, title: "Ética" },
  { icon: Handshake, title: "Respeto" },
  { icon: ShieldCheck, title: "Integridad" },
  { icon: BookOpen, title: "Aprendizaje continuo" },
  { icon: TrendingUp, title: "Desarrollo personal" },
  { icon: Award, title: "Excelencia" },
  { icon: Lightbulb, title: "Innovación" },
  { icon: HeartHandshake, title: "Compromiso" },
  { icon: Heart, title: "Servicio" },
  { icon: Brain, title: "Conciencia" },
];

export default function ValuesGrid() {
  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Lo que nos guía" title="Nuestros Valores" />
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {VALUES.map((value, index) => (
            <Reveal key={value.title} delay={index * 60} className="h-full">
              <CardFeature icon={value.icon} title={value.title} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
