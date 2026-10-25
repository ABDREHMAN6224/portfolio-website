"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { GraduationCap, Medal } from "lucide-react";
import { about, education, stats } from "@/content/site";
import { Accent, Reveal, Section, SectionHeading } from "@/components/ui/primitives";

function AccentTitle({ text, accent }: { text: string; accent: string }) {
  const i = text.indexOf(accent);
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <Accent>{accent}</Accent>
      {text.slice(i + accent.length)}
    </>
  );
}

/** Splits "3.92" / "95%" / "3+" into a number to animate plus its affixes. */
function parseStat(value: string) {
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, num, suffix] = match;
  return { prefix, suffix, target: parseFloat(num), decimals: num.split(".")[1]?.length ?? 0 };
}

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const parsed = parseStat(value);
  const [display, setDisplay] = useState(() => (parsed ? (0).toFixed(parsed.decimals) : value));

  useEffect(() => {
    if (!parsed || !inView) return;
    if (reduce) {
      setDisplay(parsed.target.toFixed(parsed.decimals));
      return;
    }
    const controls = animate(0, parsed.target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(parsed.decimals)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value]);

  if (!parsed) return <span>{value}</span>;
  return (
    <span ref={ref} className="tabular-nums">
      {/* Screen readers get the final value, not the animation frames. */}
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        {parsed.prefix}
        {display}
        <span className="text-accent">{parsed.suffix}</span>
      </span>
    </span>
  );
}

export default function About() {
  return (
    <Section id="about">
      <SectionHeading index="01" eyebrow="About" title={<AccentTitle text={about.title} accent={about.titleAccent} />} />

      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <div className="space-y-6 text-lg leading-relaxed text-muted">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p className="text-pretty">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="mt-10 flex items-start gap-4 border-t border-line pt-8">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-muted">
                <GraduationCap className="size-[18px]" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">Education</p>
                <p className="mt-1.5 text-fg">{education.degree}</p>
                <p className="mt-0.5 text-sm text-muted">
                  {education.school} <span className="text-subtle">·</span>{" "}
                  <span className="whitespace-nowrap font-mono text-[13px] text-fg">{education.detail}</span>
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-start gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-gold/30 bg-gold/[0.08] text-gold">
                <Medal className="size-[18px]" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">Honor</p>
                <p className="mt-1.5 text-fg">{education.honor}</p>
                <p className="mt-0.5 text-sm text-muted">{education.honorDetail}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-2xl border border-line bg-line lg:col-span-6">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={0.08 * i} className="h-full">
              <div className="group relative flex h-full flex-col justify-between gap-8 bg-surface p-5 transition-colors duration-300 hover:bg-surface-2 sm:gap-10 sm:p-8">
                <span className="font-mono text-[11px] text-subtle">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-4xl font-medium tracking-[-0.04em] text-fg min-[400px]:text-5xl sm:text-6xl">
                    <CountUp value={stat.value} />
                  </p>
                  <p className="mt-3 max-w-[16rem] text-[13px] leading-snug text-muted sm:text-sm">{stat.label}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
