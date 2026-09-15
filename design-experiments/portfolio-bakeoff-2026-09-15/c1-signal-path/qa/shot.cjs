// One-off QA screenshot/console/error capture, puppeteer-core fallback since
// agent-browser cannot launch headless in this container (missing $DISPLAY).
const puppeteer = require("/tmp/portfolio-design-bakeoff-20260914/_tools/node_modules/puppeteer-core");

const BASE = "http://127.0.0.1:4401";

const jobs = [
  { url: "/", file: "home-desktop.png", vp: [1440, 900] },
  { url: "/", file: "home-mobile.png", vp: [390, 844] },
  { url: "/es/", file: "es-home-desktop.png", vp: [1440, 900] },
  { url: "/es/", file: "es-home-mobile.png", vp: [390, 844] },
  {
    url: "/case-studies/realtime-shopping-assistant/",
    file: "case-desktop.png",
    vp: [1440, 900],
  },
  {
    url: "/case-studies/realtime-shopping-assistant/",
    file: "case-mobile.png",
    vp: [390, 844],
  },
  { url: "/experience/", file: "experience-desktop.png", vp: [1440, 900] },
  { url: "/experience/", file: "experience-mobile.png", vp: [390, 844] },
  { url: "/contact/", file: "contact-desktop.png", vp: [1440, 900] },
  { url: "/contact/", file: "contact-mobile.png", vp: [390, 844] },
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
      if (msg.type() === "error") {
        consoleErrors.push(`${job.url} :: ${msg.text()}`);
      }
    });
    page.on("pageerror", (err) => {
      pageErrors.push(`${job.url} :: ${err.message}`);
    });
    await page.setViewport({ width: job.vp[0], height: job.vp[1] });
    await page.goto(BASE + job.url, { waitUntil: "networkidle0" });
    await page.screenshot({
      path: `/tmp/portfolio-design-bakeoff-20260914/c1-signal-path/qa/${job.file}`,
      fullPage: true,
    });
    await page.close();
  }

  // Dark mode + reduced motion of home, desktop.
  {
    const page = await browser.newPage();
    await page.emulateMediaFeatures([
      { name: "prefers-color-scheme", value: "dark" },
    ]);
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(BASE + "/", { waitUntil: "networkidle0" });
    await page.screenshot({
      path: "/tmp/portfolio-design-bakeoff-20260914/c1-signal-path/qa/home-dark.png",
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
      path: "/tmp/portfolio-design-bakeoff-20260914/c1-signal-path/qa/home-reduced-motion.png",
      fullPage: true,
    });
    await page.close();
  }

  await browser.close();

  console.log("CONSOLE_ERRORS", JSON.stringify(consoleErrors));
  console.log("PAGE_ERRORS", JSON.stringify(pageErrors));
})();
