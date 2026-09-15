const puppeteer = require("/tmp/portfolio-design-bakeoff-20260914/_tools/node_modules/puppeteer-core");
(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    headless: "new",
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://127.0.0.1:4402/", { waitUntil: "networkidle0" });
  // click Outcomes label
  await page.click('label[for="state-outcomes"]');
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: "qa/home-desktop-outcomes-state.png", clip: { x: 0, y: 60, width: 1440, height: 600 } });
  await page.click('label[for="state-contact"]');
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: "qa/home-desktop-contact-state.png", clip: { x: 0, y: 60, width: 1440, height: 600 } });

  // Tab through: focus body then tab a bunch, check skip link + focus visibility
  await page.keyboard.press("Tab");
  const active1 = await page.evaluate(() => document.activeElement.outerHTML.slice(0, 120));
  console.log("First tab stop:", active1);

  await browser.close();
})();
