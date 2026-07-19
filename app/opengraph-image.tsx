import { ImageResponse } from "next/og";
import { profile } from "@/lib/data/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#f7f5f0",
          color: "#111111",
          padding: "80px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 2,
            color: "#c1401c",
            marginBottom: 24,
          }}
        >
          {profile.role}
          &nbsp;—&nbsp;
          {profile.location}
        </div>
        <div style={{ fontSize: 88, fontWeight: 900, lineHeight: 1, letterSpacing: -2 }}>
          {profile.name}
        </div>
      </div>
    ),
    { ...size }
  );
}
