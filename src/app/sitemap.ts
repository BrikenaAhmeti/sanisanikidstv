import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${siteConfig.url}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: locale === "en" ? 1 : 0.8,
    alternates: {
      languages: {
        ...Object.fromEntries(
          locales.map((item) => [item, `${siteConfig.url}/${item}`]),
        ),
        "x-default": `${siteConfig.url}/en`,
      },
    },
    images: [`${siteConfig.url}/og.png`],
  }));
}
