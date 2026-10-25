import { ArrowUp, ArrowUpRight, FileText, Mail } from "lucide-react";
import { footer, nav, profile } from "@/content/site";
import { Container } from "@/components/ui/primitives";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";

const socials = [
  { label: "GitHub", href: profile.socials.github, icon: GithubIcon },
  { label: "LinkedIn", href: profile.socials.linkedin, icon: LinkedinIcon },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
  { label: "Résumé (PDF)", href: profile.cv, icon: FileText },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden border-t border-line bg-bg">
      <Container className="pt-16 sm:pt-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-12">
          {/* Identity */}
          <div className="col-span-2 md:col-span-6">
            <a href="#top" className="inline-flex items-center gap-3" aria-label={`${profile.name}, back to top`}>
              <Monogram />
              <span className="text-[15px] font-medium tracking-tight text-fg">{profile.name}</span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">{footer.tagline}</p>
            <a
              href={`mailto:${profile.email}`}
              className="group mt-6 inline-flex max-w-full items-center gap-1.5 text-sm text-fg underline decoration-line-strong underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent/50"
            >
              <span className="truncate">{profile.email}</span>
              <ArrowUpRight className="size-3.5 shrink-0 text-subtle transition-colors group-hover:text-accent" aria-hidden />
            </a>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer" className="md:col-span-3">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">Navigate</p>
            <ul className="space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm text-muted transition-colors hover:text-fg">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Elsewhere */}
          <div className="md:col-span-3">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">Elsewhere</p>
            <ul className="space-y-2.5">
              {socials.map(({ label, href, icon: Icon }) => {
                const external = !href.startsWith("mailto:");
                return (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-fg"
                    >
                      <Icon className="size-3.5 text-subtle transition-colors group-hover:text-accent" />
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between gap-4 border-t border-line py-6 font-mono text-xs text-subtle">
          <p>
            © {year} {profile.name}
          </p>
          <div className="flex items-center gap-6">
            <span className="hidden sm:inline">{profile.location}</span>
            <a href="#top" className="group inline-flex items-center gap-1.5 transition-colors hover:text-fg">
              Back to top
              <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden />
            </a>
          </div>
        </div>
      </Container>

      {/* Oversized low-contrast wordmark. Sized in vw so it always spans, never overflows. */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <Container>
          <p className="-mb-[0.2em] whitespace-nowrap bg-linear-to-b from-fg/[0.09] to-fg/0 bg-clip-text text-center text-[14.2vw] font-semibold leading-none tracking-[-0.055em] text-transparent xl:text-[10.6rem]">
            {profile.shortName}
          </p>
        </Container>
      </div>
    </footer>
  );
}

function Monogram() {
  return (
    <span className="relative flex size-9 items-center justify-center rounded-[10px] border border-line-strong bg-surface-2 font-mono text-[13px] font-medium tracking-tight text-fg">
      {profile.initials}
      <span className="absolute bottom-1.5 right-1.5 size-1 rounded-full bg-accent" />
    </span>
  );
}
