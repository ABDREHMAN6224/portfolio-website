"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Transition } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import { projects, type Project } from "@/content/site";
import { Accent, Reveal, Section, SectionHeading, Tag } from "@/components/ui/primitives";
import { GithubIcon } from "@/components/ui/brand-icons";

type Filter = "All" | Project["category"];
type IndexedProject = Project & { index: string };

const FILTERS: Filter[] = ["All", "Systems", "Full Stack", "Client"];
const EASE = [0.22, 1, 0.36, 1] as const;

const ALL: IndexedProject[] = projects.map((p, i) => ({ ...p, index: String(i + 1).padStart(2, "0") }));

// Bento placement for featured cards, by position: wide + narrow on the first row, full-width horizontal below.
const FEATURED_LAYOUT = [
  { span: "md:col-span-2 lg:col-span-4", wide: false },
  { span: "lg:col-span-2", wide: false },
  { span: "lg:col-span-6", wide: true },
];

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const reduce = useReducedMotion();
  // Presence animations only after the first filter change, so the initial render (and scroll reveals) are untouched.
  const [interacted, setInteracted] = useState(false);
  const choose = (f: Filter) => {
    setInteracted(true);
    setFilter(f);
  };

  const visible = ALL.filter((p) => filter === "All" || p.category === filter);
  const featured = visible.filter((p) => p.featured);
  const rest = visible.filter((p) => !p.featured);

  const collapse: Transition = reduce ? { duration: 0 } : { duration: 0.45, ease: EASE };
  const presence = {
    initial: interacted ? { height: 0, opacity: 0, overflow: "hidden" as const } : false,
    animate: { height: "auto", opacity: 1, transitionEnd: { overflow: "visible" as const } },
    exit: { height: 0, opacity: 0, overflow: "hidden" as const },
    transition: collapse,
  };

  return (
    <Section id="projects">
      <SectionHeading
        index="04"
        eyebrow="Projects"
        title={
          <>
            Things I&apos;ve <Accent>built</Accent>
          </>
        }
        lede="Full-stack products, and the systems underneath them: a compiler and VM and a Redis-compatible server in Go, plus a distributed code-execution backend."
      />

      <Reveal className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div
          role="group"
          aria-label="Filter projects by category"
          className="inline-flex max-w-full rounded-full border border-line bg-surface p-1"
        >
          {FILTERS.map((f) => {
            const active = f === filter;
            const count = f === "All" ? ALL.length : ALL.filter((p) => p.category === f).length;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={active}
                onClick={() => choose(f)}
                className={clsx(
                  "relative whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] transition-colors sm:px-4 sm:text-sm",
                  active ? "text-fg" : "text-muted hover:text-fg",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="projects-filter-pill"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full border border-line-strong bg-surface-2"
                    transition={reduce ? { duration: 0 } : { type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <span className="relative">{f}</span>
                <span
                  aria-hidden="true"
                  className={clsx(
                    "relative ml-1.5 hidden font-mono text-[10px] sm:inline",
                    active ? "text-accent" : "text-subtle",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        <p aria-live="polite" className="font-mono text-xs text-subtle">
          <span className="text-fg">{String(visible.length).padStart(2, "0")}</span> / {String(ALL.length).padStart(2, "0")}{" "}
          projects
        </p>
      </Reveal>

      <AnimatePresence>
        {featured.length > 0 && (
          <motion.div key="featured" {...presence}>
            <div className="grid grid-cols-1 gap-4 pb-4 md:grid-cols-2 lg:grid-cols-6">
              {featured.map((p, i) => {
                const layout = FEATURED_LAYOUT[i] ?? { span: "lg:col-span-2", wide: false };
                return (
                  <Reveal key={p.name} delay={i * 0.08} className={clsx("h-full min-w-0", layout.span)}>
                    <FeaturedCard project={p} wide={layout.wide} />
                  </Reveal>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {rest.length > 0 && (
          <motion.div key="rest" {...presence}>
            <Reveal className="overflow-hidden rounded-2xl border border-line bg-surface/40">
              <div className="flex items-center justify-between px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-subtle sm:px-6">
                <span>More projects</span>
                <span>{String(rest.length).padStart(2, "0")}</span>
              </div>
              <ul>
                <AnimatePresence>
                  {rest.map((p) => (
                    <motion.li key={p.name} {...presence}>
                      <ProjectRow project={p} />
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </Reveal>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

/* ------------------------------------------------------------------------------------------------ */
/* Cards                                                                                            */
/* ------------------------------------------------------------------------------------------------ */

const STRETCHED =
  "stretched-link focus-visible:outline-none after:absolute after:inset-0 after:z-[1] after:content-['']";

function primaryLink(p: Project) {
  return p.live ?? p.github;
}

function TitleLink({ project, className }: { project: Project; className?: string }) {
  const href = primaryLink(project);
  return (
    <h3 className={clsx("text-balance font-medium tracking-tight text-fg", className)}>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={STRETCHED}>
          {project.name}
          <span className="sr-only"> ({project.live ? "live site" : "source on GitHub"}, opens in a new tab)</span>
        </a>
      ) : (
        project.name
      )}
      {href && (
        <ArrowUpRight
          aria-hidden="true"
          className="ml-1.5 inline-block size-4 align-[-0.1em] text-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        />
      )}
    </h3>
  );
}

function ProjectLinks({ project, className }: { project: Project; className?: string }) {
  if (!project.github && !project.live) return null;
  const base =
    "inline-flex size-8 items-center justify-center rounded-full border border-line bg-bg/60 text-muted transition-colors hover:border-line-strong hover:text-fg";
  return (
    <div className={clsx("z-10 flex items-center gap-1.5", className ?? "relative")}>
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} source on GitHub`}
          className={base}
        >
          <GithubIcon className="size-3.5" />
        </a>
      )}
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} live site`}
          className={base}
        >
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </a>
      )}
    </div>
  );
}

function Highlights({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={clsx("space-y-1.5 text-sm leading-relaxed text-muted", className)}>
      {items.map((h) => (
        <li key={h} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.7em] h-px w-2.5 shrink-0 bg-accent/60" />
          <span>{h}</span>
        </li>
      ))}
    </ul>
  );
}

function FeaturedCard({ project, wide }: { project: IndexedProject; wide: boolean }) {
  return (
    <article
      className={clsx(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-2 transition-all duration-300",
        "hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_24px_48px_-24px_rgb(0_0_0/0.6)]",
        "has-[.stretched-link:focus-visible]:outline-2 has-[.stretched-link:focus-visible]:outline-offset-2 has-[.stretched-link:focus-visible]:outline-accent",
        wide && "lg:flex-row",
      )}
    >
      {/* Hairline highlight on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div
        aria-hidden="true"
        className={clsx(
          "relative h-56 shrink-0 overflow-hidden rounded-xl border border-line bg-bg",
          wide && "lg:order-2 lg:h-auto lg:min-h-72 lg:w-[54%]",
        )}
      >
        <div className="bg-grid mask-fade-b absolute inset-0 opacity-70" />
        <Visual kind={project.visual} />
      </div>

      <div className={clsx("flex flex-1 flex-col p-4 sm:p-5", wide && "lg:p-8")}>
        <div className="flex min-h-8 items-center justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
            <span className="text-accent">{project.index}</span>
            <span className="mx-2 text-line-strong">/</span>
            {project.category}
          </p>
          <ProjectLinks project={project} />
        </div>
        <TitleLink project={project} className={clsx("mt-3 text-xl", wide && "lg:text-2xl")} />
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{project.description}</p>
        <Highlights items={project.highlights} className="mt-4" />
        <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
          {project.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </div>
    </article>
  );
}

function ProjectRow({ project }: { project: IndexedProject }) {
  return (
    <article
      className={clsx(
        "group relative grid gap-x-10 gap-y-4 border-t border-line px-5 py-6 transition-colors duration-300 hover:bg-surface sm:px-6 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_auto]",
        "has-[.stretched-link:focus-visible]:bg-surface has-[.stretched-link:focus-visible]:outline-2 has-[.stretched-link:focus-visible]:-outline-offset-2 has-[.stretched-link:focus-visible]:outline-accent",
      )}
    >
      <div className="pr-20 md:pr-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
          <span className="text-accent">{project.index}</span>
          <span className="mx-2 text-line-strong">/</span>
          {project.category}
        </p>
        <TitleLink project={project} className="mt-2 text-base" />
      </div>

      <div className="min-w-0">
        <p className="text-[15px] leading-relaxed text-fg/85">{project.description}</p>
        <Highlights items={project.highlights} className="mt-3" />
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </div>

      <ProjectLinks project={project} className="absolute right-5 top-6 sm:right-6 md:relative md:right-auto md:top-auto md:self-start" />
    </article>
  );
}

/* ------------------------------------------------------------------------------------------------ */
/* Decorative visuals (aria-hidden by the parent)                                                    */
/* ------------------------------------------------------------------------------------------------ */

function Visual({ kind }: { kind: Project["visual"] }) {
  if (kind === "compiler") return <CompilerVisual />;
  if (kind === "terminal") return <TerminalVisual />;
  if (kind === "workers") return <WorkersVisual />;
  return null;
}

const STAGES = ["lexer", "parser", "compiler", "vm"] as const;

function CompilerVisual() {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(STAGES.length - 1);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setStage((s) => (s + 1) % STAGES.length), 1600);
    return () => window.clearInterval(id);
  }, [reduce]);

  const tokens = ["INT", "ID:x", "=", "NUM:2", "+", "NUM:3", ";"];
  const bytecode: [string, string, string?][] = [
    ["00", "CONST", "2"],
    ["02", "CONST", "3"],
    ["04", "ADD"],
    ["05", "STORE", "x"],
  ];
  // Which column lights up for the active stage.
  const lit = stage <= 1 ? "tokens" : "bytecode";

  return (
    <div className="relative flex h-full flex-col justify-center gap-5 px-5 font-mono text-[11px] sm:px-7">
      <div className="flex items-center gap-1 text-subtle sm:gap-1.5">
        {STAGES.map((s, i) => (
          <span key={s} className="flex items-center gap-1 sm:gap-1.5">
            <span
              className={clsx(
                "rounded-md border px-1.5 py-0.5 transition-colors duration-500 sm:px-2",
                i === stage ? "border-accent/50 bg-accent/10 text-accent" : "border-line text-subtle",
              )}
            >
              {s}
            </span>
            {i < STAGES.length - 1 && <span className="text-line-strong">→</span>}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="rounded-lg border border-line bg-surface/80 p-3">
          <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-subtle">main.c</p>
          <p className="whitespace-nowrap text-muted">
            <span className="text-accent/80">int</span> x = <span className="text-fg">2</span> + <span className="text-fg">3</span>;
          </p>
          <p className="whitespace-nowrap text-muted">
            print(x);
          </p>
        </div>
        <div
          className={clsx(
            "hidden rounded-lg border bg-surface/80 p-3 transition-colors duration-500 sm:block",
            lit === "tokens" ? "border-accent/30" : "border-line",
          )}
        >
          <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-subtle">tokens</p>
          <div className="flex flex-wrap gap-1">
            {tokens.map((t, i) => (
              <span key={i} className="rounded border border-line bg-surface-2 px-1.5 py-px text-[10px] text-muted">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div
          className={clsx(
            "rounded-lg border bg-surface/80 p-3 transition-colors duration-500",
            lit === "bytecode" ? "border-accent/30" : "border-line",
          )}
        >
          <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-subtle">bytecode</p>
          {bytecode.map(([addr, op, arg]) => (
            <p key={addr} className="whitespace-nowrap leading-[1.6]">
              <span className="text-subtle">{addr}</span> <span className="text-fg">{op.padEnd(6, " ")}</span>
              {arg && <span className="text-accent/80">{arg}</span>}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function TerminalVisual() {
  const reduce = useReducedMotion();
  const lines: { cmd?: string; out?: string }[] = [
    { cmd: "PING" },
    { out: "PONG" },
    { cmd: 'SET user:42 "ada"' },
    { out: "OK" },
    { cmd: "GET user:42" },
    { out: '"ada"' },
  ];
  return (
    <div className="absolute inset-x-5 bottom-0 top-6 overflow-hidden rounded-t-lg border border-b-0 border-line-strong bg-surface shadow-[0_-16px_48px_-28px_var(--color-accent)] sm:inset-x-7">
      <div className="flex h-7 items-center gap-1.5 border-b border-line px-3">
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="ml-auto font-mono text-[10px] text-subtle">redis-cli · 6379</span>
      </div>
      <div className="px-4 py-3 font-mono text-[12px] leading-[22px]">
        {lines.map((l, i) =>
          l.cmd ? (
            <p key={i} className="whitespace-nowrap text-fg">
              <span className="text-accent">›</span> {l.cmd}
            </p>
          ) : (
            <p key={i} className="whitespace-nowrap text-muted">
              {l.out}
            </p>
          ),
        )}
        <p className="flex items-center gap-1.5 text-fg">
          <span className="text-accent">›</span>
          <motion.span
            className="inline-block h-3.5 w-[7px] bg-accent/80"
            animate={reduce ? undefined : { opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: "linear" }}
          />
        </p>
      </div>
    </div>
  );
}

// Positions in percent of the visual box. Lines are drawn in a 100x100 SVG stretched to the box.
const HUB = { x: 44, y: 46 };
const CLIENT = { x: 13, y: 46 };
const BRANCH_X = 62;
const WORKERS = [
  { x: 82, y: 18, label: "worker 01" },
  { x: 82, y: 46, label: "worker 02" },
  { x: 82, y: 74, label: "worker 03" },
];
const STORE = { x: 44, y: 84 };

function WorkersVisual() {
  const reduce = useReducedMotion();
  const line = "stroke-line-strong";
  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full" fill="none">
        <path d={`M${CLIENT.x} ${CLIENT.y}H${HUB.x}`} className={line} strokeWidth={1} vectorEffect="non-scaling-stroke" />
        {WORKERS.map((w) => (
          <path
            key={w.label}
            d={`M${HUB.x} ${HUB.y}H${BRANCH_X}V${w.y}H${w.x}`}
            className={line}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <path
          d={`M${HUB.x} ${HUB.y}V${STORE.y}`}
          className={line}
          strokeWidth={1}
          strokeDasharray="3 4"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {!reduce &&
        WORKERS.map((w, i) => {
          // Packet path: client → hub → branch → worker, timed by segment length.
          const xs = [CLIENT.x, HUB.x, BRANCH_X, BRANCH_X, w.x];
          const ys = [CLIENT.y, HUB.y, HUB.y, w.y, w.y];
          const seg = xs.slice(1).map((x, k) => Math.abs(x - xs[k]) + Math.abs(ys[k + 1] - ys[k]));
          const total = seg.reduce((a, b) => a + b, 0);
          const times = [0, ...seg.map((_, k) => seg.slice(0, k + 1).reduce((a, b) => a + b, 0) / total)];
          return (
            <motion.span
              key={w.label}
              className="absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_2px_var(--color-accent)]"
              initial={{ left: `${xs[0]}%`, top: `${ys[0]}%`, opacity: 0 }}
              animate={{
                left: xs.map((x) => `${x}%`),
                top: ys.map((y) => `${y}%`),
                opacity: [0, 1, 1, 1, 0],
              }}
              transition={{
                duration: 2.6,
                times,
                ease: "linear",
                repeat: Infinity,
                repeatDelay: 1.4,
                delay: i * 1.3,
              }}
            />
          );
        })}

      <Node at={CLIENT} label="client" />
      <Node at={HUB} label="ws hub" accent />
      {WORKERS.map((w) => (
        <Node key={w.label} at={w} label={w.label} />
      ))}
      <Node at={STORE} label="r2 · tests" muted />
    </div>
  );
}

function Node({
  at,
  label,
  accent,
  muted,
}: {
  at: { x: number; y: number };
  label: string;
  accent?: boolean;
  muted?: boolean;
}) {
  return (
    <span
      style={{ left: `${at.x}%`, top: `${at.y}%` }}
      className={clsx(
        "absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-md border px-2 py-1 font-mono text-[10px] sm:text-[11px]",
        accent
          ? "border-accent/40 bg-surface-2 text-accent shadow-[0_0_24px_-6px_var(--color-accent)]"
          : "border-line-strong bg-surface",
        muted ? "border-dashed text-subtle" : !accent && "text-muted",
      )}
    >
      {accent && <span className="size-1.5 animate-pulse-dot rounded-full bg-accent" />}
      {label}
    </span>
  );
}
