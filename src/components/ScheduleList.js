// ScheduleList.js (Create this new component)
/** @jsxImportSource theme-ui */
import React from "react";
import { Box, Card, Heading, Text, Image } from "theme-ui"; // Removed Button and Flex
import { motion } from "framer-motion";

const ScheduleList = ({ competitions }) => {
  return (
    <motion.div
      key="schedule-list"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
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
                height: "350px",
              }}
            >
              {comp.poster?.file.url && (
                <Image
                  src={comp.poster.file.url}
                  alt={`${comp.competitionName} Poster`}
                  sx={{
                    width: "300px",
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
        <Text>No competitions scheduled yet.</Text>
      )}
    </motion.div>
  );
};

export default ScheduleList;