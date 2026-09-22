import type { Metadata } from "next";
import PendingLegalNotice from "@/components/sections/legal/PendingLegalNotice";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Política de privacidad",
  description: "Política de privacidad de PSAI FLOW ACADEMY — próximamente disponible.",
  path: "/legal/privacidad",
  noIndex: true,
});

export default function PrivacidadPage() {
  return <PendingLegalNotice title="Política de privacidad" />;
}
