import type en from "./dictionaries/en";

export type Dictionary = { [K in keyof typeof en]: string };

export type PartialDictionary = Partial<Dictionary>;
