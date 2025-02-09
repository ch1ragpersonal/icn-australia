/** @jsxImportSource theme-ui */
import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Grid, Box, Image, Heading, Text, Link, Flex } from "theme-ui";

const VideoGrid = ({ filterType }) => {
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
            url
          }
          completed
          startTime
          link
        }
      }
    }
  `);

  const videos = data.allContentfulVideo.nodes
    .map((video) => ({
      id: video.id,
      title: video.title,
      description: video.description?.description,
      thumbnail: video.thumbnail?.file?.url
        ? `https:${video.thumbnail.file.url}`
        : "/images/default-placeholder.webp",
      videoUrl: video.video?.url,
      completed: video.completed,
      startTime: video.startTime,
      link: video.link,
    }))
    .filter((video) => {
      if (filterType.upcoming && !video.completed) return true;
      if (filterType.complete && video.completed) return true;
      return false;
    });

  // Function to format the date and time
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return ""; // Handle missing startTime
    const date = new Date(dateTimeString);
    const formattedDate = date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const formattedTime = date.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true, // Use 12-hour format with AM/PM
    });
    return `${formattedDate}, ${formattedTime}`;
  };

  return (
    <Grid columns={[1, 2, 3]} gap={4} sx={{ marginY: 4 }}>
      {videos.map((video) => (
        <Box
          key={video.id}
          sx={{
            position: "relative",
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "translateY(-4px)",
            },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Image
            src={video.thumbnail}
            alt={video.title}
            sx={{
              width: "100%",
              height: "auto",
              aspectRatio: "16/9",
              objectFit: "cover",
            }}
          />
          <Box
            sx={{
              padding: 3,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Heading
              as="h3"
              sx={{
                fontSize: 2,
                marginY: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {video.title}
            </Heading>

            {/* Conditional Rendering based on filterType */}
            {filterType.upcoming && !video.completed && (
              <>
                <Text sx={{ fontSize: 1, color: "gray.600", fontWeight: "bold" }}>
                  Starts at: {formatDateTime(video.startTime)} {/* Format date/time */}
                </Text>
                {video.link && (
                  <Link
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: "block",
                      marginTop: "auto",
                      color: "primary",
                      textDecoration: "none",
                      fontWeight: "bold",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Join Event
                  </Link>
                )}
              </>
            )}

            {filterType.complete && video.completed && (
              <>
                <Text sx={{ fontSize: 1, color: "gray.600", fontWeight: "bold" }}>
                  Streamed at: {formatDateTime(video.startTime)} {/* Format date/time */}
                </Text>
                <Text
                  sx={{
                    fontSize: 1,
                    color: "gray.600",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    marginBottom: 2,
                  }}
                >
                  {video.description}
                </Text>
                {video.videoUrl && (
                  <Link
                    href={video.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: "block",
                      marginTop: "auto",
                      color: "primary",
                      textDecoration: "none",
                      fontWeight: "bold",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Watch Replay
                  </Link>
                )}
              </>
            )}
          </Box>
        </Box>
      ))}
    </Grid>
  );
};

export default VideoGrid;