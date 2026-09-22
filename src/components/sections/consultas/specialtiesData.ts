import {
  BookOpenText,
  Compass,
  HeartHandshake,
  Hash,
  Moon,
  Orbit,
  Sparkles,
  Sun,
  Users,
  type LucideIcon,
} from "lucide-react";

export type Specialty = {
  icon: LucideIcon;
  title: string;
  description: string;
};

/**
 * Única fuente de datos de "Especialidades que pueden integrarse durante la
 * consulta" — consumida tanto por la cuadrícula (tablet/desktop) como por el
 * Scroll Stack (móvil) en SpecialtiesGrid.tsx, para no duplicar contenido.
 */
export const SPECIALTIES: Specialty[] = [
  {
    icon: Sparkles,
    title: "Psicotarot Evolutivo",
    description:
      "Explora tus procesos, patrones y emociones a través del tarot desde una mirada evolutiva, consciente y orientada al autoconocimiento.",
  },
  {
    icon: BookOpenText,
    title: "Tarot Cabalístico",
    description:
      "Profundiza en el significado de tus procesos y ciclos a través del tarot y la tradición cabalística, descubriendo nuevas perspectivas para comprenderte mejor y avanzar con mayor claridad y conciencia.",
  },
  {
    icon: Compass,
    title: "Astrología Cabalística",
    description:
      "Descubre nuevas perspectivas sobre tu personalidad, tus ciclos y tu camino de vida a través de la astrología cabalística, comprendiendo mejor tus talentos, desafíos y oportunidades de crecimiento.",
  },
  {
    icon: Orbit,
    title: "Astrología Evolutiva",
    description:
      "Comprende tus ciclos, aprendizajes y potencial a través de la astrología evolutiva, descubriendo nuevas perspectivas sobre tu camino personal y las oportunidades que pueden impulsar tu crecimiento y transformación.",
  },
  {
    icon: Moon,
    title: "Astrología China (BaZi)",
    description:
      "Descubre la influencia de los ciclos y elementos de tu carta BaZi para comprender mejor tus talentos, desafíos y potencial, obteniendo una visión más clara de tu camino personal y tus etapas de vida.",
  },
  {
    icon: Hash,
    title: "Numerología",
    description:
      "Descubre el significado de los números que forman parte de tu vida para comprender mejor tu personalidad, tus ciclos y tu potencial, obteniendo nuevas claves para avanzar con mayor claridad y conciencia.",
  },
  {
    icon: HeartHandshake,
    title: "Coaching Emocional",
    description:
      "Aprende a comprender y gestionar tus emociones, superar bloqueos y desarrollar recursos personales que te ayuden a afrontar los desafíos de la vida con mayor equilibrio, confianza y claridad.",
  },
  {
    icon: Sun,
    title: "Coaching Transpersonal",
    description:
      "Explora tu mundo interior y conecta con una visión más profunda de ti mismo, trabajando creencias, emociones y experiencias para favorecer una transformación personal con mayor conciencia y propósito.",
  },
  {
    icon: Users,
    title: "Coaching Transgeneracional",
    description:
      "Comprende cómo las experiencias, creencias y patrones familiares pueden influir en tu vida actual, para liberar bloqueos, transformar dinámicas heredadas y avanzar con mayor conciencia y libertad personal.",
  },
];
