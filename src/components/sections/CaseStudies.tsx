"use client";

import { useCallback, useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import { caseStudies, type CaseStudy } from "@/content/site";
import { Accent, Reveal, Section, SectionHeading, Tag } from "@/components/ui/primitives";

const accentMix = (pct: number) => `color-mix(in oklab, var(--color-accent) ${pct}%, transparent)`;

// One decorative visual per case study, keyed by name. Anything without a match gets the pipeline.
const visuals: Record<string, { label: string; Visual: (p: { animate: boolean }) => React.ReactNode }> = {
  "Peak Energy": { label: "AI pipeline", Visual: PipelineVisual },
  ClaimBrite: { label: "Agent graph", Visual: AgentGraphVisual },
};

export default function CaseStudies() {
  return (
    <Section id="work">
      <SectionHeading
        index="03"
        eyebrow="Selected work"
        title={
          <>
            Client work in <Accent>production</Accent>
          </>
        }
        lede="Two AI products I built for clients at Alfabolt, taken from design through to production."
      />

      <div className="space-y-6 sm:space-y-8">
        {caseStudies.map((cs, i) => (
          <Reveal key={cs.name} delay={i * 0.05}>
            <CaseStudyCard study={cs} index={i} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();
  const { label, Visual } = visuals[study.name] ?? visuals["Peak Energy"];
  const headingId = `case-${study.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  // Spotlight: write pointer position to CSS vars without re-rendering.
  const onMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  }, []);

  const parts = [
    { label: "Problem", body: study.problem },
    { label: "Solution", body: study.solution },
    { label: "Impact", body: study.impact },
  ];

  return (
    <article
      ref={ref}
      onPointerMove={onMove}
      aria-labelledby={headingId}
      className="group relative isolate overflow-hidden rounded-3xl border border-line bg-surface [--x:50%] [--y:0%]"
    >
      {/* Hover spotlight: soft fill + brighter border, both following the cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(520px circle at var(--x) var(--y), ${accentMix(7)}, transparent 65%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl p-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(360px circle at var(--x) var(--y), ${accentMix(55)}, transparent 70%)`,
          WebkitMask: "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
          mask: "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
        }}
      />
      {/* Static top highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-fg/20 to-transparent"
      />

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        {/* Copy */}
        <div className="flex flex-col p-6 sm:p-10">
          <div className="flex items-center justify-between gap-4">
            <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
              <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
              <span className="h-px w-5 bg-line-strong" aria-hidden="true" />
              {study.context}
            </p>
            {study.url && (
              <div className="hidden sm:block">
                <VisitLink url={study.url} name={study.name} />
              </div>
            )}
          </div>

          <h3 id={headingId} className="mt-8 text-3xl font-medium tracking-tight text-fg sm:text-4xl">
            {study.name}
          </h3>
          <p className="mt-2 text-lg text-muted">{study.tagline}</p>

          {study.metric && (
            <div className="mt-10 lg:mt-auto lg:pt-12">
              <p className="bg-gradient-to-b from-fg to-fg/55 bg-clip-text text-5xl font-medium tracking-tighter text-transparent sm:text-6xl">
                {study.metric.value}
              </p>
              <p className="mt-2 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-accent">
                <span className="h-px w-4 bg-accent/60" aria-hidden="true" />
                {study.metric.label}
              </p>
            </div>
          )}
        </div>

        {/* Visual */}
        <div className="relative min-h-[220px] overflow-hidden border-t border-line bg-surface-2/40 sm:min-h-[300px] lg:border-t-0 lg:border-l">
          <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${accentMix(8)}, transparent 70%)` }}
          />
          <p
            aria-hidden="true"
            className="absolute top-4 left-5 font-mono text-[10px] uppercase tracking-[0.2em] text-subtle"
          >
            fig.{String(index + 1).padStart(2, "0")} · {label}
          </p>
          <div className="absolute inset-0 flex items-center justify-center px-2 pt-9 pb-3 sm:px-8 sm:pt-8 sm:pb-4">
            <Visual animate={inView && !reduceMotion} />
          </div>
        </div>
      </div>

      {/* Problem / Solution / Impact */}
      <dl className="grid border-t border-line md:grid-cols-3">
        {parts.map((p, i) => (
          <div
            key={p.label}
            className={clsx(
              "p-6 sm:px-10 sm:py-8",
              i > 0 && "border-t border-line md:border-t-0 md:border-l",
            )}
          >
            <dt className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
              <span className={clsx("size-1.5 rounded-full", i === 2 ? "bg-accent" : "bg-line-strong")} aria-hidden="true" />
              {p.label}
            </dt>
            <dd className="mt-3 text-[15px] leading-relaxed text-muted">{p.body}</dd>
          </div>
        ))}
      </dl>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line px-6 py-5 sm:px-10">
        <ul className="flex flex-wrap gap-2" aria-label={`${study.name} stack`}>
          {study.stack.map((s) => (
            <li key={s}>
              <Tag>{s}</Tag>
            </li>
          ))}
        </ul>
        {study.url && (
          <div className="sm:hidden">
            <VisitLink url={study.url} name={study.name} />
          </div>
        )}
      </div>
    </article>
  );
}

function VisitLink({ url, name, className }: { url: string; name: string; className?: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${name} site (opens in a new tab)`}
      className={clsx(
        "group/link inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-line-strong bg-bg/40 pr-2.5 pl-3.5 text-[13px] font-medium text-fg transition-colors duration-300 hover:border-accent/60 hover:text-accent",
        className,
      )}
    >
      Visit site
      <ArrowUpRight
        className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
        aria-hidden="true"
      />
    </a>
  );
}

/* ---------------------------------------------------------------------------------------------
 * Decorative visuals. Pure SVG, on-palette, aria-hidden. Animation is a single travelling pulse
 * per edge, only while the card is on screen and never under reduced motion.
 * ------------------------------------------------------------------------------------------- */

type Edge = { d: string; delay: number; duration?: number };

function Pulse({ edge, animate }: { edge: Edge; animate: boolean }) {
  if (!animate) return null;
  return (
    <motion.path
      d={edge.d}
      fill="none"
      className="stroke-accent"
      strokeWidth={1.5}
      strokeLinecap="round"
      initial={{ pathLength: 0.14, pathSpacing: 2, pathOffset: -0.14 }}
      animate={{ pathOffset: [-0.14, 1] }}
      transition={{
        duration: edge.duration ?? 1.6,
        delay: edge.delay,
        repeat: Infinity,
        repeatDelay: 1.4,
        ease: [0.45, 0, 0.55, 1],
      }}
      style={{ filter: `drop-shadow(0 0 4px ${accentMix(80)})` }}
    />
  );
}

function Node({
  x,
  y,
  w,
  h = 30,
  label,
  active,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  label: string;
  active?: boolean;
}) {
  return (
    <g>
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        rx={8}
        className={active ? "fill-surface-2 stroke-accent/70" : "fill-surface-2 stroke-line-strong"}
        strokeWidth={1}
      />
      <text
        x={x}
        y={y + 3.5}
        textAnchor="middle"
        className={clsx("font-mono", active ? "fill-accent" : "fill-muted")}
        style={{ fontSize: 10, letterSpacing: "0.04em" }}
      >
        {label}
      </text>
    </g>
  );
}

function PipelineVisual({ animate }: { animate: boolean }) {
  // input → extract → LLM → validate → output, with a retry loop back into the model stage.
  const y = 112;
  const IN = 18;
  const OUT = 402;
  const stages = [
    { x: 112, w: 72, label: "extract" },
    { x: 210, w: 56, label: "llm", active: true },
    { x: 308, w: 76, label: "validate" },
  ];
  const stops = [
    { l: IN + 6, r: IN + 6 },
    ...stages.map((s) => ({ l: s.x - s.w / 2, r: s.x + s.w / 2 })),
    { l: OUT - 6, r: OUT - 6 },
  ];
  const edges: Edge[] = stops.slice(0, -1).map((s, i) => ({
    d: `M${s.r} ${y} H${stops[i + 1].l}`,
    delay: i * 0.5,
    duration: 0.7,
  }));
  const loop: Edge = { d: `M308 ${y + 15} V${y + 50} H210 V${y + 15}`, delay: 2.4, duration: 1.2 };
  const lanes = [y - 62, y - 44];

  return (
    <svg viewBox="0 0 420 220" className="h-auto w-full max-w-[460px]" aria-hidden="true" focusable="false">
      {/* Faint data lanes above the pipeline */}
      {lanes.map((ly, i) => (
        <g key={ly}>
          <line x1={8} x2={412} y1={ly} y2={ly} className="stroke-line" strokeDasharray="2 5" />
          {[0, 1, 2, 3, 4, 5, 6].map((k) => (
            <rect
              key={k}
              x={20 + k * 56 + i * 22}
              y={ly - 2}
              width={k % 3 === 0 ? 18 : 10}
              height={4}
              rx={2}
              className={k === 3 && i === 0 ? "fill-accent/60" : "fill-line-strong"}
            />
          ))}
        </g>
      ))}

      {/* Edges */}
      {edges.map((e) => (
        <path key={e.d} d={e.d} className="stroke-line-strong" strokeWidth={1} fill="none" />
      ))}
      <path d={loop.d} className="stroke-line-strong" strokeWidth={1} strokeDasharray="3 4" fill="none" />
      <text x={259} y={y + 64} textAnchor="middle" className="fill-subtle font-mono" style={{ fontSize: 9 }}>
        retry
      </text>

      {/* Pulses */}
      {[...edges, loop].map((e) => (
        <Pulse key={`p-${e.d}`} edge={e} animate={animate} />
      ))}

      {/* Terminals */}
      <circle cx={IN} cy={y} r={5} className="fill-surface-2 stroke-line-strong" />
      <circle cx={OUT} cy={y} r={5} className="fill-accent/80" />
      <text x={IN} y={y + 20} textAnchor="middle" className="fill-subtle font-mono" style={{ fontSize: 8.5 }}>
        input
      </text>
      <text x={OUT} y={y + 20} textAnchor="middle" className="fill-subtle font-mono" style={{ fontSize: 8.5 }}>
        output
      </text>

      {/* Stages */}
      {stages.map((s) => (
        <Node key={s.label} x={s.x} y={y} w={s.w} label={s.label} active={s.active} />
      ))}
      <circle cx={210} cy={y - 15} r={2.5} className="fill-accent" />
    </svg>
  );
}

function AgentGraphVisual({ animate }: { animate: boolean }) {
  // LangGraph-style: START → supervisor ⇄ agents → END, with shared state.
  const sup = { x: 210, y: 110 };
  const agents = [
    { x: 92, y: 42, label: "agent·a" },
    { x: 328, y: 42, label: "agent·b" },
    { x: 92, y: 178, label: "agent·c" },
    { x: 328, y: 178, label: "agent·d" },
  ];
  const curve = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    const mx = (a.x + b.x) / 2;
    return `M${a.x} ${a.y} C${mx} ${a.y} ${mx} ${b.y} ${b.x} ${b.y}`;
  };
  const spokes: Edge[] = agents.map((a, i) => ({
    d: curve({ x: sup.x + (a.x < sup.x ? -44 : 44), y: sup.y }, { x: a.x + (a.x < sup.x ? 34 : -34), y: a.y }),
    delay: 0.5 + i * 0.35,
    duration: 1,
  }));
  const start: Edge = { d: `M24 110 H${sup.x - 44}`, delay: 0, duration: 0.7 };
  const end: Edge = { d: `M${sup.x + 44} 110 H396`, delay: 2.2, duration: 0.7 };

  return (
    <svg viewBox="0 0 420 220" className="h-auto w-full max-w-[460px]" aria-hidden="true" focusable="false">
      {/* State ring */}
      <circle cx={sup.x} cy={sup.y} r={78} className="stroke-line" strokeDasharray="2 5" fill="none" />
      <circle cx={sup.x} cy={sup.y} r={48} className="stroke-accent/15" fill="none" />

      {[start, end, ...spokes].map((e) => (
        <path key={e.d} d={e.d} className="stroke-line-strong" strokeWidth={1} fill="none" />
      ))}
      {[start, ...spokes, end].map((e) => (
        <Pulse key={`p-${e.d}`} edge={e} animate={animate} />
      ))}

      {/* Terminals */}
      <circle cx={18} cy={110} r={5} className="fill-surface-2 stroke-line-strong" />
      <circle cx={402} cy={110} r={5} className="fill-accent/80" />
      <text x={18} y={130} textAnchor="middle" className="fill-subtle font-mono" style={{ fontSize: 8.5 }}>
        start
      </text>
      <text x={402} y={130} textAnchor="middle" className="fill-subtle font-mono" style={{ fontSize: 8.5 }}>
        end
      </text>

      {agents.map((a) => (
        <Node key={a.label} x={a.x} y={a.y} w={68} h={28} label={a.label} />
      ))}
      <Node x={sup.x} y={sup.y} w={88} h={34} label="supervisor" active />
    </svg>
  );
}
