import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

const DEFAULT_SITE_URL = "https://sanisanikidstv.com";

function resolveSiteUrl() {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ];

  for (const value of candidates) {
    const candidate = value?.trim();
    if (!candidate) continue;

    try {
      const url = new URL(
        /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`,
      );
      if (url.protocol === "http:" || url.protocol === "https:") {
        return url.origin;
      }
    } catch {}
  }

  return DEFAULT_SITE_URL;
}

export const siteConfig = {
  name: "SaniSaniKidsTV",
  url: resolveSiteUrl(),
  email:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ||
    "sanisanikidstv@gmail.com",
  youtube:
    process.env.NEXT_PUBLIC_YOUTUBE_URL?.trim() ||
    "https://youtube.com/@sanisanikidstv",
  tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL?.trim() || "",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() || "",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim() || "",
} as const;

export type NavItem = { href: string; label: string };

export function getNavItems(t: Dictionary): NavItem[] {
  return [
    { href: "#purpose", label: t.nav_purpose },
    { href: "#make", label: t.nav_make },
    { href: "#about", label: t.nav_about },
    { href: "#videos", label: t.nav_videos },
    { href: "#contact", label: t.nav_contact },
  ];
}

export const socialLinks = [
  { name: "YouTube", href: siteConfig.youtube },
  { name: "TikTok", href: siteConfig.tiktok },
  { name: "Instagram", href: siteConfig.instagram },
  { name: "Facebook", href: siteConfig.facebook },
].filter(({ href }) => href && href !== "#");

export function localePath(locale: Locale, path = "") {
  return `/${locale}${path}`;
}
