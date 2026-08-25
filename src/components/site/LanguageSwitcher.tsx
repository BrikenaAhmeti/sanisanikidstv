"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { setLocaleCookie } from "@/lib/set-locale-cookie";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (next: Locale) => {
    setLocaleCookie(next);
    const rest = pathname.replace(/^\/[^/]+/, "");
    setOpen(false);
    router.push(`/${next}${rest}`);
  };

  return (
    <div className="relative" ref={wrapRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        className="flex min-h-11 items-center gap-[7px] rounded-full border-[1.5px] border-line bg-surface px-3.5 text-[.9rem] font-extrabold tracking-[.04em] transition-colors hover:border-blue hover:text-blue-deep"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
        </svg>
        {locale.toUpperCase()}
      </button>

      {open ? (
        <ul
          role="listbox"
          className="absolute right-0 top-[52px] m-0 min-w-[184px] list-none rounded-2xl border-[1.5px] border-line bg-surface p-2 shadow-lift"
        >
          {locales.map((code) => (
            <li key={code}>
              <button
                type="button"
                role="option"
                aria-selected={code === locale}
                onClick={() => pick(code)}
                className="flex min-h-11 w-full items-center justify-between gap-2.5 rounded-[11px] px-3 text-left text-[.95rem] font-bold transition-colors hover:bg-blue-soft hover:text-blue-deep"
              >
                {localeNames[code]}
                <span className="text-[.72rem] font-extrabold tracking-[.08em] text-muted">
                  {code.toUpperCase()}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
