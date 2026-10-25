import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { profile } from "@/content/site";
import { Accent, ButtonLink, Container } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-fade-b" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(50%_60%_at_50%_0%,color-mix(in_oklab,var(--color-accent)_10%,transparent),transparent_70%)]"
      />

      <Container className="flex h-16 items-center">
        <Link href="/" className="inline-flex items-center gap-3" aria-label={`${profile.name}, home`}>
          <span className="relative flex size-9 items-center justify-center rounded-[10px] border border-line-strong bg-surface-2 font-mono text-[13px] font-medium tracking-tight text-fg">
            {profile.initials}
            <span className="absolute bottom-1.5 right-1.5 size-1 rounded-full bg-accent" />
          </span>
          <span className="text-sm font-medium tracking-tight text-fg">{profile.name}</span>
        </Link>
      </Container>

      <Container className="flex flex-1 flex-col items-center justify-center py-24 text-center">
        <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-subtle">
          <span className="text-accent">404</span>
          <span className="h-px w-8 bg-line-strong" />
          Not found
        </p>
        <h1 className="text-balance text-5xl font-medium tracking-tight text-fg sm:text-7xl">
          This page <Accent>doesn&apos;t exist</Accent>.
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
          The link may be broken, or the page may have moved. Everything worth seeing is on the home page.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/">
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden />
            Back to home
          </ButtonLink>
          <ButtonLink href="/#contact" variant="secondary">
            Get in touch
          </ButtonLink>
        </div>
      </Container>

      <Container className="py-6">
        <p className="text-center font-mono text-xs text-subtle">{profile.website.replace(/^https?:\/\//, "")}</p>
      </Container>
    </main>
  );
}
