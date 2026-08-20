type WatermarkProps = {
  text?: string;
  className?: string;
};

/**
 * Textura de marca sutil para secciones oscuras: la palabra "PSAI" a gran
 * escala, casi invisible, recortada por el overflow-hidden de la sección
 * contenedora. Puramente decorativa — nunca debe llevar significado, por eso
 * queda oculta a lectores de pantalla.
 */
export default function Watermark({ text = "PSAI", className = "" }: WatermarkProps) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute select-none font-heading font-medium leading-none text-white/[0.04] ${className}`}
      style={{ fontSize: "clamp(9rem, 26vw, 24rem)" }}
    >
      {text}
    </span>
  );
}
