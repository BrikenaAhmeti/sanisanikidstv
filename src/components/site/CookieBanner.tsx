"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/types";
import { useLegal } from "@/components/providers/LegalProvider";

const KEY = "ssk-cookie";

export function CookieBanner({ t }: { t: Dictionary }) {
  const [open, setOpen] = useState(false);
  const legal = useLegal();

  useEffect(() => {
    let shouldOpen = false;
    try {
      shouldOpen = !localStorage.getItem(KEY);
    } catch {}
    const frame = requestAnimationFrame(() => setOpen(shouldOpen));
    return () => cancelAnimationFrame(frame);
  }, []);

  const decide = (value: "all" | "essential") => {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-4 bottom-4 z-[140] max-w-[520px] rounded-[22px] border-[1.5px] border-line bg-surface p-[22px] shadow-lift"
    >
      <p className="text-[.95rem] text-muted">{t.cookie_text}</p>
      <div className="mt-4 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => decide("all")}
          className="min-h-11 rounded-full bg-blue px-[22px] font-extrabold text-white"
        >
          {t.cookie_accept}
        </button>
        <button
          type="button"
          onClick={() => decide("essential")}
          className="min-h-11 rounded-full border-[1.5px] border-line bg-surface px-[22px] font-extrabold"
        >
          {t.cookie_reject}
        </button>
        <button
          type="button"
          onClick={() => legal.open("privacy")}
          className="self-center text-[.9rem] font-bold text-blue-deep"
        >
          {t.footer_privacy}
        </button>
      </div>
    </div>
  );
}
