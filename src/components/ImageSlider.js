/** @jsxImportSource theme-ui */
import { Box } from 'theme-ui';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ImageSlider = () => {
  const slides = [
    { id: 1, image: '/images/placeholder-1.webp', caption: 'Slide 1' },
    { id: 2, image: '/images/placeholder-2.webp', caption: 'Slide 2' },
  ];

  return (
    <>
      {/* Spacer explicitly added */}
      <Box
        sx={{
          height: '50px', // Adjust this value to control space above
        }}
      />
      <Box
        sx={{
          mt: '40px', // Space above slider (if needed in addition to spacer)
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]} // Pass modules here
          navigation // Enable navigation buttons
          pagination={{ clickable: true }} // Enable pagination dots
          autoplay={{ delay: 3000 }} // Enable autoplay
          loop={true} // Enable looping
          spaceBetween={30} // Space between slides
          slidesPerView={1} // Number of slides per view
          style={{ height: '400px' }} // Explicit slider height
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <Box
                sx={{
                  height: '100%',
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <h2
                  sx={{
                    color: 'white',
                    textShadow: '0px 0px 5px rgba(0,0,0,0.7)',
                    fontSize: '24px',
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
