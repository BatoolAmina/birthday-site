"use client";
import { useState } from "react";

// Shows a pretty placeholder until you drop real files into /public
export default function SafeImg({ src, alt = "", className = "", label = "Add your photo" }) {
  const [bad, setBad] = useState(false);
  if (bad || !src)
    return (
      <div className={`grid place-items-center bg-gradient-to-br from-fuchsia-900/60 via-indigo-900/60 to-amber-700/40 text-sm text-white/40 ${className}`}>
        <span>{label}</span>
      </div>
    );
  return <img src={src} alt={alt} loading="lazy" onError={() => setBad(true)} className={`object-cover ${className}`} />;
}
