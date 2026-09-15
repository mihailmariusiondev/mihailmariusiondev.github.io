const puppeteer = require('/tmp/portfolio-design-bakeoff-20260914/_tools/node_modules/puppeteer-core');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new', executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:4503/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 500));
  await page.evaluate(() => document.querySelector('.case-open-btn').click());
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: '/tmp/portfolio-design-bakeoff-20260914/v2/s03-scroll-cinema/qa/case-dialog.png' });
  // keyboard: Escape should close
  await page.keyboard.press('Escape');
  await new Promise((r) => setTimeout(r, 300));
  const open = await page.evaluate(() => document.getElementById('case-dialog').open);
  console.log('dialog open after Escape:', open);
  console.log('console errors:', errors.length ? errors : 'none');
  await browser.close();
})();
