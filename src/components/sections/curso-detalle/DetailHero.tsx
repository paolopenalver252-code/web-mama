"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import Parallax from "@/components/ui/Parallax";
import Eyebrow from "@/components/ui/Eyebrow";
import { useHeroEntrance } from "@/hooks/useHeroEntrance";

// Solo los campos primitivos que este Hero realmente usa (no el Course
// completo): al ser un Client Component, un array como whatYouLearn —que
// contiene componentes de icono— no se puede serializar en el límite
// servidor/cliente.
type DetailHeroProps = {
  course: {
    category: string;
    title: string;
    level: string;
    summary: string;
  };
  showBackLink?: boolean;
};

/**
 * Hero dominado por la imagen (ocupa la mayor parte de la primera
 * pantalla): texto centrado y compacto arriba, imagen grande debajo.
 */
export default function DetailHero({ course, showBackLink = true }: DetailHeroProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  useHeroEntrance({ text: textRef, media: mediaRef });

  return (
    <section className="relative overflow-hidden">
      <Parallax
        speed={10}
        className="pointer-events-none absolute -right-32 -top-24 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(200,163,95,0.14),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-10 lg:px-8 lg:pt-14">
        {showBackLink ? (
          <Link
            href="/cursos"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary/60 transition-colors duration-300 hover:text-accent-text"
          >
            <ArrowLeft size={16} strokeWidth={1.75} />
            Todos los cursos
          </Link>
        ) : null}

        <div ref={textRef} className="mx-auto mt-6 flex max-w-3xl flex-col items-center gap-5 text-center">
          <Eyebrow>{course.category}</Eyebrow>

          <h1 className="font-heading text-4xl leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-6xl">
            {course.title}
          </h1>

          <p className="font-heading text-xl text-secondary">{course.level}</p>

          <p className="max-w-xl text-base leading-relaxed text-ink/70">{course.summary}</p>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contacto" variant="accent" size="md">
              Inscribirme
            </Button>
            <Button href="/contacto" variant="outline" size="md">
              Solicitar información
            </Button>
          </div>
        </div>

        <div ref={mediaRef} className="mx-auto mt-12 max-w-6xl pb-16 lg:pb-20">
          <PlaceholderImage
            label="Imagen del curso pendiente"
            className="aspect-[16/9] w-full shadow-soft"
          />
        </div>
      </div>
    </section>
  );
}
