/** @jsxImportSource theme-ui */
import { Box, Container, Flex } from 'theme-ui';
import { Helmet } from 'react-helmet'; // Import Helmet for adding fonts
import Login from '../components/Login';
import Navbar from './navbar';
import Seo from './seo';

const Layout = ({ children, title, description }) => (
  <Box>
    {/* Helmet to Include Google Fonts */}
    <Helmet>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Merriweather:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </Helmet>

    <Seo
      title={title}
      description={description || "ICN Australia - Australia's Leading Natural Bodybuilding Competition"}
    />

    <header
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
        backgroundColor: "primary",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000, // Ensure the header stays on top
        height: "18vh", // Fix the height of the header
        width: "100%", // Ensure it spans the viewport width
      }}
    >
          <Container>
          <Flex sx={{ backgroundColor: 'primary', justifyContent: 'space-between', alignItems: 'center' }}>
        <Navbar />
        <Login />
        </Flex>
      </Container>
    </header>

    <main>{children}</main>

    <footer sx={{ bg: 'muted', padding: '1rem', textAlign: 'center' }}>
      © 2024 ICN Australia
    </footer>
  </Box>
);

export default Layout;
