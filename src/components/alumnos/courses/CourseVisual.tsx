import Image from "next/image";
import BrandMotif from "@/components/alumnos/ui/BrandMotif";
import { formatOrder } from "@/lib/alumnos/catalog/helpers";
import type { Course } from "@/lib/alumnos/catalog/types";

/**
 * Tonos de fondo de las formaciones sin portada: familia de azules
 * profundos de marca, uno por formación, para que se distingan de un
 * vistazo. La formación pendiente de definir usa un tono neutro.
 */
const TONES = ["#0f2d52", "#10364a", "#1d2a57", "#22314a"];
const NEUTRAL_TONE = "#151b26";

export function courseTone(course: Pick<Course, "order" | "placeholder">): string {
  if (course.placeholder) return NEUTRAL_TONE;
  return TONES[(course.order - 1) % TONES.length];
}

type CourseVisualProps = {
  course: Pick<Course, "order" | "cover" | "placeholder">;
  /** Atributo `sizes` de la imagen real (cuando exista portada). */
  sizes: string;
  priority?: boolean;
  /** Número de formación grande en el visual abstracto. */
  showNumber?: boolean;
  className?: string;
};

/**
 * Visual de una formación. Con portada (`course.cover`), la imagen real a
 * sangre; sin ella, un visual abstracto de marca (tono + astrolabio + número)
 * que deja claro que no es una fotografía de contenido. Ocupa siempre todo
 * su contenedor: la proporción la decide quien lo usa.
 */
export default function CourseVisual({ course, sizes, priority = false, showNumber = true, className = "" }: CourseVisualProps) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ backgroundColor: courseTone(course) }}
    >
      {course.cover ? (
        <Image
          src={course.cover.src}
          alt={course.cover.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-[scale] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03]"
        />
      ) : (
        <>
          <BrandMotif
            rotation={course.order * 23}
            orbitAngle={-38 + course.order * 47}
            className="pointer-events-none absolute -right-[18%] top-1/2 w-[85%] min-w-[240px] -translate-y-1/2 text-campus-ink/[0.13] transition-[rotate] duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-[8deg]"
          />
          {showNumber ? (
            <span
              aria-hidden
              className={`absolute bottom-[8%] left-[7%] font-heading text-[clamp(3rem,9vw,6.5rem)] leading-none ${
                course.placeholder ? "text-campus-ink/35" : "text-campus-ink/85"
              }`}
            >
              {formatOrder(course.order)}
            </span>
          ) : null}
        </>
      )}
    </div>
  );
}
