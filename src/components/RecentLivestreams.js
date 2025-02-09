/** @jsxImportSource theme-ui */
import React from "react";
import { graphql, useStaticQuery, Link as GatsbyLink } from "gatsby"; // Import Link as GatsbyLink
import { Box, Heading, Text, Image, Link, Grid } from "theme-ui";
import { format } from 'date-fns';

const RecentLivestreams = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulVideo(sort: { startTime: DESC }) {
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

  const videos = data.allContentfulVideo.nodes.map(video => ({
    id: video.id,
    title: video.title,
    description: video.description?.description,
    thumbnail: video.thumbnail?.file?.url ? `https:${video.thumbnail.file.url}` : "/images/default-placeholder.webp",
    videoUrl: video.video?.url,
    completed: video.completed,
    startTime: video.startTime ? new Date(video.startTime) : null,
    link: video.link,
  }));

  const mostRecentCompleted = videos.find(v => v.completed);
  const nextUpcoming = videos.find(v => !v.completed);

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Heading as="h2" sx={{ fontSize: 3, textAlign: 'center', mb: 3 }}>Livestreams</Heading>

      <Grid columns={[1, 2]} gap={[2, 3, 4]} sx={{ width: ['100%', '80%', '60%'], maxWidth: '1000px' }}>
        {/* Most Recent Completed */}
        {mostRecentCompleted && (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            bg: 'white',
            overflow: 'hidden',
            flexGrow: 1,
          }}>
            <Heading as="h3" sx={{ fontSize: '18px', mb: 2, textAlign: 'center' }}>Most Recent</Heading>
            <Image src={mostRecentCompleted.thumbnail} alt={mostRecentCompleted.title} sx={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', borderRadius: '8px' }} />
            <Box sx={{flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%'}}>
              <Text sx={{ fontWeight: 'bold', mt: 2, fontSize: '16px', textAlign: 'center' }}>{mostRecentCompleted.title}</Text>
              <Text sx={{ fontSize: '14px', color: "gray.600", fontWeight: "bold", textAlign: 'center', mb: 2 }}>
                Streamed at: {mostRecentCompleted.startTime ? format(mostRecentCompleted.startTime, "PPP, p") : "No start time"}
              </Text>
              {/* External Link - Keep as regular <a> */}
              {mostRecentCompleted.videoUrl && (
                <Link
                  href={mostRecentCompleted.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "block",
                    mt: 'auto',
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
            </Box>
          </Box>
        )}

        {/* Next Upcoming */}
        {nextUpcoming && (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            bg: 'white',
            overflow: 'hidden',
            flexGrow: 1,

          }}>
            <Heading as="h3" sx={{ fontSize: '18px', mb: 2, textAlign: 'center' }}>Next Upcoming</Heading>
            <Image src={nextUpcoming.thumbnail} alt={nextUpcoming.title} sx={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', borderRadius: '8px' }} />
            <Box sx={{flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%'}}>
              <Text sx={{ fontWeight: 'bold', mt: 2, fontSize: '16px', textAlign: 'center' }}>{nextUpcoming.title}</Text>
              <Text sx={{ fontSize: '14px', color: "gray.600", fontWeight: "bold", textAlign: 'center', mb: 2 }}>
                Starts at: {nextUpcoming.startTime ? format(nextUpcoming.startTime, "PPP, p") : "No Start Time"}
              </Text>
              {/* External Link - Keep as regular <a> */}
              {nextUpcoming.link && (
                <Link
                href={nextUpcoming.link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'block',
                  mt: 'auto',
                  color: 'primary',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Join Event
              </Link>
              )}
            </Box>
          </Box>
        )}
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 3 }}>
        {/* Internal Link - Use Gatsby's <Link> */}
        <Link as={GatsbyLink} to="/livestreams" sx={{
            display: 'inline-block',
            px: 4,
            py: 2,
            bg: 'primary',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '16px',
            '&:hover': {
              bg: 'secondary',
            }
        }}>
          See More Livestreams
        </Link>
      </Box>
    </Box>
  );
};

export default RecentLivestreams;