/** @jsxImportSource theme-ui */
import React from "react";
import { Box, Heading, Text } from "theme-ui";

const AboutUs = () => {
  return (
    <Box
      sx={{
        maxWidth: "100%",
        py: 5,
        px: 4,
        backgroundColor: "muted",
      }}
    >
      <Heading as="h1" sx={{ mb: 3 }}>
        About Us
      </Heading>
      <Text sx={{ fontSize: 3, maxWidth: "800px", mx: "auto", lineHeight: "1.6" }}>
At <strong>ICN Australia</strong>, we’re more than just a natural bodybuilding company—we’re a community committed to the principles of clean, drug-free competition. As part of the global ICN (I Compete Natural) family, our mission is to empower athletes to reach their full potential while maintaining the integrity of the sport.
<br/>
<br/>

We believe in the hard work, discipline, and passion that natural bodybuilding demands. Every member of our community is dedicated to training smart, competing fair, and inspiring others to embrace a lifestyle that values health, strength, and perseverance. Our team provides the support and guidance necessary to help you build your best self—on and off the stage.

 Whether you’re a seasoned competitor or just beginning your journey, ICN Australia is here to champion your achievements and help you push your limits—naturally.
 <br/>
 <br/>
Join us, and experience the power of a community that believes in competing natural, living natural, and celebrating the spirit of true athletic excellence.
      </Text>
    </Box>
  );
};

export default AboutUs;
