import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile } from "@/content/site";

// Static export: metadata route handlers must be explicitly prerendered.
export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const geist = await readFile(join(process.cwd(), "src/assets/og/Geist-SemiBold.ttf"));

// iOS applies its own corner mask, so this is a full-bleed square.
export default function AppleIcon() {
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
          background: "radial-gradient(circle at 100% 0%, rgba(110,231,183,0.18), rgba(8,9,10,0) 60%), #08090a",
          color: "#ededef",
          fontFamily: "Geist",
          fontSize: 78,
          fontWeight: 600,
          letterSpacing: -4,
        }}
      >
        {profile.initials}
        <div
          style={{
            position: "absolute",
            right: 34,
            bottom: 34,
            width: 16,
            height: 16,
            borderRadius: 16,
            background: "#6ee7b7",
          }}
        />
      </div>
    ),
    { ...size, fonts: [{ name: "Geist", data: geist, weight: 600, style: "normal" }] },
  );
}
