"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FlowerArtwork } from "./FlowerArtwork";
import { EscapingNoButton } from "./EscapingNoButton";
import { Heart, Sparkles } from "lucide-react";

interface RSVPSectionProps {
  onYes: () => void;
}

export function RSVPSection({ onYes }: RSVPSectionProps) {
  const arenaRef = useRef<HTMLDivElement>(null);
  const yesButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="relative py-28 px-4 sm:px-6 flex flex-col items-center justify-center overflow-hidden">
      {/* Background floral flourishes */}
      <div className="absolute -left-12 bottom-10 w-48 h-48 opacity-20 rotate-12 pointer-events-none">
        <FlowerArtwork width={190} height={190} />
      </div>
      <div className="absolute -right-12 top-10 w-48 h-48 opacity-20 -rotate-12 pointer-events-none">
        <FlowerArtwork width={190} height={190} />
      </div>

      <div className="relative max-w-2xl w-full text-center z-10">
        {/* Title & Question */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <span className="font-hand text-3xl sm:text-4xl text-rose-deep block mb-2 font-bold tracking-wide">
            so.
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl text-chocolate font-semibold tracking-tight leading-tight">
            WILL YOU GO ON THIS DATE WITH ME?
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-chocolate-muted mt-3">
            (choose wisely... though technically there is only one acceptable choice)
          </p>
        </motion.div>

        {/* Interactive RSVP Arena */}
        <div
          ref={arenaRef}
          className="relative min-h-[220px] sm:min-h-[260px] w-full max-w-lg mx-auto bg-paper-card/60 backdrop-blur-xs rounded-3xl border border-gold-champagne/40 p-6 sm:p-8 flex items-center justify-center shadow-paper"
        >
          {/* Subtle decorative background watermarks */}
          <div className="absolute top-3 left-4 text-[10px] font-mono text-chocolate/40 uppercase tracking-widest pointer-events-none">
            RESPONSE PROTOCOL
          </div>
          <div className="absolute bottom-3 right-4 text-[10px] font-mono text-chocolate/40 uppercase tracking-widest pointer-events-none">
            FOURTH ANNIV
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 relative z-10 w-full">
            {/* The Glorious YES Button */}
            <motion.button
              ref={yesButtonRef}
              onClick={onYes}
              data-cursor="yes"
              whileHover={{ scale: 1.07, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative group px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-gradient-to-r from-wine-muted to-rose-deep text-paper-ivory font-serif text-lg sm:text-xl tracking-wider shadow-romantic hover:shadow-glow transition-all duration-300 border border-rose-blush/40 flex items-center gap-3"
            >
              {/* Pulsing glow aura */}
              <div className="absolute -inset-1 rounded-full bg-rose-dusty/30 filter blur-sm group-hover:bg-rose-dusty/60 transition-all duration-300 -z-10" />

              <Heart size={20} className="text-rose-soft fill-rose-soft animate-pulse-subtle" />
              <span className="font-semibold">YES, OBVIOUSLY ♡</span>
              <Sparkles size={16} className="text-gold-light opacity-80" />
            </motion.button>

            {/* The Evasive NO Button */}
            <EscapingNoButton arenaRef={arenaRef} yesButtonRef={yesButtonRef} />
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-6 font-hand text-lg text-chocolate-muted"
        >
          tip: the NO button is protected by girlfriend law and cannot be caught.
        </motion.p>
      </div>
    </section>
  );
}
