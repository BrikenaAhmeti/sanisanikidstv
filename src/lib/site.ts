import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export const siteConfig = {
  name: "SaniSaniKidsTV",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sanisanikidstv.com").replace(
    /\/$/,
    "",
  ),
  email:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "sanisanikidstv@gmail.com",
  youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "#",
  tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL ?? "#",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "#",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "#",
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
