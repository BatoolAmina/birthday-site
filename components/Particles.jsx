"use client";
import { useEffect, useRef } from "react";

// Floating golden bokeh dust + slow aurora glow, fixed behind everything
export default function Particles({ count = 70 }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w, h, raf;
    const resize = () => {
      w = c.width = innerWidth * dpr; h = c.height = innerHeight * dpr;
      c.style.width = innerWidth + "px"; c.style.height = innerHeight + "px";
    };
    resize(); addEventListener("resize", resize);
    const colors = ["242,200,121", "255,143,177", "185,164,255", "255,255,255"];
    const ps = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h, r: (Math.random() * 2.6 + 0.6) * dpr,
      s: (Math.random() * 0.4 + 0.1) * dpr, d: Math.random() * Math.PI * 2,
      c: colors[(Math.random() * colors.length) | 0], a: Math.random() * 0.6 + 0.2,
    }));
    const loop = (t) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.y -= p.s; p.x += Math.sin(t / 1800 + p.d) * 0.25 * dpr;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        const tw = 0.6 + 0.4 * Math.sin(t / 700 + p.d);
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, `rgba(${p.c},${p.a * tw})`); g.addColorStop(1, `rgba(${p.c},0)`);
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, 7); ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); };
  }, [count]);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="animate-drift absolute -left-1/4 top-0 h-[70vh] w-[70vw] rounded-full bg-fuchsia-700/20 blur-[140px]" />
        <div className="animate-drift-2 absolute -right-1/4 bottom-0 h-[70vh] w-[70vw] rounded-full bg-indigo-600/25 blur-[140px]" />
        <div className="animate-drift absolute left-1/3 top-1/2 h-[40vh] w-[40vw] rounded-full bg-amber-500/10 blur-[120px]" />
      </div>
      <canvas ref={ref} className="pointer-events-none fixed inset-0 z-0" />
    </>
  );
}
