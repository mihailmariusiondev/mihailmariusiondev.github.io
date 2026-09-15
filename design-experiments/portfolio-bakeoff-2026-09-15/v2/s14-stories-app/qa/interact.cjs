const puppeteer = require('/tmp/portfolio-design-bakeoff-20260914/_tools/node_modules/puppeteer-core');
const OUT = '/tmp/portfolio-design-bakeoff-20260914/v2/s14-stories-app/qa';
(async () => {
  const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', headless: 'new', timeout: 90000, args: ['--no-sandbox'] });
  const errs = [];
  const p = await b.newPage();
  await p.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  p.on('console', m => m.type() === 'error' && errs.push('console: ' + m.text()));
  p.on('pageerror', e => errs.push('pageerror: ' + e.message));
  await p.goto('http://127.0.0.1:4514/', { waitUntil: 'load', timeout: 90000 });
  await new Promise(r => setTimeout(r, 400));

  // open first story
  await p.click('.ring__open');
  await new Promise(r => setTimeout(r, 300));
  await p.screenshot({ path: `${OUT}/story-open.png` });

  // next slide via keyboard
  await p.keyboard.press('ArrowRight');
  await new Promise(r => setTimeout(r, 300));
  await p.screenshot({ path: `${OUT}/story-next.png` });

  // close via Escape
  await p.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 300));

  // roles tab
  await p.click('.tab[data-tab="roles"]');
  await new Promise(r => setTimeout(r, 300));
  await p.screenshot({ path: `${OUT}/roles.png` });

  // connect tab
  await p.click('.tab[data-tab="connect"]');
  await new Promise(r => setTimeout(r, 300));
  await p.screenshot({ path: `${OUT}/connect.png` });

  // lang toggle -> ES
  await p.click('#langToggle');
  await new Promise(r => setTimeout(r, 300));
  await p.screenshot({ path: `${OUT}/connect-es.png` });

  await p.close();

  // reduced motion page
  const p2 = await b.newPage();
  await p2.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await p2.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  p2.on('console', m => m.type() === 'error' && errs.push('console(reduced): ' + m.text()));
  await p2.goto('http://127.0.0.1:4514/', { waitUntil: 'load', timeout: 90000 });
  await p2.click('.ring__open');
  await new Promise(r => setTimeout(r, 300));
  await p2.screenshot({ path: `${OUT}/reduced-motion-story.png` });
  await p2.close();

  console.log(errs.length ? errs.join('\n') : 'console: clean');
  await b.close();
})();
