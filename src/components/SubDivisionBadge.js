// Reusable badge with desktop hovercard + mobile tap drawer
import React from "react";
import { SUBDIVISION_INFO } from "../../data/subdivisions";

const SubdivisionBadge = ({ label, onOpen }) => {
  const desc = SUBDIVISION_INFO[label] || "See event PDF for details.";
  return (
    <button
      type="button"
      onClick={() => onOpen(label)} // opens drawer on mobile
      className="relative group rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm font-semibold text-neutral-900 hover:bg-black/10 focus:outline-none"
      aria-haspopup="dialog"
      aria-label={`${label}: tap for details`}
    >
      {label}

      {/* Desktop hover card */}
      <span className="hidden md:block pointer-events-none absolute left-1/2 top-full z-30 w-72 -translate-x-1/2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-3 transition">
        <span className="block rounded-2xl border border-black/10 bg-white p-3 text-[13px] leading-5 text-neutral-800 shadow-lg">
          <span className="block text-[11px] font-black tracking-wider text-a/90 mb-1">
            {label}
          </span>
          {desc}
        </span>
      </span>
    </button>
  );
};

export const SubdivisionDrawer = ({ openFor, onClose }) => {
  if (!openFor) return null;
  return (
    <div
      className="md:hidden fixed inset-0 z-[100] bg-black/40"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto h-1 w-10 rounded-full bg-black/10 mb-3" />
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-base font-extrabold tracking-tight">{openFor}</h3>
          <button
            className="rounded-full border border-black/10 px-3 py-1 text-sm font-semibold"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <p className="mt-2 text-[15px] leading-6 text-neutral-700">
          {SUBDIVISION_INFO[openFor] || "See event PDF for details."}
        </p>
      </div>
    </div>
  );
};

export default SubdivisionBadge;
