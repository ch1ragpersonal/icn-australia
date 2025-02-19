/** @jsxImportSource theme-ui */
import React from "react";
import { Box, Heading, Text, Link } from "theme-ui";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";

const ContactUs = () => {
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
        Contact Us
      </Heading>
      <Text
        sx={{
          fontSize: 3,
          maxWidth: "800px",
          mx: "auto",
          lineHeight: "1.6",
          mb: 4,
        }}
      >
        We would love to hear from you! Whether you have a question about our services,
        pricing, or just want to say hello, our team is here to help. Please reach out
        using any of the methods below, and we'll get back to you as soon as possible.
      </Text>

      <Box sx={{ textAlign: "center", mt: 5, mb: 4 }}>
        <Heading as="h2" sx={{ fontSize: 4, mb: 3 }}>
          Get in Touch
        </Heading>
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '2vmin'}}>
            <Text sx={{ fontSize: 2 }}>
            Email:{" "}
            <Link
                href="mailto:icnaustralia@icompetenatural.com"
                sx={{ color: "primary", textDecoration: "none" }}
            >
                icnaustralia@icompetenatural.com
            </Link>
            </Text>
            <Text sx={{ fontSize: 2 }}>
            Phone:{" "}
            <Link
                href="tel:+1234567890"
                sx={{ color: "primary", textDecoration: "none" }}
            >
                +1 (234) 567-890
            </Link>
            </Text>
            <Text sx={{ fontSize: 2 }}>
            Address: 123 Innovation Road, Sydney, Australia
            </Text>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 3, fontSize: 5 }}>
        <Link
          href="https://www.facebook.com/iCompete.Australia/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: "primary" }}
        >
          <FaFacebook />
        </Link>
        {/* <Link
          href="https://twitter.com/YourProfile"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: "primary" }}
        >
          <FaTwitter />
        </Link> */}
        <Link
          href="https://www.instagram.com/icn_ang/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: "primary" }}
        >
          <FaInstagram />
        </Link>
        {/* <Link
          href="https://www.linkedin.com/company/YourCompany"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: "primary" }}
        >
          <FaLinkedin />
        </Link> */}
        <Link
          href="mailto:icnaustralia@icompetenatural.com"
          sx={{ color: "primary" }}
        >
          <FaEnvelope />
        </Link>
      </Box>
    </Box>
  );
};

export default ContactUs;
