import React from "react";
import Seo from "../components/seo";
import ImageSlider from "../components/ImageSlider";
import EventShowcase from "../components/EventShowcase";
import RecentLivestreams from "../components/RecentLivestreams";
import RecentResults from "../components/RecentResults";
import { Box } from "theme-ui"; // Import Box

export default function App() {
  return (
    <>
      <Seo title="HomePage" description="Welcome to ICN Australia" />
      <div>
        <ImageSlider />
        <EventShowcase />
        {/* Use a Box with flexDirection: column */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center items horizontally
          px: [2, 4], // Keep the padding
          mb: 4,
        }}>
          <RecentLivestreams />
          <br></br>
          <RecentResults />
        </Box>
      </div>
    </>
  );
}