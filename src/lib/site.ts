import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export const siteConfig = {
  name: "SaniSaniKidsTV",
  url: "https://sanisanikidstv.com",
  email: "sanisanikidstv@gmail.com",
  youtube: "https://www.youtube.com/@sanisanikidstv",
  tiktok: "https://www.tiktok.com/@sanisanikidstv",
  instagram: "https://www.instagram.com/sanisanikidstv/",
  facebook: "https://www.facebook.com/share/1DrjWJKxxo/",
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
].filter(({ href }) => href);

export function localePath(locale: Locale, path = "") {
  return `/${locale}${path}`;
}
