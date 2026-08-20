import { renderOgImage, OG_IMAGE_SIZE } from "@/lib/og-image";

export const alt = "La Academia | PSAI FLOW ACADEMY";
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("La Academia", "PSAI FLOW ACADEMY");
}
