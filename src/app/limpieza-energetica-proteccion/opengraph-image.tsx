import { renderOgImage, OG_IMAGE_SIZE } from "@/lib/og-image";

export const alt = "Limpieza Energética y Protección | PSAI FLOW ACADEMY";
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("Limpieza Energética y Protección", "Una especialidad PSAI FLOW");
}
