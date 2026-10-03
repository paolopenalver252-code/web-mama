import type { Metadata } from "next";
import AvisoLegalContent from "@/components/sections/legal/AvisoLegalContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Aviso legal",
  description: "Aviso legal de PSAI FLOW ACADEMY: identidad del titular, condiciones de uso y propiedad intelectual del sitio psaiflow.com.",
  path: "/legal/aviso-legal",
});

export default function AvisoLegalPage() {
  return <AvisoLegalContent />;
}
