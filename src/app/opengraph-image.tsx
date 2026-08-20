import { renderOgImage, OG_IMAGE_SIZE } from "@/lib/og-image";

export const alt = "PSAI FLOW ACADEMY — Academia Internacional de Psicotransformación Integral";
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("Academia Internacional de Psicotransformación Integral", "PSAI FLOW ACADEMY");
}
