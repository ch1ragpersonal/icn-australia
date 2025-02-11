import React from "react";
import Seo from "../components/seo";
import ImageSlider from "../components/ImageSlider";
import EventShowcase from "../components/EventShowcase";
import RecentLivestreams from "../components/RecentLivestreams";
import RecentResults from "../components/RecentResults";
import { Box, Container, Heading } from "theme-ui";

export default function App() {
  return (
    <>
      <Seo title="HomePage" description="Welcome to ICN Australia" />
      <Box
        sx={{
          background: "linear-gradient(135deg, #f6f9fc 0%, #e9eff5 100%)",
          minHeight: "100vh",
        }}
      >
        <Container
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            pt: 0,
            pb: [4, 5],
            px: [3, 4],
          }}
        >
          {/* Image Slider Section */}
          <Box sx={{ mb: 5 }}>
            <ImageSlider />
          </Box>

          {/* Upcoming Competitions Section */}
          <Box sx={{ mb: 5 }}>
            <Heading
              as="h2"
              sx={{
                fontSize: ["2rem", "2.5rem", "3rem"],
                fontWeight: "bold",
                textAlign: "center",
                color: "text",
                mb: 3,
                borderBottom: "2px solid",
                borderColor: "secondary",
                pb: 1,
                width: "fit-content",
                mx: "auto",
              }}
            >
              ICN Season A 2025
            </Heading>
            <EventShowcase />
          </Box>

          {/* Recent Livestreams Section */}
          <Box sx={{ mb: 5 }}>
            <Heading
              as="h2"
              sx={{
                fontSize: ["2rem", "2.5rem", "3rem"],
                fontWeight: "bold",
                textAlign: "center",
                color: "text",
                mb: 3,
                borderBottom: "2px solid",
                borderColor: "secondary",
                pb: 1,
                width: "fit-content",
                mx: "auto",
              }}
            >
              Purchase PPVs
            </Heading>
            <RecentLivestreams />
          </Box>

          {/* Recent Results Section */}
          <Box sx={{ mb: 5 }}>
            <Heading
              as="h2"
              sx={{
                fontSize: ["2rem", "2.5rem", "3rem"],
                fontWeight: "bold",
                textAlign: "center",
                color: "text",
                mb: 3,
                borderBottom: "2px solid",
                borderColor: "secondary",
                pb: 1,
                width: "fit-content",
                mx: "auto",
              }}
            >
              Recent Results
            </Heading>
            <RecentResults />
          </Box>
        </Container>
      </Box>
    </>
  );
}
