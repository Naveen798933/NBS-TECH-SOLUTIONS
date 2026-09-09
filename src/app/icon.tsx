// src/app/icon.tsx
import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 14,
          background: "linear-gradient(135deg, #05070D 0%, #0B1426 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#00D2FF",
          fontWeight: 900,
          borderRadius: 7,
          border: "1.5px solid #2E6BFF",
          letterSpacing: "-0.5px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          boxShadow: "0 0 10px rgba(46, 107, 255, 0.5)",
        }}
      >
        NBS
      </div>
    ),
    {
      ...size,
    }
  );
}
