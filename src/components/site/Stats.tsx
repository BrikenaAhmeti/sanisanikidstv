"use client";

import type { Dictionary } from "@/i18n/types";
import { useCountUp } from "@/lib/hooks/useCountUp";
import { Reveal } from "./Reveal";

type Stat = { value: number; suffix: string; initial: string; label: string };

function StatItem({ stat, index }: { stat: Stat; index: number }) {
  const { ref, text } = useCountUp(stat.value, stat.suffix, stat.initial);

  return (
    <Reveal delay={index}>
      <p
        ref={ref}
        className="font-display text-[clamp(2.4rem,4.4vw,3.4rem)] font-bold leading-none"
      >
        {text}
      </p>
      <p className="mt-2 text-[.98rem] font-bold text-white/90">{stat.label}</p>
    </Reveal>
  );
}

export function Stats({ t }: { t: Dictionary }) {
  const stats: Stat[] = [
    { value: 6, suffix: "", initial: "0", label: t.s1 },
    { value: 7, suffix: "", initial: "0", label: t.s2 },
    { value: 50, suffix: "+", initial: "0", label: t.s3 },
    { value: 15, suffix: "+", initial: "0", label: t.s4 },
    { value: 0, suffix: "", initial: "2–8", label: t.s5 },
  ];

  return (
    <section className="bg-blue px-5 py-[clamp(60px,7vw,96px)] text-white">
      <div className="mx-auto max-w-[1240px]">
        <p className="text-[.82rem] font-extrabold uppercase tracking-[.14em] text-white/80">
          {t.stats_label}
        </p>
        <div className="mt-9 grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} />
          ))}
        </div>
        <p className="mt-9 text-[.86rem] text-white/70">{t.stats_note}</p>
      </div>
    </section>
  );
}
