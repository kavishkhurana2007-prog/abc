import { clamp, emit, prefersReducedMotion } from "./utils.js";

export function initProposal() {
  const box = document.querySelector("[data-ring-box]"); const question = document.querySelector("[data-proposal-question]"); const no = document.querySelector("[data-proposal-no]");
  box.addEventListener("click", () => { if (box.getAttribute("aria-expanded") === "true") return; box.setAttribute("aria-expanded", "true"); question.hidden = false; window.gsap?.from(question, { opacity: 0, y: 25, duration: .7, ease: "power3.out" }); });
  const moveNo = () => { if (prefersReducedMotion) return; const bounds = no.parentElement.getBoundingClientRect(); const x = clamp((Math.random() - .5) * 260, bounds.left - no.getBoundingClientRect().left, bounds.right - no.getBoundingClientRect().right); const y = (Math.random() - .5) * 120; window.gsap?.to(no, { x, y, duration: .3, ease: "power2.out" }); };
  no.addEventListener("pointerenter", moveNo); no.addEventListener("click", moveNo);
  document.querySelector("[data-proposal-yes]").addEventListener("click", () => emit("proposal:accepted"));
}
