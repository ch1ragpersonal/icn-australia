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
        padding: "20px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        borderRadius: "10px",
        textAlign: "center",
        backgroundColor: "#f8f9fa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "250px",
      }}
    >
      {state.logo?.file.url && (
        <Image
          src={state.logo.file.url}
          alt={`${state.name} Logo`}
          sx={{ width: "80px", height: "80px", marginBottom: "10px" }}
        />
      )}
      <Heading as="h2">{state.name || "Unnamed State"}</Heading>
    </Card>
  );
};

export default StateCard;
