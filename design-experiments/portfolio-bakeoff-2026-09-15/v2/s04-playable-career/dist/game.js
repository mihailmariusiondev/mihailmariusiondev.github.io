/* Side-scrolling career run. Canvas 2D, no dependencies, no physics library:
   flat ground, gravity + jump, horizontal run. Art direction: layered parallax
   skylines, ambient particles and collect feedback per zone, all canvas primitives
   (illustrative shapes only, never a fake dashboard). */
(function () {
  const S = window.SITE;
  const L = window.PORTFOLIO.L;

  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  const hudZone = document.getElementById("hud-zone");
  const promptBubble = document.getElementById("prompt-bubble");
  const progressFill = document.getElementById("progress-fill");

  const ZONE_WIDTH = 1500;
  const FINALE_WIDTH = 900;
  const GROUND_Y = 420;
  const GRAVITY = 1600;
  const MOVE_SPEED = 320;
  const JUMP_VELOCITY = -620;

  let lang = "en";
  let running = false;
  let modalOpen = false;
  let reduced = false;
  let lastZoneId = null;

  // Build world: zones + finale.
  const world = [];
  S.zones.forEach((zone, i) => {
    const startX = i * ZONE_WIDTH;
    world.push({ ...zone, startX, width: ZONE_WIDTH, isFinale: false });
  });
  const finaleStartX = S.zones.length * ZONE_WIDTH;
  world.push({
    id: "finale",
    color: "#241a33",
    accent: "#ffd98f",
    title: { en: "Finale — Let's talk", es: "Final — Hablemos" },
    startX: finaleStartX,
    width: FINALE_WIDTH,
    isFinale: true,
    npcs: [],
  });
  const WORLD_WIDTH = finaleStartX + FINALE_WIDTH;

  // Build interactables.
  const interactables = [];
  world.forEach((zone) => {
    if (zone.isFinale) {
      interactables.push({
        type: "finale",
        x: zone.startX + zone.width / 2,
        y: GROUND_Y - 34,
        accent: zone.accent,
      });
      return;
    }
    const npcCount = zone.npcs.length;
    zone.npcs.forEach((npc, idx) => {
      const frac = (idx + 1) / (npcCount + 1);
      interactables.push({
        type: "npc",
        x: zone.startX + zone.width * frac,
        y: GROUND_Y - 30,
        npc,
        accent: zone.accent,
        collected: false,
      });
    });
    const orbSlugs = zone.orbs || [];
    orbSlugs.forEach((slug, idx) => {
      interactables.push({
        type: "case",
        x: zone.startX + zone.width * (0.55 + idx * 0.15),
        y: GROUND_Y - 90,
        slug,
        accent: zone.accent,
        collected: false,
      });
    });
    (zone.stats || []).forEach((stat, idx) => {
      interactables.push({
        type: "stat",
        x: zone.startX + zone.width * (0.15 + idx * 0.12),
        y: GROUND_Y - 90,
        stat,
        accent: zone.accent,
        collected: false,
      });
    });
  });

  const player = { x: 60, y: GROUND_Y - 40, w: 26, h: 40, vy: 0, onGround: true, facing: 1, squash: 0 };
  let cameraX = 0;
  const keys = { left: false, right: false, jump: false };
  let nearInteractable = null;

  // ---------- Particle system (ambient fireflies + collect bursts) ----------
  const particles = [];
  function spawnBurst(x, y, color, count) {
    if (reduced) return;
    for (let i = 0; i < count; i++) {
      const a = (Math.PI * 2 * i) / count + Math.random() * 0.4;
      const speed = 90 + Math.random() * 140;
      particles.push({
        x, y,
        vx: Math.cos(a) * speed,
        vy: Math.sin(a) * speed - 40,
        life: 0.7 + Math.random() * 0.3,
        maxLife: 0.7 + Math.random() * 0.3,
        color,
        size: 2 + Math.random() * 2.5,
      });
    }
  }
  function updateParticles(dt) {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life -= dt;
      if (p.life <= 0) { particles.splice(i, 1); continue; }
      p.vy += GRAVITY * 0.35 * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
    }
  }
  function drawParticles(camX) {
    particles.forEach((p) => {
      const sx = p.x - camX;
      ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(sx, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  // Ambient fireflies drifting per zone, seeded once.
  const fireflies = Array.from({ length: 40 }, () => ({
    x: Math.random() * WORLD_WIDTH,
    baseY: GROUND_Y - 40 - Math.random() * 220,
    phase: Math.random() * Math.PI * 2,
    speed: 0.4 + Math.random() * 0.6,
  }));

  function currentZone() {
    const centerX = player.x;
    for (const z of world) {
      if (centerX >= z.startX && centerX < z.startX + z.width) return z;
    }
    return world[world.length - 1];
  }

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";
  }
  window.addEventListener("resize", resize);

  // Fixed star field so it doesn't recompute every frame.
  const STARS = Array.from({ length: 110 }, () => ({
    x: Math.random() * WORLD_WIDTH,
    y: Math.random() * 0.5,
    r: Math.random() * 1.6 + 0.4,
    tw: Math.random() * Math.PI * 2,
  }));

  // Skyline silhouettes, one deterministic layout per zone id, drawn as simple
  // rectangles/roofs — explicitly illustrative, never a real UI mockup.
  const SKYLINES = {};
  function skylineFor(zone) {
    if (SKYLINES[zone.id]) return SKYLINES[zone.id];
    const rng = mulberry32(hashStr(zone.id));
    const buildings = [];
    let x = -100;
    while (x < ZONE_WIDTH + 200) {
      const w = 60 + rng() * 70;
      const h = 60 + rng() * 140;
      buildings.push({ x, w, h, windows: Math.floor(w / 16), lit: rng() });
      x += w + 24 + rng() * 30;
    }
    SKYLINES[zone.id] = buildings;
    return buildings;
  }
  function hashStr(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
    return h >>> 0;
  }
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function drawZoneBackground(zone, camX, w, h, t) {
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "#05060a");
    grad.addColorStop(0.5, "#0c0f18");
    grad.addColorStop(1, zone.color);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Stars, gently parallaxed and twinkling.
    STARS.forEach((s) => {
      const sx = ((s.x - camX * 0.35) % (w + 200) + (w + 200)) % (w + 200) - 100;
      const tw = reduced ? 0.6 : 0.4 + Math.sin(t / 700 + s.tw) * 0.3;
      ctx.globalAlpha = tw;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(sx, s.y * h * 0.6, s.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    // Far skyline silhouette, per-zone deterministic buildings with lit windows.
    // Anchored to GROUND_Y (not canvas height) so it always sits just above the floor.
    const buildings = skylineFor(zone);
    const skyCamX = camX * 0.55;
    const baseY = GROUND_Y - 6;
    ctx.fillStyle = zone.accent + "26";
    buildings.forEach((b) => {
      const bx = (((b.x - skyCamX) % (ZONE_WIDTH + 300)) + (ZONE_WIDTH + 300)) % (ZONE_WIDTH + 300) - 150;
      if (bx < -b.w - 10 || bx > w + 10) return;
      const by = baseY - b.h;
      ctx.fillRect(bx, by, b.w, b.h + 20);
      if (b.lit > 0.4) {
        ctx.fillStyle = zone.accent + "55";
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < b.windows; c++) {
            if ((r + c) % 3 === 0) ctx.fillRect(bx + 6 + c * 14, by + 10 + r * 18, 5, 8);
          }
        }
        ctx.fillStyle = zone.accent + "26";
      }
    });

    // Near hill / dune band, animated wave, closer parallax.
    ctx.fillStyle = zone.accent + "33";
    const hillY = GROUND_Y - 60;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y + 4);
    for (let x = 0; x <= w; x += 40) {
      const worldX = camX * 0.7 + x;
      const y = hillY + Math.sin(worldX * 0.006) * 24;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(w, GROUND_Y + 4);
    ctx.closePath();
    ctx.fill();

    // Fireflies / ambient motes, color-matched to the zone.
    ctx.fillStyle = zone.accent;
    fireflies.forEach((f) => {
      const sx = ((f.x - camX * 0.5) % (w + 160) + (w + 160)) % (w + 160) - 80;
      if (sx < -20 || sx > w + 20) return;
      const bob = reduced ? 0 : Math.sin(t / 1000 * f.speed + f.phase) * 18;
      const flicker = reduced ? 0.35 : 0.25 + Math.abs(Math.sin(t / 500 + f.phase)) * 0.35;
      ctx.globalAlpha = flicker;
      ctx.beginPath();
      ctx.arc(sx, f.baseY + bob, 1.6, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  function drawGroundTexture(zone, camX, w, h) {
    const groundGrad = ctx.createLinearGradient(0, GROUND_Y, 0, h);
    groundGrad.addColorStop(0, "#141827");
    groundGrad.addColorStop(1, "#080a10");
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, GROUND_Y, w, h - GROUND_Y);

    ctx.strokeStyle = zone.accent + "2a";
    ctx.lineWidth = 1;

    if (zone.id === "santander") {
      // Fine tile seams, banking-hall floor.
      const off = (-camX) % 60;
      for (let x = off; x < w; x += 60) {
        ctx.beginPath(); ctx.moveTo(x, GROUND_Y); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = GROUND_Y + 24; y < h; y += 24) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
    } else if (zone.id === "unir") {
      // Brick hatch, campus courtyard.
      const off = (-camX) % 34;
      for (let x = off - 34; x < w + 34; x += 34) {
        ctx.beginPath(); ctx.moveTo(x, GROUND_Y); ctx.lineTo(x + 40, h); ctx.stroke();
      }
    } else if (zone.id === "zarahome") {
      // Soft dot grid, retail floor.
      const offX = (-camX) % 44;
      for (let x = offX; x < w; x += 44) {
        for (let y = GROUND_Y + 20; y < h; y += 30) {
          ctx.beginPath(); ctx.arc(x, y, 1.4, 0, Math.PI * 2); ctx.fill();
        }
      }
      ctx.fillStyle = zone.accent + "2a";
    } else if (zone.id === "finale") {
      // Converging path lines toward the horizon of the run.
      const off = (-camX) % 80;
      for (let x = off - 80; x < w + 80; x += 80) {
        ctx.beginPath(); ctx.moveTo(x, h); ctx.lineTo(w / 2 + (x - w / 2) * 0.2, GROUND_Y); ctx.stroke();
      }
    } else {
      // Origins: engineering blueprint grid.
      const gridOffset = (-camX) % 40;
      for (let x = gridOffset; x < w; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, GROUND_Y); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = GROUND_Y + 20; y < h; y += 30) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
    }

    ctx.strokeStyle = zone.accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y);
    ctx.lineTo(w, GROUND_Y);
    ctx.stroke();
  }

  function worldToScreen(wx) {
    return wx - cameraX;
  }

  function drawIcon(type, sx, sy, accent, t) {
    ctx.save();
    ctx.translate(sx, sy);
    ctx.strokeStyle = accent;
    ctx.fillStyle = accent;
    ctx.lineWidth = 2;
    if (type === "stat") {
      // Medal / badge: hexagon with a check mark.
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 2;
        const px = Math.cos(a) * 12, py = Math.sin(a) * 12;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.globalAlpha = 0.22;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-5, 0); ctx.lineTo(-1, 4); ctx.lineTo(6, -5);
      ctx.stroke();
    } else {
      // Case study: a folded document.
      ctx.globalAlpha = 0.22;
      ctx.fillRect(-9, -12, 18, 24);
      ctx.globalAlpha = 1;
      ctx.strokeRect(-9, -12, 18, 24);
      ctx.beginPath();
      ctx.moveTo(-5, -5); ctx.lineTo(5, -5);
      ctx.moveTo(-5, 1); ctx.lineTo(5, 1);
      ctx.moveTo(-5, 7); ctx.lineTo(2, 7);
      ctx.stroke();
    }
    ctx.restore();
  }

  function draw(t) {
    const dpr = devicePixelRatio;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const zone = currentZone();
    drawZoneBackground(zone, cameraX, w, h, t);
    drawGroundTexture(zone, cameraX, w, h);

    // Zone signposts
    world.forEach((z) => {
      const sx = worldToScreen(z.startX + 20);
      if (sx > -300 && sx < w + 50) {
        ctx.fillStyle = z.accent;
        ctx.fillRect(sx, GROUND_Y - 90, 4, 90);
        ctx.font = "bold 15px monospace";
        ctx.fillText(L(z.title, lang), sx + 12, GROUND_Y - 70);
        if (z.period) {
          ctx.font = "12px monospace";
          ctx.fillStyle = "#9aa3c0";
          ctx.fillText(L(z.period, lang), sx + 12, GROUND_Y - 50);
        }
      }
    });

    // Interactables
    interactables.forEach((it) => {
      const sx = worldToScreen(it.x);
      if (sx < -80 || sx > w + 80) return;

      if (it.type === "npc" || it.type === "finale") {
        ctx.fillStyle = "rgba(0,0,0,.4)";
        ctx.beginPath();
        ctx.ellipse(sx, GROUND_Y + 2, 18, 5, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = it.accent;
      ctx.font = "11px monospace";
      ctx.textAlign = "center";

      if (it.type === "npc") {
        const idleBob = reduced ? 0 : Math.sin(t / 500 + it.x) * 3;
        const y = it.y + idleBob;
        // legs + rounded body + visor + a small speech dot to signal "has dialogue".
        ctx.fillRect(sx - 8, GROUND_Y - 14, 5, 14);
        ctx.fillRect(sx + 3, GROUND_Y - 14, 5, 14);
        ctx.beginPath();
        ctx.arc(sx, y, 17, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#0c1220";
        ctx.fillRect(sx - 9, y - 5, 18, 6);
        ctx.fillStyle = it.accent;
        ctx.globalAlpha = 0.7 + (reduced ? 0 : Math.sin(t / 300) * 0.3);
        ctx.beginPath();
        ctx.arc(sx + 14, y - 20, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#c7cee6";
        ctx.fillText(it.npc.name.split(" ")[0], sx, y - 28);
      } else if (it.type === "finale") {
        const glow = reduced ? 0.6 : 0.5 + Math.sin(t / 400) * 0.3;
        ctx.save();
        ctx.shadowColor = it.accent;
        ctx.shadowBlur = 20 * glow + 6;
        ctx.fillRect(sx - 2, it.y - 40, 4, 74);
        ctx.beginPath();
        ctx.moveTo(sx + 2, it.y - 40);
        ctx.lineTo(sx + 34, it.y - 30);
        ctx.lineTo(sx + 2, it.y - 20);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      } else if (!it.collected) {
        const bob = reduced ? 0 : Math.sin(t / 350 + it.x) * 5;
        drawIcon(it.type, sx, it.y + bob, it.accent, t);
        ctx.fillStyle = "#c7cee6";
        const label = it.type === "case" ? L(S.caseStudies[it.slug].title, lang) : L(it.stat.value, lang);
        ctx.fillText(label, sx, it.y - 26 + bob);
      }
      ctx.textAlign = "left";
    });

    drawParticles(cameraX);

    // Player: body, legs (walk cycle), visor facing direction, shadow, dust trail.
    const psx = worldToScreen(player.x);
    ctx.fillStyle = "rgba(0,0,0,.4)";
    ctx.beginPath();
    ctx.ellipse(psx, GROUND_Y + 2, 16, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    const walking = (keys.left || keys.right) && player.onGround;
    const legPhase = walking && !reduced ? Math.sin(t / 90) * 6 : 0;
    // Cape/trail in the zone accent, gives the player a color identity per zone.
    ctx.fillStyle = zone.accent + "88";
    ctx.beginPath();
    ctx.moveTo(psx - player.facing * 10, player.y + 4);
    ctx.lineTo(psx - player.facing * 20 - legPhase, player.y + player.h - 6);
    ctx.lineTo(psx - player.facing * 6, player.y + player.h - 10);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#c7cee6";
    const squash = 1 - player.squash;
    ctx.fillRect(psx - 8, player.y + player.h - 10, 5, (10 + legPhase * 0.4) * squash);
    ctx.fillRect(psx + 3, player.y + player.h - 10, 5, (10 - legPhase * 0.4) * squash);

    ctx.fillStyle = "#eef1fb";
    ctx.beginPath();
    ctx.roundRect(psx - player.w / 2, player.y + player.squash * 6, player.w, (player.h - 6) * squash, 8);
    ctx.fill();

    ctx.fillStyle = zone.accent;
    const eyeOffset = player.facing * 6;
    ctx.fillRect(psx - 6 + eyeOffset, player.y + 9, 8, 5);
  }

  function findNearInteractable() {
    let best = null;
    let bestDist = 70;
    interactables.forEach((it) => {
      const d = Math.abs(it.x - player.x);
      if (d < bestDist) {
        bestDist = d;
        best = it;
      }
    });
    return best;
  }

  function updatePrompt() {
    nearInteractable = findNearInteractable();
    if (nearInteractable) {
      const sx = worldToScreen(nearInteractable.x);
      promptBubble.style.left = sx + "px";
      promptBubble.style.top = nearInteractable.y + "px";
      promptBubble.classList.add("show");
      promptBubble.textContent = L(S.ui.interact, lang) + " (E)";
    } else {
      promptBubble.classList.remove("show");
    }
  }

  function triggerInteract() {
    if (!nearInteractable || modalOpen) return;
    modalOpen = true;
    const it = nearInteractable;
    if (!it.collected && (it.type === "case" || it.type === "stat")) {
      it.collected = true;
      spawnBurst(it.x, it.y, it.accent, 14);
    }
    if (it.type === "npc") window.openNpcModal(it.npc, lang);
    else if (it.type === "case") window.openCaseModal(it.slug, lang);
    else if (it.type === "stat") window.openStatModal(it.stat, lang);
    else if (it.type === "finale") {
      const cvHref = S.cv[lang];
      const links = S.contact
        .map((c) => `<p><a href="${c.href}">${L(c.label, lang)} — ${c.value}</a></p>`)
        .join("");
      window.openFinaleModal(cvHref, links);
    }
  }

  window.openFinaleModal = function (cvHref, linksHtml) {
    const body = document.getElementById("modal-body");
    const backdrop = document.getElementById("modal-backdrop");
    body.innerHTML = `
      <div class="eyebrow">${lang === "es" ? "Final" : "Finale"}</div>
      <h2 id="modal-title">${L(S.ui.finaleTitle, lang)}</h2>
      <p>${L(S.ui.finaleLede, lang)}</p>
      <p><a class="tag" style="display:inline-block;margin-bottom:12px" href="${cvHref}" download>${L(S.ui.downloadCv, lang)}</a></p>
      ${linksHtml}
    `;
    backdrop.classList.add("open");
    document.getElementById("modal-close").focus();
  };

  document.getElementById("modal-close").addEventListener("click", () => (modalOpen = false));
  document.getElementById("modal-backdrop").addEventListener("click", (e) => {
    if (e.target.id === "modal-backdrop") modalOpen = false;
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modalOpen = false;
  });

  let lastT = 0;
  function step(t) {
    if (!running) return;
    const dt = Math.min(0.033, (t - lastT) / 1000 || 0);
    lastT = t;

    if (!modalOpen) {
      let vx = 0;
      if (keys.left) { vx -= MOVE_SPEED; player.facing = -1; }
      if (keys.right) { vx += MOVE_SPEED; player.facing = 1; }
      player.x += vx * dt;
      player.x = Math.max(20, Math.min(WORLD_WIDTH - 20, player.x));

      const wasOnGround = player.onGround;
      if (keys.jump && player.onGround) {
        player.vy = JUMP_VELOCITY;
        player.onGround = false;
      }
      player.vy += GRAVITY * dt;
      player.y += player.vy * dt;
      const floorY = GROUND_Y - player.h;
      if (player.y >= floorY) {
        if (!wasOnGround) player.squash = 0.35; // landing squash
        player.y = floorY;
        player.vy = 0;
        player.onGround = true;
      }
      player.squash = Math.max(0, player.squash - dt * 2);

      const dpr = devicePixelRatio;
      const w = canvas.width / dpr;
      cameraX = Math.max(0, Math.min(WORLD_WIDTH - w, player.x - w / 2));
      updatePrompt();
      progressFill.style.transform = `scaleX(${Math.min(1, player.x / WORLD_WIDTH)})`;
    }

    updateParticles(dt);
    draw(t);
    const zone = currentZone();
    if (zone.id !== lastZoneId) {
      lastZoneId = zone.id;
      hudZone.innerHTML = `<strong>${L(zone.title, lang)}</strong>`;
      hudZone.classList.remove("zone-pulse");
      // Force reflow so the animation can restart on repeat zone entries.
      void hudZone.offsetWidth;
      hudZone.classList.add("zone-pulse");
    }
    requestAnimationFrame(step);
  }

  function bindKeys() {
    window.addEventListener("keydown", (e) => {
      if (["ArrowLeft", "a", "A"].includes(e.key)) keys.left = true;
      if (["ArrowRight", "d", "D"].includes(e.key)) keys.right = true;
      if (["ArrowUp", "w", "W", " "].includes(e.key)) { keys.jump = true; e.preventDefault(); }
      if (e.key === "e" || e.key === "E") triggerInteract();
    });
    window.addEventListener("keyup", (e) => {
      if (["ArrowLeft", "a", "A"].includes(e.key)) keys.left = false;
      if (["ArrowRight", "d", "D"].includes(e.key)) keys.right = false;
      if (["ArrowUp", "w", "W", " "].includes(e.key)) keys.jump = false;
    });
  }

  function bindTouch() {
    const bindHold = (id, onDown, onUp) => {
      const el = document.getElementById(id);
      const down = (e) => { e.preventDefault(); onDown(); };
      const up = (e) => { e.preventDefault(); onUp(); };
      el.addEventListener("touchstart", down, { passive: false });
      el.addEventListener("touchend", up, { passive: false });
      el.addEventListener("mousedown", down);
      el.addEventListener("mouseup", up);
      el.addEventListener("mouseleave", up);
    };
    bindHold("btn-left", () => (keys.left = true), () => (keys.left = false));
    bindHold("btn-right", () => (keys.right = true), () => (keys.right = false));
    bindHold("btn-jump", () => (keys.jump = true), () => (keys.jump = false));
    document.getElementById("btn-interact").addEventListener("click", triggerInteract);
    if ("ontouchstart" in window) {
      document.getElementById("touch-controls").classList.add("show");
    }
  }

  window.CAREER_GAME = {
    start(currentLang, reducedMotion) {
      lang = currentLang;
      reduced = reducedMotion;
      resize();
      if (!running) {
        running = true;
        lastT = performance.now();
        requestAnimationFrame(step);
      }
    },
    stop() {
      running = false;
    },
    setLang(l) {
      lang = l;
    },
    reset() {
      player.x = 60;
      player.y = GROUND_Y - player.h;
      player.vy = 0;
    },
  };

  bindKeys();
  bindTouch();
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) window.CAREER_GAME.stop();
    else if (document.getElementById("game-view").classList.contains("active")) {
      running = true;
      lastT = performance.now();
      requestAnimationFrame(step);
    }
  });
})();
