"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlowerArtwork } from "./FlowerArtwork";
import { Sparkles, Heart } from "lucide-react";

interface EnvelopeIntroProps {
  onOpen: () => void;
}

export function EnvelopeIntro({ onOpen }: EnvelopeIntroProps) {
  const [isOpenAnimationStarted, setIsOpenAnimationStarted] = useState(false);

  const handleOpenClick = () => {
    if (isOpenAnimationStarted) return;
    setIsOpenAnimationStarted(true);

    // Timing sequence for envelope flap -> letter slide -> dissolve
    setTimeout(() => {
      onOpen();
    }, 1800);
  };

  return (
    <motion.section
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-paper-ivory overflow-hidden select-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Decorative background flowers */}
      <div className="absolute top-6 left-6 w-44 h-44 sm:w-60 sm:h-60 opacity-20 -rotate-12 pointer-events-none">
        <FlowerArtwork width={240} height={240} />
      </div>
      <div className="absolute bottom-6 right-6 w-48 h-48 sm:w-64 sm:h-64 opacity-20 rotate-45 pointer-events-none">
        <FlowerArtwork width={256} height={256} />
      </div>

      {/* Floating subtle sparkles */}
      <div className="absolute top-1/4 right-1/4 text-gold-champagne/40 animate-pulse-subtle pointer-events-none">
        <Sparkles size={24} />
      </div>
      <div className="absolute bottom-1/3 left-1/4 text-rose-dusty/40 animate-pulse-subtle delay-1000 pointer-events-none">
        <Heart size={20} />
      </div>

      <div className="relative max-w-lg w-full flex flex-col items-center text-center z-10">
        {/* Intro text */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <span className="font-hand text-2xl sm:text-3xl text-rose-deep block mb-1 tracking-wide">
            psst. you.
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-chocolate font-medium tracking-tight">
            you&apos;ve been summoned.
          </h1>
        </motion.div>

        {/* Envelope Container */}
        <div className="relative w-72 sm:w-96 h-48 sm:h-64 perspective-[1000px] mb-8">
          {/* Letter sliding out */}
          <motion.div
            className="absolute inset-x-4 top-2 h-44 sm:h-56 bg-paper-creamy rounded-lg shadow-paper border border-gold-champagne/30 p-5 flex flex-col items-center justify-center text-center z-10"
            initial={{ y: 0, opacity: 0 }}
            animate={
              isOpenAnimationStarted
                ? { y: -80, opacity: 1, scale: 1.02 }
                : { y: 0, opacity: 0.6 }
            }
            transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-10 h-10 mb-2 opacity-80">
              <FlowerArtwork width={40} height={40} />
            </div>
            <p className="font-serif text-wine-muted text-lg font-semibold tracking-wide">
              FOUR YEARS
            </p>
            <p className="font-hand text-base text-chocolate-muted">
              a formal date invitation ♡
            </p>
          </motion.div>

          {/* Envelope Body */}
          <div className="absolute inset-0 bg-[#EFE7D8] rounded-xl shadow-romantic border border-[#DFD3BE] overflow-hidden z-20">
            {/* Inner envelope shadow */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#E2D4BA]/60 to-transparent pointer-events-none" />

            {/* Fold lines / diagonal creases */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              {/* Left flap fold */}
              <polygon points="0,0 50,55 0,100" fill="#E8DEC9" opacity="0.6" />
              {/* Right flap fold */}
              <polygon points="100,0 50,55 100,100" fill="#E4D9C3" opacity="0.6" />
              {/* Bottom fold */}
              <polygon points="0,100 50,50 100,100" fill="#EFE7D8" />
            </svg>

            {/* Postage Stamp details on envelope */}
            <div className="absolute top-3 right-4 w-12 h-14 bg-white/70 border border-dashed border-gold-champagne/60 rounded p-1 flex flex-col items-center justify-center rotate-3 shadow-xs">
              <span className="text-[9px] font-sans font-bold text-wine-muted uppercase tracking-tighter">4 YRS</span>
              <Heart size={12} className="text-rose-dusty my-0.5 fill-rose-dusty" />
              <span className="text-[8px] font-mono text-chocolate/60">POST</span>
            </div>

            {/* Postmark stamp ring */}
            <div className="absolute top-2 right-12 w-12 h-12 rounded-full border border-wine-muted/30 -rotate-12 flex items-center justify-center pointer-events-none">
              <span className="text-[7px] font-mono tracking-widest text-wine-muted/50 uppercase">OFFICIAL</span>
            </div>
          </div>

          {/* Envelope Flap (Top triangle that opens) */}
          <motion.div
            className="absolute top-0 inset-x-0 h-1/2 z-30 origin-top"
            initial={{ rotateX: 0 }}
            animate={isOpenAnimationStarted ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front of flap with Wax Seal */}
            <svg
              className="w-full h-full drop-shadow-sm"
              preserveAspectRatio="none"
              viewBox="0 0 100 50"
            >
              <polygon points="0,0 100,0 50,50" fill="#E2D4BA" stroke="#DFD3BE" strokeWidth="0.5" />
            </svg>

            {/* Wax Seal */}
            <AnimatePresence>
              {!isOpenAnimationStarted && (
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 rounded-full bg-wine-muted shadow-md border-2 border-wine-deep/40 flex items-center justify-center"
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-10 h-10 rounded-full border border-dashed border-rose-blush/60 flex items-center justify-center">
                    <span className="font-serif text-rose-soft text-sm font-bold">IV</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Action Button */}
        <motion.button
          onClick={handleOpenClick}
          disabled={isOpenAnimationStarted}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-rose-dusty hover:bg-wine-muted text-paper-ivory font-serif text-lg tracking-wider shadow-romantic hover:shadow-glow transition-all duration-300 border border-rose-blush/40"
        >
          {/* Shimmer gradient */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer-slow" />

          <Sparkles size={18} className="text-gold-light animate-spin-slow" />
          <span>OPEN YOUR INVITATION ♡</span>
        </motion.button>

        <p className="mt-4 font-sans text-xs text-chocolate-muted/70 tracking-wide uppercase">
          press to break the wax seal
        </p>
      </div>
    </motion.section>
  );
}
