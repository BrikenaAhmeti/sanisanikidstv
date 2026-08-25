"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/types";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./Primitives";

export function Faq({ t }: { t: Dictionary }) {
  const [open, setOpen] = useState(0);
  const items = [
    { q: t.f1q, a: t.f1a },
    { q: t.f2q, a: t.f2a },
    { q: t.f3q, a: t.f3a },
    { q: t.f4q, a: t.f4a },
    { q: t.f5q, a: t.f5a },
    { q: t.f6q, a: t.f6a },
  ];

  return (
    <section className="px-5 py-[clamp(76px,9vw,124px)]">
      <div className="mx-auto max-w-[840px]">
        <SectionHeading label={t.faq_label} title={t.faq_h2} className="mb-10" />
        <div className="grid gap-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal
                key={item.q}
                delay={i}
                className="overflow-hidden rounded-[18px] border-[1.5px] border-line bg-surface"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex min-h-[60px] w-full items-center justify-between gap-4 px-[22px] py-4 text-left font-display text-[1.1rem] font-medium"
                >
                  {item.q}
                  <span aria-hidden className="flex-none text-2xl font-normal text-blue-deep">
                    {isOpen ? "–" : "+"}
                  </span>
                </button>
                {isOpen ? <p className="px-[22px] pb-[22px] text-muted">{item.a}</p> : null}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
