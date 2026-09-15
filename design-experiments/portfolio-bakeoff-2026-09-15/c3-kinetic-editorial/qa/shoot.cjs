const puppeteer = require("/tmp/portfolio-design-bakeoff-20260914/_tools/node_modules/puppeteer-core");

const BASE = "http://127.0.0.1:4403";

const jobs = [
  { path: "/", out: "home-desktop.png", vp: { width: 1440, height: 900 } },
  { path: "/", out: "home-mobile.png", vp: { width: 390, height: 844 } },
  { path: "/es/", out: "home-es-desktop.png", vp: { width: 1440, height: 900 } },
  { path: "/es/", out: "home-es-mobile.png", vp: { width: 390, height: 844 } },
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
  { path: "/experience/", out: "experience-mobile.png", vp: { width: 390, height: 844 } },
  { path: "/contact/", out: "contact-desktop.png", vp: { width: 1440, height: 900 } },
  { path: "/contact/", out: "contact-mobile.png", vp: { width: 390, height: 844 } },
  { path: "/case-studies/", out: "case-index-desktop.png", vp: { width: 1440, height: 900 } },
];

async function shoot(browser, path, out, vp, mediaFeatures, consoleErrors) {
  const page = await browser.newPage();
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(`${path}: ${msg.text()}`);
  });
  page.on("pageerror", (err) => consoleErrors.push(`${path} pageerror: ${err.message}`));
  try {
    if (mediaFeatures) await page.emulateMediaFeatures(mediaFeatures);
    await page.setViewport(vp);
    await page.goto(BASE + path, { waitUntil: "load", timeout: 15000 });
    await page.screenshot({
      path: `/tmp/portfolio-design-bakeoff-20260914/c3-kinetic-editorial/qa/${out}`,
      fullPage: true,
    });
  } finally {
    await page.close();
  }
}

async function main() {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const consoleErrors = [];
  try {
    for (const job of jobs) {
      await shoot(browser, job.path, job.out, job.vp, undefined, consoleErrors);
    }
    await shoot(
      browser,
      "/",
      "home-dark.png",
      { width: 1440, height: 900 },
      [{ name: "prefers-color-scheme", value: "dark" }],
      consoleErrors,
    );
    await shoot(
      browser,
      "/",
      "home-reduced-motion.png",
      { width: 1440, height: 900 },
      [{ name: "prefers-reduced-motion", value: "reduce" }],
      consoleErrors,
    );
  } finally {
    await browser.close();
  }
  console.log("CONSOLE_ERRORS:", JSON.stringify(consoleErrors));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
