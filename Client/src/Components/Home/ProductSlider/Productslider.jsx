import React from 'react';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import productData from '../../Consone/ProductData.js';
import Button  from '@mui/material/Button';
import { styled } from '@mui/material';

const ViewBtn = styled(Button)`
  color:white ;
  background:#7d0492;
  text-transform:none;
  padding:7px 30px;
  border-radius :4px;
  box-shadow:none;
  font-weight:600;
  float:right;
  height:35px;
`;

function ProductSlider({ title }) {
  return (
    <section className="pt-6">
      {/* Product Slider Container */}
      <div className="container mx-auto px-4 md:px-6 bg-white rounded-lg shadow-lg">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-4 px-6 py-4 border-b border-gray-200">
          <h3 className="text-[14px]  sm:text-2xl  font-semibold text-gray-800">
            {title}
          </h3>
          <Link to="/productlist">
            <ViewBtn>
              View
            </ViewBtn>
          </Link>
        </div>

        {/* Swiper Slider */}
        <Swiper
          spaceBetween={20}
          className="mySwiper"
          breakpoints={{
            320: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {productData.map((product) => (
            <SwiperSlide key={product.id}>
              <Link to={`/productdetails/${product.id}`}>
                <div className="productItem bg-white mb-4 rounded overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  
                  {/* Image Wrapper */}
                  <div className="imgWrapper w-full h-[300px] sm:h-[280px] overflow-hidden pb-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="info pb-4 px-2 text-center">
                    <h3 className="text-gray-700 !text-[13px] md:text-base  p-1">
                      {product.name}
                    </h3>
                    <h2 className="text-gray-900 !text-[14px] md:text-lg font-semibold">
                      ₹{product.price}
                    </h2>
                  </div>

                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default ProductSlider;
