import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Quita la cabecera X-Powered-By (info innecesaria para el cliente,
  // ningún impacto en el diseño ni en el comportamiento de la app).
  poweredByHeader: false,
  async redirects() {
    return [
      // Antigua página "Próximamente" del acceso de alumnos: cualquier enlace
      // guardado o compartido lleva ahora a la pantalla de acceso real.
      { source: "/acceso-alumnos", destination: "/alumnos/acceso", permanent: true },
    ];
  },
};

export default nextConfig;
