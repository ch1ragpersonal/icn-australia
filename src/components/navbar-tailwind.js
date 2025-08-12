// Navbar.js
import React, { useState } from "react";
import { Link } from "gatsby";
import logo from "../images/logo.png"; // <-- update to your actual logo path

/**
 * Responsive Navbar (Gatsby + Tailwind)
 * - Left: logo (click -> home) with black -> yellow hover filter
 * - Right (desktop ≥ md): menu with animated circle hover + full-width "Divisions" mega menu
 * - Mobile (< md): hamburger toggles a slide-down panel; "Divisions" expands to show sub-links
 */
const Navbar = () => {
  const [divisionsOpen, setDivisionsOpen] = useState(false); // desktop hover mega menu
  const [mobileOpen, setMobileOpen] = useState(false); // mobile menu drawer
  const [mobileDivisionsOpen, setMobileDivisionsOpen] = useState(false); // mobile divisions sub-menu

  // Reusable label + animated circle wrapper
  const DecoratedLabel = ({ children }) => (
    <span className="relative grid place-items-center">
      <span className="relative z-10">{children}</span>
      {/* Drawn circle */}
      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[2.1em] w-[2.1em] -translate-x-1/2 -translate-y-1/2 scale-90 opacity-30 transition-transform group-hover:scale-100 group-hover:opacity-95 group-focus-within:opacity-95"
      >
        <circle
          cx="20"
          cy="20"
          r="17.5"
          className="fill-none stroke-[#f7e65c] stroke-[2.25] [stroke-linecap:round] [stroke-dasharray:110] [stroke-dashoffset:110] transition-[stroke-dashoffset] duration-500 ease-out group-hover:[stroke-dashoffset:0] group-focus-within:[stroke-dashoffset:0]"
        />
      </svg>
    </span>
  );

  return (
    // Wrapper is relative so the desktop mega menu can be absolutely positioned
    <div
      className="relative"
      onMouseLeave={() => setDivisionsOpen(false)} // desktop: hide when cursor leaves both link + panel area
    >
      {/* Top bar */}
      <nav className="w-full bg-gray-800 px-4 sm:px-6 md:px-8 py-3 md:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* LEFT: Logo */}
          <Link to="/" className="block shrink-0" aria-label="Go to homepage">
            <img
              src={logo}
              alt="Logo"
              className="w-[12vmin] max-w-[72px] h-auto rounded-[2vmin] filter grayscale brightness-0 transition duration-300 ease-in-out hover:invert-[59%] hover:sepia hover:saturate-[475%] hover:hue-rotate-[3deg] hover:brightness-[103%] hover:contrast-[101%]"
            />
          </Link>

          {/* RIGHT: Desktop menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="group relative inline-flex items-center justify-center px-3 py-2 text-white hover:text-blue-300 transition-colors focus:outline-none"
            >
              <DecoratedLabel>Home</DecoratedLabel>
            </Link>

            {/* Divisions trigger (desktop hover) */}
            <div className="relative" onMouseEnter={() => setDivisionsOpen(true)}>
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

          {/* RIGHT: Mobile hamburger */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 text-gray-200 hover:text-white hover:bg-gray-700 rounded-lg transition"
            aria-controls="mobile-menu"
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((v) => !v);
              // close sub menu when closing the drawer
              if (mobileOpen) setMobileDivisionsOpen(false);
            }}
          >
            <span className="sr-only">Open main menu</span>
            {/* Icon: hamburger / close */}
            {!mobileOpen ? (
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* DESKTOP: Full-width mega menu (only renders on md+ for layout sanity) */}
      {divisionsOpen && (
        <div className="hidden md:block absolute left-0 right-0 top-full z-50 bg-gray-700 shadow-lg">
          <div className="max-w-7xl mx-auto p-8">
            <div className="grid grid-cols-4 gap-8 justify-items-center">
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

      {/* MOBILE: Slide-down menu */}
      <div
        id="mobile-menu"
        className={`md:hidden bg-gray-800 shadow-inner transition-[max-height,opacity] duration-300 ease-out overflow-hidden ${
          mobileOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 pt-2 space-y-1">
          <Link
            to="/"
            className="block px-3 py-2 text-white hover:text-blue-300 rounded-md transition"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>

          {/* Mobile "Divisions" expandable section */}
          <button
            className="w-full flex items-center justify-between px-3 py-2 text-white hover:text-blue-300 rounded-md transition"
            aria-expanded={mobileDivisionsOpen}
            onClick={() => setMobileDivisionsOpen((v) => !v)}
          >
            <span>Divisions</span>
            <svg
              className={`h-5 w-5 transition-transform ${
                mobileDivisionsOpen ? "rotate-180" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Mobile sub-links for Divisions */}
          <div
            className={`grid grid-cols-2 gap-4 px-3 transition-[grid-template-rows,opacity] duration-300 ease-out ${
              mobileDivisionsOpen ? "opacity-100 mt-2" : "opacity-0 h-0 overflow-hidden"
            }`}
          >
            <Link
              to="/divisions/bodybuilding"
              className="flex flex-col items-center text-center"
              onClick={() => setMobileOpen(false)}
            >
              <img
                src="https://placehold.co/100x100"
                alt="Bodybuilding"
                className="w-20 h-20 rounded-full object-cover mb-2"
              />
              <span className="text-white">Bodybuilding</span>
            </Link>
            <Link
              to="/divisions/classic"
              className="flex flex-col items-center text-center"
              onClick={() => setMobileOpen(false)}
            >
              <img
                src="https://placehold.co/100x100"
                alt="Classic"
                className="w-20 h-20 rounded-full object-cover mb-2"
              />
              <span className="text-white">Classic</span>
            </Link>
            <Link
              to="/divisions/bikini"
              className="flex flex-col items-center text-center"
              onClick={() => setMobileOpen(false)}
            >
              <img
                src="https://placehold.co/100x100"
                alt="Bikini"
                className="w-20 h-20 rounded-full object-cover mb-2"
              />
              <span className="text-white">Bikini</span>
            </Link>
            <Link
              to="/divisions/sports-model"
              className="flex flex-col items-center text-center"
              onClick={() => setMobileOpen(false)}
            >
              <img
                src="https://placehold.co/100x100"
                alt="Sports Model"
                className="w-20 h-20 rounded-full object-cover mb-2"
              />
              <span className="text-white">Sports Model</span>
            </Link>
          </div>

          <Link
            to="/competitions"
            className="block px-3 py-2 text-white hover:text-blue-300 rounded-md transition"
            onClick={() => setMobileOpen(false)}
          >
            Competitions
          </Link>
          <Link
            to="/contact"
            className="block px-3 py-2 text-white hover:text-blue-300 rounded-md transition"
            onClick={() => setMobileOpen(false)}
          >
            Contact Us
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 text-white hover:text-blue-300 rounded-md transition"
            onClick={() => setMobileOpen(false)}
          >
            About Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
