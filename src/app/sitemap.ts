import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { COURSES } from "@/lib/courses";

/**
 * Solo incluye rutas indexables con contenido real hoy. Las páginas
 * /legal/* y /blog ya existen (devuelven 200, para que el footer/menú no
 * enlacen a un 404) pero muestran un aviso de "contenido pendiente" con
 * `noIndex: true` mientras no haya texto definitivo del cliente — se
 * añadirán aquí en el mismo cambio que reciban su contenido final.
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
