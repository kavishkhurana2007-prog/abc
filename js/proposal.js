import { clamp, emit, prefersReducedMotion } from "./utils.js";

export function initProposal() {
  const box = document.querySelector("[data-ring-box]"); const question = document.querySelector("[data-proposal-question]"); const no = document.querySelector("[data-proposal-no]");
  box.addEventListener("click", () => { if (box.getAttribute("aria-expanded") === "true") return; box.setAttribute("aria-expanded", "true"); question.hidden = false; window.gsap?.from(question, { opacity: 0, y: 25, duration: .7, ease: "power3.out" }); });
  const moveNo = () => {
    if (prefersReducedMotion) return;
    const area = no.parentElement.getBoundingClientRect(); const button = no.getBoundingClientRect(); const padding = 10;
    const minX = area.left - button.left + padding; const maxX = area.right - button.right - padding;
    const minY = area.top - button.top - 34; const maxY = area.bottom - button.bottom + 34;
    const x = clamp((Math.random() - .5) * 430, minX, maxX);
    const y = clamp((Math.random() - .5) * 170, minY, maxY);
    window.gsap?.to(no, { x, y, rotation: (Math.random() - .5) * 10, duration: .24, ease: "power3.out" });
  };
  no.addEventListener("pointerenter", moveNo); no.addEventListener("pointermove", moveNo); no.addEventListener("click", moveNo);
  document.querySelector("[data-proposal-yes]").addEventListener("click", () => emit("proposal:accepted"));
}
