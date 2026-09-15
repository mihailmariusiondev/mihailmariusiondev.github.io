(function () {
  "use strict";
  var D = window.SITE_DATA;
  var reduceMotionMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
  var state = {
    lang: "en",
    reading: false,
    scale: 1,
    x: 0,
    y: 0,
    reduceMotion: reduceMotionMQ.matches,
  };

  // ---------------------------------------------------------------------
  // 1. Build the node graph (world-space coordinates, px at scale 1)
  // ---------------------------------------------------------------------
  var nodes = [];
  var edges = []; // {from, to, kind}

  function addNode(n) {
    n.w = n.w || 420;
    n.h = n.h || 260;
    nodes.push(n);
    return n;
  }

  addNode({ id: "hero", kind: "hero", x: 0, y: 0, w: 640, h: 320 });
  addNode({ id: "about", kind: "about", x: -820, y: -60, w: 460, h: 360 });
  addNode({ id: "skills", kind: "skills", x: 820, y: -60, w: 480, h: 400 });

  var roleOrder = ["r9", "r8", "r7", "r6", "r5", "r4", "r3", "r2", "r1"];
  var roleX = -3300;
  roleOrder.forEach(function (rid, i) {
    var role = D.roles.filter(function (r) { return r.id === rid; })[0];
    var x = roleX + i * 720;
    var y = 620 + (i % 2 === 0 ? 0 : 70);
    addNode({ id: rid, kind: "role", data: role, x: x, y: y, w: 480, h: 320 });
    if (i > 0) edges.push({ from: roleOrder[i - 1], to: rid, kind: "timeline" });
  });
  edges.push({ from: "hero", to: "r1", kind: "primary" });
  edges.push({ from: "hero", to: "about", kind: "soft" });
  edges.push({ from: "hero", to: "skills", kind: "soft" });

  var r1x = nodes.filter(function (n) { return n.id === "r1"; })[0].x;
  var csX = r1x + 320;
  D.caseStudies.forEach(function (cs, i) {
    var x = csX + i * 640;
    var y = -840;
    addNode({ id: "cs-" + cs.slug, kind: "case", data: cs, x: x, y: y, w: 480, h: 780 });
    edges.push({ from: "r1", to: "cs-" + cs.slug, kind: "primary" });
  });

  var metricX = r1x - 900;
  D.metrics.forEach(function (m, i) {
    var x = metricX + i * 340;
    var y = -1080;
    addNode({ id: m.id, kind: "metric", data: m, x: x, y: y, w: 280, h: 190 });
  });
  edges.push({ from: "m-context", to: "cs-realtime-shopping-assistant", kind: "soft" });
  edges.push({ from: "m-wcag", to: "r1", kind: "soft" });
  edges.push({ from: "m-mcp", to: "cs-engineering-controls", kind: "soft" });
  edges.push({ from: "m-rules", to: "cs-engineering-controls", kind: "soft" });
  edges.push({ from: "m-skillvalue", to: "hero", kind: "soft" });

  var recRoleMap = {
    0: "r2", // José Luis Murcia — UNIR/Avanade
    1: "r1", // Juan Pablo — Zara Home
    2: "r9", // Rodríguez-Campra — Stratesys/Avanade
    3: "hero", // Antonio Bermúdez — generic
    4: "r5", // Gonzalo — ENZO
  };
  D.recommendations.forEach(function (rec, i) {
    var anchor = nodes.filter(function (n) { return n.id === recRoleMap[i]; })[0];
    var x = anchor.x + (i % 2 === 0 ? -120 : 260);
    var y = anchor.y + 460;
    addNode({ id: "rec-" + i, kind: "rec", data: rec, x: x, y: y, w: 400, h: 280 });
    edges.push({ from: recRoleMap[i], to: "rec-" + i, kind: "soft" });
  });

  var nodeById = {};
  nodes.forEach(function (n) { nodeById[n.id] = n; });

  // ---------------------------------------------------------------------
  // 2. Rendering (per-node HTML factory, language-aware)
  // ---------------------------------------------------------------------
  function t(key) { return D.ui[state.lang][key]; }
  function pick(obj) { return obj ? (obj[state.lang] != null ? obj[state.lang] : obj) : ""; }

  function esc(s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function nodeLabel(n) {
    switch (n.kind) {
      case "hero": return D.identity.name;
      case "about": return t("sectionAbout");
      case "skills": return t("sectionSkills");
      case "role": return (typeof n.data.company === "object" ? pick(n.data.company) : n.data.company);
      case "case": return pick(n.data.title);
      case "metric": return n.data.value;
      case "rec": return n.data.author;
    }
  }

  function nodeMeta(n) {
    switch (n.kind) {
      case "hero": return pick(D.identity.title);
      case "role": return n.data.period;
      case "case": return "Case study";
      case "metric": return t("sectionMetrics");
      case "rec": return pick(n.data.role);
      default: return "";
    }
  }

  function renderNodeBody(n) {
    switch (n.kind) {
      case "hero":
        return (
          '<img class="hero-photo" src="' + D.identity.photo + '" alt="" width="72" height="72">' +
          '<p class="node-kicker">' + esc(t("heroKicker")) + '</p>' +
          '<h1 class="node-title-lg">' + esc(t("heroTitle")) + '</h1>' +
          '<p class="node-lede">' + esc(t("heroLede")) + '</p>' +
          '<p class="node-fineprint">' + esc(t("heroLocation")) + '</p>'
        );
      case "about":
        return '<h2 class="node-title">' + esc(t("sectionAbout")) + '</h2>' +
          D.about[state.lang].map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
      case "skills":
        return '<h2 class="node-title">' + esc(t("sectionSkills")) + '</h2>' +
          D.skills.groups.map(function (g) {
            return '<div class="skill-group"><h3>' + esc(pick(g.label)) + '</h3><ul class="chiplist">' +
              g.items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul></div>";
          }).join("");
      case "role":
        var r = n.data;
        var company = typeof r.company === "object" ? pick(r.company) : r.company;
        var clientLine = r.client ? " · " + esc(r.client) : "";
        return '<p class="node-kicker">' + esc(r.period) + '</p>' +
          '<h2 class="node-title">' + esc(company) + clientLine + '</h2>' +
          '<p class="node-role">' + esc(pick(r.role)) + (r.location ? " · " + esc(r.location) : "") + '</p>' +
          '<ul class="bullets">' + r.bullets[state.lang].map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("") + "</ul>";
      case "case":
        var cs = n.data;
        var fieldOrder = ["context", "myRole", "frontendProblem", "engineeringDecisions", "outcome", "demonstrates",
          "delivery", "rollout", "contractAnalysis", "decision", "implementation", "validation",
          "problem", "system", "controlLoop", "adoption"];
        var fieldLabels = {
          context: t("context"), myRole: t("myRole"), frontendProblem: { en: "Frontend problem", es: "Problema de frontend" }[state.lang],
          engineeringDecisions: { en: "Engineering decisions", es: "Decisiones de ingeniería" }[state.lang],
          outcome: t("outcome"), demonstrates: t("demonstrates"),
          delivery: { en: "Delivery", es: "Entrega" }[state.lang], rollout: { en: "Rollout", es: "Despliegue" }[state.lang],
          contractAnalysis: { en: "Contract analysis", es: "Análisis del contrato" }[state.lang],
          decision: { en: "Decision", es: "Decisión" }[state.lang], implementation: { en: "Implementation", es: "Implementación" }[state.lang],
          validation: { en: "Validation", es: "Validación" }[state.lang], problem: { en: "Problem", es: "Problema" }[state.lang],
          system: { en: "System", es: "Sistema" }[state.lang], controlLoop: { en: "Control loop", es: "Bucle de control" }[state.lang],
          adoption: { en: "Adoption", es: "Adopción" }[state.lang],
        };
        var body = '<p class="node-kicker">' + esc("Case study") + '</p>' +
          '<h2 class="node-title">' + esc(pick(cs.title)) + '</h2>' +
          '<p class="node-summary">' + esc(pick(cs.summary)) + '</p>' +
          '<ul class="taglist">' + cs.tags.map(function (tag) { return "<li>" + esc(tag) + "</li>"; }).join("") + "</ul>" +
          '<dl class="fielddl">';
        fieldOrder.forEach(function (f) {
          if (cs.fields[f]) body += "<dt>" + esc(fieldLabels[f]) + "</dt><dd>" + esc(pick(cs.fields[f])) + "</dd>";
        });
        body += "</dl>";
        return body;
      case "metric":
        return '<p class="node-kicker">' + esc(t("sectionMetrics")) + '</p>' +
          '<p class="metric-value">' + esc(n.data.value) + '</p>' +
          '<p class="metric-label">' + esc(pick(n.data.label)) + '</p>';
      case "rec":
        return '<p class="node-kicker">' + esc(t("sectionRecs")) + '</p>' +
          '<blockquote class="quote">“' + esc(pick(n.data.quote)) + '”</blockquote>' +
          '<p class="quote-attr">' + esc(n.data.author) + " · " + esc(pick(n.data.role)) + '</p>';
    }
  }

  var worldEl, viewportEl, edgesSvg;

  function buildDom() {
    worldEl = document.getElementById("world");
    viewportEl = document.getElementById("viewport");
    edgesSvg = document.getElementById("edges-svg");

    // Nodes
    worldEl.querySelectorAll(".node").forEach(function (el) { el.remove(); });
    nodes.forEach(function (n) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "node node--" + n.kind;
      btn.id = "node-" + n.id;
      btn.style.left = n.x + "px";
      btn.style.top = n.y + "px";
      btn.style.width = n.w + "px";
      btn.style.setProperty("--h", n.h + "px");
      btn.setAttribute("data-node-id", n.id);
      btn.setAttribute("aria-label", (t("flyTo") + ": " + nodeLabel(n)));
      btn.innerHTML =
        '<span class="node-dot" aria-hidden="true"></span>' +
        '<span class="node-chip"><span class="node-chip-label">' + esc(nodeLabel(n)) + '</span>' +
        (nodeMeta(n) ? '<span class="node-chip-meta">' + esc(nodeMeta(n)) + '</span>' : '') + '</span>' +
        '<div class="node-body">' + renderNodeBody(n) + '</div>';
      btn.addEventListener("click", function () { flyToNode(n.id, true); });
      btn.addEventListener("focus", function () { flyToNode(n.id, false); });
      worldEl.appendChild(btn);
    });

    // Edges (SVG under nodes, same coordinate space)
    var bounds = getWorldBounds();
    edgesSvg.setAttribute("viewBox", bounds.minX + " " + bounds.minY + " " + (bounds.maxX - bounds.minX) + " " + (bounds.maxY - bounds.minY));
    edgesSvg.style.left = bounds.minX + "px";
    edgesSvg.style.top = bounds.minY + "px";
    edgesSvg.style.width = (bounds.maxX - bounds.minX) + "px";
    edgesSvg.style.height = (bounds.maxY - bounds.minY) + "px";
    edgesSvg.innerHTML = "";
    edges.forEach(function (e) {
      var a = nodeById[e.from], b = nodeById[e.to];
      if (!a || !b) return;
      var ax = a.x + a.w / 2, ay = a.y + a.h / 2;
      var bx = b.x + b.w / 2, by = b.y + b.h / 2;
      var mx = (ax + bx) / 2;
      var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", "M " + ax + " " + ay + " C " + mx + " " + ay + ", " + mx + " " + by + ", " + bx + " " + by);
      path.setAttribute("class", "edge edge--" + e.kind);
      path.setAttribute("data-from", e.from);
      path.setAttribute("data-to", e.to);
      edgesSvg.appendChild(path);
    });

    renderMinimap(bounds);
    renderReadingMode();
    updateChrome();
  }

  function getWorldBounds() {
    var pad = 900;
    var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    nodes.forEach(function (n) {
      minX = Math.min(minX, n.x); minY = Math.min(minY, n.y);
      maxX = Math.max(maxX, n.x + n.w); maxY = Math.max(maxY, n.y + n.h);
    });
    return { minX: minX - pad, minY: minY - pad, maxX: maxX + pad, maxY: maxY + pad };
  }

  // ---------------------------------------------------------------------
  // 3. Camera: pan / zoom / semantic zoom
  // ---------------------------------------------------------------------
  var MIN_SCALE = 0.14, MAX_SCALE = 2.2;

  function applyTransform() {
    worldEl.style.transform = "translate3d(" + state.x + "px, " + state.y + "px, 0) scale(" + state.scale + ")";
    var tier = state.scale < 0.24 ? "dot" : state.scale < 0.75 ? "card" : "full";
    worldEl.setAttribute("data-tier", tier);
    updateMinimapViewport();
  }

  function clampScale(s) { return Math.max(MIN_SCALE, Math.min(MAX_SCALE, s)); }

  function zoomAt(clientX, clientY, factor) {
    var rect = viewportEl.getBoundingClientRect();
    var cx = clientX - rect.left, cy = clientY - rect.top;
    var worldX = (cx - state.x) / state.scale;
    var worldY = (cy - state.y) / state.scale;
    var newScale = clampScale(state.scale * factor);
    state.x = cx - worldX * newScale;
    state.y = cy - worldY * newScale;
    state.scale = newScale;
    applyTransform();
  }

  function panBy(dx, dy) {
    state.x += dx; state.y += dy;
    applyTransform();
  }

  // Fly-to with rAF easing; instant if reduced motion
  var flying = null;
  function flyToNode(id, focusAfter) {
    var n = nodeById[id];
    if (!n) return;
    var rect = viewportEl.getBoundingClientRect();
    var padding = 90;
    var targetScale = clampScale(Math.min((rect.width - padding * 2) / n.w, (rect.height - padding * 2) / n.h, 1.05));
    var targetX = rect.width / 2 - (n.x + n.w / 2) * targetScale;
    var targetY = rect.height / 2 - (n.y + n.h / 2) * targetScale;
    flyTo(targetX, targetY, targetScale, function () {
      markActiveNode(id);
      if (focusAfter) {
        var el = document.getElementById("node-" + id);
        if (el) el.focus({ preventScroll: true });
      }
    });
  }

  function flyTo(tx, ty, ts, done) {
    if (state.reduceMotion) {
      state.x = tx; state.y = ty; state.scale = ts;
      applyTransform();
      if (done) done();
      return;
    }
    if (flying) cancelAnimationFrame(flying.raf);
    var sx = state.x, sy = state.y, ss = state.scale;
    var start = performance.now();
    var dur = 750;
    function ease(t) { return 1 - Math.pow(1 - t, 3); }
    function step(now) {
      var p = Math.min(1, (now - start) / dur);
      var e = ease(p);
      state.x = sx + (tx - sx) * e;
      state.y = sy + (ty - sy) * e;
      state.scale = ss + (ts - ss) * e;
      applyTransform();
      if (p < 1) {
        flying = { raf: requestAnimationFrame(step) };
      } else {
        flying = null;
        if (done) done();
      }
    }
    flying = { raf: requestAnimationFrame(step) };
  }

  function markActiveNode(id) {
    worldEl.querySelectorAll(".node.is-active").forEach(function (el) { el.classList.remove("is-active"); });
    edgesSvg.querySelectorAll(".edge.is-lit").forEach(function (el) { el.classList.remove("is-lit"); });
    var el = document.getElementById("node-" + id);
    if (el) el.classList.add("is-active");
    edgesSvg.querySelectorAll('[data-from="' + id + '"], [data-to="' + id + '"]').forEach(function (e) { e.classList.add("is-lit"); });
  }

  function overview() {
    var b = getWorldBounds();
    var rect = viewportEl.getBoundingClientRect();
    var w = b.maxX - b.minX, h = b.maxY - b.minY;
    var s = clampScale(Math.min(rect.width / w, rect.height / h) * 0.94);
    var cx = (b.minX + b.maxX) / 2, cy = (b.minY + b.maxY) / 2;
    flyTo(rect.width / 2 - cx * s, rect.height / 2 - cy * s, s);
  }

  // ---------------------------------------------------------------------
  // 4. Pointer / wheel / keyboard / pinch input
  // ---------------------------------------------------------------------
  function initInput() {
    var dragging = false, lastX = 0, lastY = 0, velX = 0, velY = 0, moved = false;
    var inertiaRaf = null;

    viewportEl.addEventListener("pointerdown", function (e) {
      if (e.target.closest(".node") && e.pointerType !== "touch") return; // let node click work; still allow drag on background
      dragging = true; moved = false;
      lastX = e.clientX; lastY = e.clientY;
      velX = 0; velY = 0;
      if (inertiaRaf) cancelAnimationFrame(inertiaRaf);
      viewportEl.setPointerCapture(e.pointerId);
    });
    viewportEl.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var dx = e.clientX - lastX, dy = e.clientY - lastY;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) moved = true;
      if (!moved) return;
      panBy(dx, dy);
      velX = dx; velY = dy;
      lastX = e.clientX; lastY = e.clientY;
    });
    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      if (moved && !state.reduceMotion) inertia();
    }
    viewportEl.addEventListener("pointerup", endDrag);
    viewportEl.addEventListener("pointercancel", endDrag);

    function inertia() {
      function step() {
        velX *= 0.92; velY *= 0.92;
        if (Math.abs(velX) < 0.4 && Math.abs(velY) < 0.4) return;
        panBy(velX, velY);
        inertiaRaf = requestAnimationFrame(step);
      }
      inertiaRaf = requestAnimationFrame(step);
    }

    viewportEl.addEventListener("wheel", function (e) {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        var factor = Math.exp(-e.deltaY * 0.01);
        zoomAt(e.clientX, e.clientY, factor);
      } else {
        panBy(-e.deltaX, -e.deltaY);
      }
    }, { passive: false });

    // Pinch (two-pointer distance ratio)
    var pointers = {};
    var pinchStartDist = null, pinchStartScale = 1;
    viewportEl.addEventListener("pointerdown", function (e) {
      pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
    });
    viewportEl.addEventListener("pointermove", function (e) {
      if (!pointers[e.pointerId]) return;
      pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
      var ids = Object.keys(pointers);
      if (ids.length === 2) {
        var p1 = pointers[ids[0]], p2 = pointers[ids[1]];
        var dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        var midX = (p1.x + p2.x) / 2, midY = (p1.y + p2.y) / 2;
        if (pinchStartDist == null) { pinchStartDist = dist; pinchStartScale = state.scale; }
        else {
          var target = clampScale(pinchStartScale * (dist / pinchStartDist));
          zoomAt(midX, midY, target / state.scale);
        }
      }
    });
    function clearPointer(e) { delete pointers[e.pointerId]; if (Object.keys(pointers).length < 2) pinchStartDist = null; }
    viewportEl.addEventListener("pointerup", clearPointer);
    viewportEl.addEventListener("pointercancel", clearPointer);

    window.addEventListener("keydown", function (e) {
      if (state.reading) return;
      if (document.activeElement && ["INPUT", "TEXTAREA"].indexOf(document.activeElement.tagName) !== -1) return;
      var step = 90;
      switch (e.key) {
        case "ArrowUp": panBy(0, step); e.preventDefault(); break;
        case "ArrowDown": panBy(0, -step); e.preventDefault(); break;
        case "ArrowLeft": panBy(step, 0); e.preventDefault(); break;
        case "ArrowRight": panBy(-step, 0); e.preventDefault(); break;
        case "+": case "=": zoomAt(innerWidth / 2, innerHeight / 2, 1.2); e.preventDefault(); break;
        case "-": case "_": zoomAt(innerWidth / 2, innerHeight / 2, 1 / 1.2); e.preventDefault(); break;
        case "0": overview(); e.preventDefault(); break;
        case "Home": flyToNode("hero", true); e.preventDefault(); break;
        case "r": case "R": toggleReading(); e.preventDefault(); break;
        case "l": case "L": toggleLang(); e.preventDefault(); break;
      }
    });
  }

  // ---------------------------------------------------------------------
  // 5. Minimap
  // ---------------------------------------------------------------------
  var minimapSvg, minimapViewportRect, worldBoundsCache;
  function renderMinimap(bounds) {
    worldBoundsCache = bounds;
    minimapSvg = document.getElementById("minimap-svg");
    minimapSvg.innerHTML = "";
    minimapSvg.setAttribute("viewBox", bounds.minX + " " + bounds.minY + " " + (bounds.maxX - bounds.minX) + " " + (bounds.maxY - bounds.minY));
    var bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bg.setAttribute("x", bounds.minX); bg.setAttribute("y", bounds.minY);
    bg.setAttribute("width", bounds.maxX - bounds.minX); bg.setAttribute("height", bounds.maxY - bounds.minY);
    bg.setAttribute("class", "minimap-bg");
    minimapSvg.appendChild(bg);
    nodes.forEach(function (n) {
      var r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      r.setAttribute("x", n.x); r.setAttribute("y", n.y);
      r.setAttribute("width", n.w); r.setAttribute("height", n.h);
      r.setAttribute("class", "minimap-node minimap-node--" + n.kind);
      minimapSvg.appendChild(r);
    });
    minimapViewportRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    minimapViewportRect.setAttribute("class", "minimap-viewport");
    minimapSvg.appendChild(minimapViewportRect);

    minimapSvg.addEventListener("click", function (e) {
      var pt = minimapSvg.createSVGPoint();
      pt.x = e.clientX; pt.y = e.clientY;
      var svgPt = pt.matrixTransform(minimapSvg.getScreenCTM().inverse());
      var rect = viewportEl.getBoundingClientRect();
      flyTo(rect.width / 2 - svgPt.x * state.scale, rect.height / 2 - svgPt.y * state.scale, state.scale);
    });
  }
  function updateMinimapViewport() {
    if (!minimapViewportRect || !viewportEl) return;
    var rect = viewportEl.getBoundingClientRect();
    var wx = -state.x / state.scale, wy = -state.y / state.scale;
    var ww = rect.width / state.scale, wh = rect.height / state.scale;
    minimapViewportRect.setAttribute("x", wx);
    minimapViewportRect.setAttribute("y", wy);
    minimapViewportRect.setAttribute("width", ww);
    minimapViewportRect.setAttribute("height", wh);
  }

  // ---------------------------------------------------------------------
  // 6. Reading mode (same data, linear document)
  // ---------------------------------------------------------------------
  function renderReadingMode() {
    var root = document.getElementById("reading-root");
    var html = '<p id="reading-intro" class="node-fineprint" style="text-align:center;margin-bottom:1rem;color:#9a9fa6"></p>';
    html += '<header class="read-hero">' +
      '<img src="' + D.identity.photo + '" alt="" width="88" height="88">' +
      '<p class="node-kicker">' + esc(t("heroKicker")) + '</p>' +
      '<h1>' + esc(t("heroTitle")) + '</h1>' +
      '<p class="node-lede">' + esc(t("heroLede")) + '</p>' +
      '<p class="node-fineprint">' + esc(t("heroLocation")) + '</p></header>';

    html += '<section aria-labelledby="read-about-h"><h2 id="read-about-h">' + esc(t("sectionAbout")) + '</h2>' +
      D.about[state.lang].map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + '</section>';

    html += '<section aria-labelledby="read-tl-h"><h2 id="read-tl-h">' + esc(t("sectionTimeline")) + '</h2>';
    roleOrder.slice().reverse().forEach(function (rid) {
      var r = D.roles.filter(function (x) { return x.id === rid; })[0];
      var company = typeof r.company === "object" ? pick(r.company) : r.company;
      html += '<article class="read-card"><p class="node-kicker">' + esc(r.period) + '</p>' +
        '<h3>' + esc(company) + (r.client ? " · " + esc(r.client) : "") + '</h3>' +
        '<p class="node-role">' + esc(pick(r.role)) + '</p>' +
        '<ul class="bullets">' + r.bullets[state.lang].map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("") + '</ul></article>';
    });
    html += "</section>";

    html += '<section aria-labelledby="read-cs-h"><h2 id="read-cs-h">' + esc(t("sectionCases")) + '</h2>';
    D.caseStudies.forEach(function (cs) {
      html += '<article class="read-card"><h3>' + esc(pick(cs.title)) + '</h3><p>' + esc(pick(cs.summary)) + '</p></article>';
    });
    html += "</section>";

    html += '<section aria-labelledby="read-m-h"><h2 id="read-m-h">' + esc(t("sectionMetrics")) + '</h2><div class="read-metric-grid">';
    D.metrics.forEach(function (m) {
      html += '<div class="read-card"><p class="metric-value">' + esc(m.value) + '</p><p class="metric-label">' + esc(pick(m.label)) + '</p></div>';
    });
    html += "</div></section>";

    html += '<section aria-labelledby="read-r-h"><h2 id="read-r-h">' + esc(t("sectionRecs")) + '</h2>';
    D.recommendations.forEach(function (rec) {
      html += '<blockquote class="read-card quote">“' + esc(pick(rec.quote)) + '”<footer class="quote-attr">' + esc(rec.author) + " · " + esc(pick(rec.role)) + '</footer></blockquote>';
    });
    html += "</section>";

    html += '<section aria-labelledby="read-sk-h"><h2 id="read-sk-h">' + esc(t("sectionSkills")) + '</h2>' +
      D.skills.groups.map(function (g) {
        return '<div class="skill-group"><h3>' + esc(pick(g.label)) + '</h3><ul class="chiplist">' +
          g.items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul></div>";
      }).join("") + '</section>';

    root.innerHTML = html;
  }

  function toggleReading() {
    state.reading = !state.reading;
    document.body.classList.toggle("mode-reading", state.reading);
    updateChrome();
  }

  // ---------------------------------------------------------------------
  // 7. Chrome (toolbar labels) + language
  // ---------------------------------------------------------------------
  function updateChrome() {
    document.documentElement.lang = state.lang;
    document.getElementById("skip-link").textContent = t("skip");
    document.getElementById("brand").textContent = t("brand");
    document.getElementById("lang-toggle").textContent = t("langToggle");
    document.getElementById("mode-toggle").textContent = state.reading ? t("readingModeOff") : t("readingModeOn");
    document.getElementById("mode-toggle").setAttribute("aria-pressed", String(state.reading));
    document.getElementById("zoom-in").setAttribute("aria-label", t("zoomIn"));
    document.getElementById("zoom-out").setAttribute("aria-label", t("zoomOut"));
    document.getElementById("reset-view").textContent = t("resetView");
    document.getElementById("minimap-title").textContent = t("minimapLabel");
    document.getElementById("help-hint").textContent = t("helpHint");
    document.getElementById("cv-en").textContent = t("cvEn");
    document.getElementById("cv-es").textContent = t("cvEs");
    document.getElementById("link-email").textContent = t("email");
    document.getElementById("link-linkedin").textContent = t("linkedin");
    document.getElementById("link-github").textContent = t("github");
    document.getElementById("a11y-note").textContent = t("accessibilityNote");
    document.getElementById("reading-intro").textContent = t("readingIntro");
    document.title = D.identity.name + " — " + pick(D.identity.title);
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("heroLede"));
  }

  function toggleLang() {
    state.lang = state.lang === "en" ? "es" : "en";
    buildDom();
    applyTransform();
  }

  // ---------------------------------------------------------------------
  // 8. Wire static chrome controls + init
  // ---------------------------------------------------------------------
  function initChrome() {
    document.getElementById("lang-toggle").addEventListener("click", toggleLang);
    document.getElementById("mode-toggle").addEventListener("click", toggleReading);
    document.getElementById("zoom-in").addEventListener("click", function () { zoomAt(innerWidth / 2, innerHeight / 2, 1.3); });
    document.getElementById("zoom-out").addEventListener("click", function () { zoomAt(innerWidth / 2, innerHeight / 2, 1 / 1.3); });
    document.getElementById("reset-view").addEventListener("click", overview);
    document.getElementById("link-email").href = "mailto:" + D.contact.email;
    document.getElementById("link-linkedin").href = D.contact.linkedin;
    document.getElementById("link-github").href = D.contact.github;
    document.getElementById("cv-en").href = D.contact.cvEn;
    document.getElementById("cv-es").href = D.contact.cvEs;
    reduceMotionMQ.addEventListener("change", function (e) { state.reduceMotion = e.matches; });
  }

  function init() {
    buildDom();
    initInput();
    initChrome();

    var rect = viewportEl.getBoundingClientRect();
    if (state.reduceMotion) {
      flyToNode("hero", false);
    } else {
      var b = getWorldBounds();
      var w = b.maxX - b.minX, h = b.maxY - b.minY;
      var s = Math.min(rect.width / w, rect.height / h) * 0.94;
      state.scale = s;
      state.x = rect.width / 2 - (b.minX + b.maxX) / 2 * s;
      state.y = rect.height / 2 - (b.minY + b.maxY) / 2 * s;
      applyTransform();
      setTimeout(function () { flyToNode("hero", false); }, 900);
    }
    window.addEventListener("resize", applyTransform);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
