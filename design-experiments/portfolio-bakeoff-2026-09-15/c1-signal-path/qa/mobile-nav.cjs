const puppeteer = require("/tmp/portfolio-design-bakeoff-20260914/_tools/node_modules/puppeteer-core");
(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    headless: "new",
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:4401/", { waitUntil: "networkidle0" });
  await page.screenshot({ path: "mobile-nav-viewport.png" }); // not fullPage: real fixed positioning
  await page.focus(".langswitch");
  await page.screenshot({ path: "mobile-focus.png" });
  await browser.close();
})();
