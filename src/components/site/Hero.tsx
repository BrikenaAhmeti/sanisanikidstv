import Image from "next/image";
import type { Dictionary } from "@/i18n/types";
import { siteConfig } from "@/lib/site";
import { Reveal } from "./Reveal";

export function Hero({ t }: { t: Dictionary }) {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-16 pt-[120px]"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 18% 22%, color-mix(in oklab, var(--blue) 22%, transparent), transparent 70%), radial-gradient(55% 50% at 84% 18%, color-mix(in oklab, var(--sun) 30%, transparent), transparent 72%), radial-gradient(60% 60% at 70% 92%, color-mix(in oklab, var(--tang) 20%, transparent), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="animate-drift absolute left-[6%] top-[8%] h-[340px] w-[340px] rounded-full bg-blue opacity-50 blur-[70px]"
      />
      <div
        aria-hidden
        className="animate-drift-slow absolute bottom-[6%] right-[12%] h-[300px] w-[300px] rounded-full bg-tang opacity-45 blur-[70px]"
      />

      <div className="relative mx-auto grid w-full max-w-[1240px] items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
        <div className="max-w-[660px]">
          <Reveal
            as="p"
            className="inline-flex items-center gap-[9px] rounded-full border-[1.5px] border-line bg-surface px-4 py-2 text-[.82rem] font-extrabold uppercase tracking-[.1em] text-tang-deep shadow-brand"
          >
            <span className="h-2 w-2 rounded-full bg-tang" />
            {t.hero_eyebrow}
          </Reveal>

          <Reveal
            as="h1"
            delay={1}
            className="mt-[22px] text-[clamp(2.4rem,5vw,4rem)] font-bold tracking-[-.02em]"
          >
            {t.hero_h1}
          </Reveal>

          <Reveal
            as="p"
            delay={2}
            className="mt-[22px] max-w-[58ch] text-[clamp(1.05rem,1.6vw,1.22rem)] text-muted"
          >
            {t.hero_sub}
          </Reveal>

          <Reveal delay={3} className="mt-[34px] flex flex-wrap gap-3.5">
            <a
              href={siteConfig.youtube}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-14 items-center gap-[11px] rounded-full bg-blue px-[30px] text-[1.02rem] font-extrabold text-white transition-transform hover:-translate-y-[3px]"
              style={{ boxShadow: "0 12px 26px color-mix(in oklab, var(--blue) 40%, transparent)" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
              {t.hero_cta1}
            </a>
            <a
              href="#purpose"
              className="inline-flex min-h-14 items-center rounded-full border-2 border-ink px-[30px] text-[1.02rem] font-extrabold text-ink transition-colors hover:bg-ink hover:text-bg"
            >
              {t.hero_cta2}
            </a>
          </Reveal>

          <Reveal as="p" delay={4} className="mt-6 text-[.92rem] font-bold text-muted">
            {t.hero_trust}
          </Reveal>
        </div>

        <div className="relative justify-self-center">
          <Image
            src="/assets/sani-character-waving.gif"
            alt="Sani, the SaniSaniKidsTV mascot, waving hello"
            width={380}
            height={638}
            unoptimized
            priority
            className="w-[min(420px,78vw)] drop-shadow-[0_26px_40px_rgba(51,36,27,.22)]"
          />
        </div>
      </div>

      <a
        href="#trust"
        aria-label="Scroll down"
        className="animate-chev absolute bottom-[22px] left-1/2 -translate-x-1/2 text-muted"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}
