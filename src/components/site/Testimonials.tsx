import type { Dictionary } from "@/i18n/types";
import { Reveal } from "./Reveal";

export function Testimonials({ t }: { t: Dictionary }) {
  const quotes = [
    { text: t.q1, who: t.q1w },
    { text: t.q2, who: t.q2w },
    { text: t.q3, who: t.q3w },
  ];
  const loop = [...quotes, ...quotes];

  return (
    <section className="overflow-hidden border-y border-line bg-surface2 py-[clamp(60px,7vw,100px)]">
      <div className="mx-auto mb-9 max-w-[1240px] px-5">
        <Reveal as="p" className="text-[.82rem] font-extrabold uppercase tracking-[.14em] text-blue-deep">
          {t.testi_label}
        </Reveal>
        <Reveal as="h2" delay={1} className="mt-4 text-[clamp(1.8rem,3vw,2.6rem)] font-semibold">
          {t.testi_h2}
        </Reveal>
      </div>

      <div className="animate-marquee flex w-max gap-5 px-5">
        {loop.map((quote, i) => (
          <figure
            key={`${quote.who}-${i}`}
            className="m-0 w-[360px] rounded-[22px] border-[1.5px] border-line bg-surface p-[26px] shadow-brand"
          >
            <blockquote className="text-[1.04rem]">{quote.text}</blockquote>
            <figcaption className="mt-4 text-[.9rem] font-extrabold text-muted">
              {quote.who}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
