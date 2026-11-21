"use client";

import React, { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  rotation: number;
  vRot: number;
  type: "star" | "heart" | "petal" | "dot";
  color: string;
}

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "button" | "link" | "yes" | "flower">("default");
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorDotRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const prevMousePos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const particles = useRef<Particle[]>([]);
  const lastSpawnTime = useRef(0);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    // Check touch device or reduced motion
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || prefersReducedMotion) {
      return; // Keep native cursor
    }

    setMounted(true);
    document.documentElement.classList.add("custom-cursor-active");

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Detect hover target
      const target = e.target as HTMLElement | null;
      if (target) {
        if (target.closest('[data-cursor="yes"]')) {
          setCursorType("yes");
        } else if (target.closest('[data-cursor="flower"]')) {
          setCursorType("flower");
        } else if (target.closest("button, [role='button']")) {
          setCursorType("button");
        } else if (target.closest("a")) {
          setCursorType("link");
        } else {
          setCursorType("default");
        }
      }

      // Calculate speed
      const dx = e.clientX - prevMousePos.current.x;
      const dy = e.clientY - prevMousePos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      prevMousePos.current = { x: e.clientX, y: e.clientY };

      // Spawn particles when moving
      const now = performance.now();
      const spawnInterval = cursorType === "yes" ? 30 : speed > 18 ? 25 : 60;
      if (now - lastSpawnTime.current > spawnInterval) {
        lastSpawnTime.current = now;
        spawnParticle(e.clientX, e.clientY, speed, cursorType);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      // Sparkle burst on click
      for (let i = 0; i < 9; i++) {
        const angle = (Math.PI * 2 * i) / 9 + Math.random() * 0.4;
        const velocity = 1.8 + Math.random() * 3.2;
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          size: 4 + Math.random() * 5,
          alpha: 1,
          rotation: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 8,
          type: cursorType === "yes" ? "heart" : Math.random() > 0.4 ? "star" : "dot",
          color: cursorType === "yes" ? "#D9A5A5" : Math.random() > 0.5 ? "#C7A66A" : "#EBCBC7",
        });
      }
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Animation Loop
    const render = () => {
      // Smooth lerp for main cursor
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.45;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.45;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }

      // Draw canvas particles
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx && canvasRef.current) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        for (let i = particles.current.length - 1; i >= 0; i--) {
          const p = particles.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.04; // Gentle gravity
          p.alpha -= 0.024;
          p.size *= 0.97;
          p.rotation += p.vRot;

          if (p.alpha <= 0.02 || p.size <= 0.5) {
            particles.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);

          if (p.type === "star") {
            ctx.fillStyle = p.color;
            drawStar(ctx, 0, 0, p.size * 0.4, p.size);
          } else if (p.type === "heart") {
            ctx.fillStyle = p.color;
            drawHeart(ctx, 0, 0, p.size * 0.7);
          } else if (p.type === "petal") {
            ctx.fillStyle = p.color;
            drawPetal(ctx, 0, 0, p.size);
          } else {
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible, cursorType]);

  const spawnParticle = (
    x: number,
    y: number,
    speed: number,
    typeState: "default" | "button" | "link" | "yes" | "flower"
  ) => {
    let pType: Particle["type"] = "dot";
    let pColor = "#C7A66A";

    if (typeState === "yes") {
      pType = "heart";
      pColor = Math.random() > 0.5 ? "#D9A5A5" : "#7C3349";
    } else if (typeState === "flower") {
      pType = Math.random() > 0.5 ? "petal" : "star";
      pColor = Math.random() > 0.5 ? "#EBCBC7" : "#A5B59A";
    } else if (typeState === "button" || typeState === "link") {
      pType = Math.random() > 0.4 ? "star" : "dot";
      pColor = Math.random() > 0.5 ? "#F0DFBC" : "#C7A66A";
    } else {
      const rand = Math.random();
      if (rand < 0.35) pType = "star";
      else if (rand < 0.55) pType = "petal";
      else if (rand < 0.7) pType = "heart";
      else pType = "dot";

      const colors = ["#C7A66A", "#D9A5A5", "#EBCBC7", "#F0DFBC", "#A5B59A"];
      pColor = colors[Math.floor(Math.random() * colors.length)];
    }

    particles.current.push({
      x: x + (Math.random() - 0.5) * 8,
      y: y + (Math.random() - 0.5) * 8,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2 - 0.2,
      size: 3 + Math.random() * 4.5,
      alpha: 0.85,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 4,
      type: pType,
      color: pColor,
    });

    // Limit maximum particles for smooth performance
    if (particles.current.length > 60) {
      particles.current.shift();
    }
  };

  const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, innerR: number, outerR: number) => {
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const outerAngle = (i * Math.PI) / 2;
      const innerAngle = outerAngle + Math.PI / 4;
      if (i === 0) {
        ctx.moveTo(cx + Math.cos(outerAngle) * outerR, cy + Math.sin(outerAngle) * outerR);
      } else {
        ctx.lineTo(cx + Math.cos(outerAngle) * outerR, cy + Math.sin(outerAngle) * outerR);
      }
      ctx.lineTo(cx + Math.cos(innerAngle) * innerR, cy + Math.sin(innerAngle) * innerR);
    }
    ctx.closePath();
    ctx.fill();
  };

  const drawHeart = (ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) => {
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(cx, cy + topCurveHeight);
    ctx.bezierCurveTo(cx, cy, cx - size / 2, cy, cx - size / 2, cy + topCurveHeight);
    ctx.bezierCurveTo(cx - size / 2, cy + (size + topCurveHeight) / 2, cx, cy + size, cx, cy + size);
    ctx.bezierCurveTo(cx, cy + size, cx + size / 2, cy + (size + topCurveHeight) / 2, cx + size / 2, cy + topCurveHeight);
    ctx.bezierCurveTo(cx + size / 2, cy, cx, cy, cx, cy + topCurveHeight);
    ctx.closePath();
    ctx.fill();
  };

  const drawPetal = (ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) => {
    ctx.beginPath();
    ctx.ellipse(cx, cy, size * 0.4, size * 0.8, Math.PI / 6, 0, Math.PI * 2);
    ctx.fill();
  };

  if (!mounted) return null;

  return (
    <>
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9998] transition-opacity duration-300"
        style={{ opacity: isVisible ? 1 : 0 }}
      />

      {/* Main Cursor Element */}
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      >
        <div
          className={`relative -top-3 -left-3 transition-transform duration-200 ease-out ${
            isClicking ? "scale-75" : ""
          } ${
            cursorType === "button"
              ? "scale-125 rotate-12"
              : cursorType === "yes"
              ? "scale-140"
              : cursorType === "flower"
              ? "scale-130 rotate-45"
              : "scale-100"
          }`}
        >
          {cursorType === "yes" ? (
            // Delicate Heart for YES button
            <div className="relative flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" className="filter drop-shadow-[0_0_8px_rgba(217,165,165,0.85)]">
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="#7C3349"
                  stroke="#F8F3E9"
                  strokeWidth="1.2"
                />
              </svg>
              <div className="absolute w-1.5 h-1.5 bg-rose-blush rounded-full animate-ping opacity-75" />
            </div>
          ) : cursorType === "flower" ? (
            // Tiny Flower Cursor for Flower Artwork
            <div className="relative flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" className="filter drop-shadow-[0_0_8px_rgba(199,166,106,0.8)]">
                <circle cx="12" cy="7" r="3.5" fill="#D9A5A5" opacity="0.9" />
                <circle cx="17" cy="12" r="3.5" fill="#D9A5A5" opacity="0.9" />
                <circle cx="12" cy="17" r="3.5" fill="#D9A5A5" opacity="0.9" />
                <circle cx="7" cy="12" r="3.5" fill="#D9A5A5" opacity="0.9" />
                <circle cx="12" cy="12" r="3" fill="#C7A66A" />
              </svg>
            </div>
          ) : (
            // Romantic 4-Point Sparkling Star Cursor
            <div className="relative flex items-center justify-center">
              {/* Outer soft glow halo */}
              <div
                className={`absolute w-7 h-7 rounded-full filter blur-[3px] transition-all duration-300 ${
                  cursorType === "link"
                    ? "bg-rose-dusty/60 scale-125"
                    : cursorType === "button"
                    ? "bg-gold-champagne/60 scale-110"
                    : "bg-rose-dusty/40 scale-90"
                }`}
              />

              {/* 4-point star icon */}
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                className="relative filter drop-shadow-[0_0_5px_rgba(199,166,106,0.9)]"
              >
                <path
                  d="M12 2 C12 7.5, 16.5 12, 22 12 C16.5 12, 12 16.5, 12 22 C12 16.5, 7.5 12, 2 12 C7.5 12, 12 7.5, 12 2 Z"
                  fill="#FFF7E6"
                  stroke="#C7A66A"
                  strokeWidth="1.2"
                />
                <circle cx="12" cy="12" r="2" fill="#D9A5A5" />
              </svg>

              {/* Tiny trailing sparkle indicator */}
              {cursorType === "button" && (
                <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-gold-champagne rounded-full animate-ping opacity-90" />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
