import confetti from "canvas-confetti";

const colors = ["#f2c879", "#ff8fb1", "#b9a4ff", "#ffffff", "#7ee0c3"];

export function burst(origin = { x: 0.5, y: 0.6 }) {
  confetti({ particleCount: 150, spread: 90, startVelocity: 45, origin, colors, ticks: 220 });
}

export function goldSparkle() {
  confetti({
    particleCount: 60, spread: 120, startVelocity: 25, gravity: 0.6, scalar: 1.2,
    shapes: ["star"], colors: ["#f2c879", "#fff4d6", "#c9993f"], origin: { x: 0.5, y: 0.55 },
  });
}

export function cannons() {
  const end = Date.now() + 2400;
  (function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 60, origin: { x: 0, y: 0.85 }, colors });
    confetti({ particleCount: 5, angle: 120, spread: 60, origin: { x: 1, y: 0.85 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
