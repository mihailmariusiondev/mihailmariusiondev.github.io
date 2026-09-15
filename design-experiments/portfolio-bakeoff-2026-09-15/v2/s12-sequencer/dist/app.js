(function () {
  "use strict";
  var D = window.SITE_DATA;
  var lang = "en";
  var soundOn = false;
  var audioCtx = null;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function t(loc) {
    if (loc == null) return "";
    if (typeof loc === "string") return loc;
    return loc[lang] != null ? loc[lang] : loc.en;
  }

  // ---------- i18n ----------
  function applyStaticI18n() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var val = D.ui[key];
      if (val) el.textContent = t(val);
    });
    var lt = document.getElementById("langToggle");
    lt.textContent = t(D.ui.langSwitch);
    lt.setAttribute("aria-label", t(D.ui.langSwitchLabel));
    document.getElementById("cvLink").href = lang === "es" ? "assets/marius-mihail-ion-cv-es.pdf" : "assets/marius-mihail-ion-cv.pdf";
    document.title = lang === "es"
      ? "Marius Mihail Ion · Ingeniero Frontend Sénior (Angular)"
      : "Marius Mihail Ion · Senior Angular / Frontend Engineer";
  }

  // ---------- Tracks ----------
  var STEP_COUNT = 8;
  function renderTracks() {
    var list = document.getElementById("tracklist");
    list.innerHTML = "";
    D.experience.forEach(function (role, i) {
      var li = document.createElement("li");
      var btn = document.createElement("button");
      btn.className = "track";
      btn.type = "button";
      btn.setAttribute("aria-expanded", "false");
      btn.dataset.index = i;

      var num = document.createElement("span");
      num.className = "track__num";
      num.textContent = String(i + 1).padStart(2, "0");

      var body = document.createElement("span");
      body.className = "track__body";
      var roleName = document.createElement("span");
      roleName.className = "track__role";
      roleName.textContent = t(role.role) || t(role.company);
      var meta = document.createElement("span");
      meta.className = "track__meta";
      meta.textContent = t(role.company) + (role.client ? " · " + role.client : "") + " — " + t(role.period);
      body.appendChild(roleName);
      body.appendChild(meta);

      var steps = document.createElement("span");
      steps.className = "track__steps";
      steps.setAttribute("aria-hidden", "true");
      var lit = 1 + (i % (STEP_COUNT - 1)); // deterministic pattern per track, not random noise
      for (var s = 0; s < STEP_COUNT; s++) {
        var step = document.createElement("span");
        step.className = "step" + (s < lit ? " is-on" : "");
        step.dataset.step = s;
        steps.appendChild(step);
      }

      var panel = document.createElement("span");
      panel.className = "track__panel";
      panel.innerHTML =
        "<strong>" + t(role.role) + "</strong><br>" +
        t(role.company) + (role.client ? " · " + esc(role.client) : "") + "<br>" +
        t(role.period);

      btn.appendChild(num);
      btn.appendChild(body);
      btn.appendChild(steps);
      btn.appendChild(panel);

      btn.addEventListener("click", function () {
        toggleTrack(btn, i);
      });

      li.appendChild(btn);
      list.appendChild(li);
    });
  }

  function toggleTrack(btn, i) {
    var isOpen = btn.classList.contains("is-open");
    document.querySelectorAll(".track.is-open").forEach(function (t) {
      if (t !== btn) { t.classList.remove("is-open"); t.setAttribute("aria-expanded", "false"); }
    });
    btn.classList.toggle("is-open", !isOpen);
    btn.setAttribute("aria-expanded", String(!isOpen));
    if (!isOpen) playNote(i);
  }

  function esc(s) {
    var div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }

  // ---------- Patches (case studies) ----------
  function renderPatches() {
    var grid = document.getElementById("patchgrid");
    grid.innerHTML = "";
    D.caseStudies.forEach(function (cs, i) {
      var btn = document.createElement("button");
      btn.className = "patch";
      btn.type = "button";
      btn.dataset.slug = cs.slug;

      var slot = document.createElement("span");
      slot.className = "patch__slot";
      slot.textContent = "PATCH " + String(i + 1).padStart(2, "0");

      var title = document.createElement("span");
      title.className = "patch__title";
      title.textContent = t(cs.title);

      var summary = document.createElement("span");
      summary.className = "patch__summary";
      summary.textContent = t(cs.summary);

      var tags = document.createElement("span");
      tags.className = "patch__tags";
      cs.tags.forEach(function (tag) {
        var s = document.createElement("span");
        s.className = "tag";
        s.textContent = t(tag);
        tags.appendChild(s);
      });

      btn.appendChild(slot);
      btn.appendChild(title);
      btn.appendChild(summary);
      btn.appendChild(tags);
      btn.addEventListener("click", function () { openPatch(cs); });
      grid.appendChild(btn);
    });
  }

  var lastFocused = null;
  function openPatch(cs) {
    lastFocused = document.activeElement;
    var display = document.getElementById("patchDisplay");
    var body = document.getElementById("patchDisplayBody");
    body.innerHTML = "";

    var title = document.createElement("h2");
    title.className = "patch-body__title";
    title.id = "patchDisplayTitle";
    title.textContent = t(cs.title);
    body.appendChild(title);

    var tags = document.createElement("div");
    tags.className = "patch-body__tags";
    cs.tags.forEach(function (tag) {
      var s = document.createElement("span");
      s.className = "tag";
      s.textContent = t(tag);
      tags.appendChild(s);
    });
    body.appendChild(tags);

    if (cs.confidential) {
      var conf = document.createElement("p");
      conf.className = "patch-body__confidential";
      conf.textContent = t(D.ui.confidential);
      body.appendChild(conf);
    }

    var dl = document.createElement("dl");
    cs.fields.forEach(function (f) {
      var dt = document.createElement("dt");
      dt.textContent = t(f.label);
      var dd = document.createElement("dd");
      dd.textContent = t(f.value);
      dl.appendChild(dt);
      dl.appendChild(dd);
    });
    body.appendChild(dl);

    display.hidden = false;
    document.getElementById("patchClose").focus();
    document.body.style.overflow = "hidden";
  }

  function closePatch() {
    var display = document.getElementById("patchDisplay");
    display.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  // ---------- Knobs (stats) ----------
  function renderKnobs() {
    var grid = document.getElementById("knobgrid");
    grid.innerHTML = "";
    D.stats.forEach(function (stat, i) {
      var wrap = document.createElement("div");
      wrap.className = "knob";
      var dial = document.createElement("div");
      dial.className = "knob__dial";
      dial.style.setProperty("--rot", (-120 + i * 60) + "deg");
      var value = document.createElement("div");
      value.className = "knob__value";
      value.textContent = t(stat.value);
      var label = document.createElement("div");
      label.className = "knob__label";
      label.textContent = t(stat.label);
      wrap.appendChild(dial);
      wrap.appendChild(value);
      wrap.appendChild(label);
      grid.appendChild(wrap);
    });
  }

  // ---------- About + recs ----------
  function renderAbout() {
    var el = document.getElementById("aboutText");
    el.innerHTML = "";
    D.about.forEach(function (p) {
      var para = document.createElement("p");
      para.textContent = t(p);
      el.appendChild(para);
    });
  }

  function renderRecs() {
    var ul = document.getElementById("recs");
    ul.innerHTML = "";
    D.recommendations.forEach(function (r) {
      var li = document.createElement("li");
      li.className = "rec";
      var bq = document.createElement("blockquote");
      bq.textContent = "“" + t(r.quote) + "”";
      var cite = document.createElement("cite");
      cite.textContent = r.author + " — " + t(r.role);
      li.appendChild(bq);
      li.appendChild(cite);
      var note = t(r.note);
      if (note) {
        var n = document.createElement("div");
        n.className = "rec__note";
        n.textContent = note;
        li.appendChild(n);
      }
      ul.appendChild(li);
    });
  }

  function renderJacks() {
    var ul = document.getElementById("jacks");
    ul.innerHTML = "";
    D.contactLinks.forEach(function (link) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = link.href;
      a.textContent = t(link.label) + ": " + link.value;
      li.appendChild(a);
      ul.appendChild(li);
    });
  }

  // ---------- Sound (opt-in) ----------
  function ensureAudio() {
    if (!audioCtx) {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) audioCtx = new Ctx();
    }
    return audioCtx;
  }

  function playNote(trackIndex) {
    if (!soundOn) return;
    var ctx = ensureAudio();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();
    var freq = 130.81 * Math.pow(2, (trackIndex % 12) / 12); // C3 up per track, deterministic
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.55);
  }

  function setPower(on) {
    soundOn = on;
    var btn = document.getElementById("powerToggle");
    var state = document.getElementById("powerState");
    btn.setAttribute("aria-pressed", String(on));
    state.textContent = t(on ? D.ui.powerOn : D.ui.powerOff);
    if (on) ensureAudio();
  }

  // ---------- Scope canvases ----------
  function drawScope(canvas, phase) {
    var ctx = canvas.getContext("2d");
    var w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(56,242,200,0.5)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (var x = 0; x <= w; x += 4) {
      var y = h / 2
        + Math.sin((x / w) * Math.PI * 4 + phase) * (h * 0.22)
        + Math.sin((x / w) * Math.PI * 11 + phase * 1.7) * (h * 0.06);
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  var scopePhase = 0;
  var rafId = null;
  function scopeLoop() {
    scopePhase += 0.03;
    var hero = document.getElementById("scopeCanvasHero");
    var main = document.getElementById("scopeCanvasMain");
    if (hero) drawScope(hero, scopePhase);
    if (main) drawScope(main, scopePhase * 0.8);
    rafId = requestAnimationFrame(scopeLoop);
  }

  function initScope() {
    var hero = document.getElementById("scopeCanvasHero");
    var main = document.getElementById("scopeCanvasMain");
    if (reduceMotion) {
      if (hero) drawScope(hero, 0.6);
      if (main) drawScope(main, 0.6);
      return;
    }
    scopeLoop();
  }

  // ---------- Keyboard ----------
  function initKeyboard() {
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        var display = document.getElementById("patchDisplay");
        if (!display.hidden) closePatch();
        return;
      }
      if (/^[1-9]$/.test(e.key)) {
        var idx = parseInt(e.key, 10) - 1;
        var tracks = document.querySelectorAll(".track");
        if (tracks[idx]) {
          tracks[idx].scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
          toggleTrack(tracks[idx], idx);
          tracks[idx].focus();
        }
      }
    });
  }

  // ---------- Wire up controls ----------
  function init() {
    renderTracks();
    renderPatches();
    renderKnobs();
    renderAbout();
    renderRecs();
    renderJacks();
    applyStaticI18n();
    initScope();
    initKeyboard();

    document.getElementById("powerToggle").addEventListener("click", function () {
      setPower(!soundOn);
    });

    document.getElementById("langToggle").addEventListener("click", function () {
      lang = lang === "en" ? "es" : "en";
      renderTracks();
      renderPatches();
      renderKnobs();
      renderAbout();
      renderRecs();
      renderJacks();
      applyStaticI18n();
    });

    document.getElementById("patchClose").addEventListener("click", closePatch);
    document.getElementById("patchDisplay").addEventListener("click", function (e) {
      if (e.target === this) closePatch();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
