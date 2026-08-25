import "server-only";

import en from "./dictionaries/en";
import type { Locale } from "./config";
import type { Dictionary, PartialDictionary } from "./types";

const loaders: Record<Locale, () => Promise<PartialDictionary>> = {
  en: async () => ({}),
  de: () => import("./dictionaries/de").then((m) => m.default),
  fr: () => import("./dictionaries/fr").then((m) => m.default),
  es: () => import("./dictionaries/es").then((m) => m.default),
  it: () => import("./dictionaries/it").then((m) => m.default),
  pt: () => import("./dictionaries/pt").then((m) => m.default),
  sq: () => import("./dictionaries/sq").then((m) => m.default),
};

const base = en as unknown as Dictionary;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const overrides = await loaders[locale]();
  return { ...base, ...overrides };
}
