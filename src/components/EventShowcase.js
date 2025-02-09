/** @jsxImportSource theme-ui */
import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Box, Image, Button, Flex,Heading } from "theme-ui";
import { Link } from "gatsby";


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
        }
      }
    }
  `);

  const today = new Date();

  // Process competitions
  let competitions = data.allContentfulCompetition.nodes
    .filter(event => event.poster?.file?.url) // Ensure poster exists
    .map(event => ({
      ...event,
      date: new Date(event.date), // Convert date to Date object
    }));

  // Separate starred and non-starred, sort by date
  const starredEvents = competitions
    .filter(event => event.starred)
    .sort((a, b) => a.date - b.date);

  const otherEvents = competitions
    .filter(event => !event.starred)
    .sort((a, b) => a.date - b.date);

  // Combine: starred first, then closest events, limiting to 4 total
  const displayEvents = [...starredEvents, ...otherEvents]
    .filter(event => event.date >= today) // Only future events
    .slice(0, 4);

  return (
    <Box sx={{ textAlign: "center", my: 4 }}>
        <Heading as="h2" sx={{ fontSize: 3, textAlign: 'center', mb: 2 }}>Upcoming Competitions</Heading>
      <Flex
        sx={{
          justifyContent: "center",
          gap: 3,
          flexWrap: "wrap",
          overflowX: "auto",
          paddingBottom: "10px",
        }}
      >
        {displayEvents.map(event => (
          <Box
            key={event.id}
            sx={{
              maxWidth: "250px",
              textAlign: "center",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "md",
              background: "white",
            }}
          >
            <Image
              src={event.poster.file.url}
              alt={event.competitionName}
              sx={{ width: "100%", borderRadius: "8px" }}
            />
            <Box sx={{ p: 2 }}>
              <p sx={{ fontSize: "14px", fontWeight: "bold" }}>
                {event.competitionName}
              </p>
              <p sx={{ fontSize: "12px", color: "gray" }}>
                {event.date.toDateString()}
              </p>
            </Box>
          </Box>
        ))}
      </Flex>

      <Link to="/competitions">
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
      </Link>
    </Box>
  );
};

export default EventShowcase;
