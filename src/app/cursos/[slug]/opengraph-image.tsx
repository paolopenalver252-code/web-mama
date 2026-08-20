import { renderOgImage, OG_IMAGE_SIZE } from "@/lib/og-image";
import { getCourseBySlug } from "@/lib/courses";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  return renderOgImage(course?.title ?? "Cursos", course?.category ?? "PSAI FLOW ACADEMY");
}
