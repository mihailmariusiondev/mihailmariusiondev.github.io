import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://mihailmariusiondev.github.io",
  outDir: "./dist",
  build: { format: "directory" },
});
