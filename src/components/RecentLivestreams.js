/** @jsxImportSource theme-ui */
import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Box, Heading, Text, Image, Link, Grid } from "theme-ui";
import { format } from 'date-fns';

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
          startTime
          link
        }
      }
    }
  `);

  const videos = data.allContentfulVideo.nodes.map(video => ({
    ...video,
    startTime: video.startTime ? new Date(video.startTime) : null,
    thumbnail: video.thumbnail?.file?.url ? `https:${video.thumbnail.file.url}` : "/images/default-placeholder.webp", //Handle null
  }));

  const mostRecentCompleted = videos.filter(v => v.completed).sort((a, b) => b.startTime - a.startTime)[0];
  const nextUpcoming = videos.filter(v => !v.completed && v.startTime > new Date()).sort((a, b) => a.startTime - b.startTime)[0];


  return (
    <Box sx={{ mb: 4 }}>
      <Heading as="h2" sx={{ fontSize: 3, textAlign: 'center', mb: 3 }}>Livestreams</Heading>
      <Grid columns={[1, 2]} gap={3}>
        {/* Most Recent Completed */}
        {mostRecentCompleted && (
          <Box sx={{
            p: 3,
            border: '1px solid',
            borderColor: 'gray.200',
            borderRadius: 'md',
            boxShadow: 'sm',
            bg: 'white',
          }}>
            <Heading as="h3" sx={{ fontSize: 2, mb: 2 }}>Most Recent</Heading>
            <Image src={mostRecentCompleted.thumbnail} alt={mostRecentCompleted.title} sx={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', borderRadius: 'md' }} />
            <Text sx={{ fontWeight: 'bold', mt: 2 }}>{mostRecentCompleted.title}</Text>
             <Text sx={{ fontSize: 1, color: "gray.600", fontWeight: "bold" }}>
                  Finished at: {mostRecentCompleted.startTime ? format(mostRecentCompleted.startTime, "PPP, p") : "No start time"}
                </Text>
          </Box>
        )}

        {/* Next Upcoming */}
        {nextUpcoming && (
          <Box sx={{
            p: 3,
            border: '1px solid',
            borderColor: 'gray.200',
            borderRadius: 'md',
            boxShadow: 'sm',
            bg: 'white',
          }}>
            <Heading as="h3" sx={{ fontSize: 2, mb: 2 }}>Next Upcoming</Heading>
            <Image src={nextUpcoming.thumbnail} alt={nextUpcoming.title} sx={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', borderRadius: 'md' }} />
            <Text sx={{ fontWeight: 'bold', mt: 2 }}>{nextUpcoming.title}</Text>
            <Text sx={{ fontSize: 1, color: "gray.600", fontWeight: "bold" }}>
              Starts at: {nextUpcoming.startTime ? format(nextUpcoming.startTime, "PPP, p") : "No Start Time"}
            </Text>
            {nextUpcoming.link && (
                <Link href={nextUpcoming.link} target="_blank" sx={{ display: 'block', mt: 2, color: 'blue.500', textDecoration: 'underline' }}>
                  Watch Now
                </Link>
            )}
          </Box>
        )}
      </Grid>
         <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Link href="/livestreams" sx={{
            display: 'inline-block',
            px: 4,
            py: 2,
            bg: 'primary',
            color: 'white',
            borderRadius: 'md',
            textDecoration: 'none',
            fontWeight: 'bold',
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