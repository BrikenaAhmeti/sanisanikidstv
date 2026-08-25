"use client";

import Image from "next/image";
import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/types";
import { siteConfig, socialLinks } from "@/lib/site";
import { useLegal } from "@/components/providers/LegalProvider";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./Primitives";
import { SubjectSelect } from "./SubjectSelect";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
  company_website: string;
};

type Errors = Partial<Record<"name" | "email" | "message" | "consent", string>>;

export function Contact({ t }: { t: Dictionary }) {
  const legal = useLegal();
  const subjects = [t.sub1, t.sub2, t.sub3, t.sub4];

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: subjects[0],
    message: "",
    consent: false,
    company_website: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ ok: boolean; text: string }>({ ok: false, text: "" });

  const onField = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const el = event.target;
    const value = el instanceof HTMLInputElement && el.type === "checkbox" ? el.checked : el.value;
    setForm((prev) => ({ ...prev, [el.name]: value }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.company_website) return;

    const next: Errors = {};
    if (!form.name.trim()) next.name = t.form_req_name;
    if (!EMAIL.test(form.email)) next.email = t.form_req_email;
    if (form.message.trim().length < 8) next.message = t.form_req_msg;
    if (!form.consent) next.consent = t.form_req_consent;
    setErrors(next);

    if (Object.keys(next).length > 0) {
      setStatus({ ok: false, text: t.form_err });
      return;
    }

    const subject = `[SaniSaniKidsTV] ${form.subject}`;
    const body = `${t.form_name}: ${form.name.trim()}\n${t.form_email}: ${form.email.trim()}\n\n${form.message.trim()}`;
    const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setErrors({});
    setStatus({ ok: true, text: t.form_ok });
    window.location.href = mailto;
  };

  const fieldClass =
    "min-h-[50px] rounded-[14px] border-[1.5px] border-line bg-bg px-4";

  return (
    <section id="contact" className="px-5 py-[clamp(76px,9vw,124px)]">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading label={t.contact_label} title={t.contact_h2} className="mb-11" />

        <div className="grid gap-11 lg:grid-cols-[1.1fr_.9fr]">
          <Reveal className="rounded-[26px] border-[1.5px] border-line bg-surface p-7 shadow-brand">
            <form onSubmit={onSubmit} noValidate className="relative grid gap-[18px]">
              <label className="grid gap-[7px] text-[.92rem] font-bold">
                {t.form_name}
                <input type="text" name="name" autoComplete="name" maxLength={100} required value={form.name} onChange={onField} className={fieldClass} />
                <span className="min-h-[18px] text-[.84rem] text-pink">{errors.name}</span>
              </label>

              <label className="grid gap-[7px] text-[.92rem] font-bold">
                {t.form_email}
                <input type="email" name="email" autoComplete="email" maxLength={254} required value={form.email} onChange={onField} className={fieldClass} />
                <span className="min-h-[18px] text-[.84rem] text-pink">{errors.email}</span>
              </label>

              <div className="grid gap-[7px] text-[.92rem] font-bold">
                <span>{t.form_subject}</span>
                <SubjectSelect
                  label={t.form_subject}
                  options={subjects}
                  value={form.subject}
                  onChange={(subject) => setForm((prev) => ({ ...prev, subject }))}
                />
              </div>

              <label className="grid gap-[7px] text-[.92rem] font-bold">
                {t.form_message}
                <textarea
                  name="message"
                  rows={5}
                  minLength={8}
                  maxLength={5000}
                  required
                  value={form.message}
                  onChange={onField}
                  className="resize-y rounded-[14px] border-[1.5px] border-line bg-bg px-4 py-3.5"
                />
                <span className="min-h-[18px] text-[.84rem] text-pink">{errors.message}</span>
              </label>

              <div aria-hidden className="absolute -left-[9999px] opacity-0">
                <input
                  type="text"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.company_website}
                  onChange={onField}
                />
              </div>

              <label className="flex items-start gap-3 text-[.92rem]">
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={onField}
                  className="mt-1 h-5 w-5 flex-none"
                />
                <span>
                  {t.form_consent}{" "}
                  <button
                    type="button"
                    onClick={() => legal.open("privacy")}
                    className="font-bold text-blue-deep underline-offset-2 hover:underline"
                  >
                    {t.footer_privacy}
                  </button>
                  . <span className="text-pink">{errors.consent}</span>
                </span>
              </label>

              <button
                type="submit"
                className="min-h-14 rounded-full border-0 bg-blue text-base font-extrabold text-white transition-transform hover:-translate-y-0.5"
              >
                {t.form_send}
              </button>

              <p
                aria-live="polite"
                className="min-h-6 font-extrabold"
                style={{ color: status.ok ? "var(--aqua)" : "var(--pink)" }}
              >
                {status.text}
              </p>
            </form>
          </Reveal>

          <Reveal delay={1} className="grid content-start gap-[18px]">
            <Image
              src="/assets/character-head-wave.png"
              alt=""
              aria-hidden
              width={809}
              height={880}
              sizes="96px"
              className="h-auto w-24"
            />
            <p className="font-display text-[1.6rem]">{siteConfig.name}</p>
            <p className="text-muted">{t.based}</p>
            <p>
              <a href={`mailto:${siteConfig.email}`} className="font-bold text-blue-deep hover:text-tang-deep">
                {siteConfig.email}
              </a>
            </p>
            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-11 items-center gap-[9px] rounded-full border-[1.5px] border-line bg-surface px-[18px] text-[.92rem] font-bold text-ink transition-colors hover:border-blue hover:text-blue-deep"
                >
                  {social.name}
                </a>
              ))}
            </div>
            <p className="text-[.92rem] text-muted">{t.contact_reply}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
