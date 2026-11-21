"use client";

import React, { useEffect, useState } from "react";
import { anniversaryConfig } from "@/config/anniversary";
import { getRelationshipDuration } from "@/utils/timezone";
import { Heart } from "lucide-react";

export function RelationshipCounter() {
  const [duration, setDuration] = useState<{
    years: number;
    months: number;
    days: number;
    hours: number;
  } | null>(null);

  useEffect(() => {
    if (!anniversaryConfig.relationshipStartDate) return;

    // Initial calculation
    setDuration(getRelationshipDuration(anniversaryConfig.relationshipStartDate));

    // Update every minute
    const interval = setInterval(() => {
      setDuration(getRelationshipDuration(anniversaryConfig.relationshipStartDate));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Graceful fallback when date is not yet configured in config file
  if (!anniversaryConfig.relationshipStartDate || !duration) {
    return (
      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-paper-card border border-gold-champagne/40 shadow-xs">
        <Heart size={14} className="text-rose-dusty fill-rose-dusty animate-pulse-subtle" />
        <span className="font-hand text-xl text-wine-muted tracking-wide">
          four years of being us ♡
        </span>
      </div>
    );
  }

  return (
    <div className="inline-flex flex-col items-center">
      <div className="flex items-center gap-2 sm:gap-4 px-4 sm:px-6 py-2.5 rounded-2xl bg-paper-card/90 backdrop-blur-xs border border-gold-champagne/35 shadow-paper">
        <div className="text-center px-1.5 sm:px-3">
          <span className="block font-serif text-2xl sm:text-3xl font-semibold text-wine-muted leading-tight">
            {duration.years}
          </span>
          <span className="text-[10px] uppercase font-sans tracking-wider text-chocolate-muted">
            Years
          </span>
        </div>

        <span className="text-gold-champagne font-serif text-lg">•</span>

        <div className="text-center px-1.5 sm:px-3">
          <span className="block font-serif text-2xl sm:text-3xl font-semibold text-wine-muted leading-tight">
            {duration.months}
          </span>
          <span className="text-[10px] uppercase font-sans tracking-wider text-chocolate-muted">
            Months
          </span>
        </div>

        <span className="text-gold-champagne font-serif text-lg">•</span>

        <div className="text-center px-1.5 sm:px-3">
          <span className="block font-serif text-2xl sm:text-3xl font-semibold text-wine-muted leading-tight">
            {duration.days}
          </span>
          <span className="text-[10px] uppercase font-sans tracking-wider text-chocolate-muted">
            Days
          </span>
        </div>

        <span className="text-gold-champagne font-serif text-lg">•</span>

        <div className="text-center px-1.5 sm:px-3">
          <span className="block font-serif text-2xl sm:text-3xl font-semibold text-wine-muted leading-tight">
            {duration.hours}
          </span>
          <span className="text-[10px] uppercase font-sans tracking-wider text-chocolate-muted">
            Hours
          </span>
        </div>
      </div>
      <p className="mt-2 font-hand text-base text-rose-deep">
        and counting every single second ♡
      </p>
    </div>
  );
}
