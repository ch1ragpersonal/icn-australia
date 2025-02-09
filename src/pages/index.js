import React from "react";
import Seo from "../components/seo";
import ImageSlider from "../components/ImageSlider";
import EventShowcase from "../components/EventShowcase";
import RecentLivestreams from "../components/RecentLivestreams";
import RecentResults from "../components/RecentResults";
import { Grid, Heading } from "theme-ui"; // Import Grid

export default function App() {
  return (
    <>
      <Seo title="HomePage" description="Welcome to ICN Australia" />
      <div>
        <ImageSlider />
        <EventShowcase />
        {/* Wrap RecentLivestreams and RecentResults in a Grid */}
        <Grid columns={[1, 1, 2]} gap={4} sx={{ px: [2, 4], mb:4 }}> {/*Added padding here*/}
          <RecentLivestreams />
          <RecentResults />
        </Grid>
      </div>
    </>
  );
}