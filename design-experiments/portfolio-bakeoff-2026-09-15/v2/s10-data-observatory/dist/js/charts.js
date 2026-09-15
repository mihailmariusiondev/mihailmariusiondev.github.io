/* Hand-rolled SVG chart renderers. No charting library. */
(function () {
  const SVGNS = "http://www.w3.org/2000/svg";
  function el(tag, attrs, parent) {
    const e = document.createElementNS(SVGNS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const domainColor = {
    ecommerce: "#5eead4",
    education: "#f6b93b",
    banking: "#7dd3fc",
    public: "#c4b5fd",
    other: "#94a3b8",
    break: "#3a4453",
    dotnet: "#fca5a5",
  };
  window.CHART_DOMAIN_COLOR = domainColor;

  // --- Timeline chart: horizontal bars scaled by year -------------------
  window.renderTimeline = function (svg, roles, lang) {
    svg.innerHTML = "";
    const W = 900, rowH = 30, padTop = 10;
    const years = [2018, 2026.75];
    const chartLeft = 0, chartRight = W;
    const scaleX = (y) => chartLeft + ((y - years[0]) / (years[1] - years[0])) * (chartRight - chartLeft);
    const H = padTop + roles.length * rowH + 30;
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", lang === "es" ? "Cronología de puestos de 2018 a 2026" : "Timeline of roles from 2018 to 2026");

    // year gridlines
    const axis = el("g", { class: "timeline-axis" }, svg);
    for (let y = 2018; y <= 2026; y += 2) {
      const x = scaleX(y);
      el("line", { x1: x, x2: x, y1: 0, y2: roles.length * rowH + 6, "stroke-width": 1 }, axis);
      const t = el("text", { x: x, y: roles.length * rowH + 20 }, axis);
      t.textContent = y;
    }

    roles.forEach((r, i) => {
      const y = padTop + i * rowH;
      const x1 = scaleX(r.start), x2 = scaleX(r.end);
      const w = Math.max(x2 - x1, 3);
      const g = el("g", {}, svg);
      const label = el("text", { class: "timeline-row-label", x: 0, y: y + rowH - 12, "text-anchor": "start" }, g);
      label.textContent = (typeof r.company === "string" ? r.company : r.company[lang]) + (r.client && r.client[lang] !== "—" ? " · " + r.client[lang] : "");
      const barY = y + rowH - 9;
      el("rect", { x: x1, y: barY, width: reduced() ? w : 0, height: 8, rx: 4, class: "timeline-bar", fill: domainColor[r.domain] || "#5eead4", "data-final-w": w }, g);
    });

    if (!reduced()) {
      requestAnimationFrame(() => {
        svg.querySelectorAll(".timeline-bar").forEach((r) => {
          r.setAttribute("width", r.getAttribute("data-final-w"));
        });
      });
    }
  };

  // --- Simple two-bar before/after chart ---------------------------------
  window.renderBeforeAfter = function (svg, beforeVal, afterVal, beforeLabel, afterLabel) {
    svg.innerHTML = "";
    const W = 420, barH = 30, gap = 26, rowBlock = 22 + barH + gap;
    const H = rowBlock * 2 - gap + 6;
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", `${beforeLabel}: ${beforeVal}. ${afterLabel}: ${afterVal}.`);
    const maxW = W;
    const scale = (v) => (v / beforeVal) * maxW;
    const rows = [
      { v: beforeVal, label: beforeLabel, cls: "bar-fill-amber", y: 0 },
      { v: afterVal, label: afterLabel, cls: "bar-fill-teal", y: rowBlock },
    ];
    rows.forEach((row) => {
      const t = el("text", { x: 0, y: row.y + 14, class: "bar-label" }, svg);
      t.textContent = row.label;
      el("rect", { x: 0, y: row.y + 22, width: maxW, height: barH, rx: 6, class: "bar-track" }, svg);
      const w = scale(row.v);
      const bar = el("rect", { x: 0, y: row.y + 22, width: reduced() ? w : 0, height: barH, rx: 6, class: row.cls, "data-final-w": w }, svg);
      if (!reduced()) requestAnimationFrame(() => bar.setAttribute("width", bar.getAttribute("data-final-w")));
    });
  };

  // --- Stacked single bar (kept vs identified-removable) ------------------
  window.renderStackedBar = function (svg, total, part, totalLabel, partLabel) {
    svg.innerHTML = "";
    const W = 420, H = 70, barH = 40;
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", `${totalLabel}: ${total}. ${partLabel}: ${part}.`);
    el("rect", { x: 0, y: 0, width: W, height: barH, rx: 6, class: "bar-track" }, svg);
    const partW = (part / total) * W;
    const bar = el("rect", { x: 0, y: 0, width: reduced() ? partW : 0, height: barH, rx: 6, class: "bar-fill-amber", "data-final-w": partW }, svg);
    if (!reduced()) requestAnimationFrame(() => bar.setAttribute("width", bar.getAttribute("data-final-w")));
    const t1 = el("text", { x: 8, y: barH + 24, class: "bar-label" }, svg);
    t1.textContent = partLabel;
    const t2 = el("text", { x: W, y: barH + 24, class: "bar-label", "text-anchor": "end" }, svg);
    t2.textContent = totalLabel;
  };

  // --- Radial gauge (percentage) ------------------------------------------
  window.renderGauge = function (svg, pct, centerLabel, srLabel) {
    svg.innerHTML = "";
    const W = 200, H = 200, cx = W / 2, cy = H / 2, r = 78;
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", srLabel);
    const circumference = 2 * Math.PI * r;
    el("circle", { cx, cy, r, fill: "none", stroke: "#232c39", "stroke-width": 14 }, svg);
    const target = circumference * (pct / 100);
    const arc = el("circle", {
      cx, cy, r, fill: "none", stroke: "#5eead4", "stroke-width": 14,
      "stroke-linecap": "round",
      "stroke-dasharray": `${circumference}`,
      "stroke-dashoffset": reduced() ? circumference - target : circumference,
      transform: `rotate(-90 ${cx} ${cy})`,
    }, svg);
    const t = el("text", { x: cx, y: cy + 8, "text-anchor": "middle", class: "chart-big-svg" }, svg);
    t.setAttribute("fill", "#f2f1ea");
    t.setAttribute("font-family", "IBM Plex Mono, monospace");
    t.setAttribute("font-size", "28");
    t.setAttribute("font-weight", "700");
    t.textContent = centerLabel;
    if (!reduced()) {
      requestAnimationFrame(() => {
        arc.style.transition = "stroke-dashoffset 1s cubic-bezier(.2,.8,.2,1)";
        arc.setAttribute("stroke-dashoffset", String(circumference - target));
      });
    }
  };

  // --- Grouped horizontal bars (people/team icons as bars) -----------------
  window.renderGroupedBars = function (svg, items) {
    // items: [{label, value, max, color}]
    svg.innerHTML = "";
    const W = 420, rowH = 44, padTop = 4;
    const H = padTop + items.length * rowH + 10;
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", items.map((i) => `${i.label}: ${i.value}`).join(". "));
    const maxW = W - 10;
    items.forEach((item, i) => {
      const y = padTop + i * rowH;
      el("rect", { x: 0, y: y + 18, width: maxW, height: 14, rx: 7, class: "bar-track" }, svg);
      const w = (item.value / item.max) * maxW;
      const bar = el("rect", { x: 0, y: y + 18, width: reduced() ? w : 0, height: 14, rx: 7, fill: item.color, "data-final-w": w }, svg);
      const label = el("text", { x: 0, y: y + 12, class: "bar-label" }, svg);
      label.textContent = item.label;
      if (!reduced()) requestAnimationFrame(() => bar.setAttribute("width", bar.getAttribute("data-final-w")));
    });
  };

  // --- Simple proportion bar (n of total) ---------------------------------
  window.renderProportion = function (svg, n, total, label) {
    svg.innerHTML = "";
    const W = 420, H = 60, barH = 34;
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", label);
    el("rect", { x: 0, y: 0, width: W, height: barH, rx: 6, class: "bar-track" }, svg);
    const w = (n / total) * W;
    const bar = el("rect", { x: 0, y: 0, width: reduced() ? w : 0, height: barH, rx: 6, class: "bar-fill-amber", "data-final-w": w }, svg);
    if (!reduced()) requestAnimationFrame(() => bar.setAttribute("width", bar.getAttribute("data-final-w")));
  };
})();
