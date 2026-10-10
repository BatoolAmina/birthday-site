"use client";
import { motion } from "framer-motion";

export default function SectionTitle({ eyebrow, title, sub, className = "" }) {
  return (
    <div className={`mx-auto max-w-3xl text-center ${className}`}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 1 }} className="font-display text-lg italic text-gold"
        >
          {eyebrow}
        </motion.p>
      )}
      <h2 className="mt-3 font-display text-4xl leading-[1.1] md:text-6xl">
        {title.split(" ").map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
            <motion.span
              className="inline-block" initial={{ y: "110%" }} whileInView={{ y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
            >
              {w}&nbsp;
            </motion.span>
          </span>
        ))}
      </h2>
      {sub && (
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }} className="mx-auto mt-5 max-w-xl text-white/60"
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}
