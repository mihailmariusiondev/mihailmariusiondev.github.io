const puppeteer = require('/tmp/portfolio-design-bakeoff-20260914/_tools/node_modules/puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: 'new',
    timeout: 90000,
    args: ['--no-sandbox']
  });
  const errors = [];
  try {
    const page = await browser.newPage();
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
    page.on('pageerror', err => errors.push(String(err)));
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://127.0.0.1:4512/', { waitUntil: 'networkidle0' });

    // scroll to patches and click first patch
    await page.evaluate(() => document.getElementById('patches').scrollIntoView());
    await new Promise(r => setTimeout(r, 200));
    await page.click('.patch');
    await new Promise(r => setTimeout(r, 200));
    await page.screenshot({ path: path.resolve(__dirname, 'desktop-patch.png') });

    // close, switch to ES
    await page.click('#patchClose');
    await page.click('#langToggle');
    await page.evaluate(() => window.scrollTo(0,0));
    await new Promise(r => setTimeout(r, 200));
    await page.screenshot({ path: path.resolve(__dirname, 'desktop-es.png') });

    // params/scope/output sections
    await page.evaluate(() => document.getElementById('params').scrollIntoView({ behavior: 'auto' }));
    await new Promise(r => setTimeout(r, 150));
    await page.screenshot({ path: path.resolve(__dirname, 'desktop-params.png') });

    await page.evaluate(() => document.getElementById('output').scrollIntoView({ behavior: 'auto' }));
    await new Promise(r => setTimeout(r, 150));
    await page.screenshot({ path: path.resolve(__dirname, 'desktop-output.png') });

    // reduced motion
    const page2 = await browser.newPage();
    const errors2 = [];
    page2.on('console', msg => { if (msg.type() === 'error') errors2.push(msg.text()); });
    await page2.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page2.setViewport({ width: 1440, height: 900 });
    await page2.goto('http://127.0.0.1:4512/', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 200));
    await page2.screenshot({ path: path.resolve(__dirname, 'desktop-reduced-motion.png') });

    // keyboard test: press '1' then Enter/Escape
    await page2.keyboard.press('1');
    await new Promise(r => setTimeout(r, 150));
    await page2.screenshot({ path: path.resolve(__dirname, 'desktop-keyboard-track1.png') });

    console.log('errors page1:', errors);
    console.log('errors page2:', errors2);
  } finally {
    await browser.close();
  }
})();
