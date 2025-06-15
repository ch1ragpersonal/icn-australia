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

  // Sort competitions by date (handle null dates)
  const sortedCompetitions = [...competitions].sort((a, b) => {
    if (!a.date) return 1; // Push items without a date to the end
    if (!b.date) return -1;
    return new Date(a.date) - new Date(b.date);
  });

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

          {sortedCompetitions.length > 0 ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: ["1fr", "repeat(2, 1fr)"],
                gap: "40px",
                justifyItems: "center",
                width: "100%",
                px: [2, 4],
              }}
            >
              {sortedCompetitions.map((comp) => {
                const cardContent = (
                  <Card
                    as={isClient ? MotionDiv : "div"} // Only use Framer Motion on client
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    sx={{
                      padding: "30px",
                      boxShadow: "0px 6px 15px rgba(0,0,0,0.25)",
                      borderRadius: "15px",
                      backgroundColor: "cardback",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "25px",
                      width: ["95%", "100%"],
                      maxWidth: ["95%", "500px"],
                      minHeight: "auto",
                      mx: "auto",
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    {comp.poster?.file?.url && (
                      <Image
                        src={comp.poster.file.url}
                        alt={`${comp.competitionName} Poster`}
                        sx={{
                          width: "100%",
                          maxWidth: "450px",
                          height: "auto",
                          borderRadius: "12px",
                          objectFit: "contain",
                          boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
                        }}
                      />
                    )}
                    <Box sx={{ textAlign: "center", width: "100%", mt: 2 }}>
                      <Heading as="h3" sx={{ fontSize: "26px", marginBottom: "25px", color: "cardtext", lineHeight: 1.3 }}>
                        {comp.competitionName}
                      </Heading>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "15px",
                          marginBottom: "15px",
                          padding: "10px",
                          backgroundColor: "rgba(255,255,255,0.1)",
                          borderRadius: "8px",
                        }}
                      >
                        <Text sx={{ fontSize: "22px" }}>📍</Text>
                        <Text sx={{ fontSize: "19px", color: "primary", fontWeight: "bold" }}>
                          {comp.location || "TBA"}
                        </Text>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "15px",
                          padding: "10px",
                          backgroundColor: "rgba(255,255,255,0.1)",
                          borderRadius: "8px",
                        }}
                      >
                        <Text sx={{ fontSize: "22px" }}>📅</Text>
                        <Text sx={{ fontSize: "19px", color: "primary", fontWeight: "bold" }}>
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
