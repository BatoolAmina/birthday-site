"use client";
import { motion } from "framer-motion";
import { config } from "@/lib/data";
import SectionTitle from "./SectionTitle";

function Row({ items, reverse }) {
  const list = [...items, ...items];
  return (
    <div className="marquee-wrap overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div className={`flex w-max ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
        {list.map((w, i) => (
          <div key={i} className="mr-5 w-[300px] shrink-0 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
            <p className="leading-relaxed text-white/85">“{w.text}”</p>
            <p className="mt-4 font-display italic text-gold">{w.from}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Letter() {
  const reveal = { initial: { opacity: 0, y: 26, filter: "blur(8px)" }, whileInView: { opacity: 1, y: 0, filter: "blur(0px)" }, viewport: { once: true, margin: "-80px" }, transition: { duration: 1 } };
  return (
    <section id="letter" className="relative z-10 px-6 py-32">
      <div className="mx-auto max-w-2xl rounded-3xl border border-gold/20 bg-gradient-to-b from-white/[0.06] to-transparent p-8 shadow-2xl md:p-14">
        <motion.p {...reveal} className="font-display text-3xl italic text-gold">Dear {config.name},</motion.p>
        {config.letter.map((p, i) => (
          <motion.p key={i} {...reveal} className="mt-6 text-lg leading-8 text-white/80">{p}</motion.p>
        ))}
        <motion.p {...reveal} className="mt-10 font-display text-xl italic text-gold-200">With all my love,<br />{config.from}</motion.p>
      </div>
    </section>
  );
}

export default function Wishes() {
  const half = Math.ceil(config.wishes.length / 2);
  return (
    <section id="wishes" className="relative z-10 space-y-5 py-32">
      <SectionTitle eyebrow="Love from everyone" title="Wishes just for you" className="mb-14 px-6" />
      <Row items={config.wishes.slice(0, half)} />
      <Row items={config.wishes.slice(half)} reverse />
    </section>
  );
}
