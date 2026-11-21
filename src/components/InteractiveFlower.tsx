"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlowerArtwork } from "./FlowerArtwork";
import { Sparkles, Heart } from "lucide-react";

interface InteractiveFlowerProps {
  className?: string;
}

export function InteractiveFlower({ className = "" }: InteractiveFlowerProps) {
  const [clicked, setClicked] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const messages = [
    "picked this one for you ♡",
    "still completely in love with you ♡",
    "you make four years feel like five minutes ♡",
    "best boyfriend award goes to you ♡",
    "can't wait to see your face on screen ♡",
  ];

  const currentMessage = messages[clickCount % messages.length];

  const handleClick = () => {
    setClicked(true);
    setClickCount((prev) => prev + 1);
  };

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Flower artwork container with interactive hover & tap */}
      <motion.div
        whileHover={{ scale: 1.08, rotate: 6 }}
        whileTap={{ scale: 0.94, rotate: -6 }}
        onClick={handleClick}
        className="relative w-44 h-44 sm:w-56 sm:h-56 cursor-pointer select-none group"
        data-cursor="flower"
      >
        {/* Glow halo */}
        <div className="absolute inset-0 bg-gold-champagne/20 rounded-full filter blur-xl group-hover:bg-rose-dusty/30 transition-colors duration-500" />

        {/* Flower */}
        <FlowerArtwork
          width={220}
          height={220}
          className="w-full h-full relative"
          interactive={true}
        />

        {/* Petal burst particles when clicked */}
        <AnimatePresence>
          {clicked && (
            <>
              {Array.from({ length: 6 }).map((_, i) => {
                const angle = (i * Math.PI) / 3;
                const distance = 45 + Math.random() * 25;
                return (
                  <motion.div
                    key={`${clickCount}-${i}`}
                    className="absolute top-1/2 left-1/2 w-3.5 h-3.5 pointer-events-none"
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                    animate={{
                      x: Math.cos(angle) * distance,
                      y: Math.sin(angle) * distance,
                      opacity: 0,
                      scale: 1,
                      rotate: Math.random() * 180,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <Heart size={14} className="text-rose-dusty fill-rose-dusty" />
                  </motion.div>
                );
              })}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating Reveal Message Badge */}
      <motion.div
        animate={clicked ? { scale: [0.95, 1.05, 1] } : {}}
        transition={{ duration: 0.4 }}
        className="mt-4 px-5 py-2 rounded-full bg-paper-card border border-gold-champagne/40 shadow-paper inline-flex items-center gap-2"
      >
        <Sparkles size={14} className="text-gold-champagne" />
        <span className="font-hand text-lg text-wine-muted font-bold tracking-wide">
          {currentMessage}
        </span>
      </motion.div>

      <span className="text-[11px] font-sans uppercase tracking-widest text-chocolate-muted/60 mt-1.5">
        (tap the flower to pick a petal)
      </span>
    </div>
  );
}
