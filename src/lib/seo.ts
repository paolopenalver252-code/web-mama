import type { Metadata } from "next";

/**
 * Dominio real pendiente de confirmación del cliente. En cuanto se
 * despliegue en el dominio definitivo, basta con definir la variable de
 * entorno NEXT_PUBLIC_SITE_URL (o cambiar el valor por defecto aquí) — todo
 * lo demás (metadataBase, canonical, sitemap, robots, JSON-LD) lo consume
 * desde este único sitio.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.psaiflowacademy.com").replace(
  /\/$/,
  ""
);

export const SITE_NAME = "PSAI FLOW ACADEMY";

export const DEFAULT_LOCALE = "es_ES";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  /** Palabras clave opcionales específicas de la página (además de las de marca). */
  keywords?: string[];
  noIndex?: boolean;
};

/**
 * Construye el bloque `Metadata` completo (title, description, canonical,
 * Open Graph, Twitter Card) de una página a partir de un único origen de
 * datos, para que ninguna quede desincronizada entre sí.
 */
export function buildPageMetadata({ title, description, path, keywords, noIndex }: PageMetadataInput): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: DEFAULT_LOCALE,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
