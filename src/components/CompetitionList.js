// src/components/CompetitionList.js
import React, { useMemo } from "react";
import EventCard from "./EventCard";

const CompetitionList = ({ state, competitions = [], onBack }) => {
  // Keep your ordering (future-safe and stable)
  const sorted = useMemo(() => {
    const withDates = competitions.map((c) => ({
      ...c,
      date: c.date ? new Date(c.date) : null,
    }));
    return withDates.sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return a.date - b.date;
    });
  }, [competitions]);

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6">
      <button
        onClick={onBack}
        className="
          mb-6 inline-flex items-center rounded-full border-2
          border-black px-4 py-2 font-bold text-black
          hover:bg-black hover:text-white transition-colors
        "
      >
        ← Back to Region Selection
      </button>

      {sorted.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {sorted.map((event) => (
            <EventCard key={event.id} event={{ ...event, state }} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">
          No competitions available for {state?.name}.
        </p>
      )}
    </section>
  );
};

export default CompetitionList;
