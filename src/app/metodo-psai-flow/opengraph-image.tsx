import { renderOgImage, OG_IMAGE_SIZE } from "@/lib/og-image";

export const alt = "Método PSAI FLOW® | PSAI FLOW ACADEMY";
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("Método PSAI FLOW®", "El origen de PSAI FLOW ACADEMY");
}
