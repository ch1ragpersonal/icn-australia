// src/components/HomeHero.js
import React from "react";

export default function HomeHero({
  src,
  alt = "",
  vh = 70,
  overlayColor = "rgba(255,255,255,0.35)",
  overlayOpacity = 1,
  className = "",
}) {
  // Soft fade on the left and right edges using a mask
  const maskStyle = {
    maskImage:
      "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
    WebkitMaskImage:
      "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
  };

  return (
    <section
      className={`relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden ${className}`}
      style={{ height: `min(${vh}vh, 900px)` }}
      aria-label="Homepage hero"
    >
      {/* Image layer */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover object-top select-none"
        style={maskStyle}
        draggable={false}
        loading="eager"
      />

      {/* Light overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
        }}
      />

      {/* Optional content slot */}
      <div className="relative z-10 h-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-10">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-black/90 drop-shadow">
          ICN Australia
        </h1>
      </div>
    </section>
  );
}
