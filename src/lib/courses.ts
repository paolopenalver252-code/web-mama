import {
  BookOpen,
  Compass,
  Eye,
  Gem,
  Layers,
  Scale,
  Shapes,
  Shield,
  Sparkles,
  Waves,
  type LucideIcon,
} from "lucide-react";

export type LearningPoint = {
  icon: LucideIcon;
  title: string;
};

export type Course = {
  slug: string;
  title: string;
  level: string;
  category: string;
  summary: string;
  image?: string;
  imageAlt?: string;
  duration: string;
  modality: string;
  includes: string[];
  whatYouLearn: LearningPoint[];
  continuity: {
    current: string;
    next: string;
  };
  instructor: {
    name: string;
    role: string;
  };
};

/**
 * Catálogo de cursos. Por ahora solo contiene el curso confirmado como
 * insignia (Curso de Magia Universal Cuántica). No incluye precio: la
 * inversión se trata en consulta privada (ver Pricing.tsx). Añadir aquí un
 * curso nuevo lo hace aparecer automáticamente en /cursos y genera su
 * propia ficha en /cursos/[slug].
 */
export const COURSES: Course[] = [
  {
    slug: "magia-universal-cuantica",
    title: "Curso de Magia Universal Cuántica",
    level: "Nivel I – Formación Profesional",
    category: "Formación insignia",
    summary:
      "Una formación profesional estructurada para dominar los fundamentos y la práctica de la Magia Universal Cuántica.",
    image: "/images/curso-magia-universal-cuantica.jpg",
    imageAlt:
      "Escritorio de estudio con libros antiguos, pergamino de Magia Universal Cuántica, cristales y símbolos alquímicos",
    duration: "6 meses",
    modality: "Online",
    includes: ["Vídeos", "Manuales", "Material de estudio", "Tutorías", "Prácticas", "Certificado"],
    whatYouLearn: [
      { icon: BookOpen, title: "Fundamentos de la Magia Universal" },
      { icon: Shield, title: "Protección energética" },
      { icon: Sparkles, title: "Limpieza energética" },
      { icon: Waves, title: "Armonización" },
      { icon: Compass, title: "Radiestesia" },
      { icon: Gem, title: "Péndulo Hebreo" },
      { icon: Shapes, title: "Símbolos energéticos" },
      { icon: Eye, title: "Desarrollo intuitivo" },
      { icon: Scale, title: "Ética profesional" },
      { icon: Layers, title: "Integración de diferentes disciplinas" },
    ],
    continuity: {
      current: "Nivel I · Formación Profesional (6 meses)",
      next: "Programa Avanzado de Magia Universal Cuántica (3 años)",
    },
    instructor: {
      name: "Solimar Rengel",
      role: "Fundadora de PSAI FLOW ACADEMY",
    },
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES.find((course) => course.slug === slug);
}

export function getFeaturedCourse(): Course {
  return COURSES[0];
}
