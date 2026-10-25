import { Cloud, Database, PanelsTopLeft, Server, Sparkles, Wrench, Blocks, type LucideIcon } from "lucide-react";
import clsx from "clsx";
import { skillGroups } from "@/content/site";
import { Accent, Reveal, Section, SectionHeading, Tag } from "@/components/ui/primitives";

const ICONS: Record<string, LucideIcon> = {
  "AI & LLMs": Sparkles,
  Frontend: PanelsTopLeft,
  Backend: Server,
  Data: Database,
  "Cloud & DevOps": Cloud,
  "Tooling & Integrations": Wrench,
};

// Bento placement by position: the lead group is a 2x2 tile on desktop; the last tile fills the md row.
function placement(i: number, count: number) {
  if (i === 0) return "md:col-span-2 lg:row-span-2";
  if (i === count - 1 && count % 2 === 0) return "md:col-span-2 lg:col-span-1";
  return "";
}

/** "AWS (EC2, Lambda, S3)" → { name: "AWS", parts: ["EC2", "Lambda", "S3"] } */
function parseItem(item: string) {
  const m = item.match(/^(.*?)\s*\((.+)\)$/);
  return m ? { name: m[1], parts: m[2].split(",").map((s) => s.trim()) } : { name: item, parts: [] };
}

export default function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        index="05"
        eyebrow="Toolkit"
        title={
          <>
            The <Accent>stack</Accent> I ship with
          </>
        }
        lede="What I reach for day to day, from agent orchestration to the infrastructure it runs on."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => {
          const Icon = ICONS[group.title] ?? Blocks;
          const lead = i === 0;
          return (
            <Reveal key={group.title} delay={(i % 3) * 0.06} className={clsx("h-full min-w-0", placement(i, skillGroups.length))}>
              <article
                className={clsx(
                  "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-strong sm:p-7",
                  lead && "lg:p-9",
                )}
              >
                {lead && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-accent/10 blur-3xl"
                  />
                )}
                <div className="relative flex items-start justify-between gap-4">
                  <span
                    className={clsx(
                      "inline-flex size-9 items-center justify-center rounded-lg border bg-surface-2",
                      lead ? "border-accent/30 text-accent" : "border-line text-muted group-hover:text-fg",
                    )}
                  >
                    <Icon aria-hidden="true" className="size-4" strokeWidth={1.75} />
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.12em] text-subtle">
                    <span className="text-muted">{String(group.items.length).padStart(2, "0")}</span> tools
                  </span>
                </div>

                <h3
                  className={clsx(
                    "relative mt-6 font-medium tracking-tight text-fg",
                    lead ? "text-2xl sm:text-3xl" : "text-lg",
                  )}
                >
                  {group.title}
                </h3>
                <p className={clsx("relative mt-2 leading-relaxed text-muted", lead ? "max-w-md text-base" : "text-sm")}>
                  {group.blurb}
                </p>

                {lead && <AgentGraph />}

                <ul className={clsx("relative flex flex-wrap gap-1.5 pt-6", !lead && "mt-auto")} aria-label={`${group.title} tools`}>
                  {group.items.map((item) => {
                    const { name, parts } = parseItem(item);
                    if (parts.length === 0) {
                      return (
                        <li key={item}>
                          <Tag className={clsx(lead && "border-line-strong px-3 py-1.5 text-[12px] text-fg/90")}>{name}</Tag>
                        </li>
                      );
                    }
                    return (
                      <li key={item} className="w-full rounded-xl border border-line bg-surface-2/60 px-3 py-2.5">
                        <span className="font-mono text-[11px] text-fg">{name}</span>
                        <span className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-subtle">
                          {parts.map((part) => (
                            <span key={part}>{part}</span>
                          ))}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/** Decorative: the canonical agent loop (START → agent ⇄ tools, agent → END), drawn in mono. */
function AgentGraph() {
  const node = "rounded-md border px-3 py-1.5 font-mono text-[12px] leading-4";
  const edge = "mt-[15px] h-px flex-1 max-w-20 bg-line-strong";
  return (
    <div
      aria-hidden="true"
      className="relative mt-8 hidden flex-1 items-center justify-center overflow-hidden rounded-xl border border-line bg-bg/60 px-6 py-10 sm:flex"
    >
      <div className="bg-grid mask-fade-b absolute inset-0 opacity-60" />
      <span className="absolute left-4 top-3 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">graph</span>
      <div className="relative flex w-full max-w-md items-start justify-center">
        <span className={clsx(node, "border-line bg-surface text-subtle")}>START</span>
        <span className={edge} />
        <span className="flex flex-col items-center">
          <span className={clsx(node, "border-accent/40 bg-surface-2 text-accent shadow-[0_0_28px_-8px_var(--color-accent)]")}>
            agent
          </span>
          <span className="relative flex h-10 items-stretch gap-2 py-1">
            <span className="w-px bg-line-strong" />
            <span className="w-px bg-accent/50" />
            <span className="absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] text-subtle">
              tool calls
            </span>
          </span>
          <span className={clsx(node, "border-line-strong bg-surface text-muted")}>tools</span>
        </span>
        <span className={edge} />
        <span className={clsx(node, "border-line bg-surface text-subtle")}>END</span>
      </div>
    </div>
  );
}
