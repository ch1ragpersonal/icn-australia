/** @jsxImportSource theme-ui */
import React, { useState, useEffect, lazy, Suspense } from "react";
import { Box, Card, Heading, Text, Button, Image, Link } from "theme-ui";

// Dynamically import Framer Motion for Gatsby SSR compatibility
const MotionDiv = lazy(() =>
  import("framer-motion").then((mod) => ({ default: mod.motion.div }))
);

const CompetitionList = ({ state, competitions, onBack }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Suspense fallback={<div>Loading animations...</div>}>
      {isClient ? (
        <MotionDiv
          key="competition-list"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Button
            onClick={onBack}
            sx={{
              marginBottom: "20px",
              backgroundColor: "buttonback",
              color: "buttontext",
              cursor: "pointer",
              mt: 3,
              fontSize: "16px",
              borderRadius: "8px",
              px: 4,
              py: 2,
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background-color 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#999",
              },
            }}
          >
            Back to Region Selection
          </Button>

          {competitions.length > 0 ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)", // Two cards per row
                gap: "20px",
              }}
            >
              {competitions.map((comp) => {
                const cardContent = (
                  <Card
                    as={isClient ? MotionDiv : "div"} // Only use Framer Motion on client
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
                      overflow: "hidden",
                    }}
                  >
                    {comp.poster?.file?.url && (
                      <Image
                        src={comp.poster.file.url}
                        alt={`${comp.competitionName} Poster`}
                        sx={{
                          width: "300px",
                          height: "300px",
                          borderRadius: "5px",
                          flexShrink: 0,
                          objectFit: "cover",
                        }}
                      />
                    )}
                    <Box sx={{ flex: 1, textAlign: "left", height: "100%" }}>
                      <Heading as="h3" sx={{ fontSize: "22px", marginBottom: "16px" }}>
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
                        <Text sx={{ fontSize: "16px", color: "primary", fontWeight: "bold" }}>
                          {comp.location || "TBA"}
                        </Text>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "16px",
                        }}
                      >
                        <Text sx={{ fontSize: "18px" }}>📅</Text>
                        <Text sx={{ fontSize: "16px", color: "primary", fontWeight: "bold" }}>
                          {comp.date || "TBA"}
                        </Text>
                      </Box>
                    </Box>
                  </Card>
                );

                return state.website ? (
                  <Link
                    key={comp.id}
                    href={state.website}
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
            <Box sx={{ textAlign: "center", marginTop: "40px" }}>
              <Text sx={{ fontSize: "18px", color: "gray" }}>
                No competitions available for {state.name}.
              </Text>
            </Box>
          )}
        </MotionDiv>
      ) : null}
    </Suspense>
  );
};

export default CompetitionList;
