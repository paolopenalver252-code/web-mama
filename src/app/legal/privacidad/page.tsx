import type { Metadata } from "next";
import PrivacidadContent from "@/components/sections/legal/PrivacidadContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Política de privacidad",
  description: "Qué datos trata PSAI FLOW ACADEMY a través de psaiflow.com, con qué finalidad y cómo ejercer tus derechos de protección de datos.",
  path: "/legal/privacidad",
});

export default function PrivacidadPage() {
  return <PrivacidadContent />;
}
