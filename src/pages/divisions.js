import React from "react";
import Seo from "../components/seo";
import ImageSlider from "../components/ImageSlider";
import EventShowcase from "../components/EventShowcase";
import RecentLivestreams from "../components/RecentLivestreams";
import RecentResults from "../components/RecentResults";
import { Box, Heading, Text, Grid } from 'theme-ui'

// export default function App() {
//   return (
//     <>
//       <Seo title="HomePage" description="Welcome to ICN Australia" />
//       <div>
//         Page still awaiting content
//       </div>
//     </>
//   );
// }
const DivisionCard = ({ title, description }) => (
  <Box
    sx={{
      backgroundColor: 'background',
      borderRadius: '8px',
      padding: 4,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
      },
    }}
  >
    <Heading as="h3" sx={{ mb: 3, color: 'primary' }}>
      {title}
    </Heading>
    <Text sx={{ fontSize: 2, lineHeight: 1.6 }}>
      {description}
    </Text>
  </Box>
)

const DivisionsPage = () => {
  const maleDivisions = [
    {
      title: "Bodybuilding",
      description: "For competitors who push the boundaries of muscular size, definition, and symmetry, the Bodybuilding division is the ultimate test of discipline and strength. Athletes in this category showcase meticulously developed muscle mass and impeccable conditioning, standing as a testament to years of hard work and dedication."
    },
    {
      title: "Classic Physique",
      description: "Inspired by the golden era of bodybuilding, Classic Physique marries modern training with timeless aesthetics. This division emphasizes symmetry, proportion, and a lean yet powerful frame reminiscent of the legends who defined the sport. Competitors balance muscularity with grace to deliver a look that is both nostalgic and contemporary."
    },
    {
      title: "Men's Fitness",
      description: "Men's Fitness is a dynamic division that highlights athleticism, overall conditioning, and performance. Competitors in this category are judged on a combination of muscular development, agility, and stage presence, often incorporating elements of fitness routines and dynamic posing that demonstrate both strength and stamina."
    },
    {
      title: "Men's Physique",
      description: "Focused on a more streamlined and beach-ready appearance, Men's Physique celebrates a balanced, aesthetically pleasing upper body with well-defined abs and a harmonious overall structure. This division values a refined look that combines muscle tone with an approachable, everyday appeal—perfect for those who embody both fitness and fashion."
    }
  ]

  const femaleDivisions = [
    {
      title: "Bikini Model",
      description: "The Bikini Model division is all about showcasing a fit, feminine physique with a focus on overall aesthetics, confidence, and poise. Competitors present a toned yet soft silhouette that highlights balance and beauty, capturing the essence of a modern, athletic lifestyle."
    },
    {
      title: "Fitness Model",
      description: "In the Fitness Model category, strength and athleticism take center stage. This division is not only about a sculpted body but also about dynamic movement and performance. Competitors combine rigorous physical training with expressive routines that highlight flexibility, endurance, and vibrant energy."
    },
    {
      title: "Sports Model",
      description: "Celebrating both form and function, the Sports Model division is designed for those who possess a unique blend of muscularity and agility. Athletes in this category exhibit a dynamic, energetic presence that underscores their prowess in both aesthetics and performance—ideal for the modern multi-sport competitor."
    },
    {
      title: "Swimsuit Model",
      description: "The Swimsuit Model division is dedicated to a lean, toned physique perfect for the runway and poolside alike. Competitors are judged on their overall symmetry, stage presence, and the ability to embody both beauty and athleticism in a swimsuit. It's all about radiating confidence and a naturally sculpted look."
    },
    {
      title: "Ms Runway",
      description: "Ms Runway is where high fashion meets athletic excellence. This division emphasizes poise, elegance, and a polished presence as competitors strut the stage with confidence and sophistication. It's a celebration of style and glamour, proving that strength can be as beautiful as it is powerful."
    },
    {
      title: "Ms Figure",
      description: "Ms Figure spotlights the art of balanced muscularity and refined curves. This division rewards competitors who combine lean muscle with graceful femininity, achieving a look that is both athletic and aesthetically pleasing. It's about showcasing well-defined musculature without sacrificing elegance and harmony."
    },
    {
      title: "Ms Wellness",
      description: "Focusing on a fuller yet athletic build, the Ms Wellness division celebrates a strong lower body and well-defined curves. Competitors in this category bring energy, vitality, and a wholesome approach to fitness, emphasizing that health and beauty come in diverse shapes and sizes. It's a tribute to the vibrant spirit of overall wellness."
    }
  ]

  return (
    <>
      <Seo 
        title="Divisions & Categories"
        description="Explore ICN Australia's bodybuilding divisions and categories"
      />
      <Box sx={{ padding: 4 }}>
        <Heading as="h1" sx={{ mb: 4 }}>Divisions & Categories</Heading>
        
        <Text sx={{ 
          fontSize: 3, 
          mb: 6,
          lineHeight: 1.6 
        }}>
          Welcome to our Divisions page, where the art of physique meets passion, discipline, and athletic excellence. Whether you're a competitor aiming to showcase your hard work or a fan of the sport, our categories celebrate every facet of bodybuilding—from sculpted muscle and classic aesthetics to dynamic fitness and runway glamour. Explore our male and female divisions below to find the perfect stage for your unique journey.
        </Text>

        <Heading as="h2" sx={{ 
          mb: 4, 
          color: 'primary',
          mt: 5
        }}>
          Male Divisions
        </Heading>
        <Grid columns={[1, null, 2]} gap={4} sx={{ mb: 5 }}>
          {maleDivisions.map((division, index) => (
            <DivisionCard 
              key={index}
              title={division.title}
              description={division.description}
            />
          ))}
        </Grid>

        <Heading as="h2" sx={{ mb: 4, color: 'primary' }}>Female Divisions</Heading>
        <Grid columns={[1, null, 2]} gap={4}>
          {femaleDivisions.map((division, index) => (
            <DivisionCard 
              key={index}
              title={division.title}
              description={division.description}
            />
          ))}
        </Grid>
      </Box>
    </>
  )
}

export default DivisionsPage