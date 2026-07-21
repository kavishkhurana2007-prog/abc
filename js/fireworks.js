import { prefersReducedMotion } from "./utils.js";

export function createFireworks(canvas) {
  const context = canvas.getContext("2d"); let width; let height; let sparks = []; let frame;
  const resize = () => { width = canvas.width = innerWidth * devicePixelRatio; height = canvas.height = innerHeight * devicePixelRatio; };
  const launch = (x = innerWidth / 2, y = innerHeight * .45) => {
    const palette = ["#ff76c5", "#cda2ff", "#fff1a8", "#a7e8ff"];
    sparks.push(...Array.from({ length: prefersReducedMotion ? 26 : 80 }, (_, i) => { const angle = i / 80 * Math.PI * 2; const speed = (Math.random() * 5 + 3) * devicePixelRatio; return { x: x * devicePixelRatio, y: y * devicePixelRatio, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1, color: palette[i % palette.length] }; }));
  };
  const draw = () => { context.clearRect(0, 0, width, height); sparks = sparks.filter((s) => s.life > .02); sparks.forEach((s) => { s.x += s.vx; s.y += s.vy; s.vy += .04 * devicePixelRatio; s.life *= .978; context.globalAlpha = s.life; context.fillStyle = s.color; context.fillRect(s.x, s.y, 3 * devicePixelRatio, 3 * devicePixelRatio); }); context.globalAlpha = 1; frame = requestAnimationFrame(draw); };
  resize(); draw(); addEventListener("resize", resize); return { launch, destroy: () => cancelAnimationFrame(frame) };
}
