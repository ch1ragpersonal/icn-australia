import React from "react";
import Seo from "../components/seo";
import ImageSlider from "../components/ImageSlider";
import EventShowcase from "../components/EventShowcase";
import RecentLivestreams from "../components/RecentLivestreams";
import RecentResults from "../components/RecentResults";
import { Box, Heading, Text, Grid } from 'theme-ui'
import AboutUs from "../components/AboutUs";


const aboutPage = () => {
    return(
    <>
    <Seo 
        title="About Us"
        description="About ICN Australia"
      />
      <Box sx={{ padding: 4 }}>
        <AboutUs/>
    </Box>
    </>
    );

}

export default aboutPage

