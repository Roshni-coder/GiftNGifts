import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import ChatBot from "../../ChatBot/ChatBot.jsx";
import axios from "axios";

const NavCatSlider = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getcategories`);
      
      // Make sure you're accessing the actual array
      const categoryArray = Array.isArray(response.data)
        ? response.data
        : response.data.categories || [];

      setCategories(categoryArray);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  return (
    <div className="NavcatSlider bg-gray-100">
      <div className="container py-6 md:py-10 m-auto px-1">
        <Swiper
          slidesPerView={4}
          spaceBetween={10}
          modules={[Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            350: { slidesPerView: 5 },
            550: { slidesPerView: 6 },
            768: { slidesPerView: 7 },
            900: { slidesPerView: 8 },
          }}
          className="mySwiper"
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <Link to={`/products?category=${category.categoryname}`}>
                <div className="text-center mt-2">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${category.image}`}
                    alt={category.categoryname}
                    className="mx-auto sm:w-20 sm:h-20 lg:w-25 md:h-25 md:w-25 lg:h-25 w-18 h-18 rounded-full shadow-lg object-cover"
                  />
                  <h3 className="mt-2 hidden sm:block text-sm font-semibold text-gray-800">
                    {category.categoryname}
                  </h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <ChatBot />
    </div>
  );
};

export default NavCatSlider;
