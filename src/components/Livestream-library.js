/** @jsxImportSource theme-ui */
import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { Grid, Box, Image, Heading, Text } from "theme-ui"

// Sample prop shape for each video item:
// {
//   title: "My Awesome Video",
//   thumbnail: "/path/to/thumbnail.jpg",
//   duration: "12:34",
//   slug: "video-slug"  // for the video's page URL
// }

const VideoGrid = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulVideo {
        nodes {
          id
          title
          video{
            url
          }
          description {
            description
          }
          thumbnail {
            file {
              url
            }
          }
        }
      }
    }
  `);

  const videos = data.allContentfulVideo.nodes.map((video) => ({
    id: video.id,
    title: video.title,
    description: video.description?.description,
    thumbnail: video.thumbnail?.file.url 
      ? `https:${video.thumbnail.file.url}`
      : "/images/default-placeholder.webp",
    slug: video.video.url,
  }));

  return (
    <Grid
      columns={[1, 2, 3]} // responsive: 1 column on mobile, 2 on tablet, 3 on desktop
      gap={4}
      sx={{ marginY: 4 }}
    >
      {videos.map((video) => (
        <Link
          key={video.id}
          to={`${video.slug}`}
          sx={{
            textDecoration: "none",
            color: "inherit",
            "&:hover": {
              opacity: 0.9,
            },
          }}
        >
          <Box
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
            </Box>
          </Box>
        </Link>
      ))}
    </Grid>
  )
}

export default VideoGrid
