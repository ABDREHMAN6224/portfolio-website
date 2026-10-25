"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, CircleAlert, Copy, FileText, LoaderCircle, Mail, Send } from "lucide-react";
import clsx from "clsx";
import { contact, profile } from "@/content/site";
import { Accent, Reveal, Section, SectionHeading } from "@/components/ui/primitives";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";

// Inlined at build time. If any is missing the form falls back to a prefilled mailto: link.
const EMAILJS = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};
const emailJsConfigured = Boolean(EMAILJS.serviceId && EMAILJS.templateId && EMAILJS.publicKey);

export default function Contact() {
  return (
    <Section id="contact" className="isolate overflow-hidden">
      {/* Soft mint glow anchoring the closing section. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(60%_60%_at_20%_0%,color-mix(in_oklab,var(--color-accent)_9%,transparent),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-40 mask-fade-b" />

      <SectionHeading
        index="06"
        eyebrow="Contact"
        className="max-w-4xl"
        title={
          <span className="block text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl">
            {contact.headline.lead} <Accent>{contact.headline.accent}</Accent>.
          </span>
        }
        lede={contact.lede}
      />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <Availability />
          <CopyEmail />
          <ContactLinks />
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}

function Availability() {
  if (!profile.availability) return null;
  return (
    <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-3 py-1.5 text-sm text-muted">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-pulse-dot rounded-full bg-accent" />
        <span className="relative inline-flex size-2 rounded-full bg-accent" />
      </span>
      {profile.availability}
    </p>
  );
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Older browsers / insecure contexts.
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand("copy");
    el.remove();
    return ok;
  }
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function onCopy() {
    const ok = await copyText(profile.email);
    if (!ok) {
      window.location.href = `mailto:${profile.email}`;
      return;
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mt-8">
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">Email</p>
      <button
        type="button"
        onClick={onCopy}
        aria-label={`Copy email address ${profile.email}`}
        className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-line-strong bg-surface px-5 py-4 text-left transition-colors duration-300 hover:border-accent/50 hover:bg-surface-2"
      >
        <span className="min-w-0 truncate text-[15px] font-medium tracking-tight text-fg sm:text-base">
          {profile.email}
        </span>
        <span
          className={clsx(
            "inline-flex h-8 min-w-8 shrink-0 items-center justify-center gap-1.5 rounded-full border px-2 font-mono sm:px-3 text-xs transition-colors duration-300",
            copied
              ? "border-accent/40 bg-accent/10 text-accent"
              : "border-line bg-surface-2 text-muted group-hover:text-fg",
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? "copied" : "copy"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center gap-1.5"
            >
              {copied ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
              <span className={clsx(!copied && "sr-only sm:not-sr-only")}>{copied ? "Copied" : "Copy"}</span>
            </motion.span>
          </AnimatePresence>
        </span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </div>
  );
}

function ContactLinks() {
  const links = [
    { label: "LinkedIn", detail: "Connect", href: profile.socials.linkedin, icon: LinkedinIcon, external: true },
    { label: "GitHub", detail: "Code & projects", href: profile.socials.github, icon: GithubIcon, external: true },
    { label: "Résumé", detail: "PDF", href: profile.cv, icon: FileText, external: true },
  ];

  return (
    <ul className="mt-8 border-t border-line">
      {links.map(({ label, detail, href, icon: Icon, external }) => (
        <li key={label} className="border-b border-line">
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group flex items-center gap-4 py-4 text-fg transition-colors"
          >
            <span className="flex size-9 items-center justify-center rounded-lg border border-line bg-surface text-muted transition-colors group-hover:border-accent/40 group-hover:text-accent">
              <Icon className="size-4" />
            </span>
            <span className="flex-1 text-[15px] font-medium tracking-tight">{label}</span>
            <span className="hidden font-mono text-xs text-subtle sm:inline">{detail}</span>
            <ArrowUpRight
              className="size-4 text-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              aria-hidden
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

/* ----------------------------------------------------------------------------------------------- */

type Field = "name" | "email" | "message";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "success" | "mailto" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your email.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "That email doesn't look right.";
  if (v.message.trim().length < 10) e.message = "A few more words, please (10 characters minimum).";
  return e;
}

function buildMailto(v: Values) {
  const subject = `Portfolio enquiry from ${v.name.trim()}`;
  const body = `${v.message.trim()}\n\n— ${v.name.trim()} (${v.email.trim()})`;
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const EMPTY: Values = { name: "", email: "", message: "" };

function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const refs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  };
  const sending = status === "sending";

  function update(field: Field, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    // Re-validate live only after the first submit attempt, so users aren't nagged while typing.
    if (submitted) setErrors(validate(next));
    if (status !== "idle" && status !== "sending") setStatus("idle");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    setSubmitted(true);

    // Honeypot: bots fill every field; humans never see this one.
    const trap = new FormData(e.currentTarget).get("company");
    if (trap) {
      setStatus("success");
      setValues(EMPTY);
      return;
    }

    const found = validate(values);
    setErrors(found);
    const first = (["name", "email", "message"] as Field[]).find((f) => found[f]);
    if (first) {
      refs[first].current?.focus();
      return;
    }

    if (!emailJsConfigured) {
      window.location.href = buildMailto(values);
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const { send } = await import("@emailjs/browser");
      await send(
        EMAILJS.serviceId!,
        EMAILJS.templateId!,
        {
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          reply_to: values.email.trim(),
        },
        { publicKey: EMAILJS.publicKey! },
      );
      setStatus("success");
      setValues(EMPTY);
      setSubmitted(false);
      setErrors({});
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="relative rounded-3xl border border-line bg-surface/80 p-1.5 shadow-[0_1px_0_0_rgb(255_255_255/0.04)_inset,0_40px_80px_-40px_rgb(0_0_0/0.8)] backdrop-blur">
      <form
        noValidate
        onSubmit={onSubmit}
        aria-labelledby="contact-form-title"
        className="rounded-[20px] border border-line bg-bg/60 p-5 sm:p-8"
      >
        <div className="mb-7 flex items-center justify-between gap-4">
          <h3 id="contact-form-title" className="text-lg font-medium tracking-tight text-fg">
            {contact.formTitle}
          </h3>
          <Mail className="size-4 text-subtle" aria-hidden />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id="contact-name"
            name="name"
            label="Name"
            autoComplete="name"
            placeholder="Your name"
            value={values.name}
            error={errors.name}
            disabled={sending}
            inputRef={refs.name}
            onChange={(v) => update("name", v)}
          />
          <TextField
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            label="Email"
            autoComplete="email"
            placeholder="you@company.com"
            value={values.email}
            error={errors.email}
            disabled={sending}
            inputRef={refs.email}
            onChange={(v) => update("email", v)}
          />
          <div className="sm:col-span-2">
            <FieldLabel htmlFor="contact-message">Message</FieldLabel>
            <textarea
              ref={refs.message}
              id="contact-message"
              name="message"
              rows={6}
              placeholder="What are you working on, and how can I help?"
              value={values.message}
              disabled={sending}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
              onChange={(e) => update("message", e.target.value)}
              className={clsx(inputClass(Boolean(errors.message)), "min-h-36 resize-y py-3 leading-relaxed")}
            />
            <FieldError id="contact-message-error" message={errors.message} />
          </div>
        </div>

        {/* Honeypot, hidden from people and assistive tech. */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="contact-company">Company</label>
          <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="mt-7 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-subtle">
            {emailJsConfigured ? contact.formNote : "Opens your email app with the message prefilled."}
          </p>
          <button
            type="submit"
            disabled={sending}
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-fg px-6 text-sm font-medium text-bg transition-all duration-300 hover:bg-accent hover:shadow-[0_0_32px_-4px_var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-fg disabled:hover:shadow-none"
          >
            {sending ? (
              <>
                <LoaderCircle className="size-4 animate-spin" aria-hidden />
                Sending…
              </>
            ) : (
              <>
                Send message
                <Send
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </>
            )}
          </button>
        </div>

        <div role="status" aria-live="polite" className="empty:hidden">
          <AnimatePresence initial={false}>
            {(status === "success" || status === "error" || status === "mailto") && (
              <motion.div
                key={status}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <StatusMessage status={status} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
}

function StatusMessage({ status }: { status: Status }) {
  const tone = status === "error" ? "error" : "ok";
  return (
    <div
      className={clsx(
        "mt-5 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm leading-relaxed",
        tone === "ok" ? "border-accent/25 bg-accent/[0.06] text-fg" : "border-danger/25 bg-danger/[0.06] text-fg",
      )}
    >
      {tone === "ok" ? (
        <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
      ) : (
        <CircleAlert className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden />
      )}
      <p>
        {status === "success" && contact.success}
        {status === "mailto" && (
          <>
            {contact.mailtoNotice} If nothing opened, email{" "}
            <a href={`mailto:${profile.email}`} className="text-accent underline-offset-4 hover:underline">
              {profile.email}
            </a>
            .
          </>
        )}
        {status === "error" && (
          <>
            {contact.error}{" "}
            <a href={`mailto:${profile.email}`} className="text-accent underline-offset-4 hover:underline">
              {profile.email}
            </a>
          </>
        )}
      </p>
    </div>
  );
}

function inputClass(invalid: boolean) {
  return clsx(
    "block w-full rounded-xl border bg-surface px-4 text-[15px] text-fg placeholder:text-subtle transition-[border-color,box-shadow,background-color] duration-200",
    "focus:bg-surface-2 focus:outline-none focus-visible:outline-none focus:ring-4",
    "disabled:cursor-not-allowed disabled:opacity-60",
    invalid
      ? "border-danger/60 focus:border-danger/80 focus:ring-danger/10"
      : "border-line-strong hover:border-fg/20 focus:border-accent/60 focus:ring-accent/10",
  );
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-[13px] font-medium text-muted">
      {children}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-[13px] text-danger">
      <CircleAlert className="size-3.5 shrink-0" aria-hidden />
      {message}
    </p>
  );
}

function TextField({
  id,
  name,
  label,
  value,
  error,
  disabled,
  inputRef,
  onChange,
  type = "text",
  ...rest
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  error?: string;
  disabled?: boolean;
  inputRef: React.Ref<HTMLInputElement>;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <input
        ref={inputRef}
        id={id}
        name={name}
        type={type}
        value={value}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(inputClass(Boolean(error)), "h-11")}
        {...rest}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}
