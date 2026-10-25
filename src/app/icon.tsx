import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile } from "@/content/site";

// Static export: metadata route handlers must be explicitly prerendered.
export const dynamic = "force-static";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Read once at module scope; the asset doesn't depend on the request.
const geist = await readFile(join(process.cwd(), "src/assets/og/Geist-SemiBold.ttf"));

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
          position: "relative",
          background: "#08090a",
          borderRadius: 14,
          border: "2px solid rgba(110,231,183,0.35)",
          color: "#ededef",
          fontFamily: "Geist",
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: -1.5,
        }}
      >
        {profile.initials}
        <div
          style={{
            position: "absolute",
            right: 9,
            bottom: 9,
            width: 8,
            height: 8,
            borderRadius: 8,
            background: "#6ee7b7",
          }}
        />
      </div>
    ),
    { ...size, fonts: [{ name: "Geist", data: geist, weight: 600, style: "normal" }] },
  );
}
