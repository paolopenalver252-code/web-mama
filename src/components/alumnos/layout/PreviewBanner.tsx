/**
 * Aviso permanente de la vista previa de desarrollo (ver
 * lib/alumnos/server/preview.ts). Nunca se renderiza en producción.
 */
export default function PreviewBanner() {
  return (
    <div role="note" className="border-b border-accent/30 bg-accent/[0.12] px-5 py-2.5 text-center text-xs leading-relaxed text-primary sm:px-8">
      <strong className="font-semibold">Vista previa de desarrollo — sin autenticación real.</strong>{" "}
      Solo existe en local con ALUMNOS_PREVIEW=1; en producción el área privada no es accesible sin un
      sistema de acceso real.
    </div>
  );
}
