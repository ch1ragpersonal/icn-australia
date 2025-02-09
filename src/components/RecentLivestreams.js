/** @jsxImportSource theme-ui */
import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Box, Heading, Text, Image, Link, Grid } from "theme-ui";
import { format } from 'date-fns'; // Only need format now

const RecentLivestreams = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulVideo(sort: { startTime: DESC }) {
        nodes {
          id
          title
          thumbnail {
            file {
              url
            }
          }
          completed
          startTime  # Keep startTime for formatting, even if not used for filtering
          link
        }
      }
    }
  `);

  // No need to convert startTime to Date objects immediately.
  const videos = data.allContentfulVideo.nodes.map(video => ({
    ...video,
    thumbnail: video.thumbnail?.file?.url ? `https:${video.thumbnail.file.url}` : "/images/default-placeholder.webp",
    // Convert startTime here only if it exists.  Important for display later.
    startTime: video.startTime ? new Date(video.startTime) : null,
  }));

  // Filter based on the 'completed' boolean.
  const mostRecentCompleted = videos.filter(v => v.completed).sort((a, b) => (b.startTime || 0) - (a.startTime || 0))[0];
  const nextUpcoming = videos.filter(v => !v.completed).sort((a, b) => (b.startTime || 0) - (a.startTime || 0))[0];

  return (
    <Box>
      <Heading as="h2" sx={{ fontSize: 3, textAlign: 'center', mb: 2 }}>Livestreams</Heading>
      <Grid columns={[1, 2]} gap={2}>
        {/* Most Recent Completed */}
        {mostRecentCompleted && (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            bg: 'white',
            overflow: 'hidden',
          }}>
            <Heading as="h3" sx={{ fontSize: '16px', mb: 1, textAlign: 'center' }}>Most Recent</Heading>
            <Image src={mostRecentCompleted.thumbnail} alt={mostRecentCompleted.title} sx={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', borderRadius: '8px' }} />
            <Text sx={{ fontWeight: 'bold', mt: 1, fontSize: '14px', textAlign: 'center' }}>{mostRecentCompleted.title}</Text>
            {/* Use the startTime for display, if available */}
            <Text sx={{ fontSize: '12px', color: "gray.600", fontWeight: "bold", textAlign: 'center' }}>
                {mostRecentCompleted.startTime ? format(mostRecentCompleted.startTime, "PPP, p") : "No start time"}
            </Text>
          </Box>
        )}

        {/* Next Upcoming */}
        {nextUpcoming && (
           <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            bg: 'white',
            overflow: 'hidden',
          }}>
            <Heading as="h3" sx={{ fontSize: '16px', mb: 1, textAlign: 'center' }}>Next Upcoming</Heading>
            <Image src={nextUpcoming.thumbnail} alt={nextUpcoming.title} sx={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', borderRadius: '8px' }} />
            <Text sx={{ fontWeight: 'bold', mt: 1, fontSize: '14px', textAlign: 'center' }}>{nextUpcoming.title}</Text>
            {/* Use the startTime for display, if available */}
            <Text sx={{ fontSize: '12px', color: "gray.600", fontWeight: "bold", textAlign: 'center' }}>
              {nextUpcoming.startTime ? format(nextUpcoming.startTime, "PPP, p") : "No Start Time"}
            </Text>
            {nextUpcoming.link && (
                <Link href={nextUpcoming.link} target="_blank" sx={{ display: 'block', mt: 1, color: 'blue.500', textDecoration: 'underline', fontSize:'12px', textAlign: 'center' }}>
                  Watch Now
                </Link>
            )}
          </Box>
        )}
      </Grid>
         <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Link href="/livestreams" sx={{
            display: 'inline-block',
            px: 3,
            py: 1,
            bg: 'primary',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '14px',
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