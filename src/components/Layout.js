/** @jsxImportSource theme-ui */
import { Box, Container, Flex } from 'theme-ui';
import { Helmet } from 'react-helmet'; // Import Helmet for adding fonts
import Login from '../components/Login';
import Navbar from './navbar-tailwind';
import Seo from './seo';
import SiteMap from './SiteMap';
import Footer from './Footer';

const Layout = ({ children, title, description }) => (
  <div>
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
    
    <Navbar/>

    <main>{children}</main>

    <Footer/>
  </div>
);

export default Layout;
