/**
 * Bilingual site: English is primary (remote international / EU relocation),
 * Spanish exists because Spanish consultancies ask for it.
 *
 * Two invariants encoded here, not left to discipline:
 *
 * 1. No browser/device detection. The URL is the single source of truth for the
 *    language, so a recruiter and Marius always see the same page for the same
 *    link. English lives at `/`, Spanish at `/es/`.
 *
 * 2. Spanish is a MIRROR of English, never independent content. Every piece of
 *    copy is a `Localized<T>` with both languages on the same object, so a
 *    missing Spanish string is a TypeScript error at build time (`astro check`
 *    runs in `npm run build`). Separate per-locale data files would let the two
 *    versions drift silently, which is exactly how the Spanish LinkedIn profile
 *    rotted.
 */

export const LOCALES = ["en", "es"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** A value that must exist in every language. Omitting one fails the build. */
export type Localized<T> = Record<Locale, T>;

/** Resolve a localized value for the current page's language. */
export function t<T>(value: Localized<T>, lang: Locale): T {
  return value[lang];
}

/**
 * The language of a page, derived from its URL. `/es/...` is Spanish,
 * everything else is English. No headers, no cookies, no detection.
 */
export function localeFromPath(pathname: string): Locale {
  return pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
}

/** Prefix a site-root path for a locale: `/about/` -> `/es/about/`. */
export function localizedPath(path: string, lang: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return lang === DEFAULT_LOCALE ? clean : `/es${clean === "/" ? "/" : clean}`;
}

/**
 * The same page in the other language. Used by the language switcher, which
 * must land on the equivalent page, never on the home page.
 */
export function pathInLocale(pathname: string, target: Locale): string {
  const stripped = pathname.replace(/^\/es(?=\/|$)/, "") || "/";
  return localizedPath(stripped, target);
}

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  es: "Español",
};
