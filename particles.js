import { clamp, prefersReducedMotion } from "./utils.js";

export function createParticles(canvas) {
  const context = canvas.getContext("2d"); let particles = []; let width; let height; let frame;
  const resize = () => { width = canvas.width = innerWidth * devicePixelRatio; height = canvas.height = innerHeight * devicePixelRatio; };
  const spawn = (kind = "sparkle", amount = 30, origin = { x: innerWidth / 2, y: innerHeight / 2 }) => {
    const colors = kind === "heart" ? ["#ff72c8", "#fcb5e3", "#c99bff"] : ["#fff", "#ffcced", "#cba9ff"];
    particles.push(...Array.from({ length: prefersReducedMotion ? Math.ceil(amount / 3) : amount }, () => ({
      x: origin.x * devicePixelRatio, y: origin.y * devicePixelRatio, vx: (Math.random() - .5) * 8 * devicePixelRatio,
      vy: (Math.random() - .75) * 8 * devicePixelRatio, size: (Math.random() * 7 + 3) * devicePixelRatio,
      life: 1, color: colors[Math.floor(Math.random() * colors.length)], heart: kind === "heart",
    })));
  };
  const draw = () => {
    context.clearRect(0, 0, width, height);
    particles = particles.filter((p) => p.life > .015);
    particles.forEach((p) => { p.x += p.vx; p.y += p.vy; p.vy += .08 * devicePixelRatio; p.life *= .975;
      context.globalAlpha = clamp(p.life, 0, 1); context.fillStyle = p.color;
      if (p.heart) { context.font = `${p.size}px serif`; context.fillText("♥", p.x, p.y); }
      else { context.beginPath(); context.arc(p.x, p.y, p.size / 3, 0, Math.PI * 2); context.fill(); }
    }); context.globalAlpha = 1; frame = requestAnimationFrame(draw);
  };
  resize(); draw(); addEventListener("resize", resize); return { spawn, destroy: () => cancelAnimationFrame(frame) };
}
