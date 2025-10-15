import "server-only";
import type { Locale } from "./config";

// Dictionary loaders for Mkan rental marketplace
const dictionaries = {
  "en": () => import("./en.json").then((module) => module.default),
  "ar": () => import("./ar.json").then((module) => module.default),
} as const;

export const getDictionary = async (locale: Locale) => {
  try {
    return await dictionaries[locale]?.() ?? dictionaries["en"]();
  } catch (error) {
    console.warn(`Failed to load dictionary for locale: ${locale}. Falling back to en.`);
    return await dictionaries["en"]();
  }
};

// Type helper for component props
export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;