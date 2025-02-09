import React from "react";
import Seo from "../components/seo";
import ImageSlider from "../components/ImageSlider";
import EventShowcase from "../components/EventShowcase";
import RecentLivestreams from "../components/RecentLivestreams"; // Import the new component
import RecentResults from "../components/RecentResults";       // Import the new component

export default function App() {
  return (
    <>
      <Seo title="HomePage" description="Welcome to ICN Australia" />
      <div>
        <ImageSlider />
        <EventShowcase />
        <RecentLivestreams />
        <RecentResults />
      </div>
    </>
  );
}