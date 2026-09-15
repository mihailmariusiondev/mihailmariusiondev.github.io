// QA screenshot/console/errors helper (agent-browser fallback: it failed to
// launch headless — "Missing X server or $DISPLAY" even with headed:false in
// config — so this uses puppeteer-core against system Chrome, as the brief
// allows).
const puppeteer = require("/tmp/portfolio-design-bakeoff-20260914/_tools/node_modules/puppeteer-core");

const BASE = "http://127.0.0.1:4402";

const jobs = [
  { path: "/", out: "home-desktop.png", vp: { width: 1440, height: 900 } },
  { path: "/", out: "home-mobile.png", vp: { width: 390, height: 844 } },
  { path: "/es/", out: "home-es-desktop.png", vp: { width: 1440, height: 900 } },
  {
    path: "/case-studies/realtime-shopping-assistant/",
    out: "case-desktop.png",
    vp: { width: 1440, height: 900 },
  },
  {
    path: "/case-studies/realtime-shopping-assistant/",
    out: "case-mobile.png",
    vp: { width: 390, height: 844 },
  },
  { path: "/experience/", out: "experience-desktop.png", vp: { width: 1440, height: 900 } },
  { path: "/contact/", out: "contact-desktop.png", vp: { width: 1440, height: 900 } },
  { path: "/contact/", out: "contact-mobile.png", vp: { width: 390, height: 844 } },
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    headless: "new",
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  const allConsole = [];
  const allErrors = [];

  for (const job of jobs) {
    const page = await browser.newPage();
    page.on("console", (msg) => allConsole.push(`[${job.path}] ${msg.type()}: ${msg.text()}`));
    page.on("pageerror", (err) => allErrors.push(`[${job.path}] ${err.message}`));
    await page.setViewport(job.vp);
    if (job.darkMode) await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "dark" }]);
    if (job.reducedMotion) await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await page.goto(BASE + job.path, { waitUntil: "networkidle0" });
    await page.screenshot({ path: `/tmp/portfolio-design-bakeoff-20260914/c2-component-specimen/qa/${job.out}`, fullPage: true });
    await page.close();
  }

  // dark mode + reduced motion of home
  for (const extra of [
    { path: "/", out: "home-dark.png", vp: { width: 1440, height: 900 }, darkMode: true },
    { path: "/", out: "home-reduced-motion.png", vp: { width: 1440, height: 900 }, reducedMotion: true },
  ]) {
    const page = await browser.newPage();
    await page.setViewport(extra.vp);
    if (extra.darkMode) await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "dark" }]);
    if (extra.reducedMotion) await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await page.goto(BASE + extra.path, { waitUntil: "networkidle0" });
    await page.screenshot({ path: `/tmp/portfolio-design-bakeoff-20260914/c2-component-specimen/qa/${extra.out}`, fullPage: true });
    await page.close();
  }

  console.log("CONSOLE:", JSON.stringify(allConsole, null, 2));
  console.log("ERRORS:", JSON.stringify(allErrors, null, 2));

  await browser.close();
})();
