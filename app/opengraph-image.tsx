import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          background: "#0A1224",
          padding: "72px",
          color: "#F4F6F8",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 72,
            height: 8,
            background: "linear-gradient(90deg, #0B3D91 0%, #3FC1F0 100%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 72,
              letterSpacing: "-0.06em",
              fontWeight: 600,
            }}
          >
            wavsy
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 36,
              letterSpacing: "-0.03em",
              color: "#E8EEF3",
            }}
          >
            Websites that work while you do not.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
