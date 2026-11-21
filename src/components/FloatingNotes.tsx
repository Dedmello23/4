"use client";

import React from "react";
import { motion } from "framer-motion";
import { FlowerArtwork } from "./FlowerArtwork";
import { Film, Heart, Sparkles, Pin } from "lucide-react";

export function FloatingNotes() {
  const notes = [
    { text: "p.s. i love your face.", rotate: -3, color: "bg-[#FFF8EC]" },
    { text: "four years is crazy.", rotate: 2, color: "bg-[#F7EFE1]" },
    { text: "save me a seat.", rotate: -2, color: "bg-[#FDF2F0]" },
    { text: "movie snacks are non-negotiable.", rotate: 3, color: "bg-[#FAF5EC]" },
    { text: "made with love. and questionable coding decisions.", rotate: -1, color: "bg-[#F3EFE6]" },
    { text: "distance is temporary, annoying, but temporary.", rotate: 2, color: "bg-[#F9F0EE]" },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 max-w-5xl mx-auto overflow-hidden">
      <div className="text-center mb-12">
        <span className="font-hand text-2xl text-rose-deep block mb-1">
          scrapbook memories &amp; confessions
        </span>
        <h3 className="font-serif text-3xl sm:text-4xl text-chocolate font-medium">
          little things that are completely true.
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {/* Film Strip Scrapbook Item */}
        <motion.div
          whileHover={{ y: -6, rotate: 0 }}
          className="bg-paper-dark text-paper-ivory p-4 rounded-xl shadow-romantic rotate-[-2deg] flex flex-col justify-between border border-gold-champagne/30"
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/20">
            <div className="flex items-center gap-1.5 text-gold-champagne">
              <Film size={14} />
              <span className="font-mono text-xs uppercase tracking-widest">SCENE 04</span>
            </div>
            <span className="text-[10px] font-sans text-rose-soft">TAKE 1</span>
          </div>

          <div className="py-6 text-center">
            <span className="font-serif italic text-lg sm:text-xl text-paper-creamy leading-snug">
              &ldquo;The best part of any date has always been the person I&apos;m on it with.&rdquo;
            </span>
          </div>

          <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[10px] font-mono text-paper-border">
            <span>ROLL 2022-2026</span>
            <span>DIRECTOR: GIRLFRIEND</span>
          </div>
        </motion.div>

        {/* Polaroid Scrapbook Item */}
        <motion.div
          whileHover={{ y: -6, rotate: 1 }}
          className="bg-white p-3 pb-6 rounded-sm shadow-paper border border-[#DFD3BD] rotate-[3deg] flex flex-col items-center"
        >
          <div className="w-full h-44 bg-[#F8F2E6] rounded-xs flex items-center justify-center relative overflow-hidden">
            <FlowerArtwork width={140} height={140} interactive={true} className="w-32 h-32" />
            <div className="absolute top-2 left-2 text-[10px] font-mono text-chocolate/50 bg-white/70 px-1.5 py-0.5 rounded">
              IPAD FRESCO
            </div>
          </div>
          <p className="font-hand text-xl text-chocolate mt-3 font-semibold">
            drew this for you with all my love ♡
          </p>
        </motion.div>

        {/* Sticky Notes */}
        {notes.slice(0, 4).map((note, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05, y: -4, rotate: 0 }}
            style={{ transform: `rotate(${note.rotate}deg)` }}
            className={`${note.color} p-5 rounded-2xl border border-gold-champagne/30 shadow-paper relative transition-all duration-300 flex flex-col justify-between min-h-[140px]`}
          >
            {/* Top Pin/Tape detail */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 flex items-center justify-center">
              <div className="w-12 h-4 bg-gold-champagne/25 backdrop-blur-xs rounded-xs rotate-[-1deg] border border-gold-champagne/40" />
            </div>

            <p className="font-hand text-2xl text-chocolate leading-snug pt-2">
              {note.text}
            </p>

            <div className="flex justify-end items-center gap-1 text-rose-dusty pt-2">
              <Heart size={13} className="fill-rose-dusty/40" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
