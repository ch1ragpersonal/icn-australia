// src/components/DivisionTabs.js
import React, { useId, useMemo, useState, useEffect, useRef } from "react";

// Base ring; apply color per state with text-* and after:border-*
const ringBase =
  "relative after:content-[''] after:absolute after:inset-[-10px_-24px] after:rounded-full after:border after:transition-colors after:duration-200";

const DivisionTabs = ({
  items = [],
  initial = 0,
  className = "",
  rowSplitIndex = 4, // first row count (Men = 4, Women = 6)
}) => {
  const [active, setActive] = useState(
    Math.min(initial, Math.max(0, items.length - 1))
  );
  const tabsId = useId();
  const btnRefs = useRef([]);

  // groups
  const firstRow = items.slice(0, rowSplitIndex);         // Men
  const secondRow = items.slice(rowSplitIndex);           // Women

  // mobile segment (men|women)
  const initialGroup = active < rowSplitIndex ? "men" : "women";
  const [group, setGroup] = useState(initialGroup);
  useEffect(() => {
    setGroup(active < rowSplitIndex ? "men" : "women");
  }, [active, rowSplitIndex]);

  // Ensure refs length matches items
  useEffect(() => {
    btnRefs.current = btnRefs.current.slice(0, items.length);
  }, [items.length]);

  const onKeyDown = (e, idx) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;

    e.preventDefault();
    const last = items.length - 1;
    let next = idx;

    if (e.key === "ArrowRight") next = idx === last ? 0 : idx + 1;
    if (e.key === "ArrowLeft") next = idx === 0 ? last : idx - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;

    setActive(next);
    btnRefs.current[next]?.focus();
  };

  const activeItem = useMemo(() => items[active] ?? null, [items, active]);

  if (!items.length) return null;

  return (
    <section className={`w-full ${className}`}>
      {/* ---------- MOBILE: segmented Men/Women + swipeable pill list ---------- */}
      <div className="md:hidden mb-8 space-y-4">
        {/* Segment control */}
        <div className="flex justify-center">
          <div className="inline-flex rounded-full bg-white/10 p-1">
            {["men", "women"].map((g) => {
              const isOn = group === g;
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGroup(g)}
                  className={[
                    "px-4 py-2 rounded-full text-sm font-semibold transition",
                    isOn
                      ? "bg-white text-black"
                      : "text-white/80 hover:text-white"
                  ].join(" ")}
                  aria-pressed={isOn}
                >
                  {g === "men" ? "Men’s divisions" : "Women’s divisions"}
                </button>
              );
            })}
          </div>
        </div>

        {/* Horizontal, swipeable chips with snap */}
        <div
          role="tablist"
          aria-label="Divisions"
          className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory px-1"
          // Optional: hide scrollbar in modern browsers; keep it accessible if you prefer
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {(group === "men" ? firstRow : secondRow).map((it, i) => {
            const idx = group === "men" ? i : rowSplitIndex + i;
            const selected = idx === active;
            return (
              <button
                key={it.key ?? idx}
                ref={(el) => (btnRefs.current[idx] = el)}
                id={`${tabsId}-tab-${idx}`}
                role="tab"
                aria-selected={selected}
                aria-controls={`${tabsId}-panel-${idx}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(idx)}
                onKeyDown={(e) => onKeyDown(e, idx)}
                className={[
                  "snap-start whitespace-nowrap rounded-full border px-4 py-2",
                  "text-sm font-semibold transition",
                  selected
                    ? "border-white bg-white text-black"
                    : "border-white/20 text-white/80 hover:text-white hover:border-white/40"
                ].join(" ")}
              >
                {it.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* ---------- DESKTOP / TABLET: your existing two-row layout ---------- */}
      <div className="hidden md:block mb-8 md:mb-12 space-y-4">
        {/* Row 1 (Men: 4) */}
        <div role="tablist" aria-label="Divisions" className="space-y-4">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {firstRow.map((it, i) => {
              const idx = i;
              const selected = idx === active;
              return (
                <button
                  key={it.key ?? idx}
                  ref={(el) => (btnRefs.current[idx] = el)}
                  id={`${tabsId}-tab-${idx}`}
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${tabsId}-panel-${idx}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(idx)}
                  onKeyDown={(e) => onKeyDown(e, idx)}
                  className={[
                    "uppercase tracking-wide font-semibold text-sm md:text-base",
                    "px-6 md:px-8 py-3 transition",
                    selected
                      ? `${ringBase} text-c after:border-c`
                      : `${ringBase} after:border-transparent opacity-70 hover:opacity-100 focus:opacity-100 outline-none hover:text-c`,
                  ].join(" ")}
                >
                  {it.title}
                </button>
              );
            })}
          </div>

          {/* Row 2 (Women: force 6 across at lg) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-4 justify-items-center">
            {secondRow.map((it, i) => {
              const idx = rowSplitIndex + i;
              const selected = idx === active;
              return (
                <button
                  key={it.key ?? idx}
                  ref={(el) => (btnRefs.current[idx] = el)}
                  id={`${tabsId}-tab-${idx}`}
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${tabsId}-panel-${idx}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(idx)}
                  onKeyDown={(e) => onKeyDown(e, idx)}
                  className={[
                    "uppercase tracking-wide font-semibold text-sm md:text-base",
                    "px-6 md:px-8 py-3 transition max-w-full",
                    selected
                      ? `${ringBase} text-c after:border-c`
                      : `${ringBase} after:border-transparent opacity-70 hover:opacity-100 focus:opacity-100 outline-none hover:text-c`,
                  ].join(" ")}
                >
                  {it.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---------- Panels (unchanged) ---------- */}
      {items.map((it, i) => {
        const selected = i === active;
        const sideRight = (it.imageSide ?? "left") === "right";

        return (
          <div
            key={it.key ?? i}
            id={`${tabsId}-panel-${i}`}
            role="tabpanel"
            aria-labelledby={`${tabsId}-tab-${i}`}
            hidden={!selected}
            className={[
              "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center",
              "transition-opacity duration-300",
              selected ? "opacity-100" : "opacity-0",
            ].join(" ")}
          >
            {/* Image column */}
            <div className={`${sideRight ? "lg:order-2" : "lg:order-1"}`}>
              {it.image && (
                <div className="w-full overflow-hidden rounded-t-[9999px]">
                  <img
                    src={it.image}
                    alt={it.imageAlt || ""}
                    className="w-full h-auto object-cover select-none"
                    draggable="false"
                  />
                </div>
              )}
            </div>

            {/* Text column */}
            <div className={`${sideRight ? "lg:order-1" : "lg:order-2"}`}>
              <h2 className="uppercase font-black text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight">
                {it.headline}
              </h2>

              {it.body && (
                <p className="mt-6 text-base md:text-lg leading-relaxed max-w-2xl">
                  {it.body}
                </p>
              )}

              {it.ctaText && (
                <a
                  href={it.ctaHref || "#"}
                  className="inline-block mt-8 uppercase font-extrabold tracking-wider text-lg md:text-xl underline underline-offset-4 decoration-2 hover:opacity-80 focus:opacity-80"
                >
                  {it.ctaText}
                </a>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default DivisionTabs;
