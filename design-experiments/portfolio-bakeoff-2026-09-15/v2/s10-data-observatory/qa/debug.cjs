const puppeteer = require('/tmp/portfolio-design-bakeoff-20260914/_tools/node_modules/puppeteer-core');
(async () => {
  const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', headless: 'new', timeout: 90000 });
  const page = await browser.newPage();
  page.on('console', m => console.log('PAGE LOG:', m.text()));
  page.on('pageerror', e => console.log('PAGE ERROR:', e));
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:4510/', { waitUntil: 'networkidle0', timeout: 60000 });
  const info = await page.evaluate(() => {
    const sections = [...document.querySelectorAll('section')].map(s => ({id: s.id, h: s.offsetHeight, top: s.offsetTop}));
    const revealCount = document.querySelectorAll('.reveal').length;
    const visibleCount = document.querySelectorAll('.reveal.is-visible').length;
    return { bodyHeight: document.body.scrollHeight, sections, revealCount, visibleCount };
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
