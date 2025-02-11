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
        overflow: "hidden",
      }}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4500 }}
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
        style={{
          height: "85vh",
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
              {/* Blurred Background (using pseudo-element) */}
              <Box
                as="div"
                sx={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 0,
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "-5%",
                    left: "-5%",
                    width: "110%",
                    height: "110%",
                    backgroundImage: `url(${slide.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "blur(20px)",
                    zIndex: -1,
                  },
                }}
              />

              {/* Zoomed-Out Main Image */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  zIndex: 1,
                }}
              />

              {/* Content (Caption and Button) */}
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                  textAlign: "center",
                  width: "auto",
                  maxWidth: "80%",
                  padding: "1rem",
                }}
              >
                <h2
                  sx={{
                    color: "white",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
                    fontSize: {
                      base: "1.5rem",
                      md: "2.5rem",
                      lg: "3.5rem",
                    },
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderRadius: "8px",
                    padding: "0.5rem 1rem",
                    margin: 0,
                    marginBottom: "1rem", // Add margin bottom here
                    display: "block", // Change to block
                  }}
                >
                  {slide.caption}
                </h2>

                {slide.buttonText && slide.buttonLink && (
                  <Link to={slide.buttonLink} sx={{ textDecoration: "none" }}>
                    <Button
                      sx={{
                        backgroundColor: "primary",
                        color: "logo",
                        padding: {
                          base: "0.5rem 1rem",
                          md: "0.75rem 1.5rem",
                        },
                        fontSize: {
                          base: "0.8rem",
                          md: "1rem",
                        },
                        fontWeight: "bold",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        transition:
                          "transform 0.2s ease-in-out, background-color 0.2s",
                        "&:hover": {
                          transform: "scale(1.05)",
                          backgroundColor: "secondary",
                        },
                        display: "block", // Ensure button is also block-level
                        width: "100%",      // Make button fill its container
                        maxWidth: "300px",  // Limit button width (optional)
                        margin: "0 auto"    // Horizontally center the button
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