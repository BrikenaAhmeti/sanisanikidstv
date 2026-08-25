"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

export function StickyCta({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => setVisible(window.innerWidth >= 900 && window.scrollY > 600);
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  if (!visible) return null;

  return (
    <a
      href={siteConfig.youtube}
      target="_blank"
      rel="noopener"
      className="fixed bottom-[22px] right-[22px] z-[100] inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-blue px-[22px] text-[.95rem] font-extrabold text-white shadow-[0_14px_30px_rgba(0,0,0,.28)] transition-transform hover:-translate-y-[3px]"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M8 5v14l11-7z" />
      </svg>
      {label}
    </a>
  );
}
