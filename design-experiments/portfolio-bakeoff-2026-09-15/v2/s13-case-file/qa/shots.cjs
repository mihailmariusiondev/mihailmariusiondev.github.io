const puppeteer = require('/tmp/portfolio-design-bakeoff-20260914/_tools/node_modules/puppeteer-core');
(async () => {
  const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', headless: 'new', timeout: 90000, args: ['--no-sandbox'] });
  const errs = [];
  const url = 'http://127.0.0.1:4513/';
  const out = '/tmp/portfolio-design-bakeoff-20260914/v2/s13-case-file/qa';

  // full page desktop
  let p = await b.newPage(); await p.setViewport({ width: 1440, height: 900 });
  p.on('console', m => m.type() === 'error' && errs.push('desktop: ' + m.text()));
  await p.goto(url, { waitUntil: 'load', timeout: 90000 });
  await new Promise(r => setTimeout(r, 1200));
  await p.screenshot({ path: out + '/desktop-full.png', fullPage: true });

  // open a folder
  await p.click('.folder-tab');
  await new Promise(r => setTimeout(r, 800));
  await p.screenshot({ path: out + '/case-open.png' });

  // ES toggle
  await p.click('#langToggle');
  await new Promise(r => setTimeout(r, 500));
  await p.screenshot({ path: out + '/desktop-es.png' });
  await p.close();

  // mobile full page
  p = await b.newPage(); await p.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  p.on('console', m => m.type() === 'error' && errs.push('mobile: ' + m.text()));
  await p.goto(url, { waitUntil: 'load', timeout: 90000 });
  await new Promise(r => setTimeout(r, 1200));
  await p.screenshot({ path: out + '/mobile-full.png', fullPage: true });
  await p.close();

  // reduced motion
  p = await b.newPage();
  await p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await p.setViewport({ width: 1440, height: 900 });
  p.on('console', m => m.type() === 'error' && errs.push('reduced: ' + m.text()));
  await p.goto(url, { waitUntil: 'load', timeout: 90000 });
  await new Promise(r => setTimeout(r, 800));
  await p.screenshot({ path: out + '/reduced-motion.png' });
  await p.close();

  console.log(errs.length ? errs.join('\n') : 'console: clean');
  await b.close();
})();
