import React from "react";
import Seo from "../components/seo";
import ImageSlider from "../components/ImageSlider";
import EventShowcase from "../components/EventShowcase"; // If this component is being used

export default function App() {
  return (
    <>
      <Seo title="HomePage" description="Welcome to ICN Australia" />
      <div>
        <ImageSlider />
        <EventShowcase />
      </div>
    </>
  );
}