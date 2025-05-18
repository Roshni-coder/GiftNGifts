import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const ViewBtn = styled(Button)`
  color: white;
  background: #7d0492;
  text-transform: none;
  padding: 7px 30px;
  border-radius: 4px;
  box-shadow: none;
  font-weight: 600;
  float: right;
  height: 35px;
`;

function ProductSlider() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:7000/api/client/productsbycategory");
      if (data.success && Array.isArray(data.categories)) {
        setCategories(data.categories);
      } else {
        console.error("Unexpected response format:", data);
      }
    } catch (error) {
      console.error("Error fetching products by category:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) return <div className="text-center py-10">Loading products...</div>;

  if (!categories || categories.length === 0) {
    return <div className="text-center py-10">No products found.</div>;
  }

  return (
    <section className="pt-6">
    {categories?.slice(0, 4).map((cat, idx) => {
      const products = cat?.products || [];
      if (products.length === 0) return null; // Skip this category if no products
  
      return (
        <div key={idx} className="container mx-auto px-4 md:px-6 !mb-3 bg-white rounded-lg shadow-lg mb-10">
          {/* Category Header */}
          <div className="flex items-center justify-between mb-4 px-6 py-4 border-b border-gray-200">
            <h3 className="text-[14px] sm:text-2xl font-semibold text-gray-800">
              {cat?.category || 'Untitled Category'}
            </h3>
            <Link to="/productlist" state={{ category: cat.category }}>
              <ViewBtn>View</ViewBtn>
            </Link>
          </div>
  
          {/* Product Slider */}
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
            {products.map((product) => (
              <SwiperSlide key={product._id}>
                <Link to={`/products/${product._id}`}>
                  <div className="productItem bg-white mb-4 rounded overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                    {/* Image */}
                    <div className="imgWrapper w-full h-[300px] sm:h-[280px] overflow-hidden pb-2">
                      <img
                        src={product?.images?.[0]?.url || '/default-image.jpg'}
                        alt={product?.images?.[0]?.altText || product?.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
  
                    {/* Info */}
                    <div className="info pb-4 px-2 text-center">
                      <h3 className="text-gray-700 !text-[13px] md:text-base p-1">
                        {product?.title || "No Title"}
                      </h3>
                      <h2 className="text-gray-900 !text-[14px] md:text-lg font-semibold">
                        ₹{product?.price || "N/A"}
                      </h2>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      );
    })}
  </section>
  
    
  );
}

export default ProductSlider;
