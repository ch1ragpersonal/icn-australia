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
        textAlign: "center",
        backgroundColor: "muted",
      }}
    >
      <Heading as="h2" sx={{ fontSize: 5, mb: 3 }}>
        About Us
      </Heading>
      <Text sx={{ fontSize: 3, maxWidth: "800px", mx: "auto", lineHeight: "1.6" }}>
        At <strong>Your Company Name</strong>, we believe in pushing boundaries and creating 
        solutions that make a difference. With a passion for innovation and a commitment 
        to excellence, our team is dedicated to delivering high-quality services that exceed 
        expectations. Whether it's through technology, design, or strategy, we thrive on 
        challenges and aim to leave a lasting impact on everything we do.
      </Text>
    </Box>
  );
};

export default AboutUs;
