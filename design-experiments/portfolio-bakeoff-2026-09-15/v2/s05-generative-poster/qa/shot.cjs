const puppeteer = require("/tmp/portfolio-design-bakeoff-20260914/_tools/node_modules/puppeteer-core");

async function main() {
  const [,, url, outPath, widthS, heightS, opts] = process.argv;
  const width = parseInt(widthS, 10) || 1440;
  const height = parseInt(heightS, 10) || 900;
  const o = opts ? JSON.parse(opts) : {};

  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    headless: "new",
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--window-size=" + width + "," + height],
    timeout: 100000,
    protocolTimeout: 100000,
  });
  const page = await browser.newPage();
  const consoleMsgs = [];
  page.on("console", (m) => consoleMsgs.push(m.type() + ": " + m.text()));
  page.on("pageerror", (e) => consoleMsgs.push("pageerror: " + e.message));
  if (o.reduceMotion) {
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  }
  await page.setViewport({ width, height });
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  if (o.lang === "es") {
    await page.click("#langToggle");
    await new Promise((r) => setTimeout(r, 300));
  }
  if (o.scrollTo) {
    await page.evaluate((sel) => {
      document.querySelector(sel).scrollIntoView();
    }, o.scrollTo);
    await new Promise((r) => setTimeout(r, 500));
  }
  await new Promise((r) => setTimeout(r, o.wait || 700));
  await page.screenshot({ path: outPath, fullPage: !!o.fullPage });
  console.log("CONSOLE:", JSON.stringify(consoleMsgs));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
