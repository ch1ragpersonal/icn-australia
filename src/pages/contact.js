// src/pages/contact.js
import React, { useMemo } from "react";
import Seo from "../components/seo";
import ContactUs from "../components/ContactUs";
import { graphql, useStaticQuery } from "gatsby";

// ⬇️ use the **named** exports from Presidents.jsx
import { PresidentCard, sortPresidentsForDisplay, useUniformHeights } from "../components/Presidents";

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
          name
          title
          contact
          priority        # "Yes" | "No" | "" (keep as string)
          vicePresident   # "Yes" | "No"
          # stateName     # (optional; include if you have it)
          bio { raw }
          photo { file { url } }
        }
      }
    }
  `);

  // Normalise shape for the card
  const presidents = useMemo(
    () =>
      (data?.allContentfulPresident?.nodes ?? []).map((p) => ({
        ...p,
        photo: p.photo?.file?.url || "",
      })),
    [data]
  );

  // Apply required ordering (Nick first, etc.)
  const sortedPresidents = useMemo(
    () => sortPresidentsForDisplay(presidents),
    [presidents]
  );

  // Make all slides the same height (tallest wins)
  const [refs, height] = useUniformHeights(sortedPresidents.length);

  return (
    <>
      <Seo title="Contact Us" description="Contact ICN Australia" />
      <ContactUs />

      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="mt-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-b mb-4">
            Meet our Presidents
          </h1>

          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={20}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              320:  { slidesPerView: 1 },
              640:  { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            style={{ padding: "1rem 0" }}
          >
            {sortedPresidents.map((pres, i) => (
              <SwiperSlide key={pres.id} className="!h-auto">
                <div className="h-full">
                  <PresidentCard
                    ref={(el) => (refs.current[i] = el)}
                    president={pres}
                    style={height ? { height } : undefined}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
