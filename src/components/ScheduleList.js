/** @jsxImportSource theme-ui */
import React, { useState, useEffect, lazy, Suspense } from "react";
import { Box, Card, Heading, Text, Image, Link } from "theme-ui";

const MotionDiv = lazy(() =>
  import("framer-motion").then((mod) => ({ default: mod.motion.div }))
);

const ScheduleList = ({ competitions, states }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const findStateForCompetition = (competition) => {
    return states.find((state) => state.id === competition.state?.id);
  };

  return (
    <Suspense fallback={<div>Loading animations...</div>}>
      {isClient ? (
        <MotionDiv
          key="schedule-list"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {competitions.length > 0 ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: ["1fr", "repeat(2, 1fr)"],
                gap: "20px",
              }}
            >
              {competitions.map((comp) => {
                const competitionState = findStateForCompetition(comp);
                const cardContent = (
                  <Card
                    as={isClient ? MotionDiv : "div"}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    sx={{
                      padding: "20px",
                      boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                      borderRadius: "10px",
                      backgroundColor: "cardback",
                      display: "flex",
                      flexDirection: ["column", "row"],
                      alignItems: "center",
                      gap: "20px",
                      height: ["auto", "350px"],
                      overflow: "hidden",
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    {comp.poster?.file?.url && (
                      <Image
                        src={comp.poster.file.url}
                        alt={`${comp.competitionName} Poster`}
                        sx={{
                          width: ["100%", "300px"],
                          height: ["auto", "300px"],
                          borderRadius: "5px",
                          flexShrink: 0,
                          objectFit: "cover",
                        }}
                      />
                    )}
                    <Box sx={{ flex: 1, textAlign: "left", height: "100%" }}>
                      <Heading
                        as="h3"
                        sx={{ fontSize: "22px", marginBottom: "10px" }}
                      >
                        {comp.competitionName}
                      </Heading>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "8px",
                        }}
                      >
                        <Text sx={{ fontSize: "18px" }}>📍</Text>
                        <Text
                          sx={{
                            fontSize: "16px",
                            color: "primary",
                            fontWeight: "bold",
                          }}
                        >
                          {comp.location || "TBA"}
                        </Text>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <Text sx={{ fontSize: "18px" }}>📅</Text>
                        <Text
                          sx={{
                            fontSize: "16px",
                            color: "primary",
                            fontWeight: "bold",
                          }}
                        >
                          {comp.date || "TBA"}
                        </Text>
                      </Box>
                    </Box>
                  </Card>
                );

                return competitionState && competitionState.website ? (
                  <Link
                    key={comp.id}
                    href={competitionState.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ textDecoration: "none", color: "inherit" }}
                  >
                    {cardContent}
                  </Link>
                ) : (
                  <Box key={comp.id}>{cardContent}</Box>
                );
              })}
            </Box>
          ) : (
            <Text>No competitions scheduled yet.</Text>
          )}
        </MotionDiv>
      ) : null}
    </Suspense>
  );
};

export default ScheduleList;
