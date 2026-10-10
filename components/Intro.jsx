"use client";
import { motion } from "framer-motion";
import { config } from "@/lib/data";

const ease = [0.76, 0, 0.24, 1];

// Opening gate: needed so the browser lets the music play, and it doubles as a curtain reveal.
export default function Intro({ onEnter }) {
  return (
    <motion.div className="fixed inset-0 z-[100]" exit={{ opacity: 0, transition: { delay: 1.6, duration: 0.1 } }}>
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 border-r border-gold/40 bg-gradient-to-r from-[#0b0716] to-[#24113d]"
        exit={{ x: "-100%", transition: { duration: 1.5, ease } }}
      />
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 border-l border-gold/40 bg-gradient-to-l from-[#0b0716] to-[#24113d]"
        exit={{ x: "100%", transition: { duration: 1.5, ease } }}
      />
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        exit={{ opacity: 0, scale: 1.15, filter: "blur(10px)", transition: { duration: 0.6 } }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }}
          className="font-display text-xl italic text-gold"
        >
          A little surprise for
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.9, filter: "blur(16px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.7, duration: 1.4, ease: [0.2, 0.7, 0.2, 1] }}
          className="text-shimmer mt-3 font-display text-6xl italic md:text-8xl"
        >
          {config.name}
        </motion.h1>
        <motion.button
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.8 }}
          whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }} onClick={onEnter}
          className="relative mt-14 rounded-full border border-gold/60 bg-gold/10 px-10 py-4 font-display text-lg text-gold-100 backdrop-blur"
        >
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-gold/20" />
          Open your surprise 🎁
        </motion.button>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 2.2 }} className="mt-6 text-sm">
          Turn your sound on for the full experience 🔊
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
