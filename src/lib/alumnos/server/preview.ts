import "server-only";

/**
 * Vista previa de desarrollo del Área de Alumnos.
 *
 * Mientras no exista autenticación real, ninguna pantalla privada es
 * accesible. Para poder revisar el diseño en local, se puede arrancar
 * `npm run dev` con la variable ALUMNOS_PREVIEW=1: el área privada se abre
 * con un aviso permanente de "vista previa, sin autenticación real".
 *
 * Doble cerrojo: exige la variable explícita Y que no sea un build de
 * producción. `next build` fija NODE_ENV="production" en tiempo de
 * compilación, así que en producción esta función es literalmente `false`
 * y el código de la vista previa se elimina del bundle, se configure lo que
 * se configure en el servidor.
 */
export function isPreviewMode(): boolean {
  return process.env.NODE_ENV !== "production" && process.env.ALUMNOS_PREVIEW === "1";
}
