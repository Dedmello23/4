"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { FlowerArtwork } from "./FlowerArtwork";
import { anniversaryConfig } from "@/config/anniversary";
import { Sparkles, Heart, Film, RotateCcw, Calendar, MapPin } from "lucide-react";

interface CelebrationScreenProps {
  onReopen: () => void;
}

export function CelebrationScreen({ onReopen }: CelebrationScreenProps) {
  useEffect(() => {
    // Elegant wedding/romantic confetti colors: dusty rose, wine, gold, cream, sage
    const colors = ["#D9A5A5", "#7C3349", "#C7A66A", "#F8F3E9", "#A5B59A", "#EBCBC7"];

    // Initial big burst
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors,
      disableForReducedMotion: true,
    });

    // Secondary side cannons for cinematic excitement
    const timer1 = setTimeout(() => {
      confetti({
        particleCount: 45,
        angle: 60,
        spread: 65,
        origin: { x: 0.1, y: 0.65 },
        colors,
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 45,
        angle: 120,
        spread: 65,
        origin: { x: 0.9, y: 0.65 },
        colors,
        disableForReducedMotion: true,
      });
    }, 400);

    const timer2 = setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 120,
        origin: { y: 0.4 },
        colors,
        disableForReducedMotion: true,
      });
    }, 900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 overflow-y-auto bg-paper-ivory/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
    >
      {/* Background warm marquee glow */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-rose-dusty/15 filter blur-[100px] pointer-events-none" />
      <div className="absolute w-[450px] h-[450px] rounded-full bg-gold-champagne/15 filter blur-[90px] pointer-events-none" />

      {/* Celebration Content Card */}
      <div className="relative max-w-2xl w-full text-center z-10 my-auto py-8">
        {/* Prominently Featured Adobe Fresco Flower with dramatic entrance */}
        <motion.div
          initial={{ scale: 0, rotate: -25 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.2 }}
          className="relative w-44 h-44 sm:w-56 sm:h-56 mx-auto mb-6"
        >
          <div className="absolute inset-0 bg-gold-champagne/25 rounded-full filter blur-xl animate-pulse-subtle" />
          <FlowerArtwork width={220} height={220} interactive={true} className="w-full h-full relative" />
        </motion.div>

        {/* Headings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="space-y-2 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-blush/40 border border-rose-dusty/40 text-wine-muted font-sans text-xs uppercase tracking-widest font-bold mb-2">
            <Sparkles size={14} className="text-gold-champagne" />
            <span>CORRECT ANSWER.</span>
            <Sparkles size={14} className="text-gold-champagne" />
          </div>

          <h2 className="font-serif text-5xl sm:text-7xl font-bold text-wine-muted tracking-tight">
            IT&apos;S A DATE!!
          </h2>
        </motion.div>

        {/* Romantic Messages */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="space-y-4 max-w-lg mx-auto font-serif text-lg sm:text-xl text-chocolate leading-relaxed mb-8"
        >
          <p className="font-medium text-chocolate">
            Four years and you&apos;re still my favourite person to waste an entire evening with.
          </p>

          <p className="text-chocolate-muted text-base sm:text-lg">
            Bring your blanket, your snacks, and your face.
            <br />
            <span className="font-serif italic font-semibold text-wine-muted">I&apos;ll bring mine.</span>
          </p>

          <p className="font-hand text-3xl sm:text-4xl text-rose-deep font-bold pt-2">
            See you at 7. ♡
          </p>
        </motion.div>

        {/* Movie Confirmation Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="max-w-md mx-auto bg-paper-card/90 rounded-2xl p-5 border border-gold-champagne/40 shadow-paper text-left mb-8"
        >
          <div className="flex items-center gap-2 pb-3 border-b border-[#E8DEC9] text-wine-muted">
            <Film size={16} />
            <span className="font-mono text-xs uppercase font-bold tracking-wider">
              OFFICIAL RESERVATION CONFIRMED
            </span>
          </div>

          <div className="pt-3 space-y-2 text-sm font-serif">
            <div className="flex items-center gap-2 text-chocolate">
              <Calendar size={14} className="text-gold-champagne shrink-0" />
              <span>Event: <strong>{anniversaryConfig.eventTitle}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-chocolate">
              <MapPin size={14} className="text-gold-champagne shrink-0" />
              <span>Location: <strong>{anniversaryConfig.eventLocation}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-chocolate">
              <Heart size={14} className="text-rose-dusty shrink-0" />
              <span>Dress Code: <strong>{anniversaryConfig.dressCode}</strong></span>
            </div>
          </div>
        </motion.div>

        {/* Reopen / Back Button */}
        <motion.button
          onClick={onReopen}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-paper-card hover:bg-paper-creamy text-chocolate-muted hover:text-wine-muted border border-gold-champagne/40 font-serif text-sm tracking-wider shadow-xs transition-all"
        >
          <RotateCcw size={14} />
          <span>REOPEN MY INVITATION</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
