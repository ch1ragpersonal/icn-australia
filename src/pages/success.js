// src/pages/payment-success.js
import React from 'react';
import { Box, Button, Heading, Text } from 'theme-ui';
import { Link } from 'gatsby';
import Seo from '../components/seo';

const PaymentSuccessPage = () => {
  return (
    <>
      <Seo title="Payment Success" description="Your payment was successful" />
      <Box sx={{ px: 4, py: 6, textAlign: 'center' }}>
        <Heading as="h1" sx={{ mb: 3 }}>
          Your payment was a success
        </Heading>
        <Text sx={{ mb: 4 }}>Thank you for your purchase!</Text>
        <br></br>
        <Button as={Link} to="/store" sx={{ px: 4, py: 2 }}>
          Return to Store
        </Button>
      </Box>
    </>
  );
};

export default PaymentSuccessPage;
