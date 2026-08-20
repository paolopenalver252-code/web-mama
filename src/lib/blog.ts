export type BlogCategory =
  | "Método PSAI FLOW"
  | "Magia Universal"
  | "Limpieza Energética"
  | "Protección"
  | "Psicotarot"
  | "Astrología"
  | "Feng Shui"
  | "Desarrollo Personal"
  | "Coaching"
  | "Libros";

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Método PSAI FLOW",
  "Magia Universal",
  "Limpieza Energética",
  "Protección",
  "Psicotarot",
  "Astrología",
  "Feng Shui",
  "Desarrollo Personal",
  "Coaching",
  "Libros",
];

export type BlogPost = {
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;
  date: string;
  readTime: string;
};

/**
 * Contenido de EJEMPLO, no artículos reales — así lo pidió el cliente
 * explícitamente. Sirve para probar el diseño de las tarjetas y el filtro
 * de categorías mientras no exista un CMS conectado.
 *
 * Preparado para CMS: el resto de la página consume únicamente
 * `getFeaturedPost()` y `getAllPosts()`. El día que haya un CMS real, solo
 * hay que cambiar la implementación de estas dos funciones — el resto del
 * código no necesita tocarse.
 */
const FEATURED_POST: BlogPost = {
  slug: "articulo-destacado-de-ejemplo",
  title: "Artículo destacado de ejemplo",
  category: "Método PSAI FLOW",
  excerpt:
    "Texto de ejemplo. Aquí aparecerá el extracto real del artículo destacado cuando se publique contenido definitivo.",
  date: "Fecha de ejemplo",
  readTime: "8 min de lectura",
};

const PLACEHOLDER_POSTS: BlogPost[] = BLOG_CATEGORIES.map((category, index) => ({
  slug: `articulo-de-ejemplo-${index + 1}`,
  title: `Artículo de ejemplo — ${category}`,
  category,
  excerpt:
    "Texto de ejemplo. Aquí aparecerá el extracto real del artículo cuando se publique contenido definitivo.",
  date: "Fecha de ejemplo",
  readTime: `${3 + (index % 4)} min de lectura`,
}));

export function getFeaturedPost(): BlogPost {
  return FEATURED_POST;
}

export function getAllPosts(): BlogPost[] {
  return PLACEHOLDER_POSTS;
}
