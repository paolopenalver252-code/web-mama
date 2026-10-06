import type { Course, CourseModule } from "./types";

/**
 * Catálogo del Área de Alumnos. Solo los nombres de las formaciones son
 * reales; todo lo demás está vacío o es un marcador entre corchetes,
 * claramente identificable, hasta recibir el contenido definitivo.
 *
 * Los marcadores [TÍTULO DEL MÓDULO] / [TÍTULO DE LA LECCIÓN] existen únicamente para que la
 * estructura completa (formación → módulo → lección) sea navegable mientras
 * tanto. No representan el número real de módulos ni de lecciones: al cargar
 * el contenido de una formación, se sustituye su `modules` entero. Una
 * formación con `modules: []` muestra un estado vacío honesto.
 */

function placeholderModule(): CourseModule[] {
  return [
    {
      id: "modulo-01",
      label: "Módulo",
      title: "[TÍTULO DEL MÓDULO]",
      placeholder: true,
      lessons: [
        {
          slug: "leccion-01",
          title: "[TÍTULO DE LA LECCIÓN]",
          description: null,
          video: null,
          durationSeconds: null,
          resources: [],
          placeholder: true,
        },
      ],
    },
  ];
}

export const STUDENT_COURSES: Course[] = [
  {
    slug: "pendulo-hebreo-limpieza-magia-proteccion",
    order: 1,
    title: "Péndulo Hebreo, Limpieza, Magia y Protección",
    subtitle: null,
    description: null,
    status: "preparing",
    cover: null,
    modules: placeholderModule(),
  },
  {
    slug: "astrologia-tarot",
    order: 2,
    title: "Astrología y Tarot",
    subtitle: null,
    description: null,
    status: "preparing",
    cover: null,
    modules: placeholderModule(),
  },
  {
    slug: "psicotransformacion-metodo-psai-flow-codigo-fuente",
    order: 3,
    title: "Psicotransformación",
    subtitle: "Método PSAI FLOW® Código Fuente",
    description: null,
    status: "preparing",
    cover: null,
    modules: placeholderModule(),
  },
  {
    // Nombre pendiente de la clienta: no se inventa. Al recibirlo se cambian
    // el título, el slug (y se quita `placeholder`).
    slug: "cuarta-formacion",
    order: 4,
    title: "[CUARTA FORMACIÓN]",
    subtitle: null,
    description: null,
    status: "undefined",
    cover: null,
    modules: [],
    placeholder: true,
  },
];
