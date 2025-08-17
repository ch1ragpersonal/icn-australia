// src/pages/contact.js
import React from "react";
import Seo from "../components/seo";
import ContactUs from "../components/ContactUs";
import { graphql, useStaticQuery } from "gatsby";
import PresidentCard from "../components/Presidents";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ContactPage = () => {
  const data = useStaticQuery(graphql`
    query PresidentsPage {
      allContentfulPresident {
        nodes {
          id
          photo { file { url } }
          bio { raw }
          contact
          name
          title
        }
      }
    }
  `);

  const presidents = data.allContentfulPresident.nodes.map((p) => ({
    ...p,
    photo: p.photo?.file?.url,
  }));

  return (
    <>
      <Seo title="Contact Us" description="Contact ICN Australia" />

      <div className="px-4 sm:px-6 lg:px-8 py-6">
        {/* Your existing contact form/section */}

        <div className="mt-10">
          <h1
            className="
              text-3xl sm:text-4xl font-extrabold tracking-tight
              text-black mb-4
            "
          >
            Meet our Presidents
          </h1>

          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={20}
            slidesPerView={4}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            style={{ padding: "1rem 0" }}
          >
            {presidents.map((pres) => (
              <SwiperSlide key={pres.id}>
                <div className="h-full">
                  <PresidentCard president={pres} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <ContactUs />

      </div>
    </>
  );
};

export default ContactPage;
