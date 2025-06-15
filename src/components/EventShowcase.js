/** @jsxImportSource theme-ui */
import React from "react";
import { graphql, useStaticQuery, Link as GatsbyLink } from "gatsby";
import { Box, Image, Button, Heading, Card, Text, Link } from "theme-ui";
import SecondaryButton from "./SecondaryButton";

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
      <Heading as="h2" sx={{color:"black", fontSize: 4, textAlign: "center", mb: 2 }}>
        Upcoming Competitions
      </Heading>
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
        {displayEvents.map((event) => {
          const cardContent = (
            <Card
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
              {event.poster?.file?.url && (
                <Image
                  src={event.poster.file.url}
                  alt={event.competitionName}
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
                  {event.competitionName}
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
                  <Text sx={{ fontSize: "22px" }}>📅</Text>
                  <Text sx={{ fontSize: "19px", color: "primary", fontWeight: "bold" }}>
                    {event.date.toDateString()}
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
                  <Text sx={{ fontSize: "22px" }}>📍</Text>
                  <Text sx={{ fontSize: "19px", color: "primary", fontWeight: "bold" }}>
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
      {/* <GatsbyLink to="/competitions">
        <Button
          sx={{
            mt: 3,
            background: "buttonback",
            color: "buttontext",
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
          See More Events
        </Button>
      </GatsbyLink> */}
      <SecondaryButton to='/competitions' text={'See More Events'}/>
    </Box>
  );
};

export default EventShowcase;
