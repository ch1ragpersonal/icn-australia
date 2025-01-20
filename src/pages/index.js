import * as React from "react"
import Seo from '../components/seo'

import ImageSlider from '../components/ImageSlider';

export default function App() {
  return (
    <>
    <Seo 
      title="HomePage"
      description="Welcome to ICN Australia"
    />
    <div>
      <ImageSlider />
    </div>
    </>
  );
}
