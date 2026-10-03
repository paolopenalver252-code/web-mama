import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { COURSES } from "@/lib/courses";

/**
 * Solo incluye rutas indexables con contenido real hoy. /blog ya existe
 * (devuelve 200, para que el footer/menú no enlace a un 404) pero muestra un
 * aviso de "contenido pendiente" con `noIndex: true` mientras no haya texto
 * definitivo del cliente — se añadirá aquí en el mismo cambio que reciba su
 * contenido final. Las páginas /legal/* ya tienen contenido real y se
 * incluyen a continuación.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }> = [
    { path: "/", changeFrequency: "monthly", priority: 1 },
    { path: "/metodo-psai-flow", changeFrequency: "yearly", priority: 0.8 },
    { path: "/academia", changeFrequency: "monthly", priority: 0.8 },
    { path: "/cursos", changeFrequency: "weekly", priority: 0.9 },
    { path: "/consultas", changeFrequency: "monthly", priority: 0.9 },
    { path: "/limpieza-energetica-proteccion", changeFrequency: "monthly", priority: 0.9 },
    { path: "/psicotarot-astrologia-feng-shui", changeFrequency: "monthly", priority: 0.9 },
    { path: "/libros", changeFrequency: "monthly", priority: 0.7 },
    { path: "/contacto", changeFrequency: "yearly", priority: 0.6 },
    { path: "/legal/aviso-legal", changeFrequency: "yearly", priority: 0.3 },
    { path: "/legal/privacidad", changeFrequency: "yearly", priority: 0.3 },
    { path: "/legal/cookies", changeFrequency: "yearly", priority: 0.3 },
  ];

  const courseRoutes = COURSES.map((course) => ({
    path: `/cursos/${course.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...courseRoutes].map((route) => ({
    url: `${SITE_URL}${route.path === "/" ? "" : route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
