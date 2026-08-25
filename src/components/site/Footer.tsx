"use client";

import Image from "next/image";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";
import { locales, localeNames } from "@/i18n/config";
import { getNavItems, siteConfig, socialLinks } from "@/lib/site";
import { useLegal } from "@/components/providers/LegalProvider";
import { useRouter, usePathname } from "next/navigation";
import { setLocaleCookie } from "@/lib/set-locale-cookie";

export function Footer({ t, locale }: { t: Dictionary; locale: Locale }) {
  const legal = useLegal();
  const router = useRouter();
  const pathname = usePathname();
  const nav = getNavItems(t);

  const switchTo = (next: Locale) => {
    setLocaleCookie(next);
    router.push(`/${next}${pathname.replace(/^\/[^/]+/, "")}`);
  };

  return (
    <footer className="bg-night px-5 pb-7 pt-[clamp(56px,7vw,88px)] text-night-ink">
      <div className="mx-auto grid max-w-[1240px] gap-[38px] [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
        <div>
          <Image
            src="/assets/web-icon-mobile.png"
            alt={siteConfig.name}
            width={456}
            height={456}
            className="h-16 w-auto rounded-2xl"
          />
          <p className="mt-[18px] font-display text-[1.35rem] text-sun">{t.tagline}</p>
          <p className="mt-2.5 max-w-[32ch] text-[.94rem] text-night-muted">{t.descriptor}</p>
        </div>

        <nav aria-label="Footer">
          <p className="mb-3.5 text-[.8rem] font-extrabold uppercase tracking-[.12em] text-[#8494AE]">
            {t.footer_links}
          </p>
          <div className="grid gap-2.5">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="text-[.96rem] text-night-ink hover:text-sun">
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <div>
          <p className="mb-3.5 text-[.8rem] font-extrabold uppercase tracking-[.12em] text-[#8494AE]">
            {t.footer_langs}
          </p>
          <div className="grid gap-2.5">
            {locales.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => switchTo(code)}
                aria-current={code === locale ? "true" : undefined}
                className="p-0 text-left text-[.96rem] text-night-ink hover:text-sun"
              >
                {localeNames[code]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3.5 text-[.8rem] font-extrabold uppercase tracking-[.12em] text-[#8494AE]">
            {t.footer_social}
          </p>
          <div className="grid gap-2.5">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener"
                className="text-[.96rem] text-night-ink hover:text-sun"
              >
                {social.name}
              </a>
            ))}
            <a href={`mailto:${siteConfig.email}`} className="text-[.96rem] text-night-ink hover:text-sun">
              Email
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-11 flex max-w-[1240px] flex-wrap items-center gap-x-[26px] gap-y-3 border-t border-night-line pt-[22px] text-[.88rem] text-night-muted">
        <p>
          © {new Date().getFullYear()} {siteConfig.name} · {t.based}
        </p>
        <button type="button" onClick={() => legal.open("privacy")} className="hover:text-sun">
          {t.footer_privacy}
        </button>
        <button type="button" onClick={() => legal.open("imprint")} className="hover:text-sun">
          {t.footer_imprint}
        </button>
        <button type="button" onClick={() => legal.open("terms")} className="hover:text-sun">
          {t.footer_terms}
        </button>
      </div>
    </footer>
  );
}
