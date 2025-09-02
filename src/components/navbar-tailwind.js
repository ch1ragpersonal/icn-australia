// Navbar.js
import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import logo from "../images/logo.png"; // <-- update to your actual logo path
import memberPortal from "../images/member_portal.png";
import mensFitness from "../data/divisions/images/mens-fitness.jpg"
import mensPhysique from "../data/divisions/images/mens-physique.jpg"
import mensClassicPhysique from "../data/divisions/images/mens-classic-physique.jpg"
import bodybuilding from "../data/divisions/images/bodybuilding.jpg"
import msWellness from "../data/divisions/images/ms-wellness.jpg"
import msSwimsuit from "../data/divisions/images/ms-swimsuit.jpg"
import msFitness from "../data/divisions/images/ms-fitness.jpg"
import msFigure from "../data/divisions/images/ms-figure.jpg"
import msSportsModel from "../data/divisions/images/ms-sports-model.jpg"
import msBikiniModel from "../data/divisions/images/ms-bikini-model.jpg"

/**
 * Responsive Navbar (Gatsby + Tailwind)
 * - Left: logo (click -> home) with black -> yellow hover filter
 * - Right (desktop ≥ md): menu with animated circle hover + full-width "Divisions" mega menu
 * - Mobile (< md): hamburger toggles a slide-down panel; "Divisions" expands to show sub-links
 */
const Navbar = () => {
  const [divisionsOpen, setDivisionsOpen] = useState(false); // desktop hover mega menu
  const openDivisions = () => setDivisionsOpen(true);
  const closeDivisions = () => setDivisionsOpen(false);
  const [mobileOpen, setMobileOpen] = useState(false); // mobile menu drawer
  const [mobileDivisionsOpen, setMobileDivisionsOpen] = useState(false); // mobile divisions sub-menu

useEffect(() => {
  const root = document.documentElement; // or document.body
  if (mobileOpen) {
    root.style.overflow = "hidden";
  } else {
    root.style.overflow = "";
  }
  return () => {
    root.style.overflow = "";
  };
}, [mobileOpen]);
  

  // Reusable label with gradient text sweep + underline on hover
  // Implements the provided CSS using Tailwind arbitrary properties
  const DecoratedLabel = ({ children }) => (
    <span
      className="relative inline-block py-[5px] text-c transition-all duration-300 ease-in-out group-hover:[background-image:linear-gradient(to_right,var(--color-a),var(--color-a)_50%,var(--color-b)_50%)] group-hover:[background-size:200%_100%] group-hover:[background-position:0_0] group-hover:[background-clip:text] group-hover:text-transparent"
    >
      <span
        className="pointer-events-none absolute bottom-[-3px] left-0 block h-[3px] w-0 bg-[var(--color-a)] transition-all duration-300 ease-in-out group-hover:w-full"
        aria-hidden="true"
      />
      {children}
    </span>
  );

    // Uniform tile used in the mega menu
    const MenuTile = ({ to, label, img, alt }) => (
      <Link
        to={to}
        className="group w-[9.5rem] flex flex-col items-center text-center"  // fixed width + centered column
      >
        <img
          src={img}
          alt={alt || label}
          className="block mx-auto w-24 h-24 rounded-full object-cover mb-3
                     ring-0 group-hover:ring-2 group-hover:ring-blue-300 transition"
        />
        <span className="block w-full text-white text-sm sm:text-base leading-tight
                         group-hover:text-blue-300 transition-colors">
          {label}
        </span>
      </Link>
    );
    


  return (
    // Wrapper is relative so the desktop mega menu can be absolutely positioned
    <div
      className="sticky top-0 z-50 relative"
      onMouseLeave={() => setDivisionsOpen(false)} // desktop: hide when cursor leaves both link + panel area
    >
      {/* Top bar */}
      <nav className="sticky top-0 inset-x-0 z-50 w-full bg-b/95 backdrop-blur px-4 sm:px-6 md:px-8 py-3 md:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* LEFT: Logo */}
          <Link to="/" className="block shrink-0" aria-label="Go to homepage">
            <img
              src={logo}
              alt="Logo"
              className="w-[12vmin] max-w-[72px] h-auto rounded-[2vmin] filter brightness-0 invert transition duration-300 ease-in-out hover:invert-[59%] hover:sepia hover:saturate-[475%] hover:hue-rotate-[3deg] hover:brightness-[103%] hover:contrast-[101%]"
            />
          </Link>

          {/* RIGHT: Desktop menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="group relative inline-flex items-center justify-center px-3 py-2 text-white hover:text-white transition-colors focus:outline-none"
              onMouseEnter={closeDivisions}
            >
              <DecoratedLabel>Home</DecoratedLabel>
            </Link>

            {/* Divisions trigger (desktop hover) */}
            <div className="relative" onMouseEnter={openDivisions}>
              <Link
                to="/#divisions"
                className="group relative inline-flex items-center justify-center px-3 py-2 text-white hover:text-white transition-colors focus:outline-none"
                onClick={closeDivisions}
              >
                <DecoratedLabel>Divisions</DecoratedLabel>
              </Link>
            </div>

            <Link
              to="/competitions"
              className="group relative inline-flex items-center justify-center px-3 py-2 text-white hover:text-white transition-colors focus:outline-none"
              onMouseEnter={closeDivisions}
            >
              <DecoratedLabel>Competitions</DecoratedLabel>
            </Link>

            <Link
              to="/rules"
              className="group relative inline-flex items-center justify-center px-3 py-2 text-white hover:text-white transition-colors focus:outline-none"
              onMouseEnter={closeDivisions}
            >
              <DecoratedLabel>Rules</DecoratedLabel>
            </Link>

            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-center px-3 py-2 text-white hover:text-white transition-colors focus:outline-none"
              onMouseEnter={closeDivisions}
            >
              <DecoratedLabel>Contact Us</DecoratedLabel>
            </Link>

            <Link
              to="/about"
              className="group relative inline-flex items-center justify-center px-3 py-2 text-white hover:text-white transition-colors focus:outline-none"
              onMouseEnter={closeDivisions}
            >
              <DecoratedLabel>About Us</DecoratedLabel>
            </Link>

            {/* Member Portal (right-aligned image button) */}
            <a
              href="https://www.icompetenatural.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block shrink-0"
              aria-label="Open Member Portal in a new tab"
            >
              <img
                src={memberPortal}
                alt="Member's Portal"
                className="w-[12vmin] max-w-[120px] h-auto rounded-[2vmin] filter brightness-0 invert transition duration-300 ease-in-out hover:invert-[59%] hover:sepia hover:saturate-[475%] hover:hue-rotate-[3deg] hover:brightness-[103%] hover:contrast-[101%]"
              />
            </a>
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
          <div className="max-w-7xl mx-auto px-8 py-10">
            <div className="space-y-8">
              {/* Row 1: 4 items */}
              <div className="grid grid-cols-4 gap-8 justify-items-center">
                <MenuTile img={mensFitness} to="/divisions/mens-fitness" label="Men's Fitness" alt="Men's Fitness" />
                <MenuTile img={mensPhysique} to="/divisions/mens-physique" label="Men's Physique" alt="Men's Physique" />
                <MenuTile img={mensClassicPhysique} to="/divisions/mens-classic-physique" label="Men's Classic Physique" alt="Men's Classic Physique" />
                <MenuTile img={bodybuilding} to="/divisions/bodybuilding" label="Bodybuilding" alt="Bodybuilding" />
              </div>

              {/* Row 2: 5 items */}
              <div className="grid grid-cols-6 gap-8 justify-items-center">
                <MenuTile img={msWellness} to="/divisions/ms-wellness" label="Ms Wellness" alt="Ms Wellness" />
                <MenuTile img={msSwimsuit} to="/divisions/ms-swimsuit" label="Ms Swimsuit" alt="Ms Swimsuit" />
                <MenuTile img={msFitness} to="/divisions/ms-fitness" label="Ms Fitness" alt="Ms Fitness" />
                <MenuTile img={msFigure} to="/divisions/ms-figure" label="Ms Figure" alt="Ms Figure" />
                <MenuTile img={msSportsModel} to="/divisions/ms-sports-model" label="Ms Sports Model" alt="Ms Sports Model" />
                <MenuTile img={msBikiniModel} to="/divisions/ms-bikini-model" label="Ms Bikini Model" alt="Ms Bikini Model" />

                {/* If you'd rather include Ms Swimsuit, replace any one of the above with: */}
                {/* <MenuTile to="/divisions/ms-swimsuit" label="Ms Swimsuit" alt="Ms Swimsuit" /> */}
              </div>
            </div>
          </div>
        </div>
)}


      {/* MOBILE: Slide-down menu */}
      <div
        id="mobile-menu"
        className={`md:hidden bg-gray-800 shadow-inner transition-[max-height,opacity] duration-300 ease-out overscroll-contain overflow-y-auto ${
          mobileOpen ? "max-h-[calc(100dvh-56px)] opacity-100" : "max-h-0 opacity-0"
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
            {/* Row 1 (4) */}
            <Link to="/divisions/mens-fitness" className="flex flex-col items-center text-center" onClick={() => setMobileOpen(false)}>
              <img src={mensFitness} alt="Men's Fitness" className="w-20 h-20 rounded-full object-cover mb-2" />
              <span className="text-white">Men's Fitness</span>
            </Link>
            <Link to="/divisions/mens-physique" className="flex flex-col items-center text-center" onClick={() => setMobileOpen(false)}>
              <img src={mensPhysique} alt="Men's Physique" className="w-20 h-20 rounded-full object-cover mb-2" />
              <span className="text-white">Men's Physique</span>
            </Link>
            <Link to="/divisions/mens-classic-physique" className="flex flex-col items-center text-center" onClick={() => setMobileOpen(false)}>
              <img src={mensClassicPhysique} alt="Men's Classic Physique" className="w-20 h-20 rounded-full object-cover mb-2" />
              <span className="text-white">Men's Classic Physique</span>
            </Link>
            <Link to="/divisions/bodybuilding" className="flex flex-col items-center text-center" onClick={() => setMobileOpen(false)}>
              <img src={bodybuilding} alt="Bodybuilding" className="w-20 h-20 rounded-full object-cover mb-2" />
              <span className="text-white">Bodybuilding</span>
            </Link>

            {/* Row 2 (5) */}
            <Link to="/divisions/ms-wellness" className="flex flex-col items-center text-center" onClick={() => setMobileOpen(false)}>
              <img src={msWellness} alt="Ms Wellness" className="w-20 h-20 rounded-full object-cover mb-2" />
              <span className="text-white">Ms Wellness</span>
            </Link>
            <Link to="/divisions/ms-fitness" className="flex flex-col items-center text-center" onClick={() => setMobileOpen(false)}>
              <img src={msFitness} alt="Ms Fitness" className="w-20 h-20 rounded-full object-cover mb-2" />
              <span className="text-white">Ms Fitness</span>
            </Link>
            <Link to="/divisions/ms-figure" className="flex flex-col items-center text-center" onClick={() => setMobileOpen(false)}>
              <img src={msFigure} alt="Ms Figure" className="w-20 h-20 rounded-full object-cover mb-2" />
              <span className="text-white">Ms Figure</span>
            </Link>
            <Link to="/divisions/ms-sports-model" className="flex flex-col items-center text-center" onClick={() => setMobileOpen(false)}>
              <img src={msSportsModel} alt="Ms Sports Model" className="w-20 h-20 rounded-full object-cover mb-2" />
              <span className="text-white">Ms Sports Model</span>
            </Link>
            <Link to="/divisions/ms-bikini-model" className="flex flex-col items-center text-center" onClick={() => setMobileOpen(false)}>
              <img src={msBikiniModel} alt="Ms Bikini Model" className="w-20 h-20 rounded-full object-cover mb-2" />
              <span className="text-white">Ms Bikini Model</span>
            </Link>
            <Link to="/divisions/ms-swimsuit" className="flex flex-col items-center text-center" onClick={() => setMobileOpen(false)}>
              <img src={msSwimsuit} alt="Ms Swimsuit" className="w-20 h-20 rounded-full object-cover mb-2" />
              <span className="text-white">Ms Swimsuit</span>
            </Link>

            {/* If you want Ms Swimsuit instead of one of the above: */}
            {/* <Link to="/divisions/ms-swimsuit" ...>Ms Swimsuit</Link> */}
          </div>


          <Link
            to="/competitions"
            className="block px-3 py-2 text-white hover:text-blue-300 rounded-md transition"
            onClick={() => setMobileOpen(false)}
          >
            Competitions
          </Link>
          <Link
            to="/rules"
            className="block px-3 py-2 text-white hover:text-blue-300 rounded-md transition"
            onClick={() => setMobileOpen(false)}
          >
            Rules
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
