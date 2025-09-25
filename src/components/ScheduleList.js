// src/components/ScheduleList.js
import React, { useMemo } from "react";
import EventCard from "./EventCard";

const ScheduleList = ({ competitions = [], states = [] }) => {
  const withDates = useMemo(
    () =>
      competitions.map((c) => ({
        ...c,
        date: c.date ? new Date(c.date) : null,
      })),
    [competitions]
  );

  const sorted = useMemo(() => {
    const arr = [...withDates];
    return arr.sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return a.date - b.date;
    });
  }, [withDates]);

  const findState = (comp) => states.find((s) => s.id === comp.state?.id);

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6">
      {sorted.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {sorted.map((event) => (
            <EventCard key={event.id} event={{ ...event, state: findState(event) }} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">
          No competitions scheduled yet.
        </p>
      )}
    </section>
  );
};

export default ScheduleList;
