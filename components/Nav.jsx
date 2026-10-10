"use client";
import { motion, useScroll } from "framer-motion";

const links = [["Wish", "#cake"], ["Memories", "#memories"], ["Films", "#films"], ["Duas", "#duas"], ["Letter", "#letter"]];

export default function Nav() {
  const { scrollYProgress } = useScroll();
  return (
    <>
      <motion.div style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-[80] h-[3px] origin-left bg-gradient-to-r from-gold via-rose-glow to-gold" />
      <motion.nav
        initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 5, duration: 0.9 }}
        className="fixed left-1/2 top-4 z-[80] hidden -translate-x-1/2 gap-1 rounded-full border border-white/10 bg-night/60 p-1.5 backdrop-blur-xl sm:flex"
      >
        {links.map(([l, h]) => (
          <a key={h} href={h} className="rounded-full px-4 py-1.5 text-sm text-white/70 transition hover:bg-gold/15 hover:text-gold">{l}</a>
        ))}
      </motion.nav>
    </>
  );
}
