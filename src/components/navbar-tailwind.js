import React, { useEffect, useRef, useState } from "react";

/**
 * XPInspiredNavbarTW (Tailwind version)
 * - Desktop: hover/focus shows dropdown; animated "drawn circle" ring
 * - Mobile: hamburger + collapsible submenus
 * - Accessible: keyboard focus opens menus, Esc closes, aria-* roles
 *
 * Usage (Gatsby):
 * 1) Ensure Tailwind is set up (gatsby-plugin-postcss + tailwind.config.js)
 * 2) Place this file at src/components/XPInspiredNavbarTW.jsx
 * 3) Import into your Layout and render above <main />
 */

const DEFAULT_ITEMS = [
  {
    label: "Le parc",
    href: "/xperience-park/",
    submenu: [
      { label: "Tarifs & horaires", href: "/xperience-park/tarifs-horaires/" },
      { label: "Infos pratiques", href: "/xperience-park/infos-pratiques/" },
      { label: "Règlement", href: "/xperience-park/reglement/" },
    ],
  },
  {
    label: "Activités",
    href: "/activites/",
    submenu: [
      { label: "Trampoline", href: "/activites/trampoline/" },
      { label: "Ninja Warrior", href: "/activites/ninja/" },
      { label: "Arcade & Hado", href: "/activites/arcade/" },
    ],
  },
  {
    label: "Anniversaires",
    href: "/anniversaires/",
    submenu: [
      { label: "Formules", href: "/anniversaires/formules/" },
      { label: "Réserver", href: "/anniversaires/reserver/" },
    ],
  },
  {
    label: "Groupes",
    href: "/groupes/",
    submenu: [
      { label: "Scolaires", href: "/groupes/scolaires/" },
      { label: "Entreprises", href: "/groupes/entreprises/" },
    ],
  },
  { label: "Contact", href: "/contact/" },
];

export default function XPInspiredNavbarTW({ items = DEFAULT_ITEMS, logoText = "ICN AUSTRALIA" }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    function onDocClick(e) {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target)) setMobileOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <header ref={navRef} className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0f]/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        {/* Logo */}
        <a href="/" className="font-extrabold tracking-wide text-white/95 hover:text-white text-base sm:text-lg">
          {logoText}
        </a>

        {/* Desktop menu */}
        <ul role="menubar" className="hidden items-center gap-3 lg:flex">
          {items.map((item, idx) => (
            <DesktopItem key={idx} item={item} />
          ))}
        </ul>

        {/* Burger */}
        <button
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/90 hover:bg-white/5"
        >
          <span className="sr-only">Open menu</span>
          <div className="flex flex-col gap-1.5">
            <span className={`h-0.5 w-6 bg-current transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}></span>
            <span className={`h-0.5 w-6 bg-current transition-opacity ${mobileOpen ? "opacity-0" : "opacity-100"}`}></span>
            <span className={`h-0.5 w-6 bg-current transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}></span>
          </div>
        </button>
      </nav>

      {/* Mobile panel */}
      <div className={`lg:hidden overflow-hidden transition-[grid-template-rows] ${mobileOpen ? "grid grid-rows-[1fr]" : "grid grid-rows-[0fr]"}`}>
        <ul className="min-h-0 space-y-1 px-2 pb-2">
          {items.map((item, idx) => (
            <MobileRow key={idx} item={item} />
          ))}
        </ul>
      </div>
    </header>
  );
}

function DesktopItem({ item }) {
  const hasSub = Array.isArray(item.submenu) && item.submenu.length > 0;
  const id = `dd-${item.label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <li role="none" className="group relative">
      <a
        role="menuitem"
        href={item.href}
        aria-haspopup={hasSub || undefined}
        aria-controls={hasSub ? id : undefined}
        className="relative inline-block px-2 py-2 font-semibold text-white/90 outline-none transition-colors hover:text-white focus-visible:text-white"
      >
        <span className="relative grid place-items-center">
          <span className="relative z-10">{item.label}</span>
          {/* Drawn circle */}
          <svg viewBox="0 0 40 40" className="pointer-events-none absolute left-1/2 top-1/2 h-[2.1em] w-[2.1em] -translate-x-1/2 -translate-y-1/2 scale-90 opacity-30 transition-transform group-hover:scale-100 group-hover:opacity-95 group-focus-within:opacity-95">
            <circle
              cx="20"
              cy="20"
              r="17.5"
              className="fill-none stroke-[#f7e65c] stroke-[2.25] [stroke-linecap:round] [stroke-dasharray:110] [stroke-dashoffset:110] transition-[stroke-dashoffset] duration-500 ease-out group-hover:[stroke-dashoffset:0] group-focus-within:[stroke-dashoffset:0]"
            />
          </svg>
        </span>
      </a>

      {/* Dropdown */}
      {hasSub && (
        <div
          id={id}
          role="menu"
          aria-label={`${item.label} submenu`}
          className="pointer-events-none absolute left-1/2 top-full z-40 mt-3 min-w-[240px] -translate-x-1/2 translate-y-2 rounded-2xl border border-white/10 bg-slate-950/95 p-2 opacity-0 shadow-2xl backdrop-blur transition-all duration-150 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100"
        >
          <div className="grid gap-1">
            {item.submenu.map((s, i) => (
              <a
                key={i}
                role="menuitem"
                href={s.href}
                className="rounded-lg px-3 py-2 font-semibold text-white/90 outline-none transition-colors hover:bg-yellow-200/10 hover:text-yellow-200 focus-visible:bg-yellow-200/10 focus-visible:text-yellow-200"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </li>
  );
}

function MobileRow({ item }) {
  const [open, setOpen] = useState(false);
  const hasSub = Array.isArray(item.submenu) && item.submenu.length > 0;

  if (!hasSub) {
    return (
      <li>
        <a
          href={item.href}
          className="block rounded-xl px-4 py-3 font-semibold text-white/90 outline-none transition-colors hover:bg-white/5 focus-visible:bg-white/5"
        >
          {item.label}
        </a>
      </li>
    );
  }

  return (
    <li>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 font-bold text-white/90 outline-none transition-colors hover:bg-white/5 focus-visible:bg-white/5"
      >
        <span>{item.label}</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
      <div className={`grid transition-[grid-template-rows] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="min-h-0">
          <ul className="space-y-1 pb-2">
            {item.submenu.map((s, i) => (
              <li key={i}>
                <a
                  href={s.href}
                  className="ml-2 block rounded-lg px-4 py-2 font-semibold text-white/90 outline-none transition-colors hover:bg-white/5 focus-visible:bg-white/5"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}
