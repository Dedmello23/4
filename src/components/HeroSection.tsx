"use client";

import React from "react";
import { motion } from "framer-motion";
import { FlowerArtwork } from "./FlowerArtwork";
import { RelationshipCounter } from "./RelationshipCounter";
import { Sparkles, Film, ArrowDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 sm:px-6 pt-16 pb-20 overflow-hidden">
      {/* Decorative film-strip edge motif at top */}
      <div className="absolute top-0 inset-x-0 h-4 bg-chocolate/10 flex items-center justify-around overflow-hidden opacity-60">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="w-2.5 h-2 bg-paper-ivory rounded-xs" />
        ))}
      </div>

      {/* Floating Polaroid-style scrapbook element */}
      <motion.div
        className="hidden lg:block absolute left-8 top-28 w-48 bg-white p-3 pt-3 pb-5 shadow-ticket rounded-sm rotate-[-7deg] border border-[#E8DFC9] z-10"
        initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
        animate={{ opacity: 1, scale: 1, rotate: -7 }}
        transition={{ duration: 1, delay: 0.6 }}
        whileHover={{ scale: 1.05, rotate: -3 }}
      >
        <div className="w-full h-36 bg-[#F5EDE0] rounded-xs flex items-center justify-center overflow-hidden relative">
          <FlowerArtwork width={140} height={140} className="w-32 h-32" />
          <div className="absolute top-2 right-2 text-[10px] font-mono text-chocolate/50 bg-white/60 px-1 rounded">
            YR 4
          </div>
        </div>
        <p className="font-hand text-center text-sm text-chocolate mt-2">
          us against the world ♡
        </p>
      </motion.div>

      {/* Floating right note card */}
      <motion.div
        className="hidden lg:block absolute right-10 top-36 w-52 bg-paper-card p-4 rounded-xl border border-gold-champagne/30 shadow-paper rotate-[6deg] z-10"
        initial={{ opacity: 0, scale: 0.8, rotate: 12 }}
        animate={{ opacity: 1, scale: 1, rotate: 6 }}
        transition={{ duration: 1, delay: 0.8 }}
        whileHover={{ scale: 1.05, rotate: 2 }}
      >
        <div className="flex items-center gap-1.5 text-wine-muted mb-1">
          <Film size={14} />
          <span className="font-sans text-[10px] uppercase font-bold tracking-widest">
            Admit One
          </span>
        </div>
        <p className="font-serif italic text-sm text-chocolate-muted">
          &ldquo;distance is temporary, annoying, but temporary.&rdquo;
        </p>
      </motion.div>

      {/* Hero Content Center */}
      <div className="relative max-w-4xl mx-auto text-center z-10 flex flex-col items-center">
        {/* Top subtle badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paper-card/80 border border-gold-champagne/30 mb-6 shadow-xs"
        >
          <Sparkles size={13} className="text-gold-champagne" />
          <span className="font-sans text-xs tracking-widest uppercase font-semibold text-chocolate-muted">
            Official Anniversary Summons • Chapter 4
          </span>
          <Sparkles size={13} className="text-gold-champagne" />
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="space-y-2 mb-6"
        >
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tight text-wine-muted leading-none">
            FOUR YEARS.
          </h1>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal text-chocolate tracking-wide italic">
            AND YOU STILL HAVE TO DATE ME.
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="max-w-xl text-base sm:text-lg md:text-xl font-sans text-chocolate-muted mb-8 leading-relaxed"
        >
          An anniversary date invitation for the one person I somehow haven&apos;t gotten tired of.
        </motion.p>

        {/* Handwritten Annotation with arrow */}
        <motion.div
          initial={{ opacity: 0, rotate: -4 }}
          animate={{ opacity: 1, rotate: -2 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative inline-block mb-10 px-4 py-1 bg-rose-soft/40 rounded-lg border border-rose-dusty/30"
        >
          <span className="font-hand text-xl sm:text-2xl text-rose-deep font-bold">
            yes, this is a formal invitation. no, you cannot decline.
          </span>
        </motion.div>

        {/* Central Flower Feature */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative w-40 h-40 sm:w-52 sm:h-52 my-4"
        >
          <div className="absolute inset-0 bg-gold-champagne/15 rounded-full filter blur-xl animate-pulse-subtle" />
          <FlowerArtwork
            width={210}
            height={210}
            interactive={true}
            className="w-full h-full relative animate-sway-slow"
          />
        </motion.div>

        {/* Relationship Counter */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 mb-10"
        >
          <RelationshipCounter />
        </motion.div>

        {/* Scroll prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="inline-flex flex-col items-center gap-1.5 text-chocolate-muted/60"
        >
          <span className="font-sans text-xs uppercase tracking-widest font-medium">
            scroll to read your letter
          </span>
          <ArrowDown size={14} className="animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
