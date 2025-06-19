import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const SearchResultsPage = () => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(10000);

  const [selectedDiscount, setSelectedDiscount] = useState(null); // selected discount from checkbox

  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = new URLSearchParams(location.search)
    .get("query")
    ?.toLowerCase()
    .trim();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/product/getproducts`
        );
        const products = res.data.data;

        const filtered = products.filter((product) => {
          const title = product.title?.toLowerCase() || "";
          const category = product.categoryname?.name?.toLowerCase() || "";
          const subcategory = product.subcategory?.name?.toLowerCase() || "";

          return (
            title.includes(searchQuery) ||
            category.includes(searchQuery) ||
            subcategory.includes(searchQuery)
          );
        });

        setOriginalProducts(filtered);
        setFilteredProducts(filtered);

        const prices = filtered.map((p) => p.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        setMinPrice(min);
        setMaxPrice(max);
        setSelectedMaxPrice(max);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchProducts();
    } else {
      setLoading(false);
      setFilteredProducts([]);
    }
  }, [searchQuery]);

  // ✅ APPLY FILTER button click
  const handleApplyFilters = () => {
    const filtered = originalProducts.filter((product) => {
      const withinPrice =
        product.price >= minPrice && product.price <= selectedMaxPrice;
      const meetsDiscount =
        selectedDiscount === null ||
        (product.discount || 0) >= selectedDiscount;

      return withinPrice && meetsDiscount;
    });

    setFilteredProducts(filtered);
  };

  // Discount options for checkboxes
  const discountOptions = [10, 20, 30, 40, 50];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Search Results for "{searchQuery || ""}"
        </h2>
        <button
          onClick={() => navigate("/")}
          className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700"
        >
          Back to Home
        </button>
      </div>

      <div className="flex gap-6">
        {/* Filter Panel */}
        <div className="w-1/4 p-4 border rounded shadow h-fit">
          <h3 className="font-bold text-lg mb-4">Filters</h3>

          {/* Price Slider */}
          <label className="block text-sm text-gray-600 mb-2">
            Price: ₹{minPrice} – ₹{selectedMaxPrice}
          </label>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={selectedMaxPrice}
            onChange={(e) => setSelectedMaxPrice(Number(e.target.value))}
            className="w-full accent-purple-600 mb-4"
          />

          {/* Discount Checkboxes */}
          <h4 className="font-semibold text-sm mb-2">Discount</h4>
          {discountOptions.map((discount) => (
            <div key={discount} className="mb-1">
              <label className="text-sm text-gray-700">
                <input
                  type="radio"
                  name="discount"
                  value={discount}
                  checked={selectedDiscount === discount}
                  onChange={() => setSelectedDiscount(discount)}
                  className="mr-2"
                />
                {discount}% or more
              </label>
            </div>
          ))}

          {/* Clear Discount Option */}
          <div className="mt-1">
            <label className="text-sm text-gray-700">
              <input
                type="radio"
                name="discount"
                value=""
                checked={selectedDiscount === null}
                onChange={() => setSelectedDiscount(null)}
                className="mr-2"
              />
              All Discounts
            </label>
          </div>

          {/* Apply Button */}
          <button
            onClick={handleApplyFilters}
            className="mt-4 w-full bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700"
          >
            Apply Filter
          </button>
        </div>

        {/* Products */}
        <div className="w-3/4">
          {loading ? (
            <p className="text-gray-500">Loading products...</p>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="border p-2 rounded-lg shadow hover:shadow-lg transition-all duration-200 cursor-pointer"
                  onClick={() => navigate(`/products/${product._id}`)}
                >
                  <img
                    src={product.images?.[0]?.url || "/placeholder.jpg"}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded"
                  />
                  <h3 className="mt-3 text-lg font-semibold">{product.title}</h3>
                  <p className="text-sm text-gray-500">Brand: {product.brand}</p>
                  <p className="text-purple-700 font-bold mt-1">
                    ₹{product.price}
                  </p>
                  {product.discount > 0 && (
                    <p className="text-green-600 text-sm">
                      {product.discount}% off
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 mt-4">
              No products found matching "<strong>{searchQuery}</strong>"
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;