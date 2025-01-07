/** @jsxImportSource theme-ui */
import { Box, Heading } from 'theme-ui';
import Login from '../components/Login';  // Import the Login component
import Seo from '../components/seo'

export default function HomePage() {
  return (
    <>
    <Seo 
      title="Test Page"
      description="This is a test page for ICN Australia"
    />
    <Box sx={{ backgroundColor: 'primary', padding: 4 }}>
      <Heading sx={{ color: 'background' }}>Welcome to My Site</Heading>
      
      
    </Box>
    </>
  );
}