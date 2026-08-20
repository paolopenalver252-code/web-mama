import { renderOgImage, OG_IMAGE_SIZE } from "@/lib/og-image";

export const alt = "Contacto | PSAI FLOW ACADEMY";
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("Contacto", "Hablemos");
}
