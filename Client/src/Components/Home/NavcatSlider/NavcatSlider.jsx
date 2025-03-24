import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {Autoplay} from 'swiper/modules';

import { Link } from "react-router-dom";
import NavData from '../../Consone/NavData.js';
import ChatBot from "../../ChatBot/ChatBot.jsx";

const NavCatSlider = () => (
  <div className="NavcatSlider bg-gray-100 md:py-8">
    <div className="container mx-auto px-1">
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        modules={[Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
            350:{
                slidesPerView: 5,
            },
            // For small screens (below 'md' breakpoint)
            550: {
              slidesPerView: 6,  // 5 images on smaller screens
            },
            // For medium screens and above (>= 768px)
            768: {
              slidesPerView: 7,  // 8 images on medium and larger screens
            },
            900:{
                slidesPerView: 8,
            }
          }}
        className="mySwiper"
        
      >
        {NavData.map((slide, index) => (
          <SwiperSlide key={index}>
            <Link to={slide.to}>
              <div className="link text-center mt-2">
                <img
                  src={slide.url}
                  alt={slide.text}
                  className=" mx-auto sm:w-20 sm:h-20 lg:w-25 lg:h-25 w-15 h-15 rounded-full shadow-lg"
                />
                <h3 className="mt-2 hidden sm:block text-sm font-semibold text-gray-800">
                  {slide.text}
                </h3>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    <ChatBot/>
  </div>
);

export default NavCatSlider;
