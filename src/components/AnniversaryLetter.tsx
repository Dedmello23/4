"use client";

import React from "react";
import { motion } from "framer-motion";
import { anniversaryConfig } from "@/config/anniversary";
import { FlowerArtwork } from "./FlowerArtwork";
import { Heart, Sparkles } from "lucide-react";

export function AnniversaryLetter() {
  return (
    <section className="relative py-20 px-4 sm:px-6 flex justify-center items-center overflow-hidden">
      {/* Decorative background flower watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 opacity-10 pointer-events-none rotate-12">
        <FlowerArtwork width={320} height={320} />
      </div>

      <div className="relative max-w-3xl w-full">
        {/* Layered paper shadow background behind main letter */}
        <div className="absolute inset-0 bg-[#E8DEC9] rounded-2xl rotate-1 shadow-paper translate-x-2 translate-y-2 pointer-events-none" />
        <div className="absolute inset-0 bg-[#EFE6D4] rounded-2xl -rotate-1 shadow-sm -translate-x-1 -translate-y-1 pointer-events-none" />

        {/* Main Paper Sheet */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#FAF6EE] rounded-2xl p-6 sm:p-10 md:p-14 border border-[#DFD5BE] shadow-romantic overflow-hidden"
        >
          {/* Subtle paper grain & warm border header */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-rose-dusty via-gold-champagne to-wine-muted" />

          {/* Top Stamp & Date Postmark */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-gold-champagne" />
              <span className="font-mono text-xs uppercase tracking-widest text-chocolate-muted">
                Ltr. No. 04-ANNIV
              </span>
            </div>

            {/* Faux Postage Stamp */}
            <div className="relative w-16 h-20 bg-white/90 p-1.5 border border-dashed border-rose-dusty/60 rounded-xs shadow-xs rotate-3 flex flex-col items-center justify-between text-center">
              <span className="text-[9px] font-sans font-bold text-wine-muted tracking-tight">SPECIAL</span>
              <div className="w-8 h-8">
                <FlowerArtwork width={32} height={32} />
              </div>
              <span className="text-[8px] font-mono text-chocolate-muted">FOUR YRS</span>

              {/* Inky circular postmark ring */}
              <div className="absolute -left-4 top-2 w-12 h-12 rounded-full border border-wine-muted/30 rotate-12 flex items-center justify-center pointer-events-none">
                <span className="text-[7px] font-mono text-wine-muted/60 tracking-widest">AIRMAIL</span>
              </div>
            </div>
          </div>

          {/* Corner Flowers */}
          <div className="absolute -top-8 -left-8 w-28 h-28 opacity-30 rotate-45 pointer-events-none">
            <FlowerArtwork width={110} height={110} />
          </div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 opacity-30 -rotate-12 pointer-events-none">
            <FlowerArtwork width={128} height={128} />
          </div>

          {/* Letter Heading */}
          <header className="mb-8 text-center sm:text-left">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-wine-muted tracking-tight italic">
              {anniversaryConfig.letterHeading}
            </h2>
            <div className="w-16 h-0.5 bg-rose-dusty/60 mt-3 rounded-full" />
          </header>

          {/* Letter Body Paragraphs */}
          <div className="space-y-6 font-serif text-lg sm:text-xl text-chocolate leading-relaxed">
            {anniversaryConfig.letterParagraphs.map((para, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * idx }}
                className={idx === 0 ? "first-letter:text-5xl first-letter:font-bold first-letter:text-wine-muted first-letter:mr-2 first-letter:float-left first-letter:leading-none" : ""}
                style={{ whiteSpace: "pre-line" }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Signature */}
          <footer className="mt-12 pt-6 border-t border-[#E8DEC9] flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="font-sans text-xs uppercase tracking-wider text-chocolate-muted block mb-1">
                with all my heart,
              </span>
              <span className="font-hand text-3xl sm:text-4xl text-rose-deep font-semibold tracking-wide">
                {anniversaryConfig.signature}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-rose-dusty font-hand text-lg">
              <Heart size={16} className="fill-rose-dusty" />
              <span>written for you</span>
            </div>
          </footer>
        </motion.article>
      </div>
    </section>
  );
}
