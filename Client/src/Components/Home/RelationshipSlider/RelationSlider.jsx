import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from 'swiper/modules';
import { Link } from "react-router-dom";
import RelationData from '../../Consone/RelationData.js';

const RelationSlider = () => (
  <div className="NavcatSlider bg-gradient-to-b mt-6 ">
    <div className="container bg-white mx-auto px-4 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6 px-6 py-4 border-b border-gray-200">
        <h3 className="text-[20px] font-semibold text-gray-800">For Every Relationship</h3>
      </div>
      <Swiper
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 },
          400: { slidesPerView: 3, spaceBetween: 5 },
          550: { slidesPerView: 4, spaceBetween: 5 },
          750: { slidesPerView: 5, spaceBetween: 5 },
          950: { slidesPerView: 6, spaceBetween: 5 },
          1100: { slidesPerView: 8, spaceBetween: 5 },
        }}
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        {RelationData.map((slide, index) => (
          <SwiperSlide key={index}>
            <Link to={slide.to}>
              <div className="link text-center pb-2">
                <img
                  src={slide.url}
                  alt={slide.text}
                  className="mx-auto w-25 h-21 lg:h-25 rounded-lg shadow-lg"
                />
                <h3 className="mt-2 mb-4 text-sm font-semibold text-gray-800">{slide.text}</h3>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </div>
);

export default RelationSlider;
