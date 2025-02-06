/** @jsxImportSource theme-ui */
import { Box, Heading } from 'theme-ui';
import Seo from '../components/seo'
import VideoGrid from '../components/Livestream-library'

export default function LivestreamsPage() {
  return (
    <>
      <Seo 
        title="Livestreams"
        description="Watch ICN Australia livestreams and videos"
      />
      <Box sx={{ padding: 4 }}>
        <Heading as="h1" sx={{ mb: 4 }}>Livestreams</Heading>
        <VideoGrid />
      </Box>
    </>
  );
}