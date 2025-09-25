// src/components/StateCard.js (Tailwind)
import React from "react";

export default function StateCard({ state, onClick }) {
  const logo = state?.logo?.file?.url;

  return (
    <button
      type="button"
      onClick={() => onClick?.(state)}
      className="
        group relative w-full h-full min-h-[200px]
        rounded-2xl bg-white/80 backdrop-blur border border-black/5
        shadow-sm hover:shadow-md transition-all
        ring-0 hover:ring-2 hover:ring-black/10
        flex flex-col items-center justify-center p-6
        text-center
      "
      aria-label={`View competitions in ${state?.name ?? "this state"}`}
    >
      {logo ? (
        <img
          src={logo}
          alt={`${state?.name ?? "State"} Logo`}
          className="
            h-20 w-20 rounded-full object-cover
            mb-4
            ring-1 ring-black/5
            transition-transform duration-300 ease-out
            group-hover:scale-105
          "
        />
      ) : (
        <div
          className="
            h-20 w-20 rounded-full bg-gray-200 mb-4
            ring-1 ring-black/5
          "
        />
      )}

      <span className="text-lg font-semibold text-black">
        {state?.name ?? "Unnamed State"}
      </span>

      {/* Subtle glow on hover */}
      <span
        className="
          pointer-events-none absolute inset-0 rounded-2xl
          opacity-0 group-hover:opacity-100
          transition-opacity
          bg-gradient-to-b from-white/0 via-white/0 to-black/5
        "
        aria-hidden="true"
      />
    </button>
  );
}
