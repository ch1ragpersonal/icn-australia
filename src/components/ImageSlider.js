/** @jsxImportSource theme-ui */
import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Box } from "theme-ui";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ImageSlider = () => {
  // Fetch images from Contentful using GraphQL
  const data = useStaticQuery(graphql`
    query {
  allContentfulSliderImage {
    nodes {
      id
      caption
      image {
        file {
          url
        }
      }
    }
  }
}
  `);

  // Transform data into slide format
  const slides = data.allContentfulSliderImage.nodes.map((slide) => ({
    id: slide.id,
    image: slide.image?.file.url
      ? `https:${slide.image.file.url}`
      : "/images/default-placeholder.webp",
    caption: slide.caption || "No Caption",
  }));

  

  slides.forEach(element => {
    console.log(element.image)
  });
  return (
    <>
      <Box sx={{ height: "50px" }} />
      <Box
        sx={{
          mt: "40px",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          spaceBetween={30}
          slidesPerView={1}
          style={{ height: "400px" }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <Box
                sx={{
                  height: "100%",
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h2
                  sx={{
                    color: "white",
                    textShadow: "0px 0px 5px rgba(0,0,0,0.7)",
                    fontSize: "24px",
                  }}
                >
                  {slide.caption}
                </h2>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
};

export default ImageSlider;
