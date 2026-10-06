import type { LessonVideo as LessonVideoSource } from "@/lib/alumnos/catalog/types";

type LessonVideoProps = {
  video: LessonVideoSource | null;
  title: string;
};

/**
 * Hueco del vídeo de la lección, con la proporción 16:9 ya reservada (sin
 * saltos de maquetación cuando llegue el reproductor real).
 *
 * El reproductor se conectará al proveedor elegido (Vimeo, Bunny Stream,
 * Mux o Cloudflare Stream) con reproducción privada: URL firmada generada
 * en el servidor solo para alumnos con acceso. Hasta entonces no se pinta
 * ningún botón de "play" que no reproduzca nada.
 */
export default function LessonVideo({ video, title }: LessonVideoProps) {
  return (
    <figure className="m-0">
      <div
        role="img"
        aria-label={`Vídeo de la lección "${title}": pendiente de publicar`}
        className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-center"
      >
        <p className="font-heading text-xl text-white sm:text-2xl">
          {video ? "Reproductor pendiente de configurar" : "Vídeo pendiente de publicar"}
        </p>
        <p className="max-w-sm text-xs leading-relaxed text-mist-subtle sm:text-sm">
          El vídeo de esta lección se mostrará aquí.
        </p>
      </div>
    </figure>
  );
}
