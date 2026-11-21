"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { anniversaryConfig } from "@/config/anniversary";

export function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Gentle acoustic music box melody synthesizer using Web Audio API
  // Royalty-free, offline, works without external assets
  const playRomanticChime = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }

    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    // Romantic music box notes: C4, E4, G4, A4, B4, C5, D5, E5, G5
    const notes = [261.63, 329.63, 392.0, 440.0, 493.88, 523.25, 587.33, 659.25, 783.99];
    const pattern = [0, 2, 4, 5, 2, 4, 7, 5, 3, 1, 2, 0];
    let step = 0;

    const playNextNote = () => {
      if (!isPlayingRef.current) return;

      const noteFreq = notes[pattern[step % pattern.length]];
      step++;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(noteFreq, ctx.currentTime);

      // Music box envelope: fast attack, gentle ringing decay
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.7);

      // Random gentle pacing between notes (450ms - 600ms)
      const nextDelay = 520 + (Math.random() - 0.5) * 80;
      timerRef.current = setTimeout(playNextNote, nextDelay);
    };

    playNextNote();
  };

  const toggleAudio = () => {
    if (isPlaying) {
      isPlayingRef.current = false;
      setIsPlaying(false);
      if (timerRef.current) clearTimeout(timerRef.current);
    } else {
      isPlayingRef.current = true;
      setIsPlaying(true);
      playRomanticChime();
    }
  };

  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        onClick={toggleAudio}
        aria-label="Toggle ambient romantic music"
        className="group relative flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-paper-card/90 hover:bg-paper-creamy backdrop-blur-md border border-gold-champagne/40 text-chocolate hover:text-wine-muted shadow-romantic transition-all duration-300"
      >
        {isPlaying ? (
          <>
            <Volume2 size={16} className="text-rose-dusty animate-pulse" />
            <span className="text-xs font-serif italic text-wine-muted hidden sm:inline">
              music box: on ♡
            </span>
          </>
        ) : (
          <>
            <VolumeX size={16} className="text-chocolate-muted group-hover:text-wine-muted" />
            <span className="text-xs font-serif italic text-chocolate-muted hidden sm:inline">
              ambient music: off
            </span>
          </>
        )}
      </button>
    </div>
  );
}
