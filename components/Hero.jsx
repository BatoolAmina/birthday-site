"use client";
import { useEffect, useRef, useState } from "react";
import { motion, animate, useScroll, useTransform, useMotionValue, useMotionTemplate } from "framer-motion";
import { config } from "@/lib/data";

const ease = [0.2, 0.7, 0.2, 1];

function Letters({ text, delay = 0 }) {
  return (
    <span aria-label={text} className="inline-block">
      {[...text].map((ch, i) => (
        <motion.span
          key={i} aria-hidden className="inline-block"
          initial={{ y: "80%", opacity: 0, rotateX: -80, filter: "blur(14px)" }}
          animate={{ y: 0, opacity: 1, rotateX: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: delay + i * 0.07, ease }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const section = useRef(null);
  const [hasVideo, setHasVideo] = useState(true);
  const [age, setAge] = useState(0);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [0.48, 0.28, 0]);
  const mx = useMotionValue(-500), my = useMotionValue(-500);
  const spot = useMotionTemplate`radial-gradient(520px circle at ${mx}px ${my}px, rgba(242,200,121,.16), transparent 60%)`;

  useEffect(() => {
    if (!config.age) return;
    const c = animate(0, config.age, { duration: 2.4, delay: 2.6, ease: "easeOut", onUpdate: (v) => setAge(Math.round(v)) });
    return () => c.stop();
  }, []);

  return (
    <section
      id="top" ref={section} className="relative flex min-h-screen items-center justify-center overflow-hidden"
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set(e.clientX - r.left); my.set(e.clientY - r.top); }}
    >
      {/* background video with slow cinematic push-in */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: videoScale, y: videoY, opacity: videoOpacity }}
      >
        <motion.div
          className="h-full w-full"
          initial={{ scale: 1.25 }}
          animate={{ scale: 1 }}
          transition={{ duration: 14, ease: "easeOut" }}
        >
          {hasVideo && (
            <video
              src={config.heroVideo} autoPlay muted loop playsInline preload="auto"
              onError={() => setHasVideo(false)} className="h-full w-full object-cover"
            />
          )}
        </motion.div>
      </motion.div>
      <div className="cinematic-light pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0b0716_85%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night to-transparent" />
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: spot }} />

      {/* letterbox bars that open like a film starting */}
      <motion.div className="absolute inset-x-0 top-0 z-20 h-[14vh] origin-top bg-black" initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: 1.8, delay: 1.2, ease: [0.76, 0, 0.24, 1] }} />
      <motion.div className="absolute inset-x-0 bottom-0 z-20 h-[14vh] origin-bottom bg-black" initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: 1.8, delay: 1.2, ease: [0.76, 0, 0.24, 1] }} />

      <motion.div style={{ y, opacity: fade }} className="relative z-10 w-full px-4 pt-8 text-center [perspective:900px]">
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 1 }}
          className="font-display text-xl italic text-gold md:text-2xl"
        >
          Today the world got a little brighter
        </motion.p>

        <h1 className="glow-text mt-5 font-display text-[clamp(3rem,min(13vw,14vh),9rem)] font-light leading-[0.88]">
          <Letters text="Happy" delay={2} />
          <br />
          <Letters text="Birthday" delay={2.5} />
        </h1>

        <motion.h2
          initial={{ opacity: 0, scale: 0.85, filter: "blur(18px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 3.4, duration: 1.6, ease }}
          className="text-shimmer mt-4 font-display text-[clamp(2.5rem,6vw,5.5rem)] italic leading-tight"
        >
          {config.name}
        </motion.h2>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.2, duration: 1.2 }} className="mx-auto mt-6 max-w-md text-white/70">
          {config.tagline}
        </motion.p>

        {config.age && (
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.6, duration: 1 }}
            className="mx-auto mt-8 inline-flex items-baseline gap-3 rounded-full border border-gold/30 bg-white/5 px-6 py-2 backdrop-blur"
          >
            <span className="text-white/60">Turning</span>
            <span className="font-display text-4xl text-gold tabular-nums">{age}</span>
          </motion.div>
        )}
      </motion.div>

      <motion.a
        href="#cake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center text-sm text-white/60"
      >
        <span className="mx-auto mb-2 flex h-10 w-6 justify-center rounded-full border border-white/30 pt-2">
          <motion.span animate={{ y: [0, 14, 0], opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1.8 }} className="h-2 w-1 rounded-full bg-gold" />
        </span>
        Scroll to unwrap
      </motion.a>
    </section>
  );
}
