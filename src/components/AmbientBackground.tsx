"use client";

import React, { useEffect, useState } from "react";
import { FlowerArtwork } from "./FlowerArtwork";

interface Petal {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  swayAmount: number;
}

interface Star {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export function AmbientBackground() {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate subtle drifting petals
    const newPetals: Petal[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 95,
      top: Math.random() * 100,
      size: 14 + Math.random() * 16,
      duration: 18 + Math.random() * 14,
      delay: Math.random() * 10,
      rotation: Math.random() * 360,
      swayAmount: 20 + Math.random() * 35,
    }));
    setPetals(newPetals);

    // Generate gentle twinkling background stars
    const newStars: Star[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 96,
      top: Math.random() * 100,
      size: 6 + Math.random() * 8,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 5,
      opacity: 0.3 + Math.random() * 0.5,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {/* Paper grain texture */}
      <div className="absolute inset-0 paper-grain opacity-80" />

      {/* Soft moving ambient gradient blobs */}
      <div
        className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full filter blur-[90px] opacity-25 animate-float-slow"
        style={{ background: "radial-gradient(circle, #EBCBC7 0%, #F8F3E9 70%)" }}
      />
      <div
        className="absolute top-[40%] -right-[15%] w-[700px] h-[700px] rounded-full filter blur-[110px] opacity-20 animate-float-slow delay-2000"
        style={{ background: "radial-gradient(circle, #C7A66A 0%, transparent 65%)" }}
      />
      <div
        className="absolute -bottom-[20%] left-[25%] w-[650px] h-[650px] rounded-full filter blur-[100px] opacity-20 animate-float-slow delay-4000"
        style={{ background: "radial-gradient(circle, #A5B59A 0%, transparent 70%)" }}
      />

      {/* Subtle faint background flower silhouettes at corners */}
      <div className="absolute top-10 -left-20 w-80 h-80 opacity-15 rotate-12 filter blur-[0.5px]">
        <FlowerArtwork width={320} height={320} />
      </div>
      <div className="absolute top-[60%] -right-24 w-96 h-96 opacity-10 -rotate-45 filter blur-[0.5px]">
        <FlowerArtwork width={380} height={380} />
      </div>
      <div className="absolute bottom-12 -left-16 w-72 h-72 opacity-15 rotate-[65deg]">
        <FlowerArtwork width={290} height={290} />
      </div>

      {/* Floating Petals */}
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute will-change-transform"
          style={{
            left: `${petal.left}%`,
            top: `${petal.top}%`,
            animation: `floatPetal ${petal.duration}s infinite ease-in-out ${petal.delay}s`,
            opacity: 0.65,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.4}
            viewBox="0 0 30 42"
            style={{
              transform: `rotate(${petal.rotation}deg)`,
              filter: "drop-shadow(0 2px 4px rgba(124,51,73,0.06))",
            }}
          >
            <path
              d="M15 0 C25 15, 30 30, 15 42 C0 30, 5 15, 15 0 Z"
              fill={petal.id % 2 === 0 ? "#EBCBC7" : "#D9A5A5"}
              opacity="0.85"
            />
          </svg>
        </div>
      ))}

      {/* Gentle Twinkling Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute will-change-transform"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            animation: `twinkleStar ${star.duration}s infinite ease-in-out ${star.delay}s`,
          }}
        >
          <svg
            width={star.size}
            height={star.size}
            viewBox="0 0 24 24"
            className="filter drop-shadow-[0_0_3px_rgba(199,166,106,0.6)]"
          >
            <path
              d="M12 0 L14 9 L24 12 L14 15 L12 24 L10 15 L0 12 L10 9 Z"
              fill="#C7A66A"
              opacity={star.opacity}
            />
          </svg>
        </div>
      ))}

      <style jsx>{`
        @keyframes floatPetal {
          0% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-40px) translateX(25px) rotate(45deg);
          }
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
        }
        @keyframes twinkleStar {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.15);
          }
        }
      `}</style>
    </div>
  );
}
