import { createElement, $$, prefersReducedMotion } from "./utils.js";

export function initGallery(memories) {
  const gallery = document.querySelector("[data-gallery]");
  memories.forEach((memory, index) => {
    const card = createElement("article", `memory-card memory-card--${index + 1}`, `
      <button class="memory-card__button" type="button" aria-label="Open memory ${index + 1}">
        <img src="${memory.src}" alt="${memory.alt}" loading="lazy" />
        <span class="memory-card__veil"></span><span class="memory-card__number">0${index + 1}</span>
        <span class="memory-card__caption">${memory.caption}</span>
      </button>`);
    card.querySelector("button").addEventListener("click", () => openLightbox(memory)); gallery.append(card);
  });
  if (!prefersReducedMotion && window.gsap) window.gsap.from(".memory-card", { opacity: 0, y: 70, stagger: .15, duration: .9, ease: "power3.out", scrollTrigger: { trigger: gallery, start: "top 78%", once: true } });
  document.querySelector("[data-lightbox-close]").addEventListener("click", closeLightbox);
  document.querySelector("[data-lightbox]").addEventListener("click", (event) => { if (event.target === event.currentTarget) closeLightbox(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeLightbox(); });
}

function openLightbox(memory) { const box = document.querySelector("[data-lightbox]"); box.querySelector("img").src = memory.src; box.querySelector("img").alt = memory.alt; box.querySelector("[data-lightbox-caption]").textContent = memory.caption; box.setAttribute("aria-hidden", "false"); document.body.classList.add("is-lightbox-open"); }
function closeLightbox() { const box = document.querySelector("[data-lightbox]"); if (box.getAttribute("aria-hidden") === "false") { box.setAttribute("aria-hidden", "true"); document.body.classList.remove("is-lightbox-open"); } }
