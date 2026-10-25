import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { education, experience, profile } from "@/content/site";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

const description = `${profile.name}, ${profile.role}. ${profile.headline}`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.website),
  title: {
    default: `${profile.name} | ${profile.role}`,
    template: `%s | ${profile.name}`,
  },
  description,
  keywords: ["Full Stack Engineer", "AI Engineer", "Next.js", "LangGraph", "AWS", "Go", "Abdul Rehman Memon"],
  authors: [{ name: profile.name, url: profile.website }],
  openGraph: {
    type: "website",
    url: profile.website,
    title: `${profile.name} | ${profile.role}`,
    description,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.role}`,
    description,
  },
};

const currentRole = experience.find((e) => e.current);

// Structured data for search engines (schema.org Person). `<` is escaped to keep the payload inert.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  description: profile.summary,
  url: profile.website,
  image: new URL(profile.photo, profile.website).toString(),
  email: `mailto:${profile.email}`,
  sameAs: Object.values(profile.socials),
  alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
  award: `${education.honor}, NUST`,
  ...(currentRole && { worksFor: { "@type": "Organization", name: currentRole.company } }),
  knowsAbout: ["Full-stack development", "AI engineering", "LangGraph", "Next.js", "TypeScript", "Go", "AWS"],
};

export const viewport: Viewport = {
  themeColor: "#08090a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
