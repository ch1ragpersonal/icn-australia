// src/pages/contact.js
import React from 'react';
import Seo from '../components/seo';
import ContactUs from '../components/ContactUs';
import { Box, Heading } from 'theme-ui';
import { graphql, useStaticQuery } from 'gatsby';
import PresidentCard from '../components/Presidents';
import "../styles/contact.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ContactPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulPresident {
        nodes {
          id
          photo {
            file { url }
          }
          bio { raw }
          contact
          name
          title
        }
      }
    }
  `);

  const presidents = data.allContentfulPresident.nodes.map(p => ({
    ...p,
    photo: p.photo?.file?.url,
  }));

  return (
    <>
      <Seo title="Contact Us" description="Contact ICN Australia" />
      <Box sx={{ px: 4, py: 3 }}>
        <ContactUs />
        <Heading as="h1" sx={{ mb: 3,
        px: 4, }}>
          Meet our Presidents
        </Heading>
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={20}
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            320:  { slidesPerView: 1 },
            640:  { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          style={{ padding: '1rem 0'}}
        >
          {presidents.map(pres => (
            <SwiperSlide key={pres.id}>
              <PresidentCard president={pres} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
};

export default ContactPage;
