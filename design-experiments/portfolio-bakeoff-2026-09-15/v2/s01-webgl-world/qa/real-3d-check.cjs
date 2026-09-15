// Verifies the actual WebGL scene mounts (not the fallback) once a browser exposes a working
// GL backend. Headless Chrome's default swiftshader flags leave WebGL unavailable in this
// machine's Chrome build; adding --use-angle=swiftshader (ANGLE) is what real browsers do
// internally, so this is the accurate check for "does the 3D path work", not a site bug.
const puppeteer = require('/tmp/portfolio-design-bakeoff-20260914/_tools/node_modules/puppeteer-core');
(async () => {
  const [url, out] = process.argv.slice(2);
  const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', headless: 'new', timeout: 90000, args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });
  const errs = [];
  for (const [name, vp] of [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }]]) {
    const p = await b.newPage(); await p.setViewport(vp);
    p.on('console', m => m.type() === 'error' && errs.push(`${name}: ${m.text()}`));
    p.on('pageerror', e => errs.push(`${name} pageerror: ${e.message}`));
    await p.goto(url, { waitUntil: 'load', timeout: 90000 }).catch(e => errs.push(`${name} goto: ${e.message}`));
    await new Promise(r => setTimeout(r, 3000));
    const active = await p.evaluate(() => !!document.getElementById('scene') && !document.getElementById('fallback-bg').classList.contains('active'));
    errs.push(`${name} webgl-scene-active: ${active}`);
    await p.screenshot({ path: `${out}-${name}.png` }); await p.close();
  }
  console.log(errs.join('\n')); await b.close();
})();
