import React from "react";
import Seo from "../components/seo";
import ImageSlider from "../components/ImageSlider";
import EventShowcase from "../components/EventShowcase";
import RecentLivestreams from "../components/RecentLivestreams";
import RecentResults from "../components/RecentResults";
import { Box, Heading, Text, Grid } from 'theme-ui'
import ContactUs from "../components/ContactUs";

const contactPage = () => {

    return(
        <>
        <Seo 
            title="Contact Us"
            description="Contact ICN Australia"
          />
          <Box sx={{ padding: 4 }}>
            <ContactUs/>
        </Box>
        </>
    );


}

export default contactPage