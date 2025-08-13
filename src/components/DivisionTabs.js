// src/components/DivisionTabs.js
import React, { useId, useMemo, useState, useEffect, useRef } from "react";

/**
 * DivisionTabs
 *
 * Usage:
 *  <DivisionTabs items={[
 *    {
 *      key: "trampoline",
 *      title: "TRAMPOLINE",
 *      headline: "Jumps and acrobatics for beginners and experts",
 *      body: "Trampolining is the ideal sport for letting off steam...",
 *      ctaText: "Learn More",
 *      ctaHref: "/trampoline",
 *      image: "/images/trampoline.webp",       // or import
 *      imageAlt: "Person jumping on trampoline",
 *      imageSide: "left"                        // "left" | "right"
 *    },
 *    ...
 *  ]}/>
 *
 * Notes:
 * - imageSide controls which side the hero sits on vs the text column.
 * - All styling is Tailwind classes; no external CSS.
 */

const ovalRing =
  "relative after:content-[''] after:absolute after:inset-[-10px_-24px] after:rounded-full after:border after:border-black after:opacity-100";

const DivisionTabs = ({ items = [], initial = 0, className = "" }) => {
  const [active, setActive] = useState(Math.min(initial, Math.max(0, items.length - 1)));
  const tabsId = useId();
  const btnRefs = useRef([]);

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
      {/* Top titles / tablist */}
      <div
        role="tablist"
        aria-label="Activities"
        className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 md:mb-12"
      >
        {items.map((it, i) => {
          const selected = i === active;
          return (
            <button
              key={it.key ?? i}
              ref={(el) => (btnRefs.current[i] = el)}
              id={`${tabsId}-tab-${i}`}
              role="tab"
              aria-selected={selected}
              aria-controls={`${tabsId}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={[
                "uppercase tracking-wide font-semibold text-sm md:text-base",
                "px-6 md:px-8 py-3 transition",
                selected
                  ? `${ovalRing}`
                  : "opacity-70 hover:opacity-100 focus:opacity-100 outline-none",
              ].join(" ")}
            >
              {it.title}
            </button>
          );
        })}
      </div>

      {/* Slide / panel */}
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
              // fade/slide transition
              "transition-opacity duration-300",
              selected ? "opacity-100" : "opacity-0",
            ].join(" ")}
          >
            {/* Image column */}
            <div className={`${sideRight ? "lg:order-2" : "lg:order-1"}`}>
              {it.image && (
                <img
                  src={it.image}
                  alt={it.imageAlt || ""}
                  className="w-full h-auto object-contain select-none"
                  draggable="false"
                />
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
