/** @jsxImportSource theme-ui */
import { Box, Heading } from 'theme-ui';
import Seo from '../components/seo'

export default function HomePage() {
  return (
    <>
      <Seo 
        title="Livestreams"
        description="Livestreams"
      />
      <Heading sx={{ color: 'text' }}>Welcome to My Site</Heading>
    </>
      
  );
}