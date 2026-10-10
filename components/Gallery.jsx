"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { config } from "@/lib/data";
import SafeImg from "./SafeImg";
import SectionTitle from "./SectionTitle";

// Scroll down and the photo reel slides sideways
export default function Gallery() {
  const section = useRef(null), track = useRef(null);
  const [range, setRange] = useState(0);
  const [open, setOpen] = useState(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -range]);

  useEffect(() => {
    const measure = () => setRange(Math.max(0, track.current.scrollWidth - window.innerWidth));
    measure(); addEventListener("resize", measure);
    return () => removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const k = (e) => e.key === "Escape" && setOpen(null);
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, []);

  return (
    <section id="memories" ref={section} className="relative z-10" style={{ height: `${Math.max(260, config.photos.length * 50)}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <SectionTitle eyebrow="Our memories" title="Moments we will never forget" className="mb-10 px-6" />
        <motion.div ref={track} style={{ x }} className="flex w-max items-center gap-6 px-6 md:gap-10 md:px-[10vw]">
          {config.photos.map((p, i) => (
            <motion.button
              key={i} onClick={() => setOpen(p)} aria-label={`Open photo: ${p.caption}`}
              initial={{ opacity: 0, y: 70, rotate: i % 2 ? 5 : -5, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 2.5 : -2.5, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8, delay: Math.min(i * 0.07, 0.35), ease: [0.2, 0.7, 0.2, 1] }}
              whileHover={{ rotate: 0, scale: 1.05, y: -8 }}
              style={{ marginTop: i % 2 ? 48 : 0 }}
              className="group relative aspect-[3/4] w-[68vw] shrink-0 overflow-hidden rounded-2xl border border-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,.8)] sm:w-[44vw] md:w-[28vw] lg:w-[22vw]"
            >
              <SafeImg src={p.src} alt={p.caption} label={`Photo ${i + 1}`} className="h-full w-full transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <p className="absolute inset-x-0 bottom-0 p-5 text-left font-display text-lg italic">{p.caption}</p>
            </motion.button>
          ))}
        </motion.div>
        <div className="mx-auto mt-12 h-px w-48 bg-white/15">
          <motion.div style={{ scaleX: scrollYProgress }} className="h-px origin-left bg-gold" />
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}
            className="fixed inset-0 z-[90] grid cursor-zoom-out place-items-center bg-black/90 p-6 backdrop-blur-md"
          >
            <motion.figure initial={{ scale: 0.85, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }} className="max-h-full max-w-3xl">
              <SafeImg src={open.src} alt={open.caption} className="max-h-[78vh] w-full rounded-2xl" />
              <figcaption className="mt-4 text-center font-display text-xl italic text-gold">{open.caption}</figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
