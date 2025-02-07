/** @jsxImportSource theme-ui */
import { Box, Heading } from 'theme-ui';
import Login from '../components/Login';  // Import the Login component
import Seo from '../components/seo'
import Layout from '../components/Layout'

export default function HomePage() {
  return (
    <>
      <Seo title="Register" description="Register now for Season A 2025" />

          <Heading sx={{ color: 'background' }}>Welcome to My Site</Heading>

    </>
  );
}