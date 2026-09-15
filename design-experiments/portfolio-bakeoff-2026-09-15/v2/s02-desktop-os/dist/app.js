// Strata OS — vanilla ES module, no build step, no dependencies.
'use strict';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = () => matchMedia('(max-width: 760px)').matches;

/* ---------------------------------------------------------------- i18n */
const LANG_KEY = 'strata-lang';
let lang = localStorage.getItem(LANG_KEY) || (navigator.language.startsWith('es') ? 'es' : 'en');

function applyLang(l) {
  lang = l;
  document.documentElement.lang = l;
  localStorage.setItem(LANG_KEY, l);
  $$('.i18n-en').forEach(el => { el.hidden = l !== 'en'; });
  $$('.i18n-es').forEach(el => { el.hidden = l !== 'es'; });
  const btn = $('#btn-lang');
  if (btn) btn.textContent = l === 'en' ? 'ES' : 'EN';
  $('#btn-reader')?.setAttribute('aria-label', l === 'es' ? 'Lectura' : 'Reader');
  $('#btn-palette')?.setAttribute('aria-label', l === 'es' ? 'Paleta de comandos' : 'Command palette');
  const soundOn = localStorage.getItem(SOUND_KEY) === '1';
  $('#btn-sound')?.setAttribute('aria-label', soundOn ? (l === 'es' ? 'Sonido activado' : 'Sound on') : (l === 'es' ? 'Sonido apagado' : 'Sound off'));
  $$('.win-titlebar').forEach(bar => {
    const title = $('.i18n-en', bar)?.textContent || $('.win-title', bar)?.textContent || '';
    bar.setAttribute('aria-label', l === 'es'
      ? `${title}. Usa las flechas para mover la ventana y Mayús más flechas para redimensionarla.`
      : `${title}. Use arrow keys to move the window and Shift plus arrow keys to resize it.`);
  });
  $$('.win-max').forEach(btn => btn.setAttribute('aria-label', l === 'es' ? 'Maximizar ventana' : 'Maximize window'));
  $$('.win-close').forEach(btn => btn.setAttribute('aria-label', l === 'es' ? 'Cerrar ventana' : 'Close window'));
  buildPaletteItems();
}

/* ---------------------------------------------------------------- boot */
function boot() {
  const el = $('#boot');
  const fill = $('#boot-fill');
  const skipEn = $('#boot-skip');
  const skipEs = $('#boot-skip-es');
  const seen = sessionStorage.getItem('strata-booted');

  const finish = () => {
    sessionStorage.setItem('strata-booted', '1');
    el.classList.add('is-leaving');
    setTimeout(() => { el.hidden = true; }, reduced() ? 0 : 420);
  };

  if (isMobile()) {
    sessionStorage.setItem('strata-booted', '1');
    el.hidden = true;
    return;
  }
  if (seen || reduced()) { finish(); return; }

  requestAnimationFrame(() => { fill.style.width = '100%'; });
  const t = setTimeout(finish, 1500);
  [skipEn, skipEs].forEach(btn => btn.addEventListener('click', () => { clearTimeout(t); finish(); }));
}

/* ---------------------------------------------------------------- clock */
function tickClock() {
  const el = $('#clock');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString(lang === 'es' ? 'es-ES' : 'en-GB', { hour: '2-digit', minute: '2-digit' });
}

/* ---------------------------------------------------------------- window manager */
const windows = $$('.window');
let zTop = 10;
let focused = null;

function layoutDesktopBounds() {
  if (isMobile()) return;
  let maxRight = 0, maxBottom = 0;
  windows.forEach(w => {
    const x = +w.dataset.x, y = +w.dataset.y, ww = +w.dataset.w, wh = +w.dataset.h;
    w.style.left = x + 'px';
    w.style.top = y + 'px';
    w.style.width = ww + 'px';
    w.style.height = wh + 'px';
    maxRight = Math.max(maxRight, x + ww);
    maxBottom = Math.max(maxBottom, y + wh);
  });
  const desktop = $('.desktop');
  desktop.style.minWidth = (maxRight + 40) + 'px';
  desktop.style.minHeight = (maxBottom + 40) + 'px';
}

function focusWindow(win) {
  if (focused === win) return;
  windows.forEach(w => w.classList.remove('is-focused'));
  win.classList.add('is-focused');
  win.style.zIndex = ++zTop;
  focused = win;
}

function openApp(name, { fromDock = false } = {}) {
  const win = $(`.window[data-app="${name}"]`);
  if (!win) return;
  const wasHidden = win.hidden;
  win.hidden = false;
  if (!reduced() && wasHidden) {
    win.classList.add('is-opening');
    win.addEventListener('animationend', () => win.classList.remove('is-opening'), { once: true });
  }
  focusWindow(win);
  if (isMobile()) {
    windows.forEach(w => w.classList.toggle('is-fg', w === win));
    document.body.classList.add('has-open-app');
    const home = $('#dock-home');
    if (home) home.hidden = false;
  }
  updateDockState();
  const titlebar = $('.win-titlebar', win);
  if (fromDock) titlebar.focus?.();
  return win;
}

function closeApp(win) {
  win.hidden = true;
  win.classList.remove('is-max', 'is-fg');
  if (focused === win) focused = null;
  if (isMobile()) {
    document.body.classList.remove('has-open-app');
  }
  updateDockState();
}

function updateDockState() {
  $$('.dock-item[data-open]').forEach(btn => {
    const win = $(`.window[data-app="${btn.dataset.open}"]`);
    const open = win && !win.hidden;
    btn.classList.toggle('is-open', !!open);
    btn.classList.toggle('is-active', focused === win);
  });
}

function wireWindow(win) {
  const titlebar = $('.win-titlebar', win);
  const maxBtn = $('.win-max', win);
  const closeBtn = $('.win-close', win);

  win.addEventListener('pointerdown', () => focusWindow(win), true);

  closeBtn.addEventListener('click', () => closeApp(win));
  maxBtn.addEventListener('click', () => win.classList.toggle('is-max'));

  titlebar.tabIndex = 0;
  titlebar.addEventListener('keydown', (e) => {
    if (isMobile() || win.classList.contains('is-max') || !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    e.preventDefault();
    const step = e.altKey ? 64 : 16;
    const axis = e.key === 'ArrowLeft' || e.key === 'ArrowRight' ? 'x' : 'y';
    const direction = e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 1;
    if (e.shiftKey) {
      const property = axis === 'x' ? 'width' : 'height';
      const minimum = axis === 'x' ? 280 : 180;
      win.style[property] = `${Math.max(minimum, win[`offset${axis === 'x' ? 'Width' : 'Height'}`] + (direction * step))}px`;
    } else {
      const property = axis === 'x' ? 'left' : 'top';
      win.style[property] = `${Math.max(0, win[`offset${axis === 'x' ? 'Left' : 'Top'}`] + (direction * step))}px`;
    }
    const app = $('.win-title.i18n-en', win)?.textContent || $('.win-title', win)?.textContent || 'Window';
    $('#window-status').textContent = lang === 'es' ? `${app}: ventana actualizada.` : `${app}: window updated.`;
  });

  // drag
  let dragging = false, startX = 0, startY = 0, originX = 0, originY = 0;
  titlebar.addEventListener('pointerdown', (e) => {
    if (isMobile() || win.classList.contains('is-max')) return;
    if (e.target.closest('.win-btn')) return;
    dragging = true;
    win.classList.add('is-dragging');
    focusWindow(win);
    startX = e.clientX; startY = e.clientY;
    originX = win.offsetLeft; originY = win.offsetTop;
    titlebar.setPointerCapture(e.pointerId);
  });
  titlebar.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    win.style.left = Math.max(0, originX + (e.clientX - startX)) + 'px';
    win.style.top = Math.max(0, originY + (e.clientY - startY)) + 'px';
  });
  const endDrag = () => { dragging = false; win.classList.remove('is-dragging'); };
  titlebar.addEventListener('pointerup', endDrag);
  titlebar.addEventListener('pointercancel', endDrag);

  // resize
  const handle = document.createElement('div');
  handle.className = 'resize-handle';
  handle.setAttribute('aria-hidden', 'true');
  win.appendChild(handle);
  let resizing = false, rStartX = 0, rStartY = 0, rW = 0, rH = 0;
  handle.addEventListener('pointerdown', (e) => {
    if (isMobile() || win.classList.contains('is-max')) return;
    resizing = true;
    win.classList.add('is-resizing');
    focusWindow(win);
    rStartX = e.clientX; rStartY = e.clientY;
    rW = win.offsetWidth; rH = win.offsetHeight;
    handle.setPointerCapture(e.pointerId);
    e.stopPropagation();
  });
  handle.addEventListener('pointermove', (e) => {
    if (!resizing) return;
    win.style.width = Math.max(280, rW + (e.clientX - rStartX)) + 'px';
    win.style.height = Math.max(180, rH + (e.clientY - rStartY)) + 'px';
  });
  const endResize = () => { resizing = false; win.classList.remove('is-resizing'); };
  handle.addEventListener('pointerup', endResize);
  handle.addEventListener('pointercancel', endResize);
}

/* ---------------------------------------------------------------- dock + springboard */
function wireDock() {
  $$('.dock-item[data-open]').forEach(btn => {
    btn.addEventListener('click', () => openApp(btn.dataset.open, { fromDock: true }));
  });
  const home = $('#dock-home');
  home?.addEventListener('click', () => {
    windows.forEach(w => { w.hidden = true; w.classList.remove('is-fg'); });
    document.body.classList.remove('has-open-app');
    home.hidden = true;
    updateDockState();
  });
}

function buildSpringboard() {
  const board = $('#springboard');
  if (!board) return;
  board.innerHTML = '';
  $$('.dock-item[data-open]').forEach(btn => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'springboard-item';
    item.dataset.open = btn.dataset.open;
    item.innerHTML = `<span class="springboard-icon">${$('.icon', btn).outerHTML}</span>${$$('span:not(.icon)', btn).map(s => s.outerHTML).join('')}`;
    item.addEventListener('click', () => openApp(item.dataset.open, { fromDock: true }));
    board.appendChild(item);
  });
}

/* ---------------------------------------------------------------- reader mode */
const READER_KEY = 'strata-reader';
function buildReaderDoc() {
  const main = $('#main');
  if ($('#reader-doc')) return;
  const wrap = document.createElement('div');
  wrap.className = 'reader-doc';
  wrap.id = 'reader-doc';
  windows.forEach(win => {
    const section = document.createElement('section');
    section.className = 'reader-section';
    const title = $('.win-title.i18n-en', win)?.textContent || '';
    const titleEs = $('.win-title.i18n-es', win)?.textContent || '';
    const h2en = document.createElement('h2');
    h2en.className = 'i18n-en'; h2en.textContent = title;
    const h2es = document.createElement('h2');
    h2es.className = 'i18n-es'; h2es.hidden = true; h2es.textContent = titleEs;
    section.appendChild(h2en);
    section.appendChild(h2es);
    const body = $('.win-body', win).cloneNode(true);
    body.querySelectorAll('.resize-handle').forEach(n => n.remove());
    while (body.firstChild) section.appendChild(body.firstChild);
    wrap.appendChild(section);
  });
  main.appendChild(wrap);
}

function setReader(on) {
  document.body.classList.toggle('is-reader', on);
  localStorage.setItem(READER_KEY, on ? '1' : '0');
  $('#btn-reader')?.setAttribute('aria-pressed', String(on));
  if (on) buildReaderDoc();
  applyLang(lang);
}

/* ---------------------------------------------------------------- sound (opt-in, off by default) */
const SOUND_KEY = 'strata-sound';
let audioCtx = null;
function beep(freq = 660, dur = 0.05) {
  if (localStorage.getItem(SOUND_KEY) !== '1') return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + dur);
  } catch (_) { /* audio unavailable, silently skip */ }
}

function setSound(on) {
  localStorage.setItem(SOUND_KEY, on ? '1' : '0');
  const btn = $('#btn-sound');
  btn.setAttribute('aria-pressed', String(on));
  $('use', btn).setAttribute('href', on ? '#i-sound-on' : '#i-sound-off');
  $$('.i18n-en', btn).forEach(s => { s.textContent = on ? 'Sound on' : 'Sound off'; });
  $$('.i18n-es', btn).forEach(s => { s.textContent = on ? 'Sonido activado' : 'Sonido apagado'; });
  btn.setAttribute('aria-label', on ? (lang === 'es' ? 'Sonido activado' : 'Sound on') : (lang === 'es' ? 'Sonido apagado' : 'Sound off'));
}

/* ---------------------------------------------------------------- command palette */
const PALETTE_ACTIONS = () => [
  { id: 'about', en: 'Open About', es: 'Abrir Perfil', hint: '1', run: () => openApp('about') },
  { id: 'cases', en: 'Open Cases', es: 'Abrir Casos', hint: '2', run: () => openApp('cases') },
  { id: 'timeline', en: 'Open Timeline', es: 'Abrir Trayectoria', hint: '3', run: () => openApp('timeline') },
  { id: 'messages', en: 'Open Messages', es: 'Abrir Mensajes', hint: '4', run: () => openApp('messages') },
  { id: 'mail', en: 'Open Mail', es: 'Abrir Correo', hint: '5', run: () => openApp('mail') },
  { id: 'files', en: 'Open Files', es: 'Abrir Archivos', hint: '6', run: () => openApp('files') },
  { id: 'cv-en', en: 'Download CV (English)', es: 'Descargar CV (inglés)', hint: 'PDF', run: () => downloadEl('assets/marius-mihail-ion-cv.pdf') },
  { id: 'cv-es', en: 'Download CV (Spanish)', es: 'Descargar CV (español)', hint: 'PDF', run: () => downloadEl('assets/marius-mihail-ion-cv-es.pdf') },
  { id: 'copy-email', en: 'Copy email address', es: 'Copiar correo electrónico', hint: '↵', run: copyEmail },
  { id: 'lang', en: 'Switch to Español', es: 'Switch to English', hint: '', run: () => applyLang(lang === 'en' ? 'es' : 'en') },
  { id: 'reader', en: 'Toggle reader mode', es: 'Alternar modo lectura', hint: 'R', run: () => setReader(!document.body.classList.contains('is-reader')) },
  { id: 'linkedin', en: 'Open LinkedIn', es: 'Abrir LinkedIn', hint: '↗', run: () => window.open('https://linkedin.com/in/mariusdev', '_blank', 'noopener') },
  { id: 'github', en: 'Open GitHub', es: 'Abrir GitHub', hint: '↗', run: () => window.open('https://github.com/mihailmariusiondev', '_blank', 'noopener') },
];

function downloadEl(href) {
  const a = document.createElement('a');
  a.href = href; a.download = '';
  document.body.appendChild(a); a.click(); a.remove();
}

async function copyEmail() {
  try { await navigator.clipboard.writeText('mihailmariusion@gmail.com'); } catch (_) { /* clipboard unavailable */ }
}

let paletteIndex = 0;
function buildPaletteItems(filter = '') {
  const list = $('#palette-list');
  if (!list) return;
  list.innerHTML = '';
  const q = filter.trim().toLowerCase();
  PALETTE_ACTIONS().forEach((action, i) => {
    const label = lang === 'es' ? action.es : action.en;
    const li = document.createElement('li');
    li.role = 'option';
    li.dataset.index = i;
    li.innerHTML = `<span>${label}</span><span class="hint">${action.hint}</span>`;
    if (q && !label.toLowerCase().includes(q)) li.hidden = true;
    list.appendChild(li);
  });
  paletteIndex = 0;
  highlightPalette();
}

function visiblePaletteItems() {
  return $$('#palette-list li').filter(li => !li.hidden);
}

function highlightPalette() {
  const items = visiblePaletteItems();
  items.forEach((li, i) => li.classList.toggle('is-active', i === paletteIndex));
  items[paletteIndex]?.scrollIntoView({ block: 'nearest' });
}

function openPalette() {
  const el = $('#palette');
  el.hidden = false;
  const input = $('#palette-input');
  input.value = '';
  buildPaletteItems();
  input.focus();
}

function closePalette() {
  $('#palette').hidden = true;
}

function runPaletteItem(li) {
  if (!li) return;
  const action = PALETTE_ACTIONS()[+li.dataset.index];
  action?.run();
  closePalette();
}

function wirePalette() {
  $('#btn-palette').addEventListener('click', openPalette);
  $('#palette').addEventListener('click', (e) => { if (e.target.id === 'palette') closePalette(); });
  const input = $('#palette-input');
  input.addEventListener('input', () => { buildPaletteItems(input.value); });
  input.addEventListener('keydown', (e) => {
    const items = visiblePaletteItems();
    if (e.key === 'ArrowDown') { e.preventDefault(); paletteIndex = Math.min(paletteIndex + 1, items.length - 1); highlightPalette(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); paletteIndex = Math.max(paletteIndex - 1, 0); highlightPalette(); }
    else if (e.key === 'Enter') { e.preventDefault(); runPaletteItem(items[paletteIndex]); }
    else if (e.key === 'Escape') { closePalette(); }
  });
  $('#palette-list').addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (li) runPaletteItem(li);
  });
}

/* ---------------------------------------------------------------- keyboard shortcuts */
function wireKeyboard() {
  document.addEventListener('keydown', (e) => {
    const meta = e.metaKey || e.ctrlKey;
    if (meta && e.key.toLowerCase() === 'k') { e.preventDefault(); openPalette(); return; }
    if (e.key === 'Escape') {
      if (!$('#palette').hidden) { closePalette(); return; }
      if (focused && !isMobile()) { closeApp(focused); return; }
    }
    const active = document.activeElement;
    const typing = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA');
    if (typing) return;
    if (/^[1-6]$/.test(e.key)) {
      const action = PALETTE_ACTIONS().find(a => a.hint === e.key);
      action?.run();
    }
  });
}

/* ---------------------------------------------------------------- init */
function init() {
  applyLang(lang);
  boot();
  tickClock();
  setInterval(tickClock, 15000);

  windows.forEach(wireWindow);
  layoutDesktopBounds();
  window.addEventListener('resize', layoutDesktopBounds);

  wireDock();
  buildSpringboard();
  wirePalette();
  wireKeyboard();

  $('#btn-lang').addEventListener('click', () => applyLang(lang === 'en' ? 'es' : 'en'));
  $('#btn-reader').addEventListener('click', () => setReader(!document.body.classList.contains('is-reader')));
  $('#btn-sound').addEventListener('click', () => setSound(localStorage.getItem(SOUND_KEY) !== '1'));

  if (localStorage.getItem(READER_KEY) === '1') setReader(true);
  setSound(localStorage.getItem(SOUND_KEY) === '1');

  // open About by default on first paint (desktop only)
  if (!isMobile()) openApp('about');

  document.addEventListener('click', (e) => {
    if (e.target.closest('.win-btn, .dock-item, #palette-list li, .springboard-item')) beep(560, 0.04);
  });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
