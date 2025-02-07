/** @jsxImportSource theme-ui */
import React from "react";
import { Box, Card, Heading, Text, Button } from "theme-ui";
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
        Back to States
      </Button>

      {competitions.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {competitions.map((comp) => (
            <Card
              key={comp.id}
              as={motion.div}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{
                padding: "20px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                borderRadius: "10px",
                textAlign: "center",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "180px",
                  background: `url(${comp.poster?.file.url}) center/cover no-repeat`,
                  borderRadius: "10px",
                }}
              />
              <Heading as="h3" sx={{ fontSize: "20px", marginTop: "10px" }}>
                {comp.name}
              </Heading>
              <Text sx={{ fontSize: "14px", marginTop: "10px", color: "#555" }}>
                {comp.details}
              </Text>
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
