"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { config } from "@/lib/data";
import { cannons } from "@/lib/confetti";
import Intro from "@/components/Intro";
import Particles from "@/components/Particles";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Cake from "@/components/Cake";
import Gallery from "@/components/Gallery";
import Videos from "@/components/Videos";
import Duas from "@/components/Duas";
import Wishes, { Letter } from "@/components/Wishes";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import MusicButton from "@/components/MusicButton";

export default function Page() {
  const [entered, setEntered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [videoActive, setVideoActive] = useState(false);
  const audio = useRef(null);
  const resumeMusicAfterVideo = useRef(false);

  // lock scrolling while the curtain screen is showing
  useEffect(() => {
    document.body.style.overflow = entered ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [entered]);

  const enter = () => {
    setEntered(true);
    const a = audio.current;
    if (a) { a.volume = 0.6; a.play().then(() => setPlaying(true)).catch(() => {}); }
    setTimeout(cannons, 1800);
  };
  const toggleMusic = () => {
    const a = audio.current; if (!a) return;
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => {});
    else { a.pause(); setPlaying(false); }
  };
  const handleVideoActiveChange = useCallback((active) => {
    const a = audio.current;
    setVideoActive(active);

    if (active) {
      resumeMusicAfterVideo.current = Boolean(a && !a.paused);
      if (a && !a.paused) a.pause();
      setPlaying(false);
      return;
    }

    if (resumeMusicAfterVideo.current && a) {
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
    resumeMusicAfterVideo.current = false;
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <audio ref={audio} src={config.music} loop preload="auto" />
      <div className="grain" aria-hidden />
      <AnimatePresence>{!entered && <Intro key="intro" onEnter={enter} />}</AnimatePresence>

      {entered && (
        <>
          <Particles />
          <Nav />
          <MusicButton playing={playing} onToggle={toggleMusic} disabled={videoActive} />
          <main className="relative">
            <Hero />
            <Ticker />
            <Cake />
            <Gallery />
            <Videos onVideoActiveChange={handleVideoActiveChange} />
            <Ticker words={["Ameen", "Barakah", "Alhamdulillah", "MashaAllah"]} />
            <Duas />
            <Letter />
            <Wishes />
            <Footer />
          </main>
        </>
      )}
    </MotionConfig>
  );
}
