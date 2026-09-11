import {
  Brain,
  Compass,
  Eye,
  Heart,
  Layers,
  Lightbulb,
  Moon,
  Shapes,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import CardFeature from "@/components/cards/CardFeature";
import Reveal from "@/components/ui/Reveal";

const TOOLS = [
  { icon: Sparkles, title: "Psicotarot Evolutivo" },
  { icon: Layers, title: "Tarot Cabalístico" },
  { icon: Moon, title: "Astrología Cabalística" },
  { icon: Eye, title: "Astrología Evolutiva" },
  { icon: Compass, title: "Astrología China (BaZi)" },
  { icon: Shapes, title: "Numerología" },
  { icon: Users, title: "Coaching Transgeneracional" },
  { icon: Brain, title: "Coaching Transpersonal" },
  { icon: Heart, title: "Coaching Emocional" },
  { icon: TrendingUp, title: "Análisis de talentos, desafíos y ciclos de vida" },
  {
    icon: Lightbulb,
    title: "Orientación para la toma de decisiones personales, familiares y profesionales",
  },
];

export default function WhatIncludes() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="El contenido"
            title="¿Qué incluye una consulta?"
            description="Cada sesión combina y adapta estas herramientas según tu momento y tus objetivos."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool, index) => (
            <Reveal key={tool.title} delay={index * 60} className="h-full">
              <CardFeature icon={tool.icon} title={tool.title} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
