"use client";
import { motion } from "framer-motion";
import { config } from "@/lib/data";
import { cannons } from "@/lib/confetti";

export default function Footer() {
  const replay = () => { window.scrollTo({ top: 0, behavior: "smooth" }); setTimeout(cannons, 700); };
  return (
    <footer className="relative z-10 overflow-hidden px-6 pb-16 pt-32 text-center">
      <motion.h2
        initial={{ opacity: 0, scale: 0.9, filter: "blur(14px)" }} whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true }} transition={{ duration: 1.4 }}
        className="text-shimmer font-display text-6xl italic md:text-9xl"
      >
        Happy Birthday!
      </motion.h2>
      <p className="mx-auto mt-6 max-w-md text-white/70">May Allah bless every day of your year, {config.name}. Ameen.</p>
      <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }} onClick={replay} className="mt-10 rounded-full border border-gold/50 bg-gold/10 px-8 py-3 font-display text-lg text-gold-100">
        Replay the magic 🎉
      </motion.button>
      <p className="mt-16 text-sm text-white/40">Made with ❤️ by {config.from}</p>
    </footer>
  );
}
