/** @jsxImportSource theme-ui */
import { Box, Heading } from 'theme-ui';
import Seo from '../components/seo'
import VideoGrid from '../components/Livestream-library'

const videos = [
  {
    title: "Introduction to ICN",
    thumbnail: "../images/image1.jpg",
    duration: "5:30",
    slug: "intro-to-icn"
  },
  {
    title: "Competition Guidelines",
    thumbnail: "../images/image1.jpg",
    duration: "8:45",
    slug: "competition-guidelines"
  },
  {
    title: "Competition Guidelines",
    thumbnail: "../images/image1.jpg",
    duration: "8:45",
    slug: "competition-guidelines"
  },
  {
    title: "Competition Guidelines",
    thumbnail: "../images/image1.jpg",
    duration: "8:45",
    slug: "competition-guidelines"
  },
  {
    title: "Competition Guidelines",
    thumbnail: "../images/image1.jpg",
    duration: "8:45",
    slug: "competition-guidelines"
  },
  {
    title: "Competition Guidelines",
    thumbnail: "../images/image1.jpg",
    duration: "8:45",
    slug: "competition-guidelines"
  },
  
  // ... more videos
];

export default function HomePage() {
  return (
    <>
      <Seo 
        title="Livestreams"
        description="Livestreams"
      />
      <Heading sx={{ color: 'text' }}>Livestreams YAY</Heading>
      <VideoGrid videos={videos} />
    </>
      
  );
}