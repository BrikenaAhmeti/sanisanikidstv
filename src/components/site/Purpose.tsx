import Image from "next/image";
import type { Dictionary } from "@/i18n/types";
import { Reveal } from "./Reveal";

export function Purpose({ t }: { t: Dictionary }) {
  return (
    <section id="purpose" className="px-5 py-[clamp(76px,9vw,132px)]">
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-2">
        <div>
          <Reveal as="p" className="text-[.82rem] font-extrabold uppercase tracking-[.14em] text-blue-deep">
            {t.purpose_label}
          </Reveal>
          <Reveal as="h2" delay={1} className="mt-4 max-w-[22ch] text-[clamp(1.8rem,3vw,2.6rem)] font-semibold">
            {t.purpose_h2}
          </Reveal>
          <Reveal as="p" delay={2} className="mt-6 max-w-[60ch] text-[1.08rem] text-muted">
            {t.purpose_body}
          </Reveal>
          <Reveal as="p" delay={3} className="mt-7 font-display text-2xl text-tang-deep">
            {t.tagline}
          </Reveal>
        </div>
        <Reveal delay={1} className="relative">
          <div className="overflow-hidden rounded-[32px] border-[1.5px] border-line shadow-brand">
            <Image
              src="/assets/website_hero_1920x520.png"
              alt="SaniSaniKidsTV brand scene"
              width={1920}
              height={520}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
