/**
 * Aviso permanente de la vista previa de desarrollo (ver
 * lib/alumnos/server/preview.ts). Nunca se renderiza en producción.
 */
export default function PreviewBanner() {
  return (
    <div
      role="note"
      className="border-b border-campus-gold/25 bg-campus-gold/10 px-5 py-2 text-center text-xs leading-relaxed text-campus-ink sm:px-8"
    >
      <strong className="font-semibold">Vista previa de desarrollo — sin sesión real.</strong>{" "}
      <span className="text-campus-muted">Solo existe en local con ALUMNOS_PREVIEW=1; nunca en producción.</span>
    </div>
  );
}
