type JsonLdProps = {
  data: Record<string, unknown>;
};

/**
 * Inserta un bloque JSON-LD (Schema.org). `JSON.stringify` escapa
 * comillas/backslashes por defecto; sustituimos "<" para evitar que un
 * valor de texto pueda cerrar la etiqueta <script> de forma accidental.
 */
export default function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
}
