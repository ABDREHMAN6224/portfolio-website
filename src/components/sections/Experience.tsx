"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import clsx from "clsx";
import { experience, type Experience as ExperienceItem } from "@/content/site";
import { Accent, Reveal, Section, SectionHeading, Tag } from "@/components/ui/primitives";

/*
 * Timeline geometry. The hairline sits in the gutter between the meta column and the content column on
 * desktop, and hugs the left edge on mobile. Dots are centred on it.
 *   mobile:  line at 5px
 *   desktop: line at META + GAP / 2  (13rem + 2.5rem)
 */
const LINE_X = "left-[5px] md:left-[15.5rem]";
const DOT_X = "left-0 md:left-[calc(15.5rem-5px)]";

export default function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 65%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <Section id="experience">
      <SectionHeading
        index="02"
        eyebrow="Experience"
        title={
          <>
            Three years of shipping, <Accent>end to end</Accent>
          </>
        }
        lede="From a first SaaS launch to production AI systems for clients. The teams I've built with, most recent first."
      />

      <ol ref={listRef} className="relative">
        {/* Static hairline */}
        <div
          aria-hidden="true"
          className={clsx(
            "pointer-events-none absolute top-2 bottom-0 w-px bg-gradient-to-b from-line-strong via-line to-transparent",
            LINE_X,
          )}
        />
        {/* Scroll-linked progress */}
        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            style={{ scaleY: progress }}
            className={clsx(
              "pointer-events-none absolute top-2 bottom-0 w-px origin-top bg-gradient-to-b from-accent/0 via-accent/50 to-accent",
              LINE_X,
            )}
          />
        )}

        {experience.map((item, i) => (
          <TimelineEntry key={`${item.company}-${item.period}`} item={item} index={i} />
        ))}
      </ol>
    </Section>
  );
}

function TimelineEntry({ item, index }: { item: ExperienceItem; index: number }) {
  return (
    <li className="relative pb-16 pl-9 last:pb-0 sm:pb-20 md:grid md:grid-cols-[13rem_minmax(0,1fr)] md:gap-x-20 md:pl-0">
      <Dot current={item.current} />

      {/* Meta column */}
      <Reveal className="mb-5 md:sticky md:top-28 md:mb-0 md:self-start">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
          <time>{item.period}</time>
        </p>
        <p className="mt-3 text-lg font-medium tracking-tight text-fg">{item.company}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-subtle">{item.mode}</span>
          {item.current && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
              <span className="size-1 rounded-full bg-accent" aria-hidden="true" />
              Current
            </span>
          )}
        </div>
      </Reveal>

      {/* Content column */}
      <Reveal delay={0.08} className="min-w-0">
        <h3 className="text-xl font-medium tracking-tight text-fg sm:text-2xl">
          {item.role}
          <span className="sr-only">, {item.company}</span>
        </h3>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{item.summary}</p>

        <ul className="mt-6 max-w-2xl space-y-3">
          {item.highlights.map((h) => (
            <li key={h} className="relative pl-5 text-[15px] leading-relaxed text-muted">
              <span
                aria-hidden="true"
                className="absolute top-[0.7em] left-0 h-px w-2.5 bg-accent/60"
              />
              {h}
            </li>
          ))}
        </ul>

        <ul className="mt-7 flex flex-wrap gap-2" aria-label={`${item.company} stack`}>
          {item.stack.map((s) => (
            <li key={s}>
              <Tag>{s}</Tag>
            </li>
          ))}
        </ul>
      </Reveal>

      {index < experience.length - 1 && (
        <div aria-hidden="true" className="absolute right-0 bottom-8 left-9 h-px bg-line sm:bottom-10 md:hidden" />
      )}
    </li>
  );
}

function Dot({ current }: { current?: boolean }) {
  return (
    <span aria-hidden="true" className={clsx("absolute top-[3px] grid size-[11px] place-items-center", DOT_X)}>
      {current ? (
        <>
          <span className="absolute inset-[-5px] animate-pulse-dot rounded-full bg-accent/20" />
          <span className="relative size-[9px] rounded-full bg-accent shadow-[0_0_14px_var(--color-accent)]" />
        </>
      ) : (
        <span className="size-[9px] rounded-full border border-subtle/70 bg-bg ring-4 ring-bg" />
      )}
    </span>
  );
}
