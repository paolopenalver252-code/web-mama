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
import FeatureTags from "@/components/ui/FeatureTags";
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
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="En sesión" title="¿Qué puedes trabajar durante una consulta?" />
        </Reveal>

        <Reveal>
          <div className="mx-auto mt-14 max-w-3xl">
            <FeatureTags items={TOPICS} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
