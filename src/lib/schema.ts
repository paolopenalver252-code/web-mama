import { SITE_NAME, SITE_URL } from "@/lib/seo";
import type { Book } from "@/lib/books";
import type { Course } from "@/lib/courses";

/**
 * Generadores de JSON-LD (Schema.org). Regla estricta: solo se incluyen
 * campos con datos reales y confirmados en el proyecto. Nunca se rellenan
 * teléfono, redes sociales, precios, valoraciones o reseñas con datos de
 * relleno — Google penaliza el marcado con datos ficticios, y va contra la
 * norma del proyecto de no inventar información. Cuando ese dato exista de
 * verdad, añadirlo aquí lo propaga automáticamente a todas las páginas.
 */

const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export function organizationSchema() {
  return {
    "@type": "EducationalOrganization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Academia Internacional de Psicotransformación Integral, creadora del Método PSAI FLOW®.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mallorca",
      addressCountry: "ES",
    },
    areaServed: {
      "@type": "Place",
      name: "Internacional (atención online)",
    },
    founder: {
      "@type": "Person",
      name: "Solimar Rengel",
    },
  };
}

export function blogSchema() {
  return {
    "@type": "Blog",
    "@id": `${SITE_URL}/blog/#blog`,
    name: "Blog PSAI FLOW ACADEMY",
    url: `${SITE_URL}/blog`,
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "es",
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "es",
  };
}

export function personSchema() {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/academia/#solimar-rengel`,
    name: "Solimar Rengel",
    jobTitle: "Fundadora de PSAI FLOW ACADEMY",
    description:
      "Escritora, formadora, investigadora y creadora del Método PSAI FLOW®, con más de 35 años de experiencia.",
    worksFor: { "@id": ORGANIZATION_ID },
  };
}

export function courseSchema(course: Course) {
  return {
    "@type": "Course",
    "@id": `${SITE_URL}/cursos/${course.slug}/#course`,
    name: course.title,
    description: course.summary,
    provider: { "@id": ORGANIZATION_ID },
    inLanguage: "es",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: course.duration,
    },
  };
}

export function bookSchema(book: Book) {
  return {
    "@type": "Book",
    "@id": `${SITE_URL}/libros#${book.slug}`,
    name: book.title,
    description: book.description,
    author: {
      "@type": "Person",
      name: "Solimar Rengel",
    },
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "es",
  };
}

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? SITE_URL : `${SITE_URL}${item.path}`,
    })),
  };
}

/** Envuelve uno o varios nodos JSON-LD en un @graph con el contexto schema.org. */
export function jsonLdGraph(...nodes: Array<Record<string, unknown>>) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
