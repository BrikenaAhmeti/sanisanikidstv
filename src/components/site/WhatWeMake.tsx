import type { Dictionary } from "@/i18n/types";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./Primitives";

type Pillar = { title: string; desc: string; glyph: string; color: string; tint: string };

function getPillars(t: Dictionary): Pillar[] {
  return [
    { title: t.p1t, desc: t.p1d, glyph: "Aa", color: "var(--grape)", tint: "color-mix(in oklab,var(--grape) 14%,transparent)" },
    { title: t.p2t, desc: t.p2d, glyph: "?", color: "var(--aqua)", tint: "color-mix(in oklab,var(--aqua) 14%,transparent)" },
    { title: t.p3t, desc: t.p3d, glyph: "♪", color: "var(--pink)", tint: "color-mix(in oklab,var(--pink) 14%,transparent)" },
    { title: t.p4t, desc: t.p4d, glyph: "♡", color: "var(--blue-deep)", tint: "color-mix(in oklab,var(--blue) 14%,transparent)" },
    { title: t.p5t, desc: t.p5d, glyph: "❝", color: "var(--tang-deep)", tint: "color-mix(in oklab,var(--tang) 16%,transparent)" },
    { title: t.p6t, desc: t.p6d, glyph: "Hi", color: "var(--ink)", tint: "color-mix(in oklab,var(--sun) 28%,transparent)" },
  ];
}

export function WhatWeMake({ t }: { t: Dictionary }) {
  return (
    <section id="make" className="border-y border-line bg-surface2 px-5 py-[clamp(60px,7vw,100px)]">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading label={t.make_label} title={t.make_h2} className="mb-11" />
        <div className="grid gap-[22px] [grid-template-columns:repeat(auto-fit,minmax(290px,1fr))]">
          {getPillars(t).map((pillar, i) => (
            <Reveal
              key={pillar.title}
              as="article"
              delay={i}
              className="rounded-3xl border-[1.5px] border-line bg-surface p-7 shadow-brand transition-[transform,box-shadow] duration-250 hover:-translate-y-1.5 hover:shadow-lift"
            >
              <span
                aria-hidden
                className="grid h-14 w-14 place-items-center rounded-[18px] font-display text-2xl font-bold"
                style={{ background: pillar.tint, color: pillar.color }}
              >
                {pillar.glyph}
              </span>
              <h3 className="mb-2 mt-5 text-[1.32rem] font-semibold">{pillar.title}</h3>
              <p className="text-base text-muted">{pillar.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
