"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/types";
import { Reveal } from "./Reveal";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Newsletter({ t }: { t: Dictionary }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!EMAIL.test(email) || !consent) {
      setMessage(t.news_err);
      return;
    }
    setPending(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setMessage(res.ok ? t.news_ok : t.news_submit_err);
      if (res.ok) {
        setEmail("");
        setConsent(false);
      }
    } catch {
      setMessage(t.news_submit_err);
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-deep to-blue px-5 py-[clamp(60px,7vw,96px)] text-white">
      <div className="mx-auto max-w-[900px] text-center">
        <Reveal as="h2" className="text-[clamp(1.8rem,3vw,2.6rem)] font-semibold">
          {t.news_h2}
        </Reveal>
        <Reveal as="p" delay={1} className="mx-auto mt-4 max-w-[52ch] text-white/90">
          {t.news_sub}
        </Reveal>

        <form onSubmit={onSubmit} className="mx-auto mt-8 flex max-w-[560px] flex-wrap justify-center gap-3">
          <label className="flex-[1_1_240px] text-left">
            <span className="sr-only">{t.news_email}</span>
            <input
              type="email"
              required
              autoComplete="email"
              maxLength={254}
              placeholder={t.news_email}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="min-h-[54px] w-full rounded-full border-0 bg-white px-5 text-[#33241B]"
            />
          </label>
          <button
            type="submit"
            disabled={pending}
            className="min-h-[54px] rounded-full bg-sun px-[30px] font-extrabold text-sun-ink transition-transform hover:-translate-y-0.5 disabled:opacity-70"
          >
            {t.news_btn}
          </button>
          <label className="flex flex-[1_1_100%] items-start gap-[11px] text-left text-[.88rem] text-white/90">
            <input
              type="checkbox"
              required
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              className="mt-1.5 h-5 w-5 flex-none"
            />
            {t.news_consent}
          </label>
        </form>

        <p aria-live="polite" className="mt-4 min-h-6 font-extrabold">
          {message}
        </p>
      </div>
    </section>
  );
}
