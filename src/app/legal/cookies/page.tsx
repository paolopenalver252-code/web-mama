import type { Metadata } from "next";
import PendingLegalNotice from "@/components/sections/legal/PendingLegalNotice";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Política de cookies",
  description: "Política de cookies de PSAI FLOW ACADEMY — próximamente disponible.",
  path: "/legal/cookies",
  noIndex: true,
});

export default function CookiesPage() {
  return <PendingLegalNotice title="Política de cookies" />;
}
