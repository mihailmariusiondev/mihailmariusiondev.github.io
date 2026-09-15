const puppeteer = require('/tmp/portfolio-design-bakeoff-20260914/_tools/node_modules/puppeteer-core');

async function main() {
  const url = process.argv[2];
  const outPrefix = process.argv[3];
  const mode = process.argv[4] || 'desktop'; // desktop | mobile
  const opts = { headless: 'new', executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] };
  let browser;
  try {
    browser = await puppeteer.launch(opts);
  } catch (e) {
    console.error('launch failed, retrying once', e.message);
    browser = await puppeteer.launch(opts);
  }
  const page = await browser.newPage();
  const errors = [];
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));

  if (mode === 'mobile') {
    await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
  } else {
    await page.setViewport({ width: 1440, height: 900 });
  }

  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 500));

  // scroll via real wheel events (not window.scrollTo) so Lenis's virtual
  // scroll position and GSAP ScrollTrigger stay in sync with what's on screen
  const steps = 14;
  let prevY = -1;
  for (let i = 0; i <= steps; i++) {
    for (let w = 0; w < 5; w++) {
      await page.mouse.wheel({ deltaY: 400 });
      await new Promise((r) => setTimeout(r, 25));
    }
    await new Promise((r) => setTimeout(r, 700));
    const y = await page.evaluate(() => window.scrollY);
    await page.screenshot({ path: `${outPrefix}-${mode}-${String(i).padStart(2, '0')}.png` });
    if (y === prevY) break; // reached bottom
    prevY = y;
  }

  console.log('console errors:', errors.length ? errors : 'none');
  await browser.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
