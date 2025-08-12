// Navbar.js
import React, { useState } from "react";
import { Link } from "gatsby";

/**
 * Navbar
 * - Gatsby.js + Tailwind CSS
 * - Right-aligned menu with a full-width "Divisions" mega menu on hover.
 * - EXTRA: Hovering a top-level menu item draws an animated circle around the label.
 *
 * Hover behaviour:
 * - onMouseEnter on the "Divisions" link => show mega menu
 * - onMouseLeave from the combined wrapper (which contains BOTH the link and the panel) => hide mega menu
 *   This prevents flicker when moving the cursor from the link down into the panel.
 */
const Navbar = () => {
  const [divisionsOpen, setDivisionsOpen] = useState(false);

  // Reusable label + animated circle wrapper
  const DecoratedLabel = ({ children }) => (
    <span className="relative grid place-items-center">
      <span className="relative z-10">{children}</span>
      {/* Drawn circle */}
      <svg
        viewBox="0 0 40 40"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[3.2em] w-[8em] -translate-x-1/2 -translate-y-1/2 scale-90 opacity-30 transition-transform group-hover:scale-100 group-hover:opacity-95 group-focus-within:opacity-95"
      >
        <circle
          cx="20"
          cy="20"
          r="17.5"
          className="fill-none stroke-[#f7e65c] stroke-[2.25] [stroke-linecap:round] [stroke-dasharray:140] [stroke-dashoffset:140] transition-[stroke-dashoffset] duration-500 ease-out group-hover:[stroke-dashoffset:0] group-focus-within:[stroke-dashoffset:0]"
        />
      </svg>
    </span>
  );

  return (
    // Wrapper is relative so the mega menu can be absolutely positioned against it
    <div
      className="relative"
      onMouseLeave={() => setDivisionsOpen(false)} // Hide when cursor leaves both link + panel area
    >
      {/* Main navbar */}
      <nav className="w-full bg-gray-800 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-end items-center gap-6">
          <Link
            to="/"
            className="group relative inline-flex items-center justify-center px-3 py-2 text-white hover:text-blue-300 transition-colors focus:outline-none"
          >
            <DecoratedLabel>Home</DecoratedLabel>
          </Link>

          {/* Divisions trigger: opens mega menu on hover */}
          <div
            className="relative"
            onMouseEnter={() => setDivisionsOpen(true)}
          >
            <Link
              to="/divisions"
              className="group relative inline-flex items-center justify-center px-3 py-2 text-white hover:text-blue-300 transition-colors focus:outline-none"
            >
              <DecoratedLabel>Divisions</DecoratedLabel>
            </Link>
          </div>

          <Link
            to="/competitions"
            className="group relative inline-flex items-center justify-center px-3 py-2 text-white hover:text-blue-300 transition-colors focus:outline-none"
          >
            <DecoratedLabel>Competitions</DecoratedLabel>
          </Link>

          <Link
            to="/contact"
            className="group relative inline-flex items-center justify-center px-3 py-2 text-white hover:text-blue-300 transition-colors focus:outline-none"
          >
            <DecoratedLabel>Contact Us</DecoratedLabel>
          </Link>

          <Link
            to="/about"
            className="group relative inline-flex items-center justify-center px-3 py-2 text-white hover:text-blue-300 transition-colors focus:outline-none"
          >
            <DecoratedLabel>About Us</DecoratedLabel>
          </Link>
        </div>
      </nav>

      {/* Mega menu: full-width, sits directly underneath the navbar */}
      {divisionsOpen && (
        <div
          className="absolute left-0 right-0 top-full z-50 bg-gray-700 shadow-lg"
          onMouseEnter={() => setDivisionsOpen(true)} // Keep open while hovering the panel
        >
          <div className="max-w-7xl mx-auto p-8">
            {/* Four items in a row, evenly spaced */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 justify-items-center">
              {/* Bodybuilding */}
              <Link to="/divisions/bodybuilding" className="group text-center">
                <img
                  src="https://placehold.co/100x100"
                  alt="Bodybuilding"
                  className="w-24 h-24 rounded-full object-cover mb-3 ring-0 group-hover:ring-2 group-hover:ring-blue-300 transition"
                />
                <span className="text-white group-hover:text-blue-300 transition-colors">
                  Bodybuilding
                </span>
              </Link>

              {/* Classic */}
              <Link to="/divisions/classic" className="group text-center">
                <img
                  src="https://placehold.co/100x100"
                  alt="Classic"
                  className="w-24 h-24 rounded-full object-cover mb-3 ring-0 group-hover:ring-2 group-hover:ring-blue-300 transition"
                />
                <span className="text-white group-hover:text-blue-300 transition-colors">
                  Classic
                </span>
              </Link>

              {/* Bikini */}
              <Link to="/divisions/bikini" className="group text-center">
                <img
                  src="https://placehold.co/100x100"
                  alt="Bikini"
                  className="w-24 h-24 rounded-full object-cover mb-3 ring-0 group-hover:ring-2 group-hover:ring-blue-300 transition"
                />
                <span className="text-white group-hover:text-blue-300 transition-colors">
                  Bikini
                </span>
              </Link>

              {/* Sports Model */}
              <Link to="/divisions/sports-model" className="group text-center">
                <img
                  src="https://placehold.co/100x100"
                  alt="Sports Model"
                  className="w-24 h-24 rounded-full object-cover mb-3 ring-0 group-hover:ring-2 group-hover:ring-blue-300 transition"
                />
                <span className="text-white group-hover:text-blue-300 transition-colors">
                  Sports Model
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
