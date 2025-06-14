import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import axios from 'axios';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const ViewBtn = styled(Button)`
  color: white;
  background: #7d0492;
  text-transform: none;
  padding: 7px 30px;
  border-radius: 4px;
  box-shadow: none;
  font-weight: 600;
  height: 35px;
  &:hover {
    background: #5c0170;
  }
`;

const ProductSlider = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/client/productsbycategory`;
      const { data } = await axios.get(url, {
        headers: { 'Content-Type': 'application/json' },
      });

      // Check if API returned valid structure
      if (data?.success && Array.isArray(data.categories)) {
        const filtered = data.categories.filter(
          (cat) => Array.isArray(cat.products) && cat.products.length > 0
        );
        setCategories(filtered);
      } else {
        console.error("Unexpected response format:", data);
      }
    } catch (error) {
      console.error("Error fetching products by category:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-lg font-medium text-gray-600">Loading products...</div>;
  }

  if (!categories.length) {
    return <div className="text-center py-10 text-lg font-medium text-gray-600">No products found.</div>;
  }

  return (
    <section className="pt-4 lg:pt-6">
      {categories.map((cat, idx) => (
        <div key={idx} className="container mx-auto px-4 md:px-6 mb-6 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4 px-6 py-4 border-b border-gray-200">
            <h3 className="text-[14px] sm:text-2xl font-semibold text-gray-800 capitalize">
              {cat.category || 'Untitled Category'}
            </h3>
            <Link to="/productlist" state={{ category: cat.category }}>
              <ViewBtn>View</ViewBtn>
            </Link>
          </div>

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
            {cat.products.map((product) => (
              <SwiperSlide key={product._id}>
                <Link to={`/products/${product._id}`}>
                  <div className="bg-white mb-4 rounded overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                    <div className="w-full h-[260px] overflow-hidden">
                      <img
                        src={product?.images?.[0]?.url || '/default-image.jpg'}
                        alt={product?.images?.[0]?.altText || product?.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3 text-center">
                      <h3 className="text-gray-700 text-sm sm:text-base truncate">{product.title}</h3>
                      <h2 className="text-gray-900 text-sm sm:text-lg font-semibold mt-1">
                        ₹{product.price || "N/A"}
                      </h2>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
    </section>
  );
};

export default ProductSlider;
