import Image from "next/image";
import type { Dictionary } from "@/i18n/types";
import { siteConfig } from "@/lib/site";
import { Reveal } from "./Reveal";
import { Chip } from "./Primitives";

export function Videos({ t }: { t: Dictionary }) {
  const upcoming = [t.up1, t.up2, t.up3];

  return (
    <section id="videos" className="px-5 py-[clamp(76px,9vw,124px)]">
      <div className="mx-auto max-w-[1240px]">
        <Reveal as="p" className="text-[.82rem] font-extrabold uppercase tracking-[.14em] text-blue-deep">
          {t.videos_label}
        </Reveal>

        <Reveal
          delay={1}
          className="mt-6 grid justify-items-center gap-[26px] rounded-[32px] border-[1.5px] border-line bg-gradient-to-b from-surface2 to-surface px-7 py-[clamp(38px,5vw,64px)] text-center shadow-brand"
        >
          <Image
            src="/assets/character-head-wave.png"
            alt=""
            aria-hidden
            width={809}
            height={880}
            sizes="118px"
            className="animate-bob h-auto w-[118px]"
          />
          <h2 className="max-w-[22ch] text-[clamp(1.8rem,3vw,2.6rem)] font-semibold">
            {t.videos_soon_h}
          </h2>
          <p className="max-w-[54ch] text-[1.06rem] text-muted">{t.videos_soon_p}</p>
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
            {t.fab}
          </a>
          <div className="flex flex-wrap justify-center gap-2.5">
            {upcoming.map((item) => (
              <Chip key={item}>{item}</Chip>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
