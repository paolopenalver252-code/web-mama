type BrandMotifProps = {
  className?: string;
  /** Giro del motivo en grados — distingue visuales sin cambiar el lenguaje. */
  rotation?: number;
  /** Ángulo (grados) del punto dorado sobre la órbita media. */
  orbitAngle?: number;
};

const TICKS = Array.from({ length: 72 }, (_, index) => index * 5);

function polar(radius: number, degrees: number) {
  const radians = (degrees * Math.PI) / 180;
  // Redondeado: mismas coordenadas en servidor y navegador (sin desajustes de hidratación).
  const round = (value: number) => Math.round(value * 100) / 100;
  return { x: round(200 + radius * Math.cos(radians)), y: round(200 + radius * Math.sin(radians)) };
}

/**
 * Motivo gráfico del campus: un astrolabio de líneas finas (anillos, ejes,
 * graduación y un punto dorado en órbita). Une lo técnico (instrumento de
 * medida) con lo simbólico de PSAI FLOW sin ser una imagen de contenido.
 * Se pinta con `currentColor`, así que su intensidad la decide quien lo usa.
 * Trazo constante a cualquier tamaño (non-scaling-stroke).
 */
export default function BrandMotif({ className = "", rotation = 0, orbitAngle = -38 }: BrandMotifProps) {
  const dot = polar(132, orbitAngle);
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden
      focusable="false"
      className={`[&_*]:[vector-effect:non-scaling-stroke] ${className}`}
    >
      <g stroke="currentColor" strokeWidth="1" transform={`rotate(${rotation} 200 200)`}>
        <circle cx="200" cy="200" r="198" />
        <circle cx="200" cy="200" r="172" />
        <circle cx="200" cy="200" r="132" strokeDasharray="1 7" />
        <circle cx="200" cy="200" r="88" />
        <circle cx="200" cy="200" r="38" />
        <line x1="200" y1="2" x2="200" y2="398" />
        <line x1="2" y1="200" x2="398" y2="200" />
        <line x1="60" y1="60" x2="340" y2="340" opacity="0.5" />
        <ellipse cx="200" cy="200" rx="172" ry="64" opacity="0.6" />
        {TICKS.map((angle) => {
          const outer = polar(198, angle);
          const inner = polar(angle % 30 === 0 ? 184 : 191, angle);
          return <line key={angle} x1={outer.x} y1={outer.y} x2={inner.x} y2={inner.y} />;
        })}
      </g>
      <circle cx={dot.x} cy={dot.y} r="4.5" fill="var(--color-campus-gold)" />
      <circle cx="200" cy="200" r="2.5" fill="currentColor" />
    </svg>
  );
}
