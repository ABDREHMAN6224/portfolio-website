"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowDown, ArrowRight, Medal } from "lucide-react";
import { experience, heroTech, profile } from "@/content/site";
import { Accent, ButtonLink, Container } from "@/components/ui/primitives";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";

const ease = [0.22, 1, 0.36, 1] as const;

const currentCompany = experience.find((e) => e.current)?.company;

/** Splits the headline so the configured phrase renders as the serif accent. */
function Headline() {
  const { headline, headlineAccent } = profile;
  const i = headline.indexOf(headlineAccent);
  if (i === -1) return <>{headline}</>;
  return (
    <>
      {headline.slice(0, i)}
      <Accent>{headlineAccent}</Accent>
      {headline.slice(i + headlineAccent.length)}
    </>
  );
}

const socialLinks = [
  { href: profile.socials.github, label: "GitHub", Icon: GithubIcon },
  { href: profile.socials.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
];

export default function Hero() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
  };
  const item: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }
    : {
        hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease } },
      };

  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 sm:pt-36 lg:pt-40">
      {/* Backdrop: engineering grid fading out, plus a soft mint glow. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-fade-b absolute inset-0 opacity-80" />
        <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] max-w-[160vw] -translate-x-1/2 rounded-full bg-accent/[0.09] blur-[120px]" />
        <div className="absolute right-[8%] top-40 hidden h-72 w-72 rounded-full bg-accent-strong/[0.06] blur-[100px] lg:block" />
      </div>

      <Container>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_380px]"
        >
          <div className="min-w-0">
            <motion.p
              variants={item}
              className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1.5 pl-3 pr-4 text-xs text-muted backdrop-blur"
            >
              <Medal className="size-3.5 shrink-0 text-gold" aria-hidden="true" />
              <span className="truncate">{profile.distinction}</span>
              {profile.availability && (
                <>
                  <span className="h-3 w-px shrink-0 bg-line-strong" aria-hidden="true" />
                  <span className="relative flex size-2 shrink-0" aria-hidden="true">
                    <span className="absolute inset-0 animate-ping rounded-full bg-accent/50 motion-reduce:hidden" />
                    <span className="relative size-2 animate-pulse-dot rounded-full bg-accent" />
                  </span>
                  <span className="truncate">{profile.availability}</span>
                </>
              )}
            </motion.p>

            <motion.h1
              variants={item}
              className="mt-7 text-balance text-[2.6rem] font-medium leading-[1.04] tracking-[-0.035em] text-fg sm:text-6xl lg:text-[4.25rem] xl:text-7xl"
            >
              <Headline />
            </motion.h1>

            <motion.p variants={item} className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              {profile.intro}
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink href="#work">
                View work
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </ButtonLink>
              <ButtonLink href={profile.cv} variant="secondary" download>
                Download CV
                <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </ButtonLink>
              <span className="mx-1 hidden h-6 w-px bg-line-strong sm:block" aria-hidden="true" />
              <div className="-ml-3 flex items-center gap-1 sm:ml-0">
                {socialLinks.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (opens in a new tab)`}
                    className="grid size-11 place-items-center rounded-full text-muted transition-colors duration-200 hover:bg-surface-2 hover:text-fg"
                  >
                    <Icon className="size-[18px]" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.figure variants={item} className="relative mx-auto w-full max-w-[320px] sm:max-w-[360px] lg:max-w-none">
            <PhotoCard />
          </motion.figure>
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 0.9, duration: 0.8 }}
        className="mt-20 border-y border-line bg-surface/30 sm:mt-28"
      >
        <TechMarquee />
      </motion.div>
    </section>
  );
}

function PhotoCard() {
  return (
    <>
      <div className="group relative rounded-[22px] border border-line-strong bg-surface p-2 shadow-[0_40px_120px_-40px_rgb(0_0_0/0.8)]">
        {/* Hairline highlight along the top edge. */}
        <span aria-hidden="true" className="absolute inset-x-10 -top-px h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

        <div className="relative aspect-square overflow-hidden lg:aspect-[4/5] rounded-[16px] bg-surface-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            width={1080}
            height={1073}
            fetchPriority="high"
            className="size-full scale-[1.32] object-cover object-[50%_28%] contrast-[1.05] grayscale transition-[filter,transform] duration-700 ease-out [transform-origin:50%_30%] group-hover:scale-[1.36] group-hover:grayscale-0"
          />
          {/* Vignette + bottom fade quiet the busy event backdrop and seat the caption. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_65%_at_50%_38%,transparent_45%,var(--color-bg)_120%)] opacity-90" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/5 to-transparent" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[16px] ring-1 ring-inset ring-line" />

          <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-fg">{profile.name}</p>
              <p className="mt-0.5 truncate font-mono text-[11px] text-muted">{profile.role}</p>
            </div>
          </figcaption>
        </div>
      </div>

      {currentCompany && (
        <div className="absolute -left-3 top-8 flex items-center gap-2 rounded-full border border-line-strong bg-surface-2/90 py-1.5 pl-2.5 pr-3.5 font-mono text-[11px] text-muted shadow-[0_12px_40px_-12px_rgb(0_0_0/0.9)] backdrop-blur sm:-left-8 lg:-left-10">
          <span className="size-1.5 animate-pulse-dot rounded-full bg-accent" aria-hidden="true" />
          <span>
            currently <span className="text-subtle">@</span> <span className="text-fg">{currentCompany}</span>
          </span>
        </div>
      )}
    </>
  );
}

function TechMarquee() {
  // Rendered twice so the -50% translate loops seamlessly.
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {heroTech.map((tech) => (
        <li key={tech} className="flex items-center gap-10 pr-10 font-mono text-xs uppercase tracking-[0.18em] text-subtle">
          {tech}
          <span className="size-1 rounded-full bg-line-strong" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="mask-fade-x overflow-hidden py-5" role="region" aria-label="Core technologies">
      <div className="flex w-max animate-marquee motion-reduce:animate-none hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
