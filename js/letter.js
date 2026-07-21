import { prefersReducedMotion } from "./utils.js";

export function initLetter(text) {
  const body = document.querySelector("[data-letter-body]"); let completed = false;
  const reveal = () => { if (completed) return; completed = true; body.innerHTML = ""; const type = () => {
    if (prefersReducedMotion) { body.innerHTML = text.split("\n").map((line) => `<p>${line || "&nbsp;"}</p>`).join(""); return; }
    let index = 0; const tick = () => { body.textContent += text[index] || ""; index += 1; if (index < text.length) setTimeout(tick, 15); else body.innerHTML = body.textContent.split("\n").map((line) => `<p>${line || "&nbsp;"}</p>`).join(""); }; tick();
  }; type(); };
  if (window.ScrollTrigger && window.gsap) window.ScrollTrigger.create({ trigger: ".letter-section", start: "top 62%", once: true, onEnter: reveal }); else reveal();
}
