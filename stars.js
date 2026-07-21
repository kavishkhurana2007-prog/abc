import { prefersReducedMotion } from "./utils.js";

export function createStars(canvas) {
  const context = canvas.getContext("2d");
  let width = 0; let height = 0; let stars = []; let frame;
  const resize = () => {
    width = canvas.width = window.innerWidth * devicePixelRatio;
    height = canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = `${window.innerWidth}px`; canvas.style.height = `${window.innerHeight}px`;
    stars = Array.from({ length: Math.max(90, Math.floor(window.innerWidth / 10)) }, () => ({
      x: Math.random() * width, y: Math.random() * height, r: (Math.random() * 1.4 + .25) * devicePixelRatio,
      a: Math.random() * .7 + .15, speed: Math.random() * .018 + .004,
    }));
  };
  const draw = (time = 0) => {
    context.clearRect(0, 0, width, height);
    stars.forEach((star) => {
      context.globalAlpha = star.a * (.65 + Math.sin(time * star.speed) * .35);
      context.fillStyle = "#fff4ff"; context.beginPath(); context.arc(star.x, star.y, star.r, 0, Math.PI * 2); context.fill();
    });
    context.globalAlpha = 1;
    if (!prefersReducedMotion) frame = requestAnimationFrame(draw);
  };
  resize(); draw(); window.addEventListener("resize", resize);
  return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
}
