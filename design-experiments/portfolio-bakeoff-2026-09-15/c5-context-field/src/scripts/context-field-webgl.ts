/**
 * The live WebGL field: 548 dim points (the stripped share of the 570 KB raw
 * payload) fade and drift outward while 22 bright points (the surviving,
 * routed context) converge into a tight cluster beside the portrait. This
 * module is imported dynamically, only after the hero is visible and the
 * main thread is idle (see ContextField.astro) — nothing here ships in the
 * initial page bundle.
 *
 * Deliberately two `THREE.Points` meshes rather than one shader juggling two
 * populations: half the state, half the GLSL, same visual result at 570
 * points, which is trivial for any GPU that got this far.
 */
import * as THREE from "three";

const RAW_COUNT = 548;
const ROUTED_COUNT = 22;

function mulberry32(seed: number): () => number {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeDotTexture(rgb: string): THREE.CanvasTexture {
  const size = 64;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d");
  if (ctx) {
    const g = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2,
    );
    g.addColorStop(0, `rgba(${rgb},1)`);
    g.addColorStop(0.6, `rgba(${rgb},0.5)`);
    g.addColorStop(1, `rgba(${rgb},0)`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

export function mountContextField(
  canvas: HTMLCanvasElement,
  container: HTMLElement,
): () => void {
  const rand = mulberry32(57022096);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  camera.position.z = 3;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  // ---- Raw payload: 548 dim points, scattered, drift and fade on convergence.
  const rawStart = new Float32Array(RAW_COUNT * 3);
  const rawPositions = new Float32Array(RAW_COUNT * 3);
  for (let i = 0; i < RAW_COUNT; i++) {
    const x = rand() * 2 - 1;
    const y = (rand() * 2 - 1) * 0.75;
    rawStart[i * 3] = x;
    rawStart[i * 3 + 1] = y;
    rawStart[i * 3 + 2] = 0;
    rawPositions[i * 3] = x;
    rawPositions[i * 3 + 1] = y;
  }
  const rawGeometry = new THREE.BufferGeometry();
  rawGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(rawPositions, 3),
  );
  const rawMaterial = new THREE.PointsMaterial({
    size: 0.009,
    map: makeDotTexture("167,176,186"),
    transparent: true,
    opacity: 0.4,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const rawPoints = new THREE.Points(rawGeometry, rawMaterial);
  scene.add(rawPoints);

  // ---- Routed core: 22 bright points, converge to a tight cluster near the
  // portrait (right side of the hero, matching the static SVG fallback).
  const clusterX = 0.62;
  const clusterY = 0.08;
  const routedStart = new Float32Array(ROUTED_COUNT * 3);
  const routedTarget = new Float32Array(ROUTED_COUNT * 3);
  const routedPositions = new Float32Array(ROUTED_COUNT * 3);
  for (let i = 0; i < ROUTED_COUNT; i++) {
    const x = rand() * 2 - 1;
    const y = (rand() * 2 - 1) * 0.75;
    routedStart[i * 3] = x;
    routedStart[i * 3 + 1] = y;
    const angle = (i / ROUTED_COUNT) * Math.PI * 2;
    const radius = 0.05 + rand() * 0.06;
    routedTarget[i * 3] = clusterX + Math.cos(angle) * radius;
    routedTarget[i * 3 + 1] = clusterY + Math.sin(angle) * radius * 0.85;
    routedPositions[i * 3] = x;
    routedPositions[i * 3 + 1] = y;
  }
  const routedGeometry = new THREE.BufferGeometry();
  routedGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(routedPositions, 3),
  );
  const routedMaterial = new THREE.PointsMaterial({
    size: 0.024,
    map: makeDotTexture("200,240,74"),
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
  });
  const routedPoints = new THREE.Points(routedGeometry, routedMaterial);
  scene.add(routedPoints);

  function resize(): void {
    const rect = container.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width));
    const h = Math.max(1, Math.round(rect.height));
    renderer.setSize(w, h, false);
    const aspect = w / h;
    camera.left = -aspect;
    camera.right = aspect;
    camera.top = 1;
    camera.bottom = -1;
    camera.updateProjectionMatrix();
  }
  resize();
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);

  const pointer = { x: 0, y: 0 };
  function onPointerMove(e: PointerEvent): void {
    const rect = container.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    // Past the entrance, the loop is idle by contract: a pointer move is
    // exactly the "or moves pointer" trigger the brief names, so it earns
    // one fresh frame. During the entrance itself the loop is already
    // running and this is a harmless no-op (scheduleFrame checks rafId).
    if (entranceDone) scheduleFrame();
  }
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  let scrollProgress = 0;
  function onScroll(): void {
    const rect = container.getBoundingClientRect();
    const total = rect.height + window.innerHeight;
    const passed = window.innerHeight - rect.top;
    scrollProgress = Math.min(1, Math.max(0, passed / total));
    if (entranceDone) scheduleFrame();
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const startTime = performance.now();
  let rafId = 0;
  let active = false; // gates whether input events are allowed to schedule a frame
  let entranceDone = false; // once true, the loop stops free-running: idle costs zero CPU

  function frame(now: number): void {
    rafId = 0;
    if (!active) return;
    const elapsed = (now - startTime) / 1000;
    // Auto entrance settle in ~2.5s (the "resolves in 3 seconds" contract);
    // scroll and pointer only add a little extra convergence on top, they
    // are never required to see the effect complete.
    const entrance = easeOutCubic(Math.min(1, elapsed / 2.5));
    const pointerPull = Math.min(1, Math.hypot(pointer.x, pointer.y)) * 0.06;
    const convergence = Math.min(
      1,
      entrance * 0.85 + scrollProgress * 0.15 + pointerPull,
    );

    const rawAttr = rawGeometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute;
    for (let i = 0; i < RAW_COUNT; i++) {
      const sx = rawStart[i * 3];
      const sy = rawStart[i * 3 + 1];
      const drift = convergence * 0.18;
      const wobble = Math.sin(now * 0.00018 + i) * 0.008;
      rawAttr.setXYZ(i, sx * (1 + drift) + wobble, sy * (1 + drift), 0);
    }
    rawAttr.needsUpdate = true;
    rawMaterial.opacity = 0.4 - convergence * 0.33;

    const routedAttr = routedGeometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute;
    for (let i = 0; i < ROUTED_COUNT; i++) {
      const sx = routedStart[i * 3];
      const sy = routedStart[i * 3 + 1];
      const tx = routedTarget[i * 3];
      const ty = routedTarget[i * 3 + 1];
      const settle = 1 - convergence * 0.7;
      const wobble = Math.sin(now * 0.0007 + i * 1.4) * 0.005 * settle;
      routedAttr.setXYZ(
        i,
        sx + (tx - sx) * convergence + wobble,
        sy + (ty - sy) * convergence + wobble,
        0,
      );
    }
    routedAttr.needsUpdate = true;

    renderer.render(scene, camera);

    // Free-run only through the entrance settle (~150 frames, ~2.6s). After
    // that the field is idle by default and costs nothing: pointermove and
    // scroll each schedule exactly one more frame, never a resumed loop.
    // This is what keeps a decorative background animation from burning a
    // continuous CPU/GPU budget (and, on the low-power/software-rendering
    // paths headless tooling and some devices fall back to, from turning
    // into main-thread-blocking work) for a page nobody is looking at.
    if (elapsed < 2.6) {
      rafId = requestAnimationFrame(frame);
    } else {
      entranceDone = true;
    }
  }

  function scheduleFrame(): void {
    if (!active || rafId) return;
    rafId = requestAnimationFrame(frame);
  }

  function play(): void {
    if (active) return;
    active = true;
    scheduleFrame();
  }
  function pause(): void {
    active = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  }
  function isContainerVisible(): boolean {
    const r = container.getBoundingClientRect();
    return r.bottom > 0 && r.top < window.innerHeight;
  }

  const visibilityObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) play();
      else pause();
    }
  });
  visibilityObserver.observe(container);

  function onVisibilityChange(): void {
    if (document.hidden) pause();
    else if (isContainerVisible()) play();
  }
  document.addEventListener("visibilitychange", onVisibilityChange);

  play();
  canvas.classList.add("is-active");

  return function cleanup(): void {
    pause();
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    document.removeEventListener("visibilitychange", onVisibilityChange);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("scroll", onScroll);
    rawGeometry.dispose();
    routedGeometry.dispose();
    rawMaterial.dispose();
    routedMaterial.dispose();
    rawMaterial.map?.dispose();
    routedMaterial.map?.dispose();
    renderer.dispose();
  };
}
