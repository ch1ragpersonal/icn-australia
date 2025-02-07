import React from "react";
import { Card, Heading, Box, Image } from "theme-ui";
import { motion } from "framer-motion";

const StateCard = ({ state, onClick }) => {
  console.log("Rendering StateCard:", state); // Debug log

  return (
    <Card
      as={motion.div}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        console.log("StateCard Clicked:", state); // Debug log
        if (onClick) {
          onClick(state);
        } else {
          console.warn("onClick function is missing!");
        }
      }}
      sx={{
        cursor: "pointer",
        padding: "15px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        borderRadius: "50%", // Fully rounded shape
        textAlign: "center",
        backgroundColor: "#f8f9fa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "200px", // Smaller height
        width: "200px", // Less wide
        margin: "10px", // More spacing between cards
      }}
    >
      {state.logo?.file.url && (
        <Image
          src={state.logo.file.url}
          alt={`${state.name} Logo`}
          sx={{ width: "100px", height: "100px", marginBottom: "10px" }} // Larger logo
        />
      )}
      <Heading as="h3" sx={{ fontSize: "16px", textAlign: "center" }}>
        {state.name || "Unnamed State"}
      </Heading>
    </Card>
  );
};

export default StateCard;
