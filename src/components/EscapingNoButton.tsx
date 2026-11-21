"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { anniversaryConfig } from "@/config/anniversary";
import { Sparkles } from "lucide-react";

interface EscapingNoButtonProps {
  arenaRef: React.RefObject<HTMLDivElement | null>;
  yesButtonRef: React.RefObject<HTMLButtonElement | null>;
}

interface SparkleItem {
  id: number;
  x: number;
  y: number;
}

export function EscapingNoButton({ arenaRef, yesButtonRef }: EscapingNoButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [escapeCount, setEscapeCount] = useState(0);
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  const [messagePos, setMessagePos] = useState({ x: 0, y: -45 });
  const [sparkles, setSparkles] = useState<SparkleItem[]>([]);
  const isDodgingRef = useRef(false);

  // Escaping action
  const dodge = useCallback(() => {
    if (isDodgingRef.current) return;
    isDodgingRef.current = true;

    const arena = arenaRef.current;
    const button = buttonRef.current;
    const yesButton = yesButtonRef.current;

    if (!arena || !button) {
      isDodgingRef.current = false;
      return;
    }

    const arenaRect = arena.getBoundingClientRect();
    const btnRect = button.getBoundingClientRect();
    const yesRect = yesButton ? yesButton.getBoundingClientRect() : null;

    // Leave behind sparkle at current location
    const sparkId = Date.now();
    setSparkles((prev) => [
      ...prev.slice(-4),
      { id: sparkId, x: position.x, y: position.y },
    ]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== sparkId));
    }, 800);

    // Compute bounds for button offset relative to initial center
    const maxOffsetX = Math.max(60, (arenaRect.width - btnRect.width) / 2 - 20);
    const maxOffsetY = Math.max(50, (arenaRect.height - btnRect.height) / 2 - 30);

    let chosenX = 0;
    let chosenY = 0;
    let attempts = 0;
    let isSafe = false;

    while (attempts < 20 && !isSafe) {
      attempts++;
      // Random coordinates within safe arena bounds
      chosenX = (Math.random() * 2 - 1) * maxOffsetX;
      chosenY = (Math.random() * 2 - 1) * maxOffsetY;

      // Project where the button would be on screen
      const projectedLeft = arenaRect.left + arenaRect.width / 2 + chosenX - btnRect.width / 2;
      const projectedTop = arenaRect.top + arenaRect.height / 2 + chosenY - btnRect.height / 2;
      const projectedRight = projectedLeft + btnRect.width;
      const projectedBottom = projectedTop + btnRect.height;

      // Ensure NO overlap with YES button
      if (yesRect) {
        const padding = 35; // safe margin around YES button
        const overlapsYes = !(
          projectedRight < yesRect.left - padding ||
          projectedLeft > yesRect.right + padding ||
          projectedBottom < yesRect.top - padding ||
          projectedTop > yesRect.bottom + padding
        );

        if (!overlapsYes) {
          isSafe = true;
        }
      } else {
        isSafe = true;
      }
    }

    setPosition({ x: chosenX, y: chosenY });
    setEscapeCount((c) => c + 1);

    // Pick a funny random message
    const msgs = anniversaryConfig.escapingNoMessages;
    const nextMsg = msgs[Math.floor(Math.random() * msgs.length)];
    setCurrentMessage(nextMsg);

    // Random message position offset
    setMessagePos({
      x: (Math.random() - 0.5) * 40,
      y: chosenY > 0 ? -48 : 52,
    });

    setTimeout(() => {
      isDodgingRef.current = false;
    }, 180);
  }, [arenaRef, yesButtonRef, position.x, position.y]);

  // Pointer proximity detector (mouse & touch)
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - btnCenterX;
      const dy = e.clientY - btnCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Trigger distance threshold (95px)
      if (distance < 95) {
        dodge();
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("mousemove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mousemove", handlePointerMove);
    };
  }, [dodge]);

  // Mobile touch handler (touchstart, pointerdown)
  const handleTouchAttempt = (e: React.TouchEvent | React.PointerEvent) => {
    e.preventDefault();
    dodge();
  };

  return (
    <div className="relative inline-block select-none">
      {/* Old position sparkles */}
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute pointer-events-none text-gold-champagne z-10"
          initial={{ opacity: 1, scale: 0.5 }}
          animate={{ opacity: 0, scale: 1.5, y: -15 }}
          transition={{ duration: 0.7 }}
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(calc(-50% + ${s.x}px), calc(-50% + ${s.y}px))`,
          }}
        >
          <Sparkles size={20} />
        </motion.div>
      ))}

      {/* Floating escaping message */}
      <AnimatePresence>
        {currentMessage && (
          <motion.div
            key={escapeCount}
            initial={{ opacity: 0, y: 8, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 450, damping: 25 }}
            className="absolute pointer-events-none z-30 whitespace-nowrap bg-wine-muted text-paper-ivory text-xs sm:text-sm font-hand px-3 py-1.5 rounded-full shadow-md border border-rose-blush/40"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(calc(-50% + ${position.x + messagePos.x}px), calc(-50% + ${position.y + messagePos.y}px))`,
            }}
          >
            {currentMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Elusive NO Button */}
      <motion.button
        ref={buttonRef}
        animate={{
          x: position.x,
          y: position.y,
        }}
        transition={{
          type: "spring",
          stiffness: 550,
          damping: 24,
          mass: 0.6,
        }}
        onPointerEnter={dodge}
        onTouchStart={handleTouchAttempt}
        onPointerDown={handleTouchAttempt}
        onClick={(e) => {
          e.preventDefault();
          dodge();
        }}
        className="px-7 py-3 rounded-full bg-paper-card text-chocolate-muted border border-gold-champagne/40 font-serif text-base tracking-wider hover:bg-rose-blush/30 shadow-xs cursor-not-allowed select-none transition-colors"
        tabIndex={-1}
      >
        NO
      </motion.button>
    </div>
  );
}
