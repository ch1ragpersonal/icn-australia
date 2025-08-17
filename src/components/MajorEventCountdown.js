import React, { useEffect, useMemo, useState } from "react";
import { graphql, useStaticQuery, Link as GatsbyLink } from "gatsby";

function useCountdown(targetDate) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const diffMs = Math.max(0, targetDate.getTime() - now.getTime());

  const seconds = Math.floor(diffMs / 1000) % 60;
  const minutes = Math.floor(diffMs / (1000 * 60)) % 60;
  const hours = Math.floor(diffMs / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds, isPast: diffMs === 0 };
}

const MajorEventCountdown = () => {
  const data = useStaticQuery(graphql`
    query MajorEventCountdownQuery {
      allContentfulCompetition(
        filter: { majorEvent: { eq: true } }
      ) {
        nodes {
          id
          competitionName
          date
          location
          poster {
            file {
              url
            }
          }
          state {
            id
            website
          }
        }
      }
    }
  `);

  const today = useMemo(() => new Date(), []);
  const events = (data?.allContentfulCompetition?.nodes ?? [])
    .map((e) => ({
      ...e,
      // Ensure Date object
      _date: new Date(e.date),
    }))
    .filter((e) => !Number.isNaN(e._date.getTime()))
    .filter((e) => e._date >= today)
    .sort((a, b) => a._date - b._date);

  const nextEvent = events[0] ?? null;
  const targetDate = nextEvent?._date ?? new Date();

  const { days, hours, minutes, seconds, isPast } = useCountdown(targetDate);

  // Background image (handle protocol-relative Contentful URLs)
  const bgUrl = nextEvent?.poster?.file?.url
    ? (nextEvent.poster.file.url.startsWith("http")
        ? nextEvent.poster.file.url
        : `https:${nextEvent.poster.file.url}`)
    : null;

  if (!nextEvent) {
    return (
      <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <div className="relative isolate">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
            <div className="rounded-2xl p-10 md:p-16 bg-gray-900 text-white text-center shadow-xl">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                No upcoming major events
              </h2>
              <p className="mt-4 text-lg opacity-90">
                Check back soon, or explore all competitions.
              </p>
              <GatsbyLink
                to="/competitions"
                className="inline-flex items-center mt-8 px-6 py-3 rounded-xl border-2 border-white/30 hover:border-white transition"
              >
                See all competitions
              </GatsbyLink>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <div className="relative isolate">
        {/* Background */}
        <div
          className="absolute inset-0 -z-10 bg-center bg-cover"
          style={{
            backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
          }}
          aria-hidden="true"
        />
        {/* Dark overlay + subtle gradient */}
       <div className="absolute inset-0 -z-10 bg-black/60" />  {/* use -z-10 */}
<div className="absolute inset-0 -z-20 bg-center bg-cover" />  {/* bg even lower */}


        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-28">
          <div className="text-center text-white">
            <p className="inline-block text-xs uppercase tracking-[0.2em] bg-white/10 px-3 py-1 rounded-full">
              Major Event
            </p>

            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              {nextEvent.competitionName}
            </h1>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-base md:text-lg opacity-95">
              <div className="inline-flex items-center gap-2">
                <span role="img" aria-label="calendar">
                  
                </span>
                <span>
                  {nextEvent._date.toLocaleDateString(undefined, {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <span className="opacity-60">•</span>
              <div className="inline-flex items-center gap-2">
                <span role="img" aria-label="pin">
                  
                </span>
                <span>{nextEvent.location}</span>
              </div>
            </div>

            {/* Countdown */}
            <div className="mt-10 md:mt-12 flex items-stretch justify-center gap-3 md:gap-6">
              {[
                { label: "Days", value: days },
                { label: "Hours", value: hours },
                { label: "Minutes", value: minutes },
                { label: "Seconds", value: seconds },
              ].map((b) => (
                <div
                  key={b.label}
                  className="w-24 md:w-32 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 shadow-lg px-3 py-4 md:py-6"
                >
                  <div className="text-3xl md:text-5xl font-extrabold tabular-nums leading-none">
                    {String(b.value).padStart(2, "0")}
                  </div>
                  <div className="mt-1 md:mt-2 text-xs md:text-sm uppercase tracking-wide opacity-80">
                    {b.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-10 flex items-center justify-center gap-4">
              {nextEvent.state?.website ? (
                <a
                  href={nextEvent.state.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition shadow"
                >
                  Event Website
                </a>
              ) : null}

              <GatsbyLink
                to="/competitions"
                className="inline-flex items-center px-6 py-3 rounded-xl border-2 border-white/40 text-white hover:border-white transition"
              >
                See all events
              </GatsbyLink>
            </div>

            {/* Safety note when event has just started/passed */}
            {isPast && (
              <p className="mt-6 text-sm opacity-80">
                The countdown has finished—this event may be starting now.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MajorEventCountdown;
