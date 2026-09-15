import { Engine, World, Bodies, Body, Constraint, Runner, Events } from "matter-js";

const html = document.documentElement;
const reduceMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

// ---------------------------------------------------------------- language
const LANG_KEY = "lang";
function setLang(lang) {
  html.lang = lang;
  html.dataset.lang = lang;
  document.title = lang === "es"
    ? document.title // title stays as authored; OK for a single-page toggle
    : document.title;
  localStorage.setItem(LANG_KEY, lang);
  document.querySelectorAll("#lang-toggle, #lang-toggle-2").forEach((b) => {
    b.textContent = lang === "en" ? "ES" : "EN";
  });
}
const savedLang = localStorage.getItem(LANG_KEY) || (navigator.language || "en").slice(0, 2);
setLang(savedLang === "es" ? "es" : "en");
document.querySelectorAll("#lang-toggle, #lang-toggle-2").forEach((b) => {
  b.addEventListener("click", () => setLang(html.dataset.lang === "en" ? "es" : "en"));
});

// ---------------------------------------------------------------- case study dialogs
document.querySelectorAll("[data-open-dialog]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const dlg = document.getElementById(btn.dataset.openDialog);
    if (dlg) dlg.showModal();
  });
});

// ---------------------------------------------------------------- compression demo
const compressor = document.querySelector("[data-compressor]");
const compressorBlock = document.querySelector("[data-compressor-block]");
const compressorResult = document.querySelector("[data-compressor-result]");
const compressorReplay = document.querySelector("[data-compressor-replay]");
const BEFORE_LABEL = compressorBlock?.textContent ?? "570 KB";
const AFTER_LABEL = compressorResult?.dataset.after || "22 KB";
function runCompression() {
  if (!compressor) return;
  compressorResult.hidden = true;
  compressor.removeAttribute("data-armed");
  if (compressorBlock) compressorBlock.textContent = BEFORE_LABEL;
  const delay = reduceMediaQuery.matches ? 0 : 500;
  window.setTimeout(() => {
    compressor.setAttribute("data-armed", "");
    const swapAt = reduceMediaQuery.matches ? 0 : 550;
    window.setTimeout(() => { if (compressorBlock) compressorBlock.textContent = AFTER_LABEL; }, swapAt);
    window.setTimeout(() => { compressorResult.hidden = false; }, reduceMediaQuery.matches ? 0 : 950);
  }, delay);
}
compressorReplay?.addEventListener("click", runCompression);
if (compressor) {
  const io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { runCompression(); io.disconnect(); }
  }, { threshold: 0.5 });
  io.observe(compressor);
}

// ---------------------------------------------------------------- physics playground
const motionToggle = document.getElementById("motion-toggle");
let physicsEnabled = !reduceMediaQuery.matches;

function applyMotionState() {
  document.body.classList.toggle("no-physics", !physicsEnabled);
  if (motionToggle) {
    motionToggle.setAttribute("aria-pressed", String(physicsEnabled));
    motionToggle.querySelector(".on").hidden = !physicsEnabled;
    motionToggle.querySelector(".off").hidden = physicsEnabled;
  }
}
applyMotionState();

motionToggle?.addEventListener("click", () => {
  physicsEnabled = !physicsEnabled;
  applyMotionState();
  if (physicsEnabled) startPlayground(); else stopPlayground();
});
reduceMediaQuery.addEventListener("change", (e) => {
  physicsEnabled = !e.matches;
  applyMotionState();
  if (physicsEnabled) startPlayground(); else stopPlayground();
});

let engine, runner, cleanupFns = [];

function stopPlayground() {
  if (runner) Runner.stop(runner);
  if (engine) { World.clear(engine.world); Engine.clear(engine); }
  cleanupFns.forEach((fn) => fn());
  cleanupFns = [];
  document.querySelectorAll("[data-body]").forEach((el) => { el.style.transform = ""; });
}

function startPlayground() {
  if (!physicsEnabled) return;
  engine = Engine.create();
  engine.gravity.y = 0.85;
  runner = Runner.create();

  const anchoredEls = []; // { el, body, constraint }
  const freeEls = [];     // { el, body }

  // ---- helper: build wall bodies around a container's current rect
  function wallsFor(rect, thickness = 60) {
    const t = thickness;
    return [
      Bodies.rectangle(rect.left + rect.width / 2, rect.top - t / 2, rect.width + t * 2, t, { isStatic: true }),
      Bodies.rectangle(rect.left + rect.width / 2, rect.bottom + t / 2, rect.width + t * 2, t, { isStatic: true }),
      Bodies.rectangle(rect.left - t / 2, rect.top + rect.height / 2, t, rect.height + t * 2, { isStatic: true }),
      Bodies.rectangle(rect.right + t / 2, rect.top + rect.height / 2, t, rect.height + t * 2, { isStatic: true }),
    ];
  }

  // ---- hero letters: spring-anchored to their flow position
  const nameHeading = document.querySelector(".hero__name");
  if (nameHeading) {
    nameHeading.querySelectorAll(".letter").forEach((el) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2 + window.scrollX;
      const cy = r.top + r.height / 2 + window.scrollY;
      const body = Body.create({
        position: { x: cx, y: cy - 40 - Math.random() * 60 },
        angle: (Math.random() - 0.5) * 0.9,
        frictionAir: 0.12,
      });
      Body.setVertices(body, [
        { x: -r.width / 2, y: -r.height / 2 }, { x: r.width / 2, y: -r.height / 2 },
        { x: r.width / 2, y: r.height / 2 }, { x: -r.width / 2, y: r.height / 2 },
      ]);
      const anchor = { x: cx, y: cy };
      const constraint = Constraint.create({
        pointA: anchor, bodyB: body, stiffness: 0.045, damping: 0.55, length: 0,
      });
      World.add(engine.world, [body, constraint]);
      anchoredEls.push({ el, body });
      makeDraggable(el, body, engine);
    });
  }

  // ---- generic free-fall bins: tech chips, metrics, cases, recs, contact, hero photo dock
  document.querySelectorAll("[data-bin]").forEach((bin) => {
    const kind = bin.dataset.bin;
    const items = bin === nameHeading ? [] : Array.from(bin.querySelectorAll(":scope > [data-body], :scope > li[data-body], :scope > button[data-body]"));
    if (!items.length) return;
    const rect = bin.getBoundingClientRect();
    if (rect.width < 10) return;
    const floor = Bodies.rectangle(rect.left + rect.width / 2 + window.scrollX, rect.bottom + window.scrollY + 30, rect.width + 200, 60, { isStatic: true, friction: 0.9 });
    const wallL = Bodies.rectangle(rect.left + window.scrollX - 30, rect.top + window.scrollY + rect.height / 2, 60, rect.height + 400, { isStatic: true });
    const wallR = Bodies.rectangle(rect.right + window.scrollX + 30, rect.top + window.scrollY + rect.height / 2, 60, rect.height + 400, { isStatic: true });
    World.add(engine.world, [floor, wallL, wallR]);

    items.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      const w = Math.max(r.width, 24), h = Math.max(r.height, 24);
      // Drop each item from directly above its own natural (CSS-laid-out)
      // resting spot, so free-fall bins still settle close to a readable
      // grid instead of piling toward one edge.
      const startX = r.left + w / 2 + window.scrollX + (Math.random() - 0.5) * 16;
      const body = Body.create({
        position: { x: startX, y: rect.top + window.scrollY - 40 - i * 26 },
        angle: (Math.random() - 0.5) * 0.6,
        friction: 0.7, frictionAir: 0.02, restitution: 0.15,
      });
      Body.setVertices(body, [
        { x: -w / 2, y: -h / 2 }, { x: w / 2, y: -h / 2 }, { x: w / 2, y: h / 2 }, { x: -w / 2, y: h / 2 },
      ]);
      World.add(engine.world, body);
      freeEls.push({ el, body });
      makeDraggable(el, body, engine, { freeThrow: true });
    });
  });

  // ---- render loop: apply body transform to DOM element
  Events.on(engine, "afterUpdate", () => {
    const originX = window.scrollX, originY = window.scrollY;
    anchoredEls.concat(freeEls).forEach(({ el, body }) => {
      // position bodies are stored in page coordinates; convert back to the
      // element's static offset by using fixed/absolute transform trick:
      // we keep elements in normal flow and translate from their own rect.
      if (!el.dataset.baseX) {
        const r0 = el.getBoundingClientRect();
        el.dataset.baseX = r0.left + originX + r0.width / 2;
        el.dataset.baseY = r0.top + originY + r0.height / 2;
        el.style.position = "relative";
        el.style.zIndex = "5";
      }
      const dx = body.position.x - parseFloat(el.dataset.baseX);
      const dy = body.position.y - parseFloat(el.dataset.baseY);
      el.style.transform = `translate(${dx}px, ${dy}px) rotate(${body.angle}rad)`;
    });
  });

  Runner.run(runner, engine);
}

function makeDraggable(el, body, engine, opts = {}) {
  let dragConstraint = null;
  let pointerId = null;

  function onPointerDown(e) {
    if (e.button !== undefined && e.button !== 0) return;
    pointerId = e.pointerId;
    el.setPointerCapture?.(pointerId);
    Body.setStatic(body, false);
    dragConstraint = Constraint.create({
      pointA: { x: e.clientX + window.scrollX, y: e.clientY + window.scrollY },
      bodyB: body, stiffness: 0.35, damping: 0.4, length: 0,
    });
    World.add(engine.world, dragConstraint);
    e.preventDefault();
  }
  function onPointerMove(e) {
    if (!dragConstraint || e.pointerId !== pointerId) return;
    dragConstraint.pointA = { x: e.clientX + window.scrollX, y: e.clientY + window.scrollY };
  }
  function onPointerUp(e) {
    if (e.pointerId !== pointerId) return;
    if (dragConstraint) { World.remove(engine.world, dragConstraint); dragConstraint = null; }
    pointerId = null;
  }
  el.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  cleanupFns.push(() => {
    el.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  });

  // keyboard equivalent: arrow keys nudge the body
  function onKeyDown(e) {
    const step = 24;
    let fx = 0, fy = 0;
    if (e.key === "ArrowLeft") fx = -step; else if (e.key === "ArrowRight") fx = step;
    else if (e.key === "ArrowUp") fy = -step; else if (e.key === "ArrowDown") fy = step;
    else return;
    e.preventDefault();
    Body.setVelocity(body, { x: fx, y: fy });
  }
  el.addEventListener("keydown", onKeyDown);
  cleanupFns.push(() => el.removeEventListener("keydown", onKeyDown));
}

if (physicsEnabled) {
  // wait for layout (fonts) to settle so rects are accurate
  window.addEventListener("load", () => requestAnimationFrame(() => requestAnimationFrame(startPlayground)));
}

// keep bin walls sane on resize: simplest robust fix is a full restart
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (physicsEnabled) { stopPlayground(); startPlayground(); }
  }, 400);
});
