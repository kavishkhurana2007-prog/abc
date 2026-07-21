import { createElement, prefersReducedMotion } from "./utils.js";

export function initTimeline(items) {
  const list = document.querySelector("[data-timeline]");
  items.forEach((item, index) => {
    const entry = createElement("li", "timeline__entry", `
      <div class="timeline__marker"><span>${String(index + 1).padStart(2, "0")}</span></div>
      <article class="timeline__card glass-panel">
        <p class="timeline__date">${item.date}</p><h3>${item.title}</h3><p>${item.body}</p>
      </article>`);
    list.append(entry);
  });
  if (!prefersReducedMotion && window.gsap && window.ScrollTrigger) {
    window.gsap.utils.toArray(".timeline__entry").forEach((entry) => window.gsap.from(entry, {
      opacity: 0, y: 70, duration: 1, ease: "power3.out", scrollTrigger: { trigger: entry, start: "top 84%", once: true },
    }));
  }
}
