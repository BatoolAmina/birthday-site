"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { burst } from "@/lib/confetti";
import SectionTitle from "./SectionTitle";

const candles = [128, 160, 192];

export default function Cake() {
  const [lit, setLit] = useState(true);
  const toggle = () => {
    if (lit) burst();
    setLit(!lit);
  };

  return (
    <section id="cake" className="relative z-10 px-6 py-32 text-center">
      <SectionTitle
        eyebrow="Before anything else"
        title="Close your eyes and make a wish"
        sub={lit ? "When you're ready, blow out the candles." : "May every wish come true. Ameen 🤲"}
      />
      <motion.div
        initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }}
        className="relative mx-auto mt-12 w-full max-w-sm"
      >
        <div className={`absolute left-1/2 top-4 h-48 w-48 -translate-x-1/2 rounded-full bg-amber-300/30 blur-3xl transition-opacity duration-700 ${lit ? "opacity-100" : "opacity-0"}`} />
        <svg viewBox="0 0 320 300" className="animate-float relative w-full" role="img" aria-label="Birthday cake with candles">
          <defs>
            <linearGradient id="t1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff8fb1" /><stop offset="1" stopColor="#c2467a" /></linearGradient>
            <linearGradient id="t2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff4d6" /><stop offset="1" stopColor="#f2c879" /></linearGradient>
            <linearGradient id="t3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#b9a4ff" /><stop offset="1" stopColor="#6d4fd1" /></linearGradient>
            <radialGradient id="fl" cx=".5" cy=".7"><stop offset="0" stopColor="#fff7c2" /><stop offset=".5" stopColor="#ffb347" /><stop offset="1" stopColor="#ff5e3a" /></radialGradient>
          </defs>
          <ellipse cx="160" cy="272" rx="145" ry="16" fill="#2a1646" />
          <rect x="40" y="192" width="240" height="76" rx="16" fill="url(#t1)" />
          <path d="M40 210 q15 22 30 0 q15 26 30 0 q15 20 30 0 q15 26 30 0 q15 20 30 0 q15 26 30 0 q15 18 30 0 v-4 H40z" fill="#fff4d6" opacity=".9" />
          <rect x="70" y="130" width="180" height="68" rx="14" fill="url(#t2)" />
          <path d="M70 146 q15 20 30 0 q15 24 30 0 q15 18 30 0 q15 24 30 0 q15 18 30 0 v-4 H70z" fill="#ff8fb1" opacity=".85" />
          <rect x="100" y="80" width="120" height="56" rx="12" fill="url(#t3)" />
          <path d="M100 94 q15 18 30 0 q15 22 30 0 q15 16 30 0 q15 22 30 0 v-4 H100z" fill="#fff4d6" opacity=".9" />
          {[120, 160, 200].map((x) => <circle key={x} cx={x} cy="112" r="4" fill="#fff4d6" />)}
          {candles.map((x, i) => (
            <g key={x}>
              <rect x={x - 5} y="46" width="10" height="36" rx="3" fill={["#ff8fb1", "#fff4d6", "#7ee0c3"][i]} />
              <rect x={x - 5} y="54" width="10" height="4" fill="#00000022" />
              <path d={`M${x} 44 v-6`} stroke="#3a2a1a" strokeWidth="2" />
              <g className={`flame ${lit ? "" : "flame-out"}`} style={{ animationDelay: `${i * 0.12}s` }}>
                <path d={`M${x} 14 C${x + 9} 24 ${x + 8} 36 ${x} 38 C${x - 8} 36 ${x - 9} 24 ${x} 14z`} fill="url(#fl)" />
              </g>
              {!lit && <circle className="smoke" cx={x} cy="36" r="4" fill="#ffffff" style={{ animationDelay: `${i * 0.15}s` }} />}
            </g>
          ))}
        </svg>
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggle}
        className="mt-10 rounded-full border border-gold/50 bg-gold/10 px-8 py-3 font-display text-lg text-gold-100 backdrop-blur"
      >
        {lit ? "Blow out the candles 🕯️" : "Light them again ✨"}
      </motion.button>
    </section>
  );
}
