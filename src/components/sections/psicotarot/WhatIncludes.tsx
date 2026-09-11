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
import FeatureTags from "@/components/ui/FeatureTags";
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

        <Reveal>
          <div className="mx-auto mt-14 max-w-4xl">
            <FeatureTags items={TOOLS} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
