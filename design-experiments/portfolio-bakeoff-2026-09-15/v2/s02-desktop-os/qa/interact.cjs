const puppeteer = require('/tmp/portfolio-design-bakeoff-20260914/_tools/node_modules/puppeteer-core');

const OUT = '/tmp/portfolio-design-bakeoff-20260914/v2/s02-desktop-os/qa';
const URL = 'http://127.0.0.1:4422/';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: 'new',
    timeout: 90000,
    args: ['--no-sandbox'],
  });
  const errors = [];
  const newPage = async () => {
    const ctx = await browser.createBrowserContext();
    return ctx.newPage();
  };
  try {
    // 1. desktop ES + palette open
    let page = await newPage();
    page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
    page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(URL, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => document.getElementById('boot').hidden === true, { timeout: 4000 }).catch(()=>{});
    await page.waitForSelector('#boot[hidden]', { timeout: 5000 }).catch(() => {});
    await page.click('#btn-lang');
    await page.screenshot({ path: `${OUT}/es-desktop.png` });

    await page.keyboard.down('Control'); await page.keyboard.press('k'); await page.keyboard.up('Control');
    await page.waitForSelector('#palette:not([hidden])', { timeout: 2000 });
    await page.type('#palette-input', 'CV');
    await page.screenshot({ path: `${OUT}/palette.png` });
    await page.keyboard.press('Escape');
    await page.close();

    // 2. reduced motion
    page = await newPage();
    page.on('console', (m) => { if (m.type() === 'error') errors.push('console(reduced): ' + m.text()); });
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(URL, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => document.getElementById('boot').hidden === true, { timeout: 4000 }).catch(()=>{});
    await page.screenshot({ path: `${OUT}/reduced-motion.png` });
    await page.close();

    // 3. reader mode
    page = await newPage();
    page.on('console', (m) => { if (m.type() === 'error') errors.push('console(reader): ' + m.text()); });
    await page.setViewport({ width: 1440, height: 1200 });
    await page.goto(URL, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => document.getElementById('boot').hidden === true, { timeout: 4000 }).catch(()=>{});
    await page.click('#btn-reader');
    await new Promise(r=>setTimeout(r,200));
    await page.screenshot({ path: `${OUT}/reader.png`, fullPage: false });
    await page.close();

    // 4. mobile: open About app fullscreen
    page = await newPage();
    page.on('console', (m) => { if (m.type() === 'error') errors.push('console(mobile-app): ' + m.text()); });
    await page.setViewport({ width: 390, height: 844 });
    await page.goto(URL, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => document.getElementById('boot').hidden === true, { timeout: 4000 }).catch(()=>{});
    await page.waitForSelector('.springboard-item[data-open="cases"]', { visible: true, timeout: 4000 });
    await page.click('.springboard-item[data-open="cases"]');
    await new Promise(r=>setTimeout(r,200));
    await page.screenshot({ path: `${OUT}/mobile-app.png` });
    await page.close();

    // 5. desktop: drag a window and check keyboard focus ring
    page = await newPage();
    page.on('console', (m) => { if (m.type() === 'error') errors.push('console(drag): ' + m.text()); });
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(URL, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => document.getElementById('boot').hidden === true, { timeout: 4000 }).catch(()=>{});
    const handle = await page.$('#win-about .win-titlebar');
    const box = await handle.boundingBox();
    await page.mouse.move(box.x + 50, box.y + 10);
    await page.mouse.down();
    await page.mouse.move(box.x + 250, box.y + 150, { steps: 10 });
    await page.mouse.up();
    await page.keyboard.press('Tab');
    await page.screenshot({ path: `${OUT}/drag.png` });
    await page.close();
  } finally {
    await browser.close();
  }
  console.log('errors:', errors.length ? errors.join('\n') : 'none');
}

run().catch((e) => { console.error(e); process.exit(1); });
