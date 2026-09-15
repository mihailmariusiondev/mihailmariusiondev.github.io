const puppeteer = require('/tmp/portfolio-design-bakeoff-20260914/_tools/node_modules/puppeteer-core');
(async () => {
  const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', headless: 'new', timeout: 90000 });
  const page = await browser.newPage();
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push(String(e)));
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:4510/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.querySelector('#case-list details summary').click());
  await new Promise(r => setTimeout(r, 300));
  const opened = await page.evaluate(() => document.querySelector('#case-list details').open);
  await page.evaluate(() => document.querySelector('#case-list summary').scrollIntoView());
  await page.screenshot({ path: 'qa/case-expanded.png' });
  console.log('case open:', opened, 'errors:', errors);
  await browser.close();
})();
