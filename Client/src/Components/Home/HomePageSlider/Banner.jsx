import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Banner() {
  return (
    <div className="relative w-full">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: { navigation: false, pagination: true },
          464: { navigation: true, pagination: true },
          1024: { navigation: true, pagination: true },
        }}
      >
        <SwiperSlide >
          <img
            src="https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Wedding_Desk-15-01-2025.jpg"
            alt="Banner Image 1"
            className="w-full h-35 sm:h-45 md:h-55 lg:h-80"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Wedding_Desk-15-01-2025.jpg"
            alt="Banner Image 2"
            className="w-full h-35 sm:h-45 md:h-55 lg:h-80"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Banner;
