import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- scroll progress bar ----------
const progress = document.querySelector(".progress");
if (progress) {
  gsap.to(progress, {
    scaleX: 1,
    ease: "none",
    scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
  });
  gsap.set(progress, { scaleX: 0 });
}

// ---------- reveal-on-scroll for editorial blocks ----------
document.querySelectorAll(".reveal").forEach((el) => {
  if (reduced) {
    el.classList.add("is-visible");
    return;
  }
  ScrollTrigger.create({
    trigger: el,
    start: "top 88%",
    once: true,
    onEnter: () => el.classList.add("is-visible"),
  });
});

if (!reduced) {
  // ---------- kinetic variable type: scroll velocity drives weight ----------
  const kinetics = document.querySelectorAll("[data-kinetic]");
  kinetics.forEach((el) => {
    const base = Number(el.dataset.wghtBase || 380);
    const range = Number(el.dataset.wghtRange || 260);
    gsap.fromTo(
      el,
      { "--wght": base },
      {
        "--wght": base + range,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
        onUpdate: function () {
          const w = gsap.getProperty(el, "--wght");
          el.style.fontVariationSettings = `"wght" ${w}, "opsz" ${el.dataset.opsz || 90}`;
        },
      },
    );
  });

  // ---------- cover title reacts to cursor proximity ----------
  const coverTitle = document.querySelector(".cover__title");
  if (coverTitle && window.matchMedia("(hover: hover)").matches) {
    let raf = null;
    window.addEventListener("pointermove", (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const rect = coverTitle.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
        const proximity = Math.max(0, 1 - dist / 900);
        const wght = 340 + proximity * 340;
        const soft = proximity * 60;
        coverTitle.style.fontVariationSettings = `"wght" ${wght.toFixed(0)}, "opsz" 144, "SOFT" ${soft.toFixed(0)}, "WONK" 0`;
        raf = null;
      });
    });
  }

  // ---------- custom cursor dot ----------
  if (window.matchMedia("(hover: hover)").matches) {
    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    document.body.appendChild(dot);
    window.addEventListener("pointermove", (e) => {
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
    });
  }

  // ---------- feature spreads: clip-path page-turn reveal ----------
  document.querySelectorAll(".feature").forEach((section, i) => {
    gsap.fromTo(
      section,
      { clipPath: "inset(0 0 6% 0)", opacity: 0.001, y: 40 },
      {
        clipPath: "inset(0 0 0% 0)",
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 85%" },
      },
    );
  });
}

// ---------- active TOC / section highlighting isn't required; keep it simple ----------
