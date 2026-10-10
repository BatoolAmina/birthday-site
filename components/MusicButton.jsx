"use client";
import { motion } from "framer-motion";

export default function MusicButton({ playing, onToggle, disabled = false }) {
  return (
    <motion.button
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 3, type: "spring" }}
      onClick={onToggle} aria-label={disabled ? "Background music paused while video is open" : playing ? "Pause music" : "Play music"}
      disabled={disabled}
      className="fixed bottom-5 right-5 z-[80] flex h-12 items-center gap-2 rounded-full border border-gold/40 bg-night/70 px-4 backdrop-blur-xl disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span className="flex h-4 items-end gap-[3px]">
        {[0, 0.2, 0.4, 0.1].map((d, i) => (
          <span key={i} className="w-[3px] rounded-full bg-gold" style={{ height: playing ? undefined : "25%", animation: playing ? `eq 0.9s ease-in-out ${d}s infinite` : "none" }} />
        ))}
      </span>
      <span className="text-sm text-gold-100">{disabled ? "Video audio" : playing ? "Music on" : "Music off"}</span>
    </motion.button>
  );
}
