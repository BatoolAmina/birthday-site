"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/lib/data";
import SafeImg from "./SafeImg";
import SectionTitle from "./SectionTitle";

export default function Videos({ onVideoActiveChange }) {
  const [active, setActive] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const k = (e) => e.key === "Escape" && setActive(null);
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, []);

  useEffect(() => {
    onVideoActiveChange?.(Boolean(active));
  }, [active, onVideoActiveChange]);

  return (
    <section id="films" className="relative z-10 px-6 py-32 md:px-12">
      <SectionTitle eyebrow="In motion" title="The movie of us" sub="Press play on a few of our favourite moments." />
      <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-3">
        {config.videos.map((v, i) => (
          <motion.button
            key={i} onClick={() => { setFailed(false); setActive(v); }}
            initial={{ opacity: 0, y: 55, rotateX: 8, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: i * 0.15, ease: [0.2, 0.7, 0.2, 1] }}
            whileHover={{ y: -8, scale: 1.025 }}
            className="group relative aspect-video overflow-hidden rounded-xl border border-white/10 text-left [perspective:900px]"
            aria-label={`Play video: ${v.title}`}
          >
            <SafeImg src={v.poster} alt="" label="Video poster" className="h-full w-full transition duration-700 group-hover:scale-110" />
            <span className="pointer-events-none absolute inset-y-0 -left-1/2 z-[1] w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition duration-1000 group-hover:translate-x-[450%] group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />
            {/* letterbox bars slide in on hover */}
            <div className="absolute inset-x-0 top-0 h-0 bg-black transition-all duration-500 group-hover:h-[8%]" />
            <div className="absolute inset-x-0 bottom-0 h-0 bg-black transition-all duration-500 group-hover:h-[8%]" />
            <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-night shadow-[0_0_40px_rgba(242,200,121,.6)]">
              <span className="absolute inset-0 animate-ping rounded-full bg-gold/40" />
              <svg viewBox="0 0 24 24" className="relative h-6 w-6 translate-x-0.5 fill-current"><path d="M8 5v14l11-7z" /></svg>
            </span>
            <p className="absolute bottom-4 left-5 font-display text-xl italic">{v.title}</p>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={(event) => { if (event.target === event.currentTarget) setActive(null); }}
            className="fixed inset-0 z-[90] grid place-items-center overflow-y-auto bg-black/90 p-4 backdrop-blur-md"
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute right-5 top-5 z-10 rounded-full border border-white/30 bg-night/80 px-5 py-2 text-sm backdrop-blur hover:bg-white/10"
            >
              Close
            </button>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="w-full max-w-4xl">
              {failed ? (
                <p className="rounded-2xl border border-white/10 p-10 text-center text-white/70">
                  Video not found. Add your file at <code className="text-gold">public{active.src}</code>
                </p>
              ) : (
                <video src={active.src} controls autoPlay playsInline muted={false} preload="metadata" onError={() => setFailed(true)} className="max-h-[calc(100dvh-10rem)] w-full rounded-2xl bg-black" />
              )}
              <div className="mt-4 flex shrink-0 items-center">
                <p className="font-display text-xl italic text-gold">{active.title}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
