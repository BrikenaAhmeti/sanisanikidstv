import { Reveal } from "./Reveal";

export function SectionHeading({
  label,
  title,
  className = "",
}: {
  label: string;
  title?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Reveal as="p" className="text-[.82rem] font-extrabold uppercase tracking-[.14em] text-blue-deep">
        {label}
      </Reveal>
      {title ? (
        <Reveal
          as="h2"
          delay={1}
          className="mt-4 text-[clamp(1.8rem,3vw,2.6rem)] font-semibold"
        >
          {title}
        </Reveal>
      ) : null}
    </div>
  );
}

export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border-[1.5px] border-line bg-surface px-[18px] py-2.5 text-[.92rem] font-bold">
      {children}
    </span>
  );
}
