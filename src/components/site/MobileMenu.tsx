"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { NavItem } from "@/lib/site";
import { siteConfig } from "@/lib/site";

export function MobileMenu({
  nav,
  ctaLabel,
  onClose,
}: {
  nav: NavItem[];
  ctaLabel: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[130] bg-[rgba(20,14,10,.45)] backdrop-blur-[3px]"
      onClick={onClose}
    >
      <aside
        role="dialog"
        aria-label="Menu"
        onClick={(event) => event.stopPropagation()}
        className="absolute inset-y-0 right-0 flex w-[min(340px,86vw)] flex-col gap-2 bg-bg p-[22px] shadow-lift"
      >
        <div className="mb-3.5 flex items-center justify-between">
          <Image
            src="/assets/web-icon-mobile.png"
            alt="Sani"
            width={456}
            height={456}
            className="h-13 w-auto rounded-2xl"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="h-11 w-11 rounded-full border-[1.5px] border-line bg-surface text-xl"
          >
            ×
          </button>
        </div>

        {nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="border-b border-line px-3 py-3.5 font-display text-xl text-ink"
          >
            {item.label}
          </a>
        ))}

        <a
          href={siteConfig.youtube}
          target="_blank"
          rel="noopener"
          className="mt-4 block rounded-full bg-blue p-[15px] text-center font-extrabold text-white"
        >
          {ctaLabel}
        </a>
      </aside>
    </div>
  );
}
