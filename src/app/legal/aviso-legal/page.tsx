import type { Metadata } from "next";
import PendingLegalNotice from "@/components/sections/legal/PendingLegalNotice";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Aviso legal",
  description: "Aviso legal de PSAI FLOW ACADEMY — próximamente disponible.",
  path: "/legal/aviso-legal",
  noIndex: true,
});

export default function AvisoLegalPage() {
  return <PendingLegalNotice title="Aviso legal" />;
}
