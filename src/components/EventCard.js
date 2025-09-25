// src/components/EventCard.js
import React from "react";

/**
 * event: {
 *   id, competitionName, date (string or Date), location,
 *   poster: { file: { url } },
 *   state?: { id, website }
 * }
 */
export default function EventCard({ event }) {
  if (!event) return null;

  const poster = event?.poster?.file?.url;
  const dateObj = event?.date instanceof Date ? event.date : new Date(event?.date);

  const formatDate = (d) =>
    d && !isNaN(d)
      ? d.toLocaleDateString(undefined, {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "TBA";

  const Wrapper = ({ children }) =>
    event?.state?.website ? (
      <a
        href={event.state.website}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${event.competitionName}`}
        className="block group"
      >
        {children}
      </a>
    ) : (
      <div className="group">{children}</div>
    );

  return (
    <Wrapper>
      <article
        className="
          relative overflow-hidden rounded-2xl shadow-lg
          ring-1 ring-black/5
          transition-transform duration-300 ease-out
          hover:-translate-y-1 hover:shadow-xl
        "
      >
        {/* Poster image */}
        {poster && (
          <img
            src={poster}
            alt={event.competitionName}
            className="
              w-full h-full object-cover
              aspect-[3/4] md:aspect-[4/5]
              transition-transform duration-500 ease-out
              group-hover:scale-105
            "
          />
        )}

        {/* Translucent overlay (hides on hover) */}
        <div
          className="
            pointer-events-none absolute inset-0
            bg-black/60 backdrop-blur-[1px]
            flex flex-col items-center justify-end
            p-6 sm:p-8
            transition-opacity duration-300 ease-out
            group-hover:opacity-0
          "
        >
          <h3 className="text-white text-2xl sm:text-3xl font-extrabold text-center drop-shadow">
            {event.competitionName}
          </h3>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-white/90">
            <time
              dateTime={!isNaN(dateObj) ? dateObj.toISOString() : undefined}
              className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-semibold"
            >
              {formatDate(dateObj)}
            </time>
          </div>

          {event.location && (
            <div className="mt-3">
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs sm:text-sm font-medium text-white/90">
                {event.location}
              </span>
            </div>
          )}
        </div>
      </article>
    </Wrapper>
  );
}
