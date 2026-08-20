import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { COURSES } from "@/lib/courses";

/**
 * Solo incluye rutas que existen de verdad hoy (devuelven 200). Páginas
 * todavía no construidas (p. ej. /reserva, /blog/[slug], /legal/*) se
 * añadirán aquí en el mismo cambio que las cree, para no listar en el
 * sitemap URLs que un rastreador encontraría rotas.
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
    { path: "/libros", changeFrequency: "monthly", priority: 0.7 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.6 },
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
