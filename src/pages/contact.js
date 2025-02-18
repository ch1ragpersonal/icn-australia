import React from "react";
import Seo from "../components/seo";
import ImageSlider from "../components/ImageSlider";
import EventShowcase from "../components/EventShowcase";
import RecentLivestreams from "../components/RecentLivestreams";
import RecentResults from "../components/RecentResults";
import { Box, Heading, Text, Grid } from 'theme-ui'

const contactPage = () => {

    return(
        <>
        <Seo 
            title="Contact Us"
            description="Contact ICN Australia"
          />
          <Box sx={{ padding: 4 }}>
            <Heading as="h1" sx={{ mb: 4 }}>Contact Us</Heading>
            
            <Text sx={{ 
              fontSize: 3, 
              mb: 6,
              lineHeight: 1.6 
            }}>
              Welcome to our about page, where the art of physique meets passion, discipline, and athletic excellence. Whether you're a competitor aiming to showcase your hard work or a fan of the sport, our categories celebrate every facet of bodybuilding—from sculpted muscle and classic aesthetics to dynamic fitness and runway glamour. Explore our male and female divisions below to find the perfect stage for your unique journey.
            </Text>
        </Box>
        </>
    );


}

export default contactPage