"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { duas } from "@/lib/data";
import { goldSparkle } from "@/lib/confetti";
import SectionTitle from "./SectionTitle";

const INTERVAL = 15000;

// Eight-point Islamic star that turns very slowly behind the stage
function Star({ className }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth="0.6">
      <rect x="40" y="40" width="120" height="120" />
      <rect x="40" y="40" width="120" height="120" transform="rotate(45 100 100)" />
      <circle cx="100" cy="100" r="62" />
      <circle cx="100" cy="100" r="30" />
    </svg>
  );
}

export default function Duas() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setI((v) => (v + 1) % duas.length), INTERVAL);
    return () => clearTimeout(t);
  }, [i]);
  const d = duas[i];
  const go = (n) => setI((n + duas.length) % duas.length);

  return (
    <section id="duas" className="relative z-10 overflow-hidden px-6 py-32">
      <Star className="animate-spin-slow absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 text-gold/10" />
      <SectionTitle eyebrow="From my heart to the heavens" title="Duas for your new year" sub="Take a quiet moment and say Ameen to each one." />

      <div className="relative mx-auto mt-14 max-w-4xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-gold/25 bg-white/[0.03] p-8 text-center shadow-[0_0_100px_-25px_rgba(242,200,121,.4)] backdrop-blur-xl md:p-14">
          <div className="min-h-[430px] md:min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: "blur(10px)", y: -14 }} transition={{ duration: 0.6 }}>
                <p className="font-display text-lg italic text-gold">{d.title}</p>
                <p dir="rtl" lang="ar" className="mt-6 font-arabic text-3xl leading-[2.3] text-gold-100 md:text-5xl md:leading-[2.2]" style={{ textShadow: "0 0 30px rgba(242,200,121,.45)" }}>
                  {d.arabic.split(" ").map((w, k) => (
                    <motion.span
                      key={k} className="mx-[0.18em] inline-block"
                      initial={{ opacity: 0, y: 14, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ delay: 0.3 + k * 0.15, duration: 0.9 }}
                    >
                      {w}
                    </motion.span>
                  ))}
                </p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 + d.arabic.split(" ").length * 0.1, duration: 1 }}>
                  <span className="mt-6 block font-display italic text-white/60">{d.translit}</span>
                  <span className="mx-auto mt-5 block max-w-xl text-lg leading-8 text-white/90">{d.meaning}</span>
                  <span className="mt-5 block text-sm text-gold/70">{d.source}</span>
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-5">
            <button onClick={() => go(i - 1)} aria-label="Previous dua" className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition hover:border-gold hover:text-gold">‹</button>
            <button onClick={goldSparkle} className="rounded-full bg-gold px-7 py-2.5 font-display text-lg text-night transition hover:scale-105 active:scale-95">Ameen 🤲</button>
            <button onClick={() => go(i + 1)} aria-label="Next dua" className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition hover:border-gold hover:text-gold">›</button>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {duas.map((_, k) => (
              <button key={k} onClick={() => setI(k)} aria-label={`Dua ${k + 1}`} className="relative h-1.5 w-10 overflow-hidden rounded-full bg-white/15">
                {k === i && (
                  <motion.span key={`p${i}`} className="absolute inset-0 origin-left bg-gold" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: INTERVAL / 1000, ease: "linear" }} />
                )}
                {k < i && <span className="absolute inset-0 bg-gold/50" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
