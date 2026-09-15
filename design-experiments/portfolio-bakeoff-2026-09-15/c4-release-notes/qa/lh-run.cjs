// ponytail: lighthouse's own chrome-launcher hits CHROME_INTERSTITIAL_ERROR in
// this sandbox (environment-level, reproduced with fresh profiles too). Reuse
// the puppeteer-core browser that already works and drive Lighthouse's node
// API against its remote-debugging port instead of spawning a second Chrome.
const puppeteer = require("/tmp/portfolio-design-bakeoff-20260914/_tools/node_modules/puppeteer-core");
const lighthouse = require("/tmp/portfolio-design-bakeoff-20260914/_tools/node_modules/lighthouse/core/index.js").default;
const fs = require("fs");

const url = process.argv[2];
const out = process.argv[3];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    headless: "new",
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--remote-debugging-port=9222"],
  });
  const { port } = new URL(browser.wsEndpoint());
  const result = await lighthouse(url, {
    port: 9222,
    output: "json",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    formFactor: "mobile",
    screenEmulation: { mobile: true, width: 390, height: 844, deviceScaleFactor: 2 },
  });
  fs.writeFileSync(out, result.report);
  await browser.close();
})();
