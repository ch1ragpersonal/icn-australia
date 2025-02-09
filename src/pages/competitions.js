/** @jsxImportSource theme-ui */
import React, { useState, useEffect, lazy, Suspense } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Box, Heading, Button, Flex } from "theme-ui";
import StateCard from "../components/StateCard";
import CompetitionList from "../components/CompetitionList";
import ScheduleList from "../components/ScheduleList";

// Dynamically import Framer Motion for Gatsby SSR compatibility
const AnimatePresence = lazy(() => import("framer-motion").then((mod) => ({ default: mod.AnimatePresence })));

// Prevent SSR errors with `useLocation`
const useSafeLocation = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLocation(window.location);
    }
  }, []);

  return location;
};

const CompetitionsPage = () => {
  const data = useStaticQuery(graphql`
    query {
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

  const states = data.allContentfulState.nodes;
  const competitions = data.allContentfulCompetition.nodes;
  const location = useSafeLocation(); // Safe way to handle useLocation in Gatsby

  const [selectedState, setSelectedState] = useState(null);
  const [viewMode, setViewMode] = useState("state");

  // Read the 'view' query parameter safely
  useEffect(() => {
    if (location) {
      const params = new URLSearchParams(location.search);
      setViewMode(params.get("view") === "schedule" ? "schedule" : "state");
    }
  }, [location]);

  // Ensure the correct view mode
  useEffect(() => {
    if (viewMode === "schedule") {
      setSelectedState(null);
    }
  }, [viewMode]);

  // Filter competitions by selected state
  const filteredCompetitions = selectedState
    ? competitions.filter((comp) => comp.state?.id === selectedState.id)
    : [];

  // Sort competitions by date (handle null dates)
  const sortedCompetitions = [...competitions].sort((a, b) => {
    if (!a.date) return 1; // Push items without a date to the end
    if (!b.date) return -1;
    return new Date(a.date) - new Date(b.date);
  });

  return (
    <Box sx={{ width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "20px", textAlign: "center" }}>
      <Heading as="h1" sx={{ fontSize: "32px", marginBottom: "20px" }}>
        {selectedState
          ? `Competitions in ${selectedState.name}`
          : viewMode === "state"
          ? "Select a Region to View Competitions"
          : "Full Competition Schedule"}
      </Heading>

      {/* View Mode Toggle Buttons */}
      <Flex sx={{ justifyContent: "center", gap: 3, mb: 4 }}>
        <Button
          onClick={() => setViewMode("state")}
          sx={{
            backgroundColor: viewMode === "state" ? "primary" : "#bbb",
            color: "white",
            padding: "14px 28px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "background-color 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: viewMode === "state" ? "primary" : "#999",
            },
          }}
        >
          Competitions Near You
        </Button>
        <Button
          onClick={() => setViewMode("schedule")}
          sx={{
            backgroundColor: viewMode === "schedule" ? "primary" : "#bbb",
            color: "white",
            padding: "14px 28px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "background-color 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: viewMode === "schedule" ? "primary" : "#999",
            },
          }}
        >
          See Full Schedule
        </Button>
      </Flex>

      {/* State Selection (only in state view mode) */}
      <Suspense fallback={<div>Loading animations...</div>}>
        <AnimatePresence mode="wait">
          {viewMode === "state" && !selectedState && (
            <Box
              key="state-selection"
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
              }}
            >
              {states.map((state) => (
                <StateCard
                  key={state.id}
                  state={state}
                  onClick={() => setSelectedState(state)}
                />
              ))}
            </Box>
          )}
        </AnimatePresence>
      </Suspense>

      {/* Competition Display (state view) */}
      <Suspense fallback={<div>Loading competitions...</div>}>
        <AnimatePresence mode="wait">
          {viewMode === "state" && selectedState && (
            <CompetitionList
              state={selectedState}
              competitions={filteredCompetitions}
              onBack={() => setSelectedState(null)}
            />
          )}
        </AnimatePresence>
      </Suspense>

      {/* Schedule Display (schedule view) */}
      <Suspense fallback={<div>Loading schedule...</div>}>
        <AnimatePresence mode="wait">
          {viewMode === "schedule" && <ScheduleList competitions={sortedCompetitions} states={states} />
        }
        </AnimatePresence>
      </Suspense>
    </Box>
  );
};

export default CompetitionsPage;
