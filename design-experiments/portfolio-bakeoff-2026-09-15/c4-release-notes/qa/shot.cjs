// ponytail: puppeteer-core fallback since agent-browser can't launch Chrome in
// this sandbox (no X server). Minimal one-off screenshot/console/error script.
const puppeteer = require("/tmp/portfolio-design-bakeoff-20260914/_tools/node_modules/puppeteer-core");

const BASE = "http://127.0.0.1:4404";

const jobs = [
  { url: "/", viewport: [1440, 900], out: "home-desktop.png" },
  { url: "/", viewport: [390, 844], out: "home-mobile.png" },
  { url: "/es/", viewport: [1440, 900], out: "es-home-desktop.png" },
  { url: "/es/", viewport: [390, 844], out: "es-home-mobile.png" },
  {
    url: "/case-studies/realtime-shopping-assistant/",
    viewport: [1440, 900],
    out: "case-desktop.png",
  },
  {
    url: "/case-studies/realtime-shopping-assistant/",
    viewport: [390, 844],
    out: "case-mobile.png",
  },
  { url: "/experience/", viewport: [1440, 900], out: "experience-desktop.png" },
  { url: "/experience/", viewport: [390, 844], out: "experience-mobile.png" },
  { url: "/contact/", viewport: [1440, 900], out: "contact-desktop.png" },
  { url: "/contact/", viewport: [390, 844], out: "contact-mobile.png" },
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    headless: "new",
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  const consoleErrors = [];
  const pageErrors = [];

  for (const job of jobs) {
    const page = await browser.newPage();
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(`${job.url}: ${msg.text()}`);
    });
    page.on("pageerror", (err) => pageErrors.push(`${job.url}: ${err.message}`));
    await page.setViewport({ width: job.viewport[0], height: job.viewport[1] });
    await page.goto(BASE + job.url, { waitUntil: "networkidle0" });
    await page.screenshot({
      path: `/tmp/portfolio-design-bakeoff-20260914/c4-release-notes/qa/${job.out}`,
      fullPage: true,
    });
    await page.close();
  }

  // dark mode + reduced motion of home, desktop
  {
    const page = await browser.newPage();
    await page.emulateMediaFeatures([
      { name: "prefers-color-scheme", value: "dark" },
    ]);
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(BASE + "/", { waitUntil: "networkidle0" });
    await page.screenshot({
      path: "/tmp/portfolio-design-bakeoff-20260914/c4-release-notes/qa/home-dark.png",
      fullPage: true,
    });
    await page.close();
  }
  {
    const page = await browser.newPage();
    await page.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(BASE + "/", { waitUntil: "networkidle0" });
    await page.screenshot({
      path: "/tmp/portfolio-design-bakeoff-20260914/c4-release-notes/qa/home-reduced-motion.png",
      fullPage: true,
    });
    await page.close();
  }
  // flag toggled off, to prove the CSS-only reveal actually works
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(BASE + "/", { waitUntil: "networkidle0" });
    await page.click('label[for="rollout-flag"]');
    await new Promise((r) => setTimeout(r, 500));
    await page.screenshot({
      path: "/tmp/portfolio-design-bakeoff-20260914/c4-release-notes/qa/home-flag-off.png",
      fullPage: false,
    });
    await page.close();
  }

  console.log("CONSOLE_ERRORS", JSON.stringify(consoleErrors));
  console.log("PAGE_ERRORS", JSON.stringify(pageErrors));

  await browser.close();
})();
