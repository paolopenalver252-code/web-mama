/**
 * Modelo de contenidos del Área de Alumnos:
 *
 *   Formación (Course) → Módulo o bloque (CourseModule) → Lección (Lesson)
 *                                                          ├─ vídeo
 *                                                          └─ materiales (PDF, audio, descargas, enlaces)
 *
 * Hoy los datos viven en ./courses.ts; mañana pueden venir de una base de
 * datos o un CMS sin cambiar estos tipos ni la interfaz que los pinta.
 */

/**
 * Vídeo alojado en un proveedor con reproducción privada (URLs firmadas o
 * restringidas por dominio). Nunca un archivo público en /public: cualquiera
 * podría descargarlo sin estar matriculado.
 */
export type LessonVideo = {
  provider: "vimeo" | "bunny" | "mux" | "cloudflare-stream";
  /** Identificador del vídeo en el proveedor (no una URL pública). */
  videoId: string;
};

export type LessonResourceKind = "pdf" | "audio" | "download" | "link";

export type LessonResource = {
  id: string;
  kind: LessonResourceKind;
  title: string;
  /**
   * Clave del archivo en el almacenamiento privado. La URL de descarga se
   * genera en el servidor, firmada y con caducidad, solo para alumnos con
   * acceso a la formación.
   */
  storageKey: string;
  sizeBytes?: number;
};

export type Lesson = {
  /** Única dentro de su formación; forma parte de la URL de la lección. */
  slug: string;
  title: string;
  description: string | null;
  video: LessonVideo | null;
  durationSeconds: number | null;
  resources: LessonResource[];
  /** Hueco estructural sin contenido real todavía (se muestra como pendiente). */
  placeholder?: boolean;
};

export type CourseModule = {
  id: string;
  /** "Módulo", "Bloque"… — cada formación puede nombrar sus partes a su manera. */
  label: string;
  title: string;
  lessons: Lesson[];
  placeholder?: boolean;
};

/**
 * Imagen de portada de una formación (archivo en /public o URL permitida en
 * next.config). Sin portada, el campus pinta un visual abstracto de marca
 * que no se hace pasar por una imagen oficial.
 */
export type CourseCover = {
  src: string;
  alt: string;
};

export type CourseStatus =
  /** Formación definida, con su contenido aún por cargar en la plataforma. */
  | "preparing"
  /** Contenido publicado y disponible para los alumnos con acceso. */
  | "available"
  /** Formación reservada cuyo nombre y contenido están por definir. */
  | "undefined";

export type Course = {
  /** Identificador estable; forma parte de la URL. */
  slug: string;
  /** Orden de presentación (01, 02…). */
  order: number;
  title: string;
  subtitle: string | null;
  description: string | null;
  status: CourseStatus;
  cover: CourseCover | null;
  modules: CourseModule[];
  /** El título es un marcador provisional, no el nombre real. */
  placeholder?: boolean;
};

/**
 * Progreso de un alumno en una formación. `tracking: false` significa que no
 * existe almacenamiento de progreso: la interfaz no muestra ningún dato de
 * avance en vez de inventarlo.
 */
export type CourseProgress =
  | { tracking: false }
  | {
      tracking: true;
      completedLessonSlugs: string[];
      /** Última lección abierta por el alumno, para "continuar" donde lo dejó. */
      lastLessonSlug: string | null;
    };
