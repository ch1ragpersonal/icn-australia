// src/pages/competitions.js
import React, { useEffect, useState, lazy, Suspense } from "react";
import { graphql, useStaticQuery } from "gatsby";
import Seo from "../components/seo";
import StateCard from "../components/StateCard"; // <-- Tailwind version below
import CompetitionList from "../components/CompetitionList";
import ScheduleList from "../components/ScheduleList";

// Lazy-load framer-motion container for SSR safety
const AnimatePresence = lazy(() =>
  import("framer-motion").then((m) => ({ default: m.AnimatePresence }))
);

// Safe location for Gatsby SSR
const useSafeLocation = () => {
  const [location, setLocation] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") setLocation(window.location);
  }, []);
  return location;
};

export default function CompetitionsPage() {
  const data = useStaticQuery(graphql`
    query CompetitionsPageQuery_TW {
      allContentfulState {
        nodes {
          id
          name
          symbol
          website
          logo {
            file {
              url
            }
          }
        }
      }
      allContentfulCompetition {
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
          }
        }
      }
    }
  `);

  const states = data.allContentfulState.nodes || [];
  const allCompetitions = data.allContentfulCompetition.nodes || [];
  const location = useSafeLocation();

  const [selectedState, setSelectedState] = useState(null);
  const [viewMode, setViewMode] = useState("state"); // "state" | "schedule"

  // future/current only
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const competitions = allCompetitions.filter((c) => {
    if (!c.date) return true; // allow items with unknown date
    return new Date(c.date) >= today;
  });

  // read ?view=schedule
  useEffect(() => {
    if (!location) return;
    const params = new URLSearchParams(location.search);
    setViewMode(params.get("view") === "schedule" ? "schedule" : "state");
  }, [location]);

  // if schedule view -> clear selection
  useEffect(() => {
    if (viewMode === "schedule") setSelectedState(null);
  }, [viewMode]);

  const filteredCompetitions = selectedState
    ? competitions.filter((c) => c.state?.id === selectedState.id)
    : [];

  // sort ascending (unknown dates last)
  const sortedCompetitions = [...competitions].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(a.date) - new Date(b.date);
    });

  return (
    <>
      <Seo title="Competitions" description="ICN Australia Competitions" />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black text-center mb-6">
          {selectedState
            ? `Competitions in ${selectedState.name}`
            : viewMode === "state"
            ? "Select a Region to View Competitions"
            : "Full Competition Schedule"}
        </h1>

        {/* Segmented toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-full bg-gray-200/80 p-1 shadow-inner">
            <button
              type="button"
              onClick={() => setViewMode("state")}
              className={`px-4 sm:px-6 py-2 rounded-full text-sm font-bold transition-colors ${
                viewMode === "state"
                  ? "bg-a text-white"
                  : "text-black hover:bg-black/10"
              }`}
            >
              Competitions Near You
            </button>
            <button
              type="button"
              onClick={() => setViewMode("schedule")}
              className={`px-4 sm:px-6 py-2 rounded-full text-sm font-bold transition-colors ${
                viewMode === "schedule"
                  ? "bg-a text-white"
                  : "text-black hover:bg-black/10"
              }`}
            >
              See Full Schedule
            </button>
          </div>
        </div>

        {/* STATE GRID (default view) */}
        <Suspense fallback={<div className="text-center py-6">Loading…</div>}>
          <AnimatePresence mode="wait">
            {viewMode === "state" && !selectedState && (
              <div
                key="state-grid"
                className="
                  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6
                  place-items-stretch
                "
              >
                {states.map((st) => (
                  <StateCard
                    key={st.id}
                    state={st}
                    onClick={() => setSelectedState(st)}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
        </Suspense>

        {/* COMPETITIONS BY STATE */}
        <Suspense fallback={<div className="text-center py-6">Loading…</div>}>
          <AnimatePresence mode="wait">
            {viewMode === "state" && selectedState && (
              <div key="state-competitions" className="mt-4">
                <CompetitionList
                  state={selectedState}
                  competitions={filteredCompetitions}
                  onBack={() => setSelectedState(null)}
                />
              </div>
            )}
          </AnimatePresence>
        </Suspense>

        {/* FULL SCHEDULE */}
        <Suspense fallback={<div className="text-center py-6">Loading…</div>}>
          <AnimatePresence mode="wait">
            {viewMode === "schedule" && (
              <div key="schedule" className="mt-4">
                <ScheduleList
                  competitions={sortedCompetitions}
                  states={states}
                />
              </div>
            )}
          </AnimatePresence>
        </Suspense>
      </section>
    </>
  );
}
