type EyebrowProps = {
  children: string;
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Etiqueta en formato píldora usada antes de cada título — único origen
 * de este estilo en todo el proyecto (SectionHeading y cualquier Hero lo
 * consumen desde aquí, así que un cambio aquí se propaga a las 10 páginas).
 */
export default function Eyebrow({ children, tone = "light", className = "" }: EyebrowProps) {
  // Sobre fondo claro, el dorado decorativo no cumple contraste de texto;
  // sobre fondo navy sí lo cumple sobradamente, así que solo se sustituye
  // en tone="light".
  const color = tone === "dark" ? "text-accent" : "text-accent-text";
  const pill = tone === "dark" ? "border-white/15 bg-white/[0.06]" : "border-accent/20 bg-accent/[0.06]";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] ${pill} ${color} ${className}`}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
      {children}
    </span>
  );
}
