const puppeteer = require("/tmp/portfolio-design-bakeoff-20260914/_tools/node_modules/puppeteer-core");

async function main() {
  const [, , url, outPath, widthStr, heightStr, extraArg] = process.argv;
  const width = parseInt(widthStr, 10) || 1440;
  const height = parseInt(heightStr, 10) || 900;
  const reducedMotion = extraArg === "reduced";
  const lang = extraArg === "es" ? "es" : null;

  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage", `--window-size=${width},${height}`],
  });
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(String(err)));
  await page.setViewport({ width, height });
  if (reducedMotion) {
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  }
  await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

  if (lang === "es") {
    await page.click("#lang-toggle");
    await new Promise((r) => setTimeout(r, 600));
  }

  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: outPath, fullPage: false });
  console.log("Console errors:", JSON.stringify(consoleErrors));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
