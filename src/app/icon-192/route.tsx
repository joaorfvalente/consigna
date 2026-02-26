import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
          borderRadius: 24,
        }}
      >
        <span
          style={{
            fontSize: 96,
            color: "white",
            fontWeight: 700,
            fontFamily: "system-ui",
          }}
        >
          1%
        </span>
      </div>
    ),
    {
      width: 192,
      height: 192,
    }
  );
}
