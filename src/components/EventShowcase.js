/** @jsxImportSource theme-ui */
import React from "react";
import { graphql, useStaticQuery, Link as GatsbyLink } from "gatsby";
import { Box, Image, Button, Heading, Card, Text, Link } from "theme-ui";

const EventShowcase = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulCompetition {
        nodes {
          id
          competitionName
          date
          location
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

  // Process competitions: only include those with a poster and convert date strings to Date objects.
  let competitions = data.allContentfulCompetition.nodes
    .filter((event) => event.poster?.file?.url)
    .map((event) => ({
      ...event,
      date: new Date(event.date),
    }));

  // Filter for future events and sort by date (ascending), then take the first 4.
  const displayEvents = competitions
    .filter((event) => event.date >= today)
    .sort((a, b) => a.date - b.date)
    .slice(0, 4);

  return (
    <Box sx={{ textAlign: "center", my: 4 }}>
      <Heading as="h2" sx={{color:"black", fontSize: 3, textAlign: "center", mb: 2 }}>
        Upcoming Competitions
      </Heading>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
        }}
      >
        {displayEvents.map((event) => {
          const cardContent = (
            <Card
              sx={{
                padding: "20px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                borderRadius: "10px",
                backgroundColor: "cardback",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "20px",
                height: "350px",
                overflow: "hidden",
              }}
            >
              {event.poster?.file?.url && (
                <Image
                  src={event.poster.file.url}
                  alt={event.competitionName}
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
                <Heading as="h3" sx={{color: "cardtext", fontSize: "22px", marginBottom: "16px" }}>
                  {event.competitionName}
                </Heading>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "16px",
                  }}
                >
                  <Text sx={{ fontSize: "18px" }}>📅</Text>
                  <Text sx={{ fontSize: "16px", color: "cardtext", fontWeight: "bold" }}>
                    {event.date.toDateString()}
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
                  <Text sx={{ fontSize: "18px" }}>📍</Text>
                  <Text sx={{ fontSize: "16px", color: "cardtext", fontWeight: "bold" }}>
                    {event.location}
                  </Text>
                </Box>
              </Box>
            </Card>
          );

          return event.state && event.state.website ? (
            <Link
              key={event.id}
              href={event.state.website}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              {cardContent}
            </Link>
          ) : (
            <Box key={event.id}>{cardContent}</Box>
          );
        })}
      </Box>
      <GatsbyLink to="/competitions">
        <Button
          sx={{
            mt: 3,
            background: "buttonback",
            color: "buttontext",
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
