import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay } from "swiper/modules";

function MiddelAds() {
  return (
    <>
      <div className="mt-5  w-[80%] m-auto">
        <Swiper
          spaceBetween={30}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper"
        >
            <SwiperSlide>
                <img src="https://www.fnp.com/assets/images/custom/new-desk-home/offer-banners/New-arrival-gift-1-desk-8-sept-2022.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://www.fnp.com/assets/images/custom/new-desk-home/offer-banners/Franchisee-Banner_Desktop_01_01.jpg" alt="" />
            </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}

export default MiddelAds;
