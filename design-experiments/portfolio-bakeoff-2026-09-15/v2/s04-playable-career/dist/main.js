(function () {
  const S = window.SITE;
  let lang = "en";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const gameView = document.getElementById("game-view");
  const readView = document.getElementById("read-view");
  const modeToggle = document.getElementById("mode-toggle");
  const langToggle = document.getElementById("lang-toggle");
  const playBtn = document.getElementById("play-game-btn");

  function showGame() {
    readView.classList.remove("active");
    gameView.classList.add("active");
    modeToggle.textContent = window.PORTFOLIO.L(S.ui.skip, lang);
    modeToggle.dataset.mode = "game";
    window.CAREER_GAME.start(lang, reducedMotion);
  }
  function showRead() {
    gameView.classList.remove("active");
    readView.classList.add("active");
    window.CAREER_GAME.stop();
    modeToggle.textContent = window.PORTFOLIO.L(S.ui.playGame, lang);
    modeToggle.dataset.mode = "read";
  }

  modeToggle.addEventListener("click", () => {
    if (modeToggle.dataset.mode === "game") showRead();
    else showGame();
  });
  playBtn.addEventListener("click", showGame);

  langToggle.addEventListener("click", () => {
    lang = lang === "en" ? "es" : "en";
    langToggle.textContent = window.PORTFOLIO.L(S.ui.langSwitch, lang);
    window.renderPortfolio(lang);
    window.CAREER_GAME.setLang(lang);
    if (modeToggle.dataset.mode === "game") {
      modeToggle.textContent = window.PORTFOLIO.L(S.ui.skip, lang);
    } else {
      modeToggle.textContent = window.PORTFOLIO.L(S.ui.playGame, lang);
    }
    document.getElementById("reduced-motion-note").style.display = reducedMotion ? "block" : "none";
  });

  // Init
  window.renderPortfolio(lang);
  document.getElementById("reduced-motion-note").style.display = reducedMotion ? "block" : "none";

  if (reducedMotion) {
    showRead();
  } else {
    showGame();
  }
})();
