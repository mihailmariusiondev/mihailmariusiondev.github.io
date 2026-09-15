(function () {
  "use strict";
  const S = window.SITE;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- i18n ---------------- */
  let lang = "en";

  function tx(node) {
    return node[lang];
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function renderText() {
    document.documentElement.lang = lang;
    document.title = tx(S.meta).title;
    document
      .querySelector('meta[name="description"]')
      .setAttribute("content", tx(S.meta).description);

    document.querySelectorAll("[data-nav]").forEach((a) => {
      a.textContent = S.nav[lang][+a.dataset.nav];
    });

    const langBtn = document.getElementById("langToggle");
    langBtn.textContent = lang === "en" ? "ES" : "EN";
    langBtn.setAttribute("aria-pressed", lang === "es");
    langBtn.setAttribute(
      "aria-label",
      lang === "en" ? "Ver esta página en español" : "View this page in English"
    );

    setText("hero-eyebrow", tx(S.hero.eyebrow));
    setText("hero-role", tx(S.hero.role));
    setText("hero-lede", tx(S.hero.lede));
    setText("hero-location", tx(S.hero.location));
    setText("hero-cta-cases", tx(S.hero.ctaCases));
    setText("hero-caption", tx(S.hero.canvasCaption));
    const ctaCv = document.getElementById("hero-cta-cv");
    ctaCv.textContent = tx(S.hero.ctaCv);
    ctaCv.href = lang === "en" ? S.contact.cvEn : S.contact.cvEs;

    setText("stats-eyebrow", tx(S.stats.heading));
    setText("stats-h", tx(S.stats.heading).replace(/^Plate 0?\d\s*—\s*/i, "").replace(/^Lámina 0?\d\s*—\s*/i, ""));
    setText("stats-lede", tx(S.stats.lede));

    setText("work-eyebrow", tx(S.work.heading));
    setText("work-h", tx(S.work.heading).replace(/^Plate 0?\d\s*—\s*/i, "").replace(/^Lámina 0?\d\s*—\s*/i, ""));
    setText("work-lede", tx(S.work.lede));

    setText("timeline-eyebrow", tx(S.timeline.heading));
    setText("timeline-h", tx(S.timeline.heading).replace(/^Plate 0?\d\s*—\s*/i, "").replace(/^Lámina 0?\d\s*—\s*/i, ""));
    setText("timeline-lede", tx(S.timeline.lede));
    setText("recs-h", tx(S.timeline.recsHeading));

    setText("contact-eyebrow", tx(S.contact.heading));
    setText("contact-h", tx(S.contact.heading).replace(/^Plate 0?\d\s*—\s*/i, "").replace(/^Lámina 0?\d\s*—\s*/i, ""));
    setText("contact-lede", tx(S.contact.lede));
    setText("contact-travel", tx(S.contact.travel));
    setText("contact-closing", tx(S.contact.closing));
    setText("footer-a11y", tx(S.footer.a11y));
    setText("footer-built", tx(S.footer.built));

    document.getElementById("contact-cv-en").textContent =
      (lang === "en" ? "Download CV (EN)" : "Descargar CV (EN)");
    document.getElementById("contact-cv-es").textContent =
      (lang === "en" ? "Download CV (ES)" : "Descargar CV (ES)");

    renderStats();
    renderWork();
    renderTimelineList();
    renderRecs();
    renderContactLinks();
  }

  function renderStats() {
    const grid = document.getElementById("statsGrid");
    grid.innerHTML = "";
    S.stats.items.forEach((item, i) => {
      const el = document.createElement("article");
      el.className = "stat";
      el.innerHTML = `
        <canvas data-sketch="${item.sketch}" width="300" height="112"></canvas>
        <div class="stat__value">${tx(item.value)}</div>
        <div class="stat__sub">${tx(item.sub)}</div>
        <p class="stat__label">${tx(item.label)}</p>`;
      grid.appendChild(el);
    });
    mountStatCanvases();
  }

  function renderWork() {
    const list = document.getElementById("workList");
    list.innerHTML = "";
    S.work.items.forEach((cs, i) => {
      const details = document.createElement("details");
      details.className = "case";
      if (i === 0) details.open = true;
      const fieldsHtml = cs.fields
        .map(
          (f) => `<div class="case__field"><dt>${tx(f.l)}</dt><dd>${tx(f.v)}</dd></div>`
        )
        .join("");
      const sanitizedHtml = cs.sanitized
        ? `<p class="case__sanitized">${tx(S.work.sanitized)}</p>`
        : "";
      details.innerHTML = `
        <summary class="case__head">
          <canvas class="case__glyph" data-glyph="${cs.slug}" width="64" height="64" aria-hidden="true"></canvas>
          <span class="case__titlewrap">
            <p class="case__title">${tx(cs.title)}</p>
            <p class="case__summary">${tx(cs.summary)}</p>
          </span>
          <span class="case__chevron" aria-hidden="true">+</span>
        </summary>
        <div class="case__body">
          <ul class="case__tags">${cs.tags.map((t) => `<li>${t}</li>`).join("")}</ul>
          <dl style="display:grid;gap:1.1rem;">${fieldsHtml}</dl>
          ${sanitizedHtml}
        </div>`;
      list.appendChild(details);
    });
    mountGlyphCanvases();
  }

  function fmtMonth(ym) {
    const [y, m] = ym.split("-").map(Number);
    const names = {
      en: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      es: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],
    };
    return `${names[lang][m - 1]} ${y}`;
  }

  function renderTimelineList() {
    const list = document.getElementById("timelineList");
    list.innerHTML = "";
    S.timeline.items.forEach((item) => {
      const li = document.createElement("li");
      li.className = "tl-item";
      const company = typeof item.company === "string" ? item.company : tx(item.company);
      const role = tx(item.role);
      li.innerHTML = `
        <span class="tl-item__bar" style="background:${domainColor(item.domain)}"></span>
        <span>
          <span class="tl-item__role"><span class="tl-item__company">${company}</span>${role ? " — " + role : ""}</span><br/>
          ${item.client ? `<span class="tl-item__client">${tx(S.timeline.clientLabel)}: ${item.client}</span>` : ""}
        </span>
        <span class="tl-item__period">${fmtMonth(item.start)} – ${fmtMonth(item.end)}</span>`;
      list.appendChild(li);
    });
  }

  function renderRecs() {
    const wrap = document.getElementById("recsList");
    wrap.innerHTML = "";
    S.timeline.recs.forEach((r) => {
      const el = document.createElement("blockquote");
      el.className = "rec";
      const note = tx(r.note);
      el.innerHTML = `
        <p>&ldquo;${tx(r.quote)}&rdquo;</p>
        <cite>${r.author} — ${tx(r.role)}</cite>
        ${note ? `<small>${note}</small>` : ""}`;
      wrap.appendChild(el);
    });
  }

  function renderContactLinks() {
    const ul = document.getElementById("contactLinks");
    ul.innerHTML = "";
    S.contact.links.forEach((l) => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${l.href}">${tx(l.label)}: ${l.value}</a>`;
      ul.appendChild(li);
    });
  }

  function domainColor(domain) {
    return (
      {
        ecom: "#e8402c",
        bank: "#1c3557",
        edu: "#c98a1c",
        gov: "#5c8a6d",
        startup: "#8a5ce8",
        indep: "#8a8880",
        fullstack: "#0e0e0f",
      }[domain] || "#0e0e0f"
    );
  }

  document.getElementById("langToggle").addEventListener("click", () => {
    lang = lang === "en" ? "es" : "en";
    renderText();
  });

  /* ---------------- canvas helpers ---------------- */
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  function fit(canvas) {
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width || canvas.width));
    const h = Math.max(1, Math.round(rect.height || canvas.height));
    if (canvas._w === w && canvas._h === h) return canvas.getContext("2d");
    canvas._w = w;
    canvas._h = h;
    canvas.width = w * DPR;
    canvas.height = h * DPR;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    return ctx;
  }

  function runGated(canvas, draw) {
    // draw(ctx, w, h, t, active) called every frame while visible; static
    // single frame under reduced motion.
    let raf = null;
    let visible = false;
    const ctx0 = fit(canvas);
    if (reduceMotion) {
      draw(ctx0, canvas._w, canvas._h, 0, false);
      window.addEventListener("resize", () => draw(fit(canvas), canvas._w, canvas._h, 0, false));
      return;
    }
    function loop(t) {
      const ctx = fit(canvas);
      draw(ctx, canvas._w, canvas._h, t, true);
      raf = requestAnimationFrame(loop);
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !visible) {
            visible = true;
            raf = requestAnimationFrame(loop);
          } else if (!e.isIntersecting && visible) {
            visible = false;
            if (raf) cancelAnimationFrame(raf);
          }
        });
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);
  }

  /* ---------------- hero flow field: 570 -> 22 ---------------- */
  (function heroField() {
    const canvas = document.getElementById("heroCanvas");
    const N = 570;
    const SETTLE = 22;
    const particles = [];
    for (let i = 0; i < N; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        vx: 0,
        vy: 0,
      });
    }
    let pointer = { x: -1, y: -1, active: false };
    canvas.addEventListener("pointermove", (e) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - r.left) / r.width;
      pointer.y = (e.clientY - r.top) / r.height;
      pointer.active = true;
    });
    canvas.addEventListener("pointerleave", () => (pointer.active = false));

    function scrollProgress() {
      const section = canvas.closest("section");
      const r = section.getBoundingClientRect();
      const p = 1 - Math.min(1, Math.max(0, r.bottom / (r.height + window.innerHeight)));
      return Math.min(1, Math.max(0, p * 1.6));
    }

    function angleAt(x, y, t) {
      return (
        Math.sin(x * 6 + t * 0.00018) * 1.3 +
        Math.cos(y * 5 - t * 0.00013) * 1.3
      );
    }

    runGated(canvas, (ctx, w, h, t, animated) => {
      const progress = animated ? scrollProgress() : 1;
      const active = Math.round(N - (N - SETTLE) * progress);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(244,241,234,0.9)";
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < N; i++) {
        const p = particles[i];
        const isActive = i < active;
        if (animated) {
          const a = angleAt(p.x, p.y, t);
          p.vx += Math.cos(a) * 0.00012;
          p.vy += Math.sin(a) * 0.00012;
          if (pointer.active) {
            const dx = p.x - pointer.x;
            const dy = (p.y - pointer.y) * (w / h);
            const d2 = dx * dx + dy * dy + 0.001;
            const f = Math.min(0.0018, 0.00003 / d2);
            p.vx += dx * f;
            p.vy += dy * f;
          }
          p.vx *= 0.96;
          p.vy *= 0.96;
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x += 1;
          if (p.x > 1) p.x -= 1;
          if (p.y < 0) p.y += 1;
          if (p.y > 1) p.y -= 1;
        }
        if (!isActive && animated) continue;
        const px = p.x * w;
        const py = p.y * h;
        const r = isActive ? (i < SETTLE ? 3.4 : 1.6) : 1.1;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = i < SETTLE ? "rgba(232,64,44,0.9)" : "rgba(14,14,15,0.28)";
        ctx.fill();
      }

      // faint grid hairlines to keep the poster-grid identity
      ctx.strokeStyle = "rgba(14,14,15,0.05)";
      ctx.lineWidth = 1;
      for (let i = 1; i < 12; i++) {
        const x = (w / 12) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
    });
  })();

  /* ---------------- stat sketches ---------------- */
  function mountStatCanvases() {
    document.querySelectorAll("canvas[data-sketch]").forEach((canvas) => {
      const kind = canvas.dataset.sketch;
      const fn = SKETCHES[kind];
      if (fn) runGated(canvas, fn);
    });
  }

  const SKETCHES = {
    shrink(ctx, w, h, t) {
      ctx.clearRect(0, 0, w, h);
      const period = 6000;
      const phase = (t % period) / period;
      const progress = (Math.sin(phase * Math.PI * 2 - Math.PI / 2) + 1) / 2; // 0..1..0
      const total = 60; // scaled representation of 570
      const settle = Math.round(60 * (22 / 570)) || 3;
      const active = Math.round(total - (total - settle) * progress);
      for (let i = 0; i < total; i++) {
        const seed = i * 97.13;
        const x = ((Math.sin(seed) * 0.5 + 0.5) * 0.9 + 0.05) * w;
        const y = ((Math.cos(seed * 1.7) * 0.5 + 0.5) * 0.8 + 0.1) * h;
        const isKeep = i < settle;
        const shown = isKeep || i < active;
        if (!shown) continue;
        ctx.beginPath();
        ctx.arc(x, y, isKeep ? 3.6 : 1.6, 0, Math.PI * 2);
        ctx.fillStyle = isKeep ? "#e8402c" : "rgba(14,14,15,0.3)";
        ctx.fill();
      }
    },
    funnel(ctx, w, h, t) {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(14,14,15,0.25)";
      ctx.beginPath();
      ctx.moveTo(w * 0.5 - 6, 0);
      ctx.lineTo(w * 0.05, h);
      ctx.moveTo(w * 0.5 + 6, 0);
      ctx.lineTo(w * 0.95, h);
      ctx.stroke();
      const N = 70;
      for (let i = 0; i < N; i++) {
        const speed = 0.00035 + (i % 5) * 0.00004;
        const life = ((t * speed + i / N) % 1);
        const yFrac = 1 - life;
        const halfWidth = 0.5 - yFrac * 0.45;
        const seed = Math.sin(i * 12.9) * 0.5 + 0.5;
        const passes = i < 1; // ~1.4% of 70 ~ 1 dot passes the gate
        const x = passes
          ? w * 0.5 + (seed - 0.5) * 10
          : w * (0.5 + (seed - 0.5) * 2 * halfWidth);
        const y = yFrac * h;
        ctx.beginPath();
        ctx.arc(x, y, passes ? 3 : 1.6, 0, Math.PI * 2);
        ctx.fillStyle = passes ? "#e8402c" : "rgba(14,14,15,0.28)";
        ctx.fill();
      }
    },
    grid34(ctx, w, h, t) {
      ctx.clearRect(0, 0, w, h);
      const cols = 8,
        rows = 5,
        total = 34,
        merged = 23;
      const cell = Math.min(w / cols, h / rows) * 0.82;
      const gx = (w - cell * cols) / 2;
      const gy = (h - cell * rows) / 2;
      const wave = (t * 0.004) % (total + 10);
      for (let i = 0; i < total; i++) {
        const col = i % cols;
        const row = (i / cols) | 0;
        const x = gx + col * cell;
        const y = gy + row * cell;
        const on = wave > i;
        const isMerged = i < merged;
        ctx.fillStyle = on ? (isMerged ? "#e8402c" : "rgba(14,14,15,0.75)") : "rgba(14,14,15,0.08)";
        ctx.fillRect(x, y, cell * 0.82, cell * 0.82);
      }
    },
    prune(ctx, w, h, t) {
      ctx.clearRect(0, 0, w, h);
      const total = 53,
        retired = 21;
      const barW = w / total;
      const sweep = (t * 0.003) % (total + 15);
      for (let i = 0; i < total; i++) {
        const isRetired = i % Math.round(total / retired) === 0 && i / Math.round(total / retired) < retired;
        const passed = sweep > i;
        const baseH = 0.35 + (Math.sin(i * 3.1) * 0.5 + 0.5) * 0.5;
        const heightFrac = isRetired && passed ? baseH * 0.15 : baseH;
        const barH = heightFrac * h;
        ctx.fillStyle = isRetired ? (passed ? "rgba(232,64,44,0.4)" : "#e8402c") : "#0e0e0f";
        ctx.fillRect(i * barW + 0.5, h - barH, Math.max(1, barW - 1), barH);
      }
    },
    adopt(ctx, w, h, t) {
      ctx.clearRect(0, 0, w, h);
      const originX = w * 0.22,
        originY = h * 0.7;
      const destX = w * 0.78,
        destY = h * 0.3;
      ctx.fillStyle = "#1c3557";
      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(originX + Math.cos(a) * 14, originY + Math.sin(a) * 10, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = "#c98a1c";
      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(destX + Math.cos(a) * 14, destY + Math.sin(a) * 10, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      const period = 2600;
      const phase = (t % period) / period;
      const mx = originX + (destX - originX) * phase;
      const my = originY + (destY - originY) * phase - Math.sin(phase * Math.PI) * 24;
      ctx.strokeStyle = "rgba(232,64,44,0.5)";
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.quadraticCurveTo((originX + destX) / 2, Math.min(originY, destY) - 24, destX, destY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(mx, my, 3.4, 0, Math.PI * 2);
      ctx.fillStyle = "#e8402c";
      ctx.fill();
    },
  };

  /* ---------------- case study glyphs (seeded from slug) ---------------- */
  function hashSeed(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
    return h;
  }

  function mountGlyphCanvases() {
    document.querySelectorAll("canvas[data-glyph]").forEach((canvas) => {
      const seed = hashSeed(canvas.dataset.glyph);
      runGated(canvas, (ctx, w, h, t, animated) => {
        ctx.clearRect(0, 0, w, h);
        const N = 9;
        for (let i = 0; i < N; i++) {
          const s = seed + i * 733;
          const ang = ((s % 360) / 360) * Math.PI * 2 + (animated ? t * 0.0002 : 0);
          const rad = (0.2 + ((s % 100) / 100) * 0.32) * Math.min(w, h);
          const x = w / 2 + Math.cos(ang) * rad;
          const y = h / 2 + Math.sin(ang) * rad;
          ctx.beginPath();
          ctx.arc(x, y, 2 + (s % 3), 0, Math.PI * 2);
          ctx.fillStyle = i % 4 === 0 ? "#e8402c" : "rgba(14,14,15,0.7)";
          ctx.fill();
        }
      });
    });
  }

  /* ---------------- timeline canvas: scroll-scrubbed gantt ---------------- */
  (function timelineChart() {
    const canvas = document.getElementById("timelineCanvas");
    const items = S.timeline.items;
    const monthsSince = (ym, base) => {
      const [y, m] = ym.split("-").map(Number);
      const [by, bm] = base;
      return (y - by) * 12 + (m - bm);
    };
    const base = [2018, 7];
    const totalMonths = monthsSince("2026-07", base);
    const rows = items.length;

    runGated(canvas, (ctx, w, h, t, animated) => {
      ctx.clearRect(0, 0, w, h);
      const padL = 8,
        padR = 8,
        padT = 10,
        padB = 20;
      const rowH = (h - padT - padB) / rows;
      const chartW = w - padL - padR;

      let progress = 1;
      if (animated) {
        const r = canvas.getBoundingClientRect();
        progress = Math.min(
          1,
          Math.max(0, 1 - r.top / (window.innerHeight * 0.9))
        );
      }
      const playheadMonth = totalMonths * progress;

      items.forEach((it, i) => {
        const y = padT + i * rowH;
        const startM = monthsSince(it.start, base);
        const endM = monthsSince(it.end, base);
        const x1 = padL + (startM / totalMonths) * chartW;
        const x2 = padL + (endM / totalMonths) * chartW;
        const active = playheadMonth >= startM && playheadMonth <= endM;
        ctx.fillStyle = domainColor(it.domain);
        ctx.globalAlpha = animated ? (active ? 1 : 0.35) : 0.9;
        ctx.fillRect(x1, y + rowH * 0.2, Math.max(2, x2 - x1), rowH * 0.6);
        ctx.globalAlpha = 1;
      });

      // axis hairline
      ctx.strokeStyle = "rgba(14,14,15,0.15)";
      ctx.beginPath();
      ctx.moveTo(padL, h - padB + 4);
      ctx.lineTo(w - padR, h - padB + 4);
      ctx.stroke();
      ctx.fillStyle = "rgba(14,14,15,0.5)";
      ctx.font = "11px ui-monospace, monospace";
      ctx.fillText("2018", padL, h - 4);
      ctx.fillText("2026", w - padR - 30, h - 4);

      if (animated) {
        const px = padL + (playheadMonth / totalMonths) * chartW;
        ctx.strokeStyle = "#e8402c";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(px, padT - 4);
        ctx.lineTo(px, h - padB + 8);
        ctx.stroke();
      }
    });
  })();

  renderText();
})();
