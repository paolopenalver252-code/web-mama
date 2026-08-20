import {
  CheckSquare,
  GitBranch,
  Heart,
  Lightbulb,
  RefreshCw,
  Star,
  Target,
  TrendingUp,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import CardFeature from "@/components/cards/CardFeature";
import Reveal from "@/components/ui/Reveal";

const TOPICS = [
  { icon: Lightbulb, title: "Claridad personal" },
  { icon: Heart, title: "Relaciones" },
  { icon: Target, title: "Propósito" },
  { icon: TrendingUp, title: "Desarrollo personal" },
  { icon: GitBranch, title: "Patrones familiares" },
  { icon: CheckSquare, title: "Toma de decisiones" },
  { icon: Star, title: "Talentos" },
  { icon: RefreshCw, title: "Ciclos de vida" },
];

export default function WhatYouCanWork() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="En sesión" title="¿Qué puedes trabajar durante una consulta?" />
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {TOPICS.map((item, index) => (
            <Reveal key={item.title} delay={index * 60} className="h-full">
              <CardFeature icon={item.icon} title={item.title} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
