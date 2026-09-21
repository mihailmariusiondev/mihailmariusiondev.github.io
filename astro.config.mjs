import { defineConfig } from "astro/config";

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: "https://mihailmariusiondev.github.io",
  // English is the primary market (remote international, EU relocation) and keeps
  // the bare paths. Spanish is a mirror under /es/. No browser detection: the URL
  // decides the language, so the same link renders the same page for everyone.
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
