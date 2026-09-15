const puppeteer = require('/tmp/portfolio-design-bakeoff-20260914/_tools/node_modules/puppeteer-core');

async function run(url, outPrefix, { reducedMotion = false, clickLang = false } = {}) {
  const browser = await puppeteer.launch({ headless: 'new', executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.setViewport({ width: 1440, height: 900 });
  if (reducedMotion) await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 500));
  if (clickLang) {
    await page.click('#lang-toggle');
    await new Promise((r) => setTimeout(r, 300));
  }
  await page.screenshot({ path: `${outPrefix}-top.png` });
  for (let i = 0; i < 3; i++) {
    for (let w = 0; w < 8; w++) { await page.mouse.wheel({ deltaY: 400 }); await new Promise((r) => setTimeout(r, 25)); }
    await new Promise((r) => setTimeout(r, 500));
  }
  await page.screenshot({ path: `${outPrefix}-mid.png` });
  for (let i = 0; i < 6; i++) {
    for (let w = 0; w < 8; w++) { await page.mouse.wheel({ deltaY: 400 }); await new Promise((r) => setTimeout(r, 25)); }
    await new Promise((r) => setTimeout(r, 500));
  }
  await page.screenshot({ path: `${outPrefix}-end.png` });
  console.log(outPrefix, 'console errors:', errors.length ? errors : 'none');
  await browser.close();
}

(async () => {
  const url = process.argv[2];
  const outDir = process.argv[3];
  await run(url, `${outDir}/es`, { clickLang: true });
  await run(url, `${outDir}/reduced`, { reducedMotion: true });
})();
