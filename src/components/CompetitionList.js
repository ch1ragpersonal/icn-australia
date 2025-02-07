/** @jsxImportSource theme-ui */
import React from "react";
import { Box, Card, Heading, Text, Button, Flex, Image, Link } from "theme-ui";
import { motion } from "framer-motion";

const CompetitionList = ({ state, competitions, onBack }) => {
  return (
    <motion.div
      key="competition-list"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Button
        onClick={onBack}
        sx={{
          marginBottom: "20px",
          backgroundColor: "primary",
          color: "white",
          cursor: "pointer",
        }}
      >
        Back to Region Selection
      </Button>

        <br></br>
      {/* Display state website if available */}
      {state.website && (
        <Text sx={{ marginBottom: "20px" }}>
          Visit the official website:{" "}
          <Link href={state.website} target="_blank" rel="noopener noreferrer">
            {state.website}
          </Link>
        </Text>
      )}
         <br></br>

      {competitions.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)", // Two cards per row
            gap: "20px",
          }}
        >
          {competitions.map((comp) => (
            <Card
              key={comp.id}
              as={motion.div}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              sx={{
                padding: "20px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                borderRadius: "10px",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "20px",
                height: "350px", // ⬆️ Increased height for taller cards
              }}
            >
              {comp.poster?.file.url && (
                <Image
                  src={comp.poster.file.url}
                  alt={`${comp.competitionName} Poster`}
                  sx={{
                    width: "300px", // Slightly bigger poster
                    borderRadius: "5px",
                    flexShrink: 0,
                  }}
                />
              )}
              <Box sx={{ flex: 1, textAlign: "left", height: "100%" }}>
                <Heading as="h3" sx={{ fontSize: "22px", marginBottom: "10px" }}>
                  {comp.competitionName}
                </Heading>
                <Text sx={{ fontSize: "16px", color: "#555", marginBottom: "8px" }}>
                  📍 Location: {comp.location || "TBA"}
                </Text>
                <Text sx={{ fontSize: "16px", color: "#555", marginBottom: "8px" }}>
                  📅 Date: {comp.date || "TBA"}
                </Text>
                <Text sx={{ fontSize: "14px", color: "#777" }}>
                  ℹ️ More details will be announced soon.
                </Text>
              </Box>
            </Card>
          ))}
        </Box>
      ) : (
        <Text>No competitions available for {state.name}.</Text>
      )}
    </motion.div>
  );
};

export default CompetitionList;
