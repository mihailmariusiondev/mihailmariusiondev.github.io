const puppeteer = require("/tmp/portfolio-design-bakeoff-20260914/_tools/node_modules/puppeteer-core");
(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    headless: "new",
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://127.0.0.1:4401/", { waitUntil: "networkidle0" });
  const order = [];
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? `${el.tagName}#${el.id || ""}.${el.className}`.slice(0, 90) + " :: " + (el.textContent||"").trim().slice(0,40) : "none";
    });
    order.push(info);
  }
  console.log(order.join("\n"));
  await browser.close();
})();
