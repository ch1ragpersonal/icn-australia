// src/components/EventShowcase.js (Tailwind version)
import React from "react";
import { graphql, useStaticQuery, Link as GatsbyLink } from "gatsby";

const EventShowcase = () => {
  const data = useStaticQuery(graphql`
    query EventsForShowcaseTailwind {
      allContentfulCompetition {
        nodes {
          id
          competitionName
          date
          location
          starred
          poster {
            file {
              url
            }
          }
          state {
            id        # we’ll use this as the label if that’s what Contentful exposes
            website   # external event/site link if present
          }
        }
      }
    }
  `);

  // Helpers
  const today = new Date();
  today.setHours(0, 0, 0, 0); // comparison is date-only

  const competitions = data.allContentfulCompetition.nodes
    .filter((e) => e.poster?.file?.url)
    .map((e) => ({ ...e, date: new Date(e.date) }));

  const displayEvents = competitions
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date - b.date)
    .slice(0, 4);

  const formatDate = (d) =>
    d.toLocaleDateString(undefined, {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const CardWrapper = ({ event, children }) => {
    // If there's an external state website, use <a>; otherwise just a div.
    if (event?.state?.website) {
      return (
        <a
          href={event.state.website}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${event.competitionName} – ${event?.state?.id || ""}`}
          className="block group"
        >
          {children}
        </a>
      );
    }
    return <div className="group">{children}</div>;
  };

  return (
    <section className="my-10 text-center">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-2 md:px-6 max-w-6xl mx-auto">
        {displayEvents.map((event) => {
          const poster = event.poster.file.url;

          return (
            <CardWrapper key={event.id} event={event}>
              <article
                className="
                  relative overflow-hidden rounded-2xl shadow-lg
                  ring-1 ring-black/5
                  transition-transform duration-300 ease-out
                  hover:-translate-y-1 hover:shadow-xl
                "
              >
                {/* Poster image */}
                <img
                  src={poster}
                  alt={event.competitionName}
                  className="
                    w-full h-full object-cover
                    aspect-[3/4] md:aspect-[4/5]  /* keep nice poster aspect */
                    transition-transform duration-500 ease-out
                    group-hover:scale-105
                  "
                />

                {/* Translucent overlay with white text (hidden on hover) */}
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

                  {/* State + Date row */}
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-white/90">
                    <time
                      dateTime={event.date.toISOString()}
                      className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-semibold"
                    >
                      {formatDate(event.date)}
                    </time>
                  </div>

                  {/* Optional location chip */}
                  {event.location && (
                    <div className="mt-3">
                      <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs sm:text-sm font-medium text-white/90">
                        {event.location}
                      </span>
                    </div>
                  )}
                </div>
              </article>
            </CardWrapper>
          );
        })}
      </div>

      {/* See More button */}
      <div className="mt-8">
        <GatsbyLink
          to="/competitions"
          className="
            inline-flex items-center gap-2 rounded-full border-2
            border-black px-6 py-3 font-bold
            text-black hover:bg-black hover:text-white
            transition-colors
          "
        >
          See More Events
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </GatsbyLink>
      </div>
    </section>
  );
};

export default EventShowcase;
