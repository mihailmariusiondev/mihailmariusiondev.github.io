(function () {
  "use strict";
  var html = document.documentElement;
  var toggle = document.getElementById("lang-toggle");
  var stored = localStorage.getItem("lang");
  if (stored === "en" || stored === "es") setLang(stored);

  function setLang(lang) {
    html.setAttribute("data-lang", lang);
    html.setAttribute("lang", lang);
    localStorage.setItem("lang", lang);
    if (toggle) toggle.setAttribute("aria-pressed", lang === "es" ? "true" : "false");
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var current = html.getAttribute("data-lang") || "en";
      setLang(current === "en" ? "es" : "en");
    });
  }

  function revealHashTarget() {
    var hash = window.location.hash;
    if (!hash) return;
    var target = document.querySelector(hash);
    if (target && target.classList.contains("room")) target.classList.add("in-view");
  }

  revealHashTarget();
  window.addEventListener("hashchange", revealHashTarget);

  // Room reveal + active floor-plan link
  var rooms = Array.prototype.slice.call(document.querySelectorAll(".room"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".floorplan a"));

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        });
      },
      { threshold: 0.2 }
    );
    rooms.forEach(function (r) { revealObserver.observe(r); });

    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
          });
        });
      },
      { threshold: 0.5 }
    );
    rooms.forEach(function (r) { navObserver.observe(r); });
  } else {
    rooms.forEach(function (r) { r.classList.add("in-view"); });
  }
})();
