import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f2d52",
          color: "#c8a35f",
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: -0.5,
        }}
      >
        PF
      </div>
    ),
    { ...size }
  );
}
