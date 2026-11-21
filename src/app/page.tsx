"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CustomCursor } from "@/components/CustomCursor";
import { AmbientBackground } from "@/components/AmbientBackground";
import { EnvelopeIntro } from "@/components/EnvelopeIntro";
import { HeroSection } from "@/components/HeroSection";
import { AnniversaryLetter } from "@/components/AnniversaryLetter";
import { MovieTicket } from "@/components/MovieTicket";
import { InteractiveFlower } from "@/components/InteractiveFlower";
import { FloatingNotes } from "@/components/FloatingNotes";
import { RSVPSection } from "@/components/RSVPSection";
import { CelebrationScreen } from "@/components/CelebrationScreen";
import { AudioToggle } from "@/components/AudioToggle";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { FlowerArtwork } from "@/components/FlowerArtwork";
import { Sparkles, Heart } from "lucide-react";

export default function Home() {
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState(false);
  const [isYesCelebration, setIsYesCelebration] = useState(false);

  return (
    <main className="relative min-h-screen bg-paper-ivory text-chocolate overflow-x-hidden selection:bg-rose-dusty selection:text-paper-dark">
      {/* Custom Desktop Star Cursor */}
      <CustomCursor />

      {/* Elegant Ambient Background */}
      <AmbientBackground />

      {/* Progress Scroll Indicator */}
      <ScrollIndicator />

      {/* Optional Ambient Music Box Toggle */}
      <AudioToggle />

      {/* Intro Envelope Screen */}
      <AnimatePresence mode="wait">
        {!hasOpenedEnvelope && (
          <EnvelopeIntro onOpen={() => setHasOpenedEnvelope(true)} />
        )}
      </AnimatePresence>

      {/* Main Website Sections */}
      {hasOpenedEnvelope && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 flex flex-col"
        >
          {/* Section 1: Hero */}
          <HeroSection />

          {/* Section Divider 1 */}
          <div className="relative py-8 flex items-center justify-center">
            <div className="w-24 h-px bg-gold-champagne/40" />
            <div className="mx-4 w-10 h-10 opacity-70">
              <FlowerArtwork width={40} height={40} interactive={true} />
            </div>
            <div className="w-24 h-px bg-gold-champagne/40" />
          </div>

          {/* Section 2: The Letter */}
          <AnniversaryLetter />

          {/* Section Divider 2 */}
          <div className="relative py-8 flex items-center justify-center">
            <div className="w-32 h-px bg-rose-dusty/40" />
            <Sparkles size={16} className="mx-3 text-gold-champagne" />
            <div className="w-32 h-px bg-rose-dusty/40" />
          </div>

          {/* Section 3: The Movie Ticket */}
          <MovieTicket />

          {/* Section 4: Floating Notes & Scrapbook */}
          <FloatingNotes />

          {/* Section 5: The Interactive Flower */}
          <section className="py-14 px-4 flex flex-col items-center justify-center text-center">
            <div className="max-w-md mb-6">
              <span className="font-hand text-2xl text-rose-deep block mb-1">
                for my favourite person
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-chocolate font-medium">
                a little flower from my sketchbook
              </h3>
            </div>
            <InteractiveFlower />
          </section>

          {/* Section 6: RSVP with Escaping NO Button */}
          <RSVPSection onYes={() => setIsYesCelebration(true)} />

          {/* Footer */}
          <footer className="py-12 px-4 text-center border-t border-[#E8DEC9] bg-paper-card/40 relative z-10 mt-16">
            <div className="w-12 h-12 mx-auto mb-3 opacity-60">
              <FlowerArtwork width={48} height={48} />
            </div>
            <p className="font-hand text-2xl sm:text-3xl text-wine-muted mb-2">
              happy four years, my love ♡
            </p>
            <p className="font-sans text-xs uppercase tracking-widest text-chocolate-muted">
              handcrafted with all my love &bull; year four of our forever
            </p>
          </footer>
        </motion.div>
      )}

      {/* Fullscreen Celebration Screen */}
      <AnimatePresence>
        {isYesCelebration && (
          <CelebrationScreen onReopen={() => setIsYesCelebration(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}
