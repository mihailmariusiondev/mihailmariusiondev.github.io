const puppeteer = require('/tmp/portfolio-design-bakeoff-20260914/_tools/node_modules/puppeteer-core');
(async () => {
  const url = process.argv[2];
  const outPrefix = process.argv[3];
  const opts = JSON.parse(process.argv[4] || '{}');
  const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', headless: 'new', timeout: 90000 });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
    page.on('pageerror', (err) => errors.push(String(err)));
    if (opts.reducedMotion) await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.setViewport(opts.viewport || { width: 1440, height: 900 });
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
    if (opts.clickLang) {
      await page.click('#lang-toggle');
      await new Promise(r => setTimeout(r, 300));
    }
    if (opts.scrollTo) {
      await page.evaluate((sel) => { document.querySelector(sel)?.scrollIntoView(); }, opts.scrollTo);
      await new Promise(r => setTimeout(r, 1200));
    }
    await page.screenshot({ path: outPrefix + '.png', fullPage: !!opts.fullPage });
    console.log('console errors:', errors.length ? errors : 'none');
  } finally {
    await browser.close();
  }
})();
