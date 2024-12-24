/** @jsxImportSource theme-ui */
import { Box, Heading } from 'theme-ui';
import Login from '../components/Login';  // Import the Login component

export default function HomePage() {
  return (
    <Box sx={{ backgroundColor: 'primary', padding: 4 }}>
      <Heading sx={{ color: 'background' }}>Welcome to My Site</Heading>
      
      {/* Render the Login component below the heading */}
      <Box sx={{ marginTop: 4 }}>
        <Login />
      </Box>
    </Box>
  );
}