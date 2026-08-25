import type { Dictionary } from "@/i18n/types";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./Primitives";

export function Commitments({ t }: { t: Dictionary }) {
  const items = [
    { title: t.c1t, desc: t.c1d, glyph: "✓", color: "var(--aqua)", tint: "color-mix(in oklab,var(--aqua) 14%,transparent)" },
    { title: t.c2t, desc: t.c2d, glyph: "★", color: "var(--tang-deep)", tint: "color-mix(in oklab,var(--tang) 16%,transparent)" },
    { title: t.c3t, desc: t.c3d, glyph: "⚿", color: "var(--blue-deep)", tint: "color-mix(in oklab,var(--blue) 14%,transparent)" },
    { title: t.c4t, desc: t.c4d, glyph: "◷", color: "var(--pink)", tint: "color-mix(in oklab,var(--pink) 14%,transparent)" },
  ];

  return (
    <section className="px-5 py-[clamp(76px,9vw,124px)]">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading label={t.commit_label} title={t.commit_h2} className="mb-11" />
        <div className="grid gap-[22px] [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          {items.map((item, i) => (
            <Reveal
              key={item.title}
              as="article"
              delay={i}
              className="rounded-3xl border-[1.5px] border-line bg-surface p-[26px] transition-[transform,box-shadow] duration-250 hover:-translate-y-1.5 hover:shadow-lift"
            >
              <span
                aria-hidden
                className="grid h-12 w-12 place-items-center rounded-[14px] text-[1.3rem] font-extrabold"
                style={{ background: item.tint, color: item.color }}
              >
                {item.glyph}
              </span>
              <h3 className="mb-2 mt-[18px] text-[1.2rem] font-semibold">{item.title}</h3>
              <p className="text-[.98rem] text-muted">{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
