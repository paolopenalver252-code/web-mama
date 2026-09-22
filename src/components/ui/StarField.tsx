type StarFieldProps = {
  className?: string;
  count?: number;
};

const GOLD = "rgba(200, 163, 95, 0.9)";
const WHITE = "rgba(255, 255, 255, 0.85)";

/**
 * Generador determinista (sin Math.random): servidor y cliente deben
 * pintar exactamente las mismas posiciones para no provocar un mismatch
 * de hidratación en este componente puramente decorativo.
 */
function seededRandom(seed: number): number {
  const value = Math.sin(seed) * 10000;
  return value - Math.floor(value);
}

/**
 * Cielo estrellado sutil para secciones oscuras — inspirado en los fondos
 * "Stars"/"Galaxy" de React Bits, reescrito sin WebGL (solo spans + CSS)
 * para no añadir dependencias nuevas al proyecto. Un guiño discreto a
 * "Magia Universal" y astrología, seña de identidad de la Academia.
 * Puramente decorativo: oculto a lectores de pantalla, y congelado por la
 * regla global de prefers-reduced-motion en globals.css.
 */
// Mitad de las estrellas queda oculta por debajo de `sm:` (puramente CSS,
// sin JS ni medición de viewport): menos capas compuestas animándose a la
// vez en móvil, mismo principio que revealTravel()/compactDelay() en
// motion/tokens.ts para el resto del sistema de motion.
const MOBILE_VISIBLE_RATIO = 0.5;

export default function StarField({ className = "", count = 46 }: StarFieldProps) {
  const mobileVisibleCount = Math.round(count * MOBILE_VISIBLE_RATIO);

  const stars = Array.from({ length: count }, (_, i) => {
    const seed = i + 1;
    const left = seededRandom(seed * 12.9898) * 100;
    const top = seededRandom(seed * 78.233) * 100;
    const size = 1 + seededRandom(seed * 37.719) * 1.6;
    const duration = 2.6 + seededRandom(seed * 4.671) * 3.4;
    const delay = seededRandom(seed * 9.123) * 4;
    const isGold = seededRandom(seed * 5.987) > 0.78;

    return { id: seed, left, top, size, duration, delay, color: isGold ? GOLD : WHITE };
  });

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {stars.map((star, index) => (
        <span
          key={star.id}
          className={`absolute rounded-full ${index >= mobileVisibleCount ? "hidden sm:block" : ""}`}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
            animation: `star-twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
