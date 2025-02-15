/** @jsxImportSource theme-ui */
import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Seo from "../components/seo";
import ImageSlider from "../components/ImageSlider";
import EventShowcase from "../components/EventShowcase";
import RecentLivestreams from "../components/RecentLivestreams";
import RecentResults from "../components/RecentResults";
import { Box, Container, Heading, Text, Image } from "theme-ui";

export default function App() {
  const data = useStaticQuery(graphql`
    query {
      allContentfulVideo {
        nodes {
          id
          title
          description {
            description
          }
          thumbnail {
            file {
              url
            }
          }
          video {
            file {
              url
            }
          }
          completed
          startTime
          link
        }
      }
    }
  `);

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
          {/* AutoPlay Video Section - Filtered by Title */}
          <Box sx={{ mb: 5 }}>
            {data.allContentfulVideo.nodes
              .filter(({ title }) => "ICN ACT Video" === title)
              .map((video) =>
                video.video?.file?.url ? (
                  <Box key={video.id} sx={{ mb: 4 }}>
                    <video
                      width="100%"
                      height="auto"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                      poster={
                        video.thumbnail?.file?.url
                          ? `https:${video.thumbnail.file.url}`
                          : "/images/default-placeholder.webp"
                      }
                    >
                      <source
                        src={`https:${video.video.file.url}`}
                        type="video/mp4"
                      />
                      Your browser does not support the video element.
                    </video>
                    {video.description && (
                      <Text sx={{ mt: 2 }}>
                        {video.description.description}
                      </Text>
                    )}
                  </Box>
                ) : null
              )}
          </Box>

          {/* Image Slider Section */}
          <Box sx={{ mb: 5 }}>
            {/* <ImageSlider /> */}
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