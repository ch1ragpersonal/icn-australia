/** @jsxImportSource theme-ui */
import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import { Box, Button } from "theme-ui";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ImageSlider = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulSliderImage {
        nodes {
          id
          caption
          buttonText
          buttonLink
          image {
            file {
              url
            }
          }
        }
      }
    }
  `);

  const slides = data.allContentfulSliderImage.nodes.map((slide) => ({
    id: slide.id,
    image: slide.image?.file.url
      ? `https:${slide.image.file.url}`
      : "/images/default-placeholder.webp",
    caption: slide.caption || "No Caption",
    buttonText: slide.buttonText,
    buttonLink: slide.buttonLink,
  }));

  return (
    <Box
      sx={{
        width: "100vw",
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        marginTop: 0,
      }}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
        style={{ 
          height: "calc(100vh - 80px)",
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Box
              sx={{
                height: "100%",
                width: "100%",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
              <Box
                sx={{
                  position: "relative",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 2,
                  gap: "20px",
                }}
              >
                <h2
                  sx={{
                    color: "white",
                    textShadow: "0px 0px 5px rgba(0,0,0,0.7)",
                    fontSize: "32px",
                    padding: "20px",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  {slide.caption}
                </h2>
                {slide.buttonText && slide.buttonLink && (
                  <Link 
                    to={slide.buttonLink}
                    sx={{
                      textDecoration: "none",
                    }}
                  >
                    <Button
                      sx={{
                        backgroundColor: "primary",
                        color: "white",
                        padding: "15px 30px",
                        fontSize: "18px",
                        fontWeight: "bold",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        transition: "transform 0.2s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.05)",
                          backgroundColor: "secondary",
                        },
                      }}
                    >
                      {slide.buttonText}
                    </Button>
                  </Link>
                )}
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ImageSlider;