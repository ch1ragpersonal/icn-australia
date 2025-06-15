/** @jsxImportSource theme-ui */
import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Seo from "../components/seo";
import ImageSlider from "../components/ImageSlider";
import EventShowcase from "../components/EventShowcase";
import RecentLivestreams from "../components/RecentLivestreams";
import RecentResults from "../components/RecentResults";
import { Box, Container, Heading, Text, Image } from "theme-ui";
import AboutUs from "../components/AboutUs"

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
      <Seo title="Home" description="Welcome to ICN Australia" />
      
      <Box
        sx={{
          background: "F5F5DC",
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
          <Box sx={{
                  mb: 5,
                  width: '100vw',
                  position: 'relative',
                  left: '50%',
                  ml: '-50vw',
                  }}
            >
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

          {/* Welcome  section */}
          <Heading as="h2" sx={{color:"black", fontSize: 7, textAlign: "center", mb: 2 }}>
            Welcome to ICN Australia
          </Heading>

          {/* About us section */}
          <Box sx={{
            "& h1": {
              fontSize: 5,
            }
          }}>
          <AboutUs/>

          </Box>


          {/* Upcoming Competitions Section */}
          <Box      
            sx={{
              maxWidth: "100%",
              py: 5,
              px: 4,
              textAlign: "center",
              backgroundColor: "muted",
              }}
            >
            <Heading
              as="h1" sx={{ fontSize: 6, mb: 3 }}
            >
              ICN Season B 2025
            </Heading>
            <EventShowcase />
          </Box>

          
        </Container>
      </Box>
    </>
  );
}