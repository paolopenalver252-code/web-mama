import { Maximize, Play, Settings, Volume2 } from "lucide-react";
import BrandMotif from "@/components/alumnos/ui/BrandMotif";
import { monoLabel } from "@/components/alumnos/ui/styles";
import type { LessonVideo } from "@/lib/alumnos/catalog/types";

type LessonPlayerProps = {
  video: LessonVideo | null;
  title: string;
};

/**
 * Reproductor de la lección. Hoy no hay vídeos: se muestra el marco del
 * reproductor (16:9 reservado, sin saltos de maquetación cuando llegue el
 * real) con un aviso explícito de "pendiente de publicación". La barra de
 * controles es solo la silueta, inerte y oculta a lectores de pantalla:
 * no hay ningún botón que aparente reproducir algo.
 *
 * Al conectar el proveedor (Vimeo, Bunny Stream, Mux o Cloudflare Stream),
 * este componente recibirá una URL firmada generada en el servidor solo
 * para alumnos con acceso.
 */
export default function LessonPlayer({ video, title }: LessonPlayerProps) {
  const message = video ? "Reproductor pendiente de configurar" : "Vídeo pendiente de publicación";

  return (
    <figure className="relative m-0 aspect-video overflow-hidden rounded-2xl border border-campus-line bg-[#06080d] sm:rounded-[22px]">
      <BrandMotif className="pointer-events-none absolute left-1/2 top-1/2 w-[70%] max-w-[560px] -translate-x-1/2 -translate-y-1/2 text-campus-ink/[0.06]" />

      {/* Silueta de controles: decorativa e inerte. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-4 px-4 pb-3 pt-8 text-campus-ink/30 sm:px-6 sm:pb-4"
      >
        <Play size={18} strokeWidth={1.75} />
        <span className="h-[3px] flex-1 rounded-full bg-campus-ink/15" />
        <span className="font-campus-mono text-[11px]">--:--</span>
        <Volume2 size={17} strokeWidth={1.5} className="hidden sm:block" />
        <Settings size={17} strokeWidth={1.5} className="hidden sm:block" />
        <Maximize size={16} strokeWidth={1.5} />
      </div>

      <figcaption className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <span className={`${monoLabel} text-campus-gold`}>Vídeo de la lección</span>
        <span className="max-w-md text-lg font-medium text-campus-ink sm:text-2xl">{message}</span>
        <span className="hidden max-w-sm text-sm text-campus-muted sm:block">
          El vídeo de “{title}” se mostrará aquí en cuanto esté disponible.
        </span>
      </figcaption>
    </figure>
  );
}
