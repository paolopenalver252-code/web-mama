import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Quita la cabecera X-Powered-By (info innecesaria para el cliente,
  // ningún impacto en el diseño ni en el comportamiento de la app).
  poweredByHeader: false,
};

export default nextConfig;
