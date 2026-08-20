import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { DEFAULT_LOCALE, SITE_NAME, SITE_URL } from "@/lib/seo";
import { jsonLdGraph, organizationSchema, websiteSchema } from "@/lib/schema";
import "./globals.css";

// Solo se usa el peso 400 en todo el proyecto (verificado: ningún h1-h6 ni
// clase font-heading combina con font-medium/semibold/bold). Cargar los
// otros tres pesos era peso muerto en cada carga de página.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_DESCRIPTION =
  "PSAI FLOW ACADEMY es la academia internacional de Psicotransformación Integral fundada por Solimar Rengel: Método PSAI FLOW®, Magia Universal, Limpieza Energética y Protección, cursos y consultas personalizadas.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Academia Internacional de Psicotransformación Integral`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "PSAI FLOW ACADEMY",
    "Método PSAI FLOW",
    "Psicotransformación Integral",
    "Solimar Rengel",
    "Limpieza Energética y Protección",
    "Magia Universal",
    "Astrología",
    "Psicotarot",
    "Numerología",
    "Coaching",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `${SITE_NAME} | Academia Internacional de Psicotransformación Integral`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: DEFAULT_LOCALE,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Academia Internacional de Psicotransformación Integral`,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-ink font-sans">
        <JsonLd data={jsonLdGraph(organizationSchema(), websiteSchema())} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
