(function () {
  "use strict";
  var S = window.SITE;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var lang = localStorage.getItem("lang") || "en";
  var watched = new Set(JSON.parse(localStorage.getItem("watched") || "[]"));

  function t(obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    return obj[lang] != null ? obj[lang] : obj.en;
  }

  function getPath(path) {
    return path.split(".").reduce(function (acc, key) { return acc && acc[key]; }, S);
  }

  function applyI18n() {
    document.documentElement.lang = lang;
    document.title = t(S.meta.title);
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = getPath(el.getAttribute("data-i18n"));
      if (v != null) el.textContent = t(v);
    });
    var langBtn = document.getElementById("langToggle");
    langBtn.setAttribute("aria-label", t(S.ui.langLabel) + ": " + t(S.ui.langSwitch));
  }

  /* ---------------- Tabs ---------------- */
  var tabs = document.querySelectorAll(".tab");
  var screens = document.querySelectorAll(".screen");
  function switchTab(name) {
    screens.forEach(function (s) { s.hidden = s.dataset.screen !== name; });
    tabs.forEach(function (b) {
      var active = b.dataset.tab === name;
      if (active) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current");
    });
  }
  tabs.forEach(function (b) { b.addEventListener("click", function () { switchTab(b.dataset.tab); }); });

  /* ---------------- Lang toggle ---------------- */
  document.getElementById("langToggle").addEventListener("click", function () {
    lang = lang === "en" ? "es" : "en";
    localStorage.setItem("lang", lang);
    applyI18n();
    renderRingRail();
    renderDeck();
    renderConnect();
    renderSideStats();
    renderStatStrip();
    if (!viewerEl.hidden) renderSlide();
  });

  /* ---------------- Ring rail ---------------- */
  var ringRail = document.getElementById("ringRail");
  function ringColorVar(accent) { return "var(--c-" + accent + ")"; }
  function renderRingRail() {
    ringRail.innerHTML = "";
    S.stories.forEach(function (story, i) {
      var li = document.createElement("li");
      li.className = "ring" + (watched.has(story.id) ? " ring--watched" : "");
      var label = story.ring ? t(story.ring) : t(S.hero.title).slice(0, 8);
      li.innerHTML =
        '<button class="ring__open" type="button" aria-label="' + t(S.ui.ringOpen) + ": " + label + '">' +
        '<span class="ring__badge" style="--ring-color:' + ringColorVar(story.accent) + '">' +
        '<span class="ring__badge-inner">' + label.charAt(0) + "</span></span></button>" +
        '<span class="ring__label">' + label + "</span>";
      li.querySelector("button").addEventListener("click", function () { openViewer(i, 0); });
      ringRail.appendChild(li);
    });
  }

  /* ---------------- Story viewer ---------------- */
  var viewerEl = document.getElementById("viewer");
  var appFrame = document.querySelector(".app-frame");
  var barsEl = document.getElementById("viewerBars");
  var slideEl = document.getElementById("viewerSlide");
  var ringLabelEl = document.getElementById("viewerRingLabel");
  var hintEl = document.getElementById("viewerHint");
  var manualEl = document.getElementById("viewerManual");
  var zonePrev = document.getElementById("zonePrev");
  var zoneNext = document.getElementById("zoneNext");

  var vState = { storyIdx: 0, slideIdx: 0 };
  var lastFocusedElement = null;

  function currentStory() { return S.stories[vState.storyIdx]; }
  function currentSlide() { return currentStory().slides[vState.slideIdx]; }

  function openViewer(storyIdx, slideIdx) {
    vState.storyIdx = storyIdx;
    vState.slideIdx = slideIdx || 0;
    viewerEl.hidden = false;
    lastFocusedElement = document.activeElement;
    appFrame.inert = true;
    if (reduced) viewerEl.classList.add("reduced");
    document.body.style.overflow = "hidden";
    renderSlide();
    document.addEventListener("keydown", onViewerKeydown);
    document.getElementById("viewerClose").focus();
  }
  function closeViewer() {
    watched.add(currentStory().id);
    localStorage.setItem("watched", JSON.stringify(Array.from(watched)));
    viewerEl.hidden = true;
    appFrame.inert = false;
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onViewerKeydown);
    renderRingRail();
    if (lastFocusedElement) lastFocusedElement.focus();
  }
  document.getElementById("viewerClose").addEventListener("click", closeViewer);

  function renderBars() {
    var story = currentStory();
    barsEl.innerHTML = "";
    story.slides.forEach(function (_, i) {
      var bar = document.createElement("div");
      bar.className = "viewer__bar";
      var fill = document.createElement("span");
      fill.className = "viewer__bar-fill";
      if (i < vState.slideIdx) fill.classList.add("is-filled");
      bar.appendChild(fill);
      barsEl.appendChild(bar);
    });
  }

  function renderSlide() {
    var story = currentStory();
    var slide = currentSlide();
    ringLabelEl.textContent = story.ring ? t(story.ring) : "";
    viewerEl.setAttribute("data-accent", story.accent);
    var accentVar = "var(--c-" + story.accent + ")";
    renderBars();

    var html = "";
    if (slide.kind === "hero") {
      html += '<div class="slide-body slide-anim">';
      if (slide.eyebrow) html += '<div class="slide-eyebrow" style="--slide-accent:' + accentVar + '">' + t(slide.eyebrow) + "</div>";
      html += '<h2 class="slide-title">' + t(slide.title) + "</h2>";
      html += '<p class="slide-text">' + t(slide.body) + "</p>";
      if (story.tags) html += '<div class="slide-tags">' + story.tags.map(function (tag) { return "<span>" + tag + "</span>"; }).join("") + "</div>";
      html += "</div>";
    } else if (slide.kind === "field") {
      html += '<div class="slide-body slide-anim">';
      html += '<div class="slide-eyebrow" style="--slide-accent:' + accentVar + '">' + t(slide.label) + "</div>";
      if (slide.title) html += '<h2 class="slide-title">' + t(slide.title) + "</h2>";
      html += '<p class="slide-text">' + t(slide.body) + "</p></div>";
    } else if (slide.kind === "stat") {
      html += '<div class="slide-body slide-anim">';
      html += '<div class="slide-stat-value" style="--slide-accent:' + accentVar + '">' + t(slide.value) + "</div>";
      html += '<p class="slide-text">' + t(slide.label) + "</p></div>";
    } else if (slide.kind === "outro") {
      html += '<div class="slide-body slide-anim">';
      html += '<div class="slide-eyebrow" style="--slide-accent:' + accentVar + '">' + t(slide.label) + "</div>";
      html += '<p class="slide-text">' + t(slide.body) + "</p>";
      if (slide.confidential) html += '<p class="slide-confidential">' + t(slide.confidential) + "</p>";
      html += "</div>";
    }
    slideEl.innerHTML = html;

    hintEl.hidden = false;
    manualEl.hidden = false;
  }

  function nextSlide() {
    var story = currentStory();
    if (vState.slideIdx < story.slides.length - 1) {
      vState.slideIdx++;
      renderSlide();
    } else if (vState.storyIdx < S.stories.length - 1) {
      watched.add(story.id);
      vState.storyIdx++;
      vState.slideIdx = 0;
      renderSlide();
      renderRingRail();
    } else {
      closeViewer();
    }
  }
  function prevSlide() {
    if (vState.slideIdx > 0) {
      vState.slideIdx--;
      renderSlide();
    } else if (vState.storyIdx > 0) {
      vState.storyIdx--;
      vState.slideIdx = S.stories[vState.storyIdx].slides.length - 1;
      renderSlide();
    }
  }

  zoneNext.addEventListener("click", nextSlide);
  zonePrev.addEventListener("click", prevSlide);
  document.getElementById("manualNext").addEventListener("click", nextSlide);
  document.getElementById("manualPrev").addEventListener("click", prevSlide);

  function onViewerKeydown(e) {
    if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); nextSlide(); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); prevSlide(); }
    else if (e.key === "Escape") { closeViewer(); }
  }

  /* swipe: horizontal drag switches story, vertical-down closes */
  (function attachSwipe() {
    var startX = 0, startY = 0, tracking = false;
    slideEl.addEventListener("pointerdown", function (e) {
      startX = e.clientX; startY = e.clientY; tracking = true;
    });
    slideEl.addEventListener("pointerup", function (e) {
      if (!tracking) return;
      tracking = false;
      var dx = e.clientX - startX, dy = e.clientY - startY;
      if (Math.abs(dy) > 90 && Math.abs(dy) > Math.abs(dx)) { closeViewer(); return; }
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0 && vState.storyIdx < S.stories.length - 1) { vState.storyIdx++; vState.slideIdx = 0; renderSlide(); }
        else if (dx > 0 && vState.storyIdx > 0) { vState.storyIdx--; vState.slideIdx = 0; renderSlide(); }
      }
    });
  })();

  /* ---------------- Role deck ---------------- */
  var deckStack = document.getElementById("deckStack");
  var deckDots = document.getElementById("deckDots");
  var deckEl = document.getElementById("deck");
  var roleIdx = 0;

  function renderDeck() {
    deckStack.innerHTML = "";
    deckDots.innerHTML = "";
    S.roles.forEach(function (role, i) {
      var card = document.createElement("article");
      card.className = "role-card";
      card.dataset.idx = i;
      var clientHtml = role.client ? '<div class="role-card__client">' + (typeof role.client === "string" ? role.client : t(role.client)) + "</div>" : "";
      card.innerHTML =
        '<div class="role-card__period">' + t(role.period) + "</div>" +
        '<div class="role-card__company">' + (typeof role.company === "string" ? role.company : t(role.company)) + "</div>" +
        clientHtml +
        '<div class="role-card__role">' + t(role.role) + "</div>" +
        (role.note ? '<div class="role-card__note">' + t(role.note) + "</div>" : "");
      deckStack.appendChild(card);

      var dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-selected", i === roleIdx ? "true" : "false");
      dot.setAttribute("aria-label", (typeof role.company === "string" ? role.company : t(role.company)));
      dot.addEventListener("click", function () { roleIdx = i; layoutDeck(); });
      deckDots.appendChild(dot);
    });
    layoutDeck();
  }

  function layoutDeck() {
    var cards = deckStack.querySelectorAll(".role-card");
    cards.forEach(function (card, i) {
      var offset = i - roleIdx;
      if (offset < 0) {
        card.style.transform = "translateY(30px) scale(.9)";
        card.style.opacity = "0";
        card.style.zIndex = 0;
        card.style.pointerEvents = "none";
      } else {
        var depth = Math.min(offset, 3);
        card.style.transform = "translateY(" + depth * 10 + "px) scale(" + (1 - depth * 0.04) + ")";
        card.style.opacity = depth > 2 ? "0" : String(1 - depth * 0.18);
        card.style.zIndex = String(50 - depth);
        card.style.pointerEvents = offset === 0 ? "auto" : "none";
      }
    });
    Array.from(deckDots.children).forEach(function (dot, i) {
      dot.setAttribute("aria-selected", i === roleIdx ? "true" : "false");
    });
  }

  function deckNext() { if (roleIdx < S.roles.length - 1) { roleIdx++; layoutDeck(); } }
  function deckPrev() { if (roleIdx > 0) { roleIdx--; layoutDeck(); } }

  deckEl.tabIndex = 0;
  deckEl.setAttribute("aria-label", "Career timeline card deck");
  deckEl.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { e.preventDefault(); deckNext(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); deckPrev(); }
  });

  (function attachDeckDrag() {
    var dragging = false, startX = 0, activeCard = null;
    deckStack.addEventListener("pointerdown", function (e) {
      var card = e.target.closest(".role-card");
      if (!card || Number(card.dataset.idx) !== roleIdx) return;
      dragging = true; startX = e.clientX; activeCard = card;
      card.setPointerCapture(e.pointerId);
      card.style.transition = "none";
    });
    deckStack.addEventListener("pointermove", function (e) {
      if (!dragging || !activeCard) return;
      var dx = e.clientX - startX;
      activeCard.style.transform = "translateX(" + dx + "px) rotate(" + dx / 22 + "deg)";
    });
    function endDrag(e) {
      if (!dragging || !activeCard) return;
      dragging = false;
      var dx = e.clientX - startX;
      activeCard.style.transition = "";
      activeCard.style.transform = "";
      if (dx < -70) deckNext();
      else if (dx > 70) deckPrev();
      activeCard = null;
    }
    deckStack.addEventListener("pointerup", endDrag);
    deckStack.addEventListener("pointercancel", endDrag);
  })();

  /* ---------------- Connect ---------------- */
  var connectLinksEl = document.getElementById("connectLinks");
  var recsEl = document.getElementById("recs");
  function renderConnect() {
    connectLinksEl.innerHTML =
      '<a href="mailto:' + S.contact.email + '"><span>' + t(S.ui.emailLabel) + '</span><span class="v">' + S.contact.email + "</span></a>" +
      '<a href="' + S.contact.linkedin + '" target="_blank" rel="noopener"><span>' + t(S.ui.linkedinLabel) + '</span><span class="v">linkedin.com/in/mariusdev</span></a>' +
      '<a href="' + S.contact.github + '" target="_blank" rel="noopener"><span>' + t(S.ui.githubLabel) + '</span><span class="v">github.com/mihailmariusiondev</span></a>';

    recsEl.innerHTML = S.recommendations.map(function (r) {
      return '<article class="rec-card"><q>' + t(r.quote) + "</q><footer>" + r.author + " · " + t(r.role) + "</footer></article>";
    }).join("");
  }

  /* ---------------- Side panel stats (desktop) ---------------- */
  var sideStatsEl = document.getElementById("sideStats");
  function impactStats() {
    var impact = S.stories.find(function (s) { return s.id === "impact"; });
    return impact.slides.filter(function (s) { return s.kind === "stat"; });
  }
  function renderSideStats() {
    sideStatsEl.innerHTML = S.sidePanel.proofs.map(function (s) {
      return '<li><span class="stat-value">' + t(s.value) + '</span><span class="stat-label">' + t(s.label) + "</span></li>";
    }).join("");
  }

  /* ---------------- Stories home stat strip ---------------- */
  var statStripEl = document.getElementById("statStrip");
  function renderStatStrip() {
    statStripEl.innerHTML = impactStats().map(function (s) {
      return '<li><span class="v">' + t(s.value) + '</span><span class="l">' + t(s.label) + "</span></li>";
    }).join("");
  }

  /* ---------------- Init ---------------- */
  applyI18n();
  renderRingRail();
  renderDeck();
  renderConnect();
  renderSideStats();
  renderStatStrip();
})();
