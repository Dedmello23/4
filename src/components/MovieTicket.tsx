"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { anniversaryConfig } from "@/config/anniversary";
import { getHalifaxTime, getCountdownTime } from "@/utils/timezone";
import { FlowerArtwork } from "./FlowerArtwork";
import { Film, Clock, MapPin, Sparkles, CheckCircle2 } from "lucide-react";

export function MovieTicket() {
  const [timeInfo, setTimeInfo] = useState(
    getHalifaxTime(anniversaryConfig.eventDate, anniversaryConfig.eventTimeIST)
  );

  const [countdown, setCountdown] = useState(
    getCountdownTime(anniversaryConfig.eventDate, anniversaryConfig.eventTimeIST)
  );

  useEffect(() => {
    // Recalculate time on mount
    setTimeInfo(getHalifaxTime(anniversaryConfig.eventDate, anniversaryConfig.eventTimeIST));

    // Live countdown timer updates
    if (anniversaryConfig.eventDate) {
      const interval = setInterval(() => {
        setCountdown(getCountdownTime(anniversaryConfig.eventDate, anniversaryConfig.eventTimeIST));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <section className="relative py-24 px-4 sm:px-6 flex flex-col items-center justify-center overflow-hidden">
      {/* Film reel ambient glow in background */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gold-champagne/10 filter blur-[90px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-12 max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paper-card border border-gold-champagne/40 mb-3 shadow-xs"
        >
          <Film size={14} className="text-wine-muted" />
          <span className="font-sans text-xs uppercase tracking-widest font-semibold text-chocolate-muted">
            Cinema Admission Pass
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl text-chocolate font-medium tracking-tight"
        >
          YOU ARE INVITED
          <span className="block text-wine-muted italic mt-1 font-serif text-2xl sm:text-4xl">
            TO A DATE WITH YOUR GIRLFRIEND.
          </span>
        </motion.h2>
      </div>

      {/* CINEMA TICKET */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 25 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -4, transition: { duration: 0.3 } }}
        className="relative w-full max-w-2xl bg-[#FBF7EF] rounded-2xl border-2 border-gold-champagne/50 shadow-ticket overflow-hidden"
      >
        {/* Ticket Perforation Notches on Left and Right */}
        <div className="ticket-scallop-left" />
        <div className="ticket-scallop-right" />

        {/* Top Decorative Bar */}
        <div className="bg-wine-muted px-6 py-3 flex justify-between items-center text-paper-ivory text-xs font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-gold-light" />
            <span>ADMIT ONE • GIRLFRIEND &amp; BOYFRIEND</span>
          </div>
          <span className="text-rose-soft font-semibold">TICKET #ANNIV-04</span>
        </div>

        {/* Main Ticket Layout */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 relative">
          {/* Left Column: Details (8 cols) */}
          <div className="md:col-span-8 space-y-6">
            {/* Event Name */}
            <div>
              <span className="font-sans text-xs tracking-wider uppercase font-semibold text-rose-deep block mb-1">
                Special Event Feature
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-chocolate font-bold tracking-tight">
                {anniversaryConfig.eventTitle}
              </h3>
            </div>

            {/* Location & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-wine-muted shrink-0 mt-1" />
                <div>
                  <span className="text-[11px] font-sans uppercase font-bold tracking-wider text-chocolate-muted block">
                    Virtual Theatre
                  </span>
                  <p className="font-serif text-sm sm:text-base text-chocolate leading-snug">
                    {anniversaryConfig.eventLocation}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock size={18} className="text-wine-muted shrink-0 mt-1" />
                <div>
                  <span className="text-[11px] font-sans uppercase font-bold tracking-wider text-chocolate-muted block">
                    Showtime (Date-Aware)
                  </span>
                  <p className="font-serif text-sm sm:text-base text-chocolate font-semibold">
                    {timeInfo.istTimeFormatted}
                  </p>
                  <p className="font-serif text-xs text-rose-deep font-medium">
                    {timeInfo.halifaxTimeFormatted}
                  </p>
                  {timeInfo.fullDateString && (
                    <span className="text-[10px] font-mono text-chocolate-muted block mt-0.5">
                      {timeInfo.fullDateString}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Dress code & Attendance */}
            <div className="pt-2 border-t border-[#E8DEC9] space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="font-sans text-xs font-bold uppercase text-chocolate-muted">
                  Dress Code:
                </span>
                <span className="font-serif text-sm font-semibold text-wine-muted">
                  {anniversaryConfig.dressCode}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-sans text-xs font-bold uppercase text-chocolate-muted">
                  Rule:
                </span>
                <span className="font-hand text-base text-rose-deep font-bold">
                  {anniversaryConfig.attendance}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Ticket Stub & Stamp (4 cols) */}
          <div className="md:col-span-4 border-t md:border-t-0 md:border-l-2 md:border-dashed md:border-gold-champagne/40 pt-4 md:pt-0 md:pl-6 flex flex-col items-center justify-between text-center relative">
            {/* Flower artwork stamp */}
            <div className="w-24 h-24 relative my-auto">
              <FlowerArtwork width={96} height={96} interactive={true} />
            </div>

            {/* Wax / Foil Stamp Badge */}
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-gold-champagne/80 bg-gold-champagne/10 flex flex-col items-center justify-center p-2 rotate-[-8deg] shadow-xs my-2">
              <Sparkles size={16} className="text-gold-champagne mb-0.5" />
              <span className="text-[9px] font-sans font-extrabold text-wine-muted tracking-widest uppercase">
                ANNIVERSARY
              </span>
              <span className="text-[8px] font-serif italic text-chocolate">EDITION</span>
            </div>

            {/* Barcode representation */}
            <div className="w-full mt-2 pt-2 border-t border-dashed border-chocolate/20 flex flex-col items-center">
              <div className="h-6 w-36 bg-[repeating-linear-gradient(90deg,#34251F,#34251F_2px,transparent_2px,transparent_4px,#34251F_4px,#34251F_7px,transparent_7px,transparent_9px)] opacity-60" />
              <span className="font-mono text-[9px] text-chocolate/50 tracking-widest mt-1">
                4-YEAR-SPECIAL-DATE
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Perforated Film Strip Motif */}
        <div className="bg-[#EFE5D2] px-4 py-2 border-t border-gold-champagne/30 flex items-center justify-between text-[11px] font-hand text-chocolate-muted">
          <span>seat reserved for you alone ♡</span>
          <span>popcorn &amp; snacks required</span>
        </div>
      </motion.div>

      {/* LIVE COUNTDOWN SECTION */}
      <div className="mt-12 text-center max-w-lg w-full">
        <h4 className="font-serif text-xl sm:text-2xl text-wine-muted font-medium mb-4 italic">
          UNTIL OUR MOVIE DATE
        </h4>

        {countdown && !countdown.isPast ? (
          <div className="flex justify-center items-center gap-3 sm:gap-6">
            <div className="bg-paper-card border border-gold-champagne/40 rounded-xl px-4 py-2 shadow-xs min-w-[70px]">
              <span className="block font-serif text-3xl font-bold text-chocolate">
                {countdown.days}
              </span>
              <span className="text-[10px] uppercase font-sans tracking-wider text-chocolate-muted">
                Days
              </span>
            </div>
            <span className="text-xl font-serif text-gold-champagne">:</span>
            <div className="bg-paper-card border border-gold-champagne/40 rounded-xl px-4 py-2 shadow-xs min-w-[70px]">
              <span className="block font-serif text-3xl font-bold text-chocolate">
                {countdown.hours}
              </span>
              <span className="text-[10px] uppercase font-sans tracking-wider text-chocolate-muted">
                Hours
              </span>
            </div>
            <span className="text-xl font-serif text-gold-champagne">:</span>
            <div className="bg-paper-card border border-gold-champagne/40 rounded-xl px-4 py-2 shadow-xs min-w-[70px]">
              <span className="block font-serif text-3xl font-bold text-chocolate">
                {countdown.minutes}
              </span>
              <span className="text-[10px] uppercase font-sans tracking-wider text-chocolate-muted">
                Mins
              </span>
            </div>
            <span className="text-xl font-serif text-gold-champagne">:</span>
            <div className="bg-paper-card border border-gold-champagne/40 rounded-xl px-4 py-2 shadow-xs min-w-[70px]">
              <span className="block font-serif text-3xl font-bold text-wine-muted">
                {countdown.seconds}
              </span>
              <span className="text-[10px] uppercase font-sans tracking-wider text-chocolate-muted">
                Secs
              </span>
            </div>
          </div>
        ) : countdown && countdown.isPast ? (
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-rose-blush/40 border border-rose-dusty/40 text-wine-muted font-serif text-base">
            <CheckCircle2 size={16} />
            <span>It&apos;s movie date time! Grab your blanket ♡</span>
          </div>
        ) : (
          <div className="inline-flex flex-col items-center">
            <span className="font-hand text-lg text-rose-deep">
              countdown will begin once we pick our date ♡
            </span>
            <span className="text-xs font-mono text-chocolate-muted mt-1">
              (configurable in src/config/anniversary.ts)
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
