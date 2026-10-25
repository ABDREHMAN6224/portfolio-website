// Shared building blocks. Every section composes these so spacing, type and motion stay consistent.
"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import clsx from "clsx";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={clsx("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>{children}</div>;
}

/** Standard section shell: anchor id, vertical rhythm, top hairline. */
export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={clsx("relative border-t border-line py-24 sm:py-32", className)}>
      <Container>{children}</Container>
    </section>
  );
}

/** Section heading: mono index + eyebrow, large title, optional lede. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
  className,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={clsx("mb-14 max-w-3xl sm:mb-20", className)}>
      <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-subtle">
        <span className="text-accent">{index}</span>
        <span className="h-px w-8 bg-line-strong" />
        {eyebrow}
      </p>
      <h2 className="text-balance text-4xl font-medium tracking-tight text-fg sm:text-5xl">{title}</h2>
      {lede && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{lede}</p>}
    </Reveal>
  );
}

/** Serif italic accent for a word or two inside a heading. */
export function Accent({ children }: { children: React.ReactNode }) {
  return <span className="font-serif text-[1.08em] font-normal italic text-accent">{children}</span>;
}

/** Fade-and-rise on first scroll into view. */
export function Reveal({
  delay = 0,
  className,
  children,
  ...rest
}: { delay?: number; className?: string; children: React.ReactNode } & Omit<
  HTMLMotionProps<"div">,
  "children"
>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border border-line bg-surface-2/60 px-2.5 py-1 font-mono text-[11px] tracking-tight text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  download?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function ButtonLink({ href, variant = "primary", external, download, className, children }: ButtonProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(download ? { download: "" } : {})}
      className={clsx(
        "group inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-all duration-300",
        variant === "primary" &&
          "bg-fg text-bg hover:bg-accent hover:shadow-[0_0_32px_-4px_var(--color-accent)]",
        variant === "secondary" &&
          "border border-line-strong bg-surface/60 text-fg backdrop-blur hover:border-accent/60 hover:text-accent",
        variant === "ghost" && "text-muted hover:text-fg",
        className,
      )}
    >
      {children}
    </a>
  );
}
