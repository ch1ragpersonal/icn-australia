/** @jsxImportSource theme-ui */
import React, { useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Box, Heading } from "theme-ui";
import { AnimatePresence } from "framer-motion";
import StateCard from "../components/StateCard";
import CompetitionList from "../components/CompetitionList";

const CompetitionsPage = () => {
  // Fetch data from Contentful
  const data = useStaticQuery(graphql`
    query {
      allContentfulState {
        nodes {
          id
          name   # Ensure this field exists in Contentful
          symbol
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
          competitionName  # Match Contentful's actual field name
          date
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

  // Extract states and competitions
  const states = data.allContentfulState.nodes;
  const competitions = data.allContentfulCompetition.nodes;

  // State for tracking selected state
  const [selectedState, setSelectedState] = useState(null);

  // Log state changes to debug
  console.log("Selected State:", selectedState);

  // Filter competitions related to selected state
  const filteredCompetitions = selectedState
    ? competitions.filter((comp) => comp.state?.id === selectedState.id)
    : [];

  return (
    <Box sx={{ width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "20px", textAlign: "center" }}>
      <Heading as="h1" sx={{ fontSize: "32px", marginBottom: "20px" }}>
        {selectedState ? `Competitions in ${selectedState.name}` : "Select a State"}
      </Heading>

      {/* State Selection */}
      <AnimatePresence mode="wait">
  {!selectedState && (
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
          onClick={() => {
            console.log("Clicked State:", state); // Debug log
            setSelectedState(state);
          }}
        />
      ))}
    </Box>
  )}
</AnimatePresence>


      {/* Competition Display */}
      <AnimatePresence mode="wait">
        {selectedState && (
          <CompetitionList state={selectedState} competitions={filteredCompetitions} onBack={() => setSelectedState(null)} />
        )}
      </AnimatePresence>
    </Box>
  );
};

export default CompetitionsPage;