import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LeftFilter from './LeftFilter';

function ProductList() {
  const location = useLocation();
  const { category } = location.state || {};

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState(null);

  // Default fetch on category load
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/client/productsbycategory`);
        if (data.success && Array.isArray(data.categories)) {
          const categoryData = data.categories.find(cat => cat.category === category);
          if (categoryData) {
            setProducts(categoryData.products);
          } else {
            setProducts([]);
          }
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      }
    };

    if (category) {
      fetchCategoryProducts();
    }
  }, [category]);

  // Apply filters
  const applyFilters = async (appliedFilters) => {
    setFilters(appliedFilters);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/filter`, {
        params: {
          categoryname: appliedFilters.selectedCategories.join(","),
          minPrice: appliedFilters.priceRange[0],
          maxPrice: appliedFilters.priceRange[1],
          discount: appliedFilters.selectedDiscount.join(","),
          sort: appliedFilters.sort
        }
      });
      setProducts(response.data.data);
    } catch (error) {
      console.log("Error applying filters:", error);
    }
  };

  return (
    <div className="w-full px-2">
  <h1 className="text-center text-lg sm:text-xl font-semibold text-gray-800 my-4">
    {category ? `${category} Products` : 'Birthday Wish List'}
  </h1>

  <div className="flex flex-col lg:flex-row gap-4">
    {/* Left Filter */}
    <div className="w-full lg:w-1/4 bg-white rounded shadow-md">
      <LeftFilter onApplyFilters={applyFilters} />
    </div>

    {/* Products */}
    <div className="w-full lg:w-3/4 bg-white rounded shadow-md">
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded overflow-hidden shadow hover:shadow-lg transition max-w-[300px] w-full"
            >
              <Link to={`/products/${product._id}`}>
                <div className="w-full h-65  sm:h-70  overflow-hidden">
                  <img
                    src={product?.images?.[0]?.url || "/default-image.jpg"}
                    alt={product?.images?.[0]?.altText || product?.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </Link>
              <div className="text-center p-2">
                <h3 className="text-gray-700 !text-[14px] sm:text-[16px] font-semibold mb-1">{product.title}</h3>
                <p className="text-gray-900 text-sm sm:text-lg font-semibold">₹{product.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No products found for this criteria.</p>
        )}
      </div>
    </div>
  </div>
</div>

  );
}

export default ProductList;
