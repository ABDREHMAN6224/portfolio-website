import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { experience, profile } from "@/content/site";

// Static export: metadata route handlers must be explicitly prerendered.
export const dynamic = "force-static";
export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Raw hex mirrors the tokens in globals.css (CSS variables don't exist inside ImageResponse).
const c = {
  bg: "#08090a",
  surface: "#0f1012",
  line: "rgba(255,255,255,0.08)",
  lineStrong: "rgba(255,255,255,0.14)",
  fg: "#ededef",
  muted: "#a1a1aa",
  subtle: "#6b6b74",
  accent: "#6ee7b7",
};

const font = (file: string) => readFile(join(process.cwd(), "src/assets/og", file));
const [geistMedium, geistSemi, geistMono, serifItalic] = await Promise.all([
  font("Geist-Medium.ttf"),
  font("Geist-SemiBold.ttf"),
  font("GeistMono-Regular.ttf"),
  font("InstrumentSerif-Italic.ttf"),
]);

export default function OpengraphImage() {
  const domain = profile.website.replace(/^https?:\/\//, "");
  const stack = (experience.find((e) => e.current) ?? experience[0]).stack.slice(0, 5);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          background: c.bg,
          color: c.fg,
          fontFamily: "Geist",
          padding: "64px 72px",
        }}
      >
        {/* Grid, faded away from the top-right corner */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: "56px 56px",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage: `linear-gradient(200deg, rgba(8,9,10,0) 0%, rgba(8,9,10,0.85) 45%, ${c.bg} 75%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage: "radial-gradient(circle at 92% 0%, rgba(110,231,183,0.16) 0%, rgba(110,231,183,0.05) 30%, rgba(110,231,183,0) 55%)",
          }}
        />

        {/* Top row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 52,
                height: 52,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                borderRadius: 13,
                border: `1px solid ${c.lineStrong}`,
                background: c.surface,
                fontFamily: "Geist Mono",
                fontSize: 19,
                letterSpacing: -0.5,
              }}
            >
              {profile.initials}
              <div
                style={{
                  position: "absolute",
                  right: 8,
                  bottom: 8,
                  width: 6,
                  height: 6,
                  borderRadius: 6,
                  background: c.accent,
                }}
              />
            </div>
            <div style={{ display: "flex", fontFamily: "Geist Mono", fontSize: 20, color: c.muted }}>{domain}</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 18px",
              borderRadius: 999,
              border: `1px solid ${c.line}`,
              background: "rgba(15,16,18,0.8)",
              fontSize: 18,
              color: c.muted,
            }}
          >
            <div style={{ width: 9, height: 9, borderRadius: 9, background: "#e9c46a", display: "flex" }} />
            {profile.distinction}
          </div>
        </div>

        {/* Name + role */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 600, letterSpacing: -4.5, lineHeight: 1 }}>
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Instrument Serif",
              fontStyle: "italic",
              fontSize: 72,
              color: c.accent,
              lineHeight: 1.1,
              marginTop: 6,
            }}
          >
            {profile.role}
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 1000,
              marginTop: 26,
              fontSize: 28,
              fontWeight: 500,
              lineHeight: 1.4,
              letterSpacing: -0.4,
              color: c.muted,
            }}
          >
            {profile.headline}
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 44,
            paddingTop: 26,
            borderTop: `1px solid ${c.line}`,
            fontFamily: "Geist Mono",
            fontSize: 17,
            color: c.subtle,
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            {stack.map((s) => (
              <div
                key={s}
                style={{
                  display: "flex",
                  padding: "6px 14px",
                  borderRadius: 999,
                  border: `1px solid ${c.line}`,
                  background: "rgba(22,23,26,0.6)",
                  color: c.muted,
                }}
              >
                {s}
              </div>
            ))}
          </div>
          <div style={{ display: "flex" }}>{profile.location}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: geistMedium, weight: 500, style: "normal" },
        { name: "Geist", data: geistSemi, weight: 600, style: "normal" },
        { name: "Geist Mono", data: geistMono, weight: 400, style: "normal" },
        { name: "Instrument Serif", data: serifItalic, weight: 400, style: "italic" },
      ],
    },
  );
}
