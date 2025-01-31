/** @jsxImportSource theme-ui */
import React from "react"
import { Link } from "gatsby"
import { Grid, Box, Image, Heading, Text } from "theme-ui"

// Sample prop shape for each video item:
// {
//   title: "My Awesome Video",
//   thumbnail: "/path/to/thumbnail.jpg",
//   duration: "12:34",
//   slug: "video-slug"  // for the video's page URL
// }

const VideoGrid = ({ videos }) => {
  return (
    <Grid
      columns={[1, 2, 3]} // responsive: 1 column on mobile, 2 on tablet, 3 on desktop
      gap={4}
      sx={{ marginY: 4 }}
    >
      {videos.map((video) => (
        <Link
          key={video.slug}
          to={`/videos/${video.slug}`}
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
            <Text
              sx={{
                position: "absolute",
                bottom: "8px",
                right: "8px",
                backgroundColor: "rgba(0,0,0,0.75)",
                color: "white",
                padding: "2px 6px",
                borderRadius: "4px",
                fontSize: 1,
              }}
            >
              {video.duration}
            </Text>
            <Box sx={{ padding: 3 }}>
              <Heading
                as="h3"
                sx={{
                  fontSize: 2,
                  marginY: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {video.title}
              </Heading>
            </Box>
          </Box>
        </Link>
      ))}
    </Grid>
  )
}

export default VideoGrid
