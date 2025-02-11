import React from "react";
import { Card, Heading, Box, Image } from "theme-ui";
import { motion } from "framer-motion";

const StateCard = ({ state, onClick }) => {
  return (
    <Card
      as={motion.div}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        if (onClick) onClick(state);
      }}
      sx={{
        cursor: "pointer",
        padding: "20px",
        boxShadow: "0px 8px 16px rgba(0,0,0,0.1)",
        borderRadius: "12px",
        textAlign: "center",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "200px",
        width: "200px",
        margin: "10px",
        transition: "box-shadow 0.3s ease",
        ":hover": {
          boxShadow: "0px 12px 24px rgba(0,0,0,0.15)",
        },
      }}
    >
      {state.logo?.file?.url && (
        <Image
          src={state.logo.file.url}
          alt={`${state.name} Logo`}
          sx={{
            width: "80px",
            height: "80px",
            marginBottom: "10px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      )}
      <Heading
        as="h3"
        sx={{
          fontSize: "18px",
          fontWeight: "500",
          color: "text",
          mt: 0,
        }}
      >
        {state.name || "Unnamed State"}
      </Heading>
    </Card>
  );
};

export default StateCard;
