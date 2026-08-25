import type { Dictionary } from "@/i18n/types";
import { Reveal } from "./Reveal";
import { Chip } from "./Primitives";

export function About({ t }: { t: Dictionary }) {
  const roles = [t.r1, t.r2, t.r3, t.r4];
  const experts = [t.e1, t.e2, t.e3, t.e4];

  return (
    <section id="about" className="border-y border-line bg-surface2 px-5 py-[clamp(60px,7vw,100px)]">
      <div className="mx-auto max-w-[1240px]">
        <Reveal as="p" className="text-[.82rem] font-extrabold uppercase tracking-[.14em] text-blue-deep">
          {t.about_label}
        </Reveal>
        <Reveal as="h2" delay={1} className="mt-4 max-w-[26ch] text-[clamp(1.8rem,3vw,2.6rem)] font-semibold">
          {t.about_h2}
        </Reveal>

        <div className="mt-9 grid gap-[22px]">
          <Reveal as="p" className="max-w-[62ch] text-[1.06rem] text-muted">
            {t.about_intro}
          </Reveal>
          <Reveal
            as="p"
            delay={1}
            className="max-w-[62ch] border-l-4 border-tang pl-5 text-[1.04rem] font-bold"
          >
            {t.about_experts}
          </Reveal>
          <Reveal delay={2} className="mt-1.5 flex flex-wrap gap-2.5">
            {roles.map((role) => (
              <Chip key={role}>{role}</Chip>
            ))}
          </Reveal>
        </div>

        <Reveal delay={1} className="mt-11 border-t border-line pt-7">
          <p className="mb-3.5 text-[.82rem] font-extrabold uppercase tracking-[.12em] text-muted">
            {t.about_working}
          </p>
          <div className="flex flex-wrap gap-2.5">
            {experts.map((expert) => (
              <Chip key={expert}>{expert}</Chip>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
