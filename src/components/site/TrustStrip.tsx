import type { Dictionary } from "@/i18n/types";
import { Reveal } from "./Reveal";

export function TrustStrip({ t }: { t: Dictionary }) {
  const items = [t.trust1, t.trust2, t.trust3, t.trust4];

  return (
    <section id="trust" className="border-y border-line bg-surface2">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-center gap-x-[34px] gap-y-3.5 px-5 py-[22px]">
        {items.map((item, i) => (
          <Reveal
            key={item}
            as="p"
            delay={i}
            className="flex items-center gap-2.5 text-[.95rem] font-bold text-muted"
          >
            <span aria-hidden className="h-[7px] w-[7px] flex-none rounded-full bg-tang" />
            {item}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
