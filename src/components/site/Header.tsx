"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";
import { getNavItems, siteConfig } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

export function Header({ t, locale }: { t: Dictionary; locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = getNavItems(t);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[110] transition-[background,box-shadow,backdrop-filter] duration-300"
        style={
          scrolled
            ? {
                background: "color-mix(in oklab, var(--bg) 82%, transparent)",
                backdropFilter: "blur(14px)",
                boxShadow: "0 6px 24px rgba(51,36,27,.08)",
                borderBottom: "1px solid var(--line)",
              }
            : { borderBottom: "1px solid transparent" }
        }
      >
        <div className="mx-auto flex max-w-[1240px] items-center gap-5 px-5 py-3.5">
          <a href="#top" aria-label={`${siteConfig.name} — home`} className="flex-none">
            <Image
              src="/assets/web-header.png"
              alt={siteConfig.name}
              width={1182}
              height={280}
              priority
              className="h-12 w-auto dark:hidden"
            />
            <Image
              src="/assets/logo-lockup-dark.png"
              alt={siteConfig.name}
              width={1182}
              height={280}
              priority
              className="hidden h-12 w-auto dark:block"
            />
          </a>

          <nav aria-label="Main" className="ml-auto hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-2.5 text-[.98rem] font-bold text-ink transition-colors hover:bg-blue-soft hover:text-blue-deep"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <LanguageSwitcher locale={locale} />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Menu"
              aria-expanded={menuOpen}
              className="grid h-11 w-11 place-items-center rounded-full border-[1.5px] border-line bg-surface lg:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <MobileMenu nav={nav} ctaLabel={t.hero_cta1} onClose={() => setMenuOpen(false)} />
      ) : null}
    </>
  );
}
