export type Book = {
  slug: string;
  title: string;
  description: string;
  category: string;
  cover: string;
};

/**
 * Catálogo de libros. Único origen de datos para la sección Libros de la
 * Home y para /libros — añadir un libro aquí lo hace aparecer en ambos
 * sitios automáticamente.
 *
 * Los enlaces de "Más información" y "Comprar" aún no tienen destino real
 * (pendientes de portada definitiva y de la tienda/enlace de venta), así
 * que de momento se gestionan como "#" en los componentes que consumen
 * este catálogo.
 */
export const BOOKS: Book[] = [
  {
    slug: "curso-de-autocontrol-metodo-psai",
    title: "Curso de Auto-Control – Método PSAI",
    description: "Potencia tu Inteligencia Emocional.",
    category: "Método PSAI FLOW",
    cover: "/images/libro-autocontrol.jpg",
  },
  {
    slug: "psico-transformacion-codigo-cuantico",
    title: "Psico-Transformación – Método PSAI",
    description: "El Código de Transformación Cuántica.",
    category: "Método PSAI FLOW",
    cover: "/images/libro-curso-sanacion.jpg",
  },
  {
    slug: "psico-transformacion-codigo",
    title: "Psico-Transformación – Método PSAI",
    description: "El Código de Transformación.",
    category: "Método PSAI FLOW",
    cover: "/images/libro-codigo-cuantico.jpg",
  },
  {
    slug: "el-codigo-de-jesus",
    title: "El Código de Jesús",
    description: "Decretos Mágicos.",
    category: "Publicación",
    cover: "/images/libro-codigo-de-jesus.jpg",
  },
];
