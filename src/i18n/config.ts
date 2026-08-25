export const locales = ["en", "de", "fr", "es", "it", "pt", "sq"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  it: "Italiano",
  pt: "Português",
  sq: "Shqip",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
