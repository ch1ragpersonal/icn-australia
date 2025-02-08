/** @jsxImportSource theme-ui */
import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Grid, Box, Image, Heading, Text, Link } from "theme-ui";

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

  // Process and filter videos based on filterType
  const videos = data.allContentfulVideo.nodes
    .map((video) => ({
      id: video.id,
      title: video.title,
      description: video.description?.description,
      thumbnail: video.thumbnail?.file.url ? `https:${video.thumbnail.file.url}` : "/images/default-placeholder.webp",
      slug: video.video?.url,
      completed: video.completed,
      startTime: video.startTime,
      link: video.link,
    }))
    .filter((video) => {
      if (filterType.upcoming && !video.completed) return true; // Show uncompleted ones
      if (filterType.complete && video.completed) return true; // Show completed ones
      return false;
    });

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
          <Box sx={{ padding: 3 }}>
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
            
            {filterType.upcoming && !video.completed ? (
              <>
                <Text sx={{ fontSize: 1, color: "gray.600", fontWeight: "bold" }}>
                  Starts at: {video.startTime}
                </Text>
                {video.link && (
                  <Link
                    href={video.link}
                    target="_blank"
                    sx={{
                      display: "block",
                      marginTop: 2,
                      color: "blue",
                      textDecoration: "underline",
                    }}
                  >
                    Watch Now
                  </Link>
                )}
              </>
            ) : filterType.complete && video.completed ? (
              <Text
                sx={{
                  fontSize: 1,
                  color: "gray.600",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {video.description}
              </Text>
            ) : null}
          </Box>
        </Box>
      ))}
    </Grid>
  );
};

export default VideoGrid;
