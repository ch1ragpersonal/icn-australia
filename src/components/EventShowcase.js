// EventShowcase.js (MODIFIED - No New Component)
/** @jsxImportSource theme-ui */
import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Box, Image, Button, Flex, Heading, Card, Text, Link } from "theme-ui"; // Import Card, Text, Link
import { Link as GatsbyLink } from "gatsby";


const EventShowcase = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulCompetition {
        nodes {
          id
          competitionName
          date
          starred
          poster {
            file {
              url
            }
          }
          state {
            id
            website
          }
        }
      }
    }
  `);

  const today = new Date();

  // Process competitions
  let competitions = data.allContentfulCompetition.nodes
    .filter((event) => event.poster?.file?.url) // Ensure poster exists
    .map((event) => ({
      ...event,
      date: new Date(event.date), // Convert date to Date object
    }));

  // Separate starred and non-starred, sort by date
  const starredEvents = competitions
    .filter((event) => event.starred)
    .sort((a, b) => a.date - b.date);

  const otherEvents = competitions
    .filter((event) => !event.starred)
    .sort((a, b) => a.date - b.date);

  // Combine: starred first, then closest events, limiting to 4 total
  const displayEvents = [...starredEvents, ...otherEvents]
    .filter((event) => event.date >= today) // Only future events
    .slice(0, 4);

  return (
    <Box sx={{ textAlign: "center", my: 4 }}>
      <Heading as="h2" sx={{ fontSize: 3, textAlign: "center", mb: 2 }}>
        Upcoming Competitions
      </Heading>
      <Flex
        sx={{
          justifyContent: "center",
          gap: 3,
          flexWrap: "wrap",
          // Removed overflowX: "auto"
          paddingBottom: "10px",
        }}
      >
        {displayEvents.map((event) => (
          // Use Card, Text, and Link here
          <Card
            key={event.id}
            sx={{
              maxWidth: "250px",
              textAlign: "center",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "md",
              background: "white",
              padding: "20px", // Add padding similar to CompetitionCard
            }}
          >
            <Image
              src={event.poster.file.url}
              alt={event.competitionName}
              sx={{ width: "100%", borderRadius: "8px" }}
            />
             <Box sx={{ flex: 1, textAlign: "left", height: "100%" }}>
                <Heading as="h3" sx={{ fontSize: "22px", marginBottom: "10px" }}>
                  {event.competitionName}
                </Heading>
                <Text sx={{ fontSize: "16px", color: "#555", marginBottom: "8px" }}>
                  Date: {event.date.toDateString()}
                </Text>
                {/* Add the link, using event.state.website */}
                {event.state && event.state.website && (
                <a href={event.state.website} target="_blank" rel="noopener noreferrer">
                    <Text sx={{ fontSize: "16px", color: "primary", marginBottom: "8px" }}>
                        <br></br>
                    Find Out More
                    </Text>
                </a>
                )}
            </Box>
          </Card>
        ))}
      </Flex>

      <GatsbyLink to="/competitions">
        <Button
          sx={{
            mt: 3,
            background: "primary",
            color: "white",
            fontSize: "16px",
            borderRadius: "8px",
            px: 4,
            py: 2,
          }}
        >
          See More Events
        </Button>
      </GatsbyLink>
    </Box>
  );
};

export default EventShowcase;