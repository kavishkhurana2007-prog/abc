import { CONFIG, interpolate } from "./config.js";
import { $, $$, emit, on, prefersReducedMotion, wait } from "./utils.js";
import { createStars } from "./stars.js";
import { createParticles } from "./particles.js";
import { createFireworks } from "./fireworks.js";
import { initTimeline } from "./timeline.js";
import { initGallery } from "./gallery.js";
import { initLetter } from "./letter.js";
import { initProposal } from "./proposal.js";

const setText = (selector, value) => { const node = $(selector); if (node) node.textContent = interpolate(value); };

async function init() {
  if (window.gsap && window.ScrollTrigger) window.gsap.registerPlugin(window.ScrollTrigger);
  setupContent(); setupScroll(); setupCursor(); setupMusic();
  const particles = createParticles($("[data-particles]"));
  createStars($("[data-stars]")); initTimeline(CONFIG.timeline); initGallery(CONFIG.memories); initLetter(CONFIG.letter); initProposal();
  const fireworks = createFireworks($("[data-fireworks]"));
  on("proposal:accepted", () => revealFinale(particles, fireworks));
  await finishLoading(); setupWelcome(particles);
}

function setupContent() {
  setText("[data-intro-eyebrow]", CONFIG.intro.eyebrow); setText("[data-intro-title]", CONFIG.intro.title); setText("[data-intro-copy]", CONFIG.intro.copy); setText("[data-begin-label]", CONFIG.intro.beginLabel);
  $$('[data-her-name], [data-letter-name]').forEach((node) => { node.textContent = CONFIG.herName; });
  setText("[data-birthday-wish]", CONFIG.birthdayWish); setText("[data-letter-signature]", `Always, ${CONFIG.yourName}`); setText("[data-proposal-text]", CONFIG.proposal.question); setText("[data-proposal-yes]", CONFIG.proposal.yesLabel); setText("[data-proposal-no]", CONFIG.proposal.noLabel); setText("[data-final-message]", CONFIG.finale.message); setText("[data-final-signature]", CONFIG.finale.signature);
  const audio = $("[data-background-music]"); audio.src = CONFIG.music;
}

function setupScroll() {
  if (window.Lenis && !prefersReducedMotion) { const lenis = new Lenis({ lerp: .09, smoothWheel: true }); const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); }; requestAnimationFrame(raf); }
  if (window.gsap && window.ScrollTrigger) {
    window.gsap.utils.toArray(".story-section, .scene--sky, .scene--proposal").forEach((scene) => window.ScrollTrigger.create({ trigger: scene, start: "top 55%", onEnter: () => emit("scene:entered", { scene: scene.dataset.scene }) }));
  }
}

function setupWelcome(particles) {
  $("[data-begin]").addEventListener("click", () => {
    particles.spawn("heart", 36); document.body.classList.add("is-started");
    document.querySelector("#birthday").scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    emit("birthday:revealed");
  });
}

function setupCursor() {
  if (prefersReducedMotion) return; const glow = $("[data-cursor-glow]"); addEventListener("pointermove", (event) => { glow.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`; });
}

function setupMusic() {
  const audio = $("[data-background-music]"); const toggle = $("[data-sound-toggle]"); const label = $("[data-sound-label]");
  toggle.addEventListener("click", async () => { if (audio.paused) { try { await audio.play(); toggle.setAttribute("aria-pressed", "true"); label.textContent = "Sound on"; } catch { label.textContent = "Add music file"; } } else { audio.pause(); toggle.setAttribute("aria-pressed", "false"); label.textContent = "Sound off"; } });
  on("birthday:revealed", () => { audio.play().then(() => { toggle.setAttribute("aria-pressed", "true"); label.textContent = "Sound on"; }).catch(() => {}); });
}

async function finishLoading() {
  const progress = $("[data-loader-progress]"); const label = $("[data-loader-label]");
  window.gsap?.to(progress, { width: "100%", duration: prefersReducedMotion ? 0 : 1.1, ease: "power2.out" }); await wait(prefersReducedMotion ? 0 : 1150); label.textContent = "Ready";
  window.gsap?.to("[data-loader]", { autoAlpha: 0, duration: .55, pointerEvents: "none" });
}

function revealFinale(particles, fireworks) {
  const finale = $("#finale"); finale.hidden = false; document.body.classList.add("is-finally-here"); finale.scrollIntoView({ behavior: "smooth", block: "start" });
  window.gsap?.from(".finale-content > *", { opacity: 0, y: 35, stagger: .16, duration: .85, delay: .35, ease: "power3.out" });
  let count = 0; const celebration = () => { fireworks.launch(innerWidth * (.2 + Math.random() * .6), innerHeight * (.2 + Math.random() * .4)); particles.spawn("heart", 22, { x: innerWidth * (.25 + Math.random() * .5), y: innerHeight * .55 }); count += 1; if (count < 6) setTimeout(celebration, 530); }; celebration();
}

init().catch((error) => {
  // The story should remain reachable even if an optional remote animation asset fails.
  console.error("Surprise site initialization failed:", error);
  document.body.classList.add("is-loading-failed");
});
