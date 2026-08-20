import Image from "next/image";
import { ImageIcon } from "lucide-react";

type PlaceholderImageProps = {
  label?: string;
  className?: string;
  tone?: "light" | "dark";
  /**
   * Cuando se aporte una imagen real, se sustituye automáticamente el
   * marcador por un <Image> de next/image (optimizada, con lazy loading
   * por defecto) sin tocar ningún sitio donde se use este componente.
   */
  src?: string;
  alt?: string;
  /** Marcar true solo en la imagen más grande visible al cargar la página (normalmente el Hero). */
  priority?: boolean;
  sizes?: string;
};

/**
 * Marcador visual para fotografías aún no entregadas por el cliente.
 * Se apoya en gradientes de marca (nunca gris genérico) para no romper
 * la sensación premium mientras se espera el material definitivo.
 */
export default function PlaceholderImage({
  label = "Fotografía pendiente",
  className = "",
  tone = "light",
  src,
  alt,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw",
}: PlaceholderImageProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-2xl ${className}`}>
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  const gradient =
    tone === "dark"
      ? "bg-[radial-gradient(circle_at_30%_20%,rgba(200,163,95,0.25),transparent_60%),linear-gradient(135deg,#163B67,#0F2D52)]"
      : "bg-[radial-gradient(circle_at_30%_20%,rgba(200,163,95,0.18),transparent_60%),linear-gradient(135deg,#FAFAF8,#F0EEE8)]";
  const iconColor = tone === "dark" ? "text-white/30" : "text-primary/20";
  const labelColor = tone === "dark" ? "text-white/40" : "text-primary/35";

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl border border-dashed ${
        tone === "dark" ? "border-white/15" : "border-primary/10"
      } ${gradient} ${className}`}
    >
      <div className="flex flex-col items-center gap-2">
        <ImageIcon className={iconColor} size={28} strokeWidth={1.25} />
        <span className={`text-[11px] tracking-wide ${labelColor}`}>{label}</span>
      </div>
    </div>
  );
}
