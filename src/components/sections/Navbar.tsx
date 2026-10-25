"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import clsx from "clsx";
import { nav, profile } from "@/content/site";
import { ButtonLink, Container } from "@/components/ui/primitives";

const sectionIds = nav.map((item) => item.href.slice(1));

/** Tracks which nav section sits under a band near the top-middle of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const targets = [document.getElementById("top"), ...sectionIds.map((id) => document.getElementById(id))].filter(
      (el): el is HTMLElement => el !== null,
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          setActive(sectionIds.includes(id) ? id : null);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const reduce = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the mobile panel; widening past the breakpoint closes it too.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        solid ? "border-line bg-bg/70 backdrop-blur-xl backdrop-saturate-150" : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <a
          href="#top"
          className="group flex items-center gap-3 rounded-md"
          aria-label={`${profile.name}, back to top`}
          onClick={() => setOpen(false)}
        >
          <span className="grid size-8 place-items-center rounded-lg border border-line-strong bg-surface-2 font-mono text-[11px] font-medium tracking-tight text-fg transition-colors duration-300 group-hover:border-accent/60 group-hover:text-accent">
            {profile.initials}
          </span>
          <span className="text-sm font-medium tracking-tight text-fg">{profile.shortName}</span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full border border-line bg-surface/50 p-1 backdrop-blur">
            {nav.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href} className="relative">
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-surface-2 ring-1 ring-line-strong"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                  <a
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={clsx(
                      "relative block rounded-full px-3.5 py-1.5 text-[13px] transition-colors duration-200",
                      isActive ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <ButtonLink href={profile.cv} variant="secondary" external className="h-9 px-4 text-[13px]">
              Resume
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </ButtonLink>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="grid size-9 place-items-center rounded-full border border-line-strong bg-surface/60 text-fg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <Container className="pb-6 pt-2">
              <nav aria-label="Mobile">
                <ul>
                  {nav.map((item, i) => {
                    const isActive = active === item.href.slice(1);
                    return (
                      <motion.li
                        key={item.href}
                        initial={reduce ? false : { opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.04 * i + 0.05, duration: 0.3 }}
                        className="border-b border-line"
                      >
                        <a
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={isActive ? "location" : undefined}
                          className={clsx(
                            "flex items-center justify-between py-4 text-lg tracking-tight",
                            isActive ? "text-fg" : "text-muted",
                          )}
                        >
                          <span className="flex items-baseline gap-4">
                            <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                            {item.label}
                          </span>
                          {isActive && <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />}
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>
              <ButtonLink href={profile.cv} variant="primary" external className="mt-6 w-full">
                View resume
                <ArrowUpRight className="size-4" />
              </ButtonLink>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
