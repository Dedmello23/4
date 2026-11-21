"use client";

import React, { useState } from "react";
import Image from "next/image";
import { anniversaryConfig } from "@/config/anniversary";

interface FlowerArtworkProps {
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
  priority?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  width?: number;
  height?: number;
}

export function FlowerArtwork({
  className = "",
  style = {},
  alt = "Hand-drawn Adobe Fresco Flower",
  priority = false,
  interactive = false,
  onClick,
  width = 320,
  height = 320,
}: FlowerArtworkProps) {
  const [imgSrc, setImgSrc] = useState<string>(anniversaryConfig.flowerAssetPath);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    // If flower.png fails to load (e.g. before user uploads the exact file), fallback to flower.svg
    if (imgSrc !== "/assets/flower.svg") {
      setImgSrc("/assets/flower.svg");
    } else {
      setHasError(true);
    }
  };

  return (
    <div
      className={`relative inline-block select-none ${interactive ? "cursor-pointer group" : ""} ${className}`}
      style={style}
      onClick={onClick}
      data-cursor={interactive ? "flower" : undefined}
    >
      {!hasError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          onError={handleError}
          className={`w-full h-full object-contain filter drop-shadow-sm transition-transform duration-700 ease-out ${
            interactive ? "group-hover:scale-105 group-hover:rotate-3" : ""
          }`}
          style={{ imageRendering: "auto" }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center p-4 rounded-full border border-rose-dusty/40 bg-rose-blush/20 text-wine-muted text-xs font-serif italic text-center">
          Adobe Fresco Flower
        </div>
      )}
    </div>
  );
}
