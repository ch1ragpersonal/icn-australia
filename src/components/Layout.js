/** @jsxImportSource theme-ui */
import { Box, Container, Flex } from 'theme-ui';
import { Helmet } from 'react-helmet'; // Import Helmet for adding fonts
import Login from '../components/Login';
import Navbar from './navbar';
import Seo from './seo';
import SiteMap from './SiteMap';

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
        backgroundColor: 'primary',
        overflow: 'hidden',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3), 0 10px 10px -5px rgba(0,0,0,0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
      }}
    >
      <Box>
        <Navbar/>
      </Box>
    </header>

    <main>{children}</main>

    <footer sx={{ bg: 'muted', padding: '1rem', textAlign: 'center' }}>
      <SiteMap/>
      © 2024 ICN Australia
    </footer>
  </Box>
);

export default Layout;
