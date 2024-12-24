/** @jsxImportSource theme-ui */
import { Box, Heading } from 'theme-ui';

export default function HomePage() {
  return (
    <Box sx={{ backgroundColor: 'primary', padding: 4 }}>
      <Heading sx={{ color: 'background' }}>Welcome to My Site</Heading>
    </Box>
  );
}