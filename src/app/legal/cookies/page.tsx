import type { Metadata } from "next";
import CookiesContent from "@/components/sections/legal/CookiesContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Política de cookies",
  description: "psaiflow.com no utiliza cookies de analítica ni de publicidad. Consulta aquí qué tecnologías usa realmente el sitio.",
  path: "/legal/cookies",
});

export default function CookiesPage() {
  return <CookiesContent />;
}
