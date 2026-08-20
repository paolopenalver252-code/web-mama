import { ImageResponse } from "next/og";

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

/**
 * Plantilla de imagen Open Graph/Twitter Card compartida por todas las
 * rutas — así cada página comparte identidad visual (navy + dorado) al
 * enlazarse en redes sociales, sin depender de fotografía real todavía.
 */
export function renderOgImage(title: string, eyebrow: string = "PSAI FLOW ACADEMY") {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0f2d52 0%, #163b67 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#c8a35f",
            fontSize: 26,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 6,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            marginTop: 28,
            display: "flex",
            width: 90,
            height: 3,
            background: "#c8a35f",
          }}
        />
        <div
          style={{
            marginTop: 40,
            display: "flex",
            color: "#ffffff",
            fontSize: 64,
            fontWeight: 600,
            lineHeight: 1.15,
            maxWidth: 950,
          }}
        >
          {title}
        </div>
      </div>
    ),
    { ...OG_IMAGE_SIZE }
  );
}
