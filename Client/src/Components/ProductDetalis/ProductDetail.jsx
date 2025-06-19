import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LeftComponent from "./ProductLeft/LeftComponent";
import RightComponent from "./ProductRight/RightComponent";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";

function ProductDetail() {
  const { id: productId } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (productId) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product details", error);
        });
    }
  }, [productId]);

  if (!product) {
    return <div className="text-center py-10 text-gray-600">Loading...</div>;
  }

  return (
    <div className="bg-white ">
      <div className="container lg:pl-3 lg:flex gap-2">
        <div className="leftContainer w-full lg:w-[40%] py-4">
          <LeftComponent product={product} />
        </div>
        <div className="rightContainer w-full lg:w-[60%] py-4">
          <RightComponent product={product} />
        </div>
      </div>

      <div className="container py-4 px-4">
        {/* Tab Selector */}
        <div className="flex gap-6 border-b border-gray-200 pb-3">
          {["Description", "Product Details", "Reviews"].map((tab, index) => (
            <span
              key={index}
              className={`cursor-pointer text-[15px] sm:text-[17px] font-medium ${
                activeTab === index ? "text-[#7d0492] border-b-2 border-[#7d0492]" : "text-gray-600"
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </span>
          ))}
        </div>

        {/* Description Tab */}
        {activeTab === 0 && (
          <div className="mt-5 border border-gray-200 p-5 rounded-md shadow-sm">
            <p className="text-sm sm:text-base text-gray-700 mb-4">{product.description}</p>
            {product.careInstructions?.length > 0 && (
              <ul className="list-disc pl-6 text-sm text-gray-600 space-y-1">
                {product.careInstructions.map((instruction, i) => (
                  <li key={i}>{instruction}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Product Details Tab */}
        {activeTab === 1 && (
          <div className="mt-5 border border-gray-200 p-5 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-black">Ingredients</h3>
            <p className="text-sm text-gray-700 mt-2 mb-4">{product.ingredients}</p>
            <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
              <li>Cake Flavour: {product.flavor}</li>
              <li>Type of Cake: {product.type}</li>
              <li>Shape: {product.shape}</li>
              <li>Weight: {product.weight}</li>
              <li>Net Quantity: {product.netQuantity}</li>
              <li>Diameter: {product.diameter}</li>
              <li>Serves: {product.serves}</li>
            </ul>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 2 && (
          <div className="mt-5 border border-gray-200 p-5 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-black">Customer Reviews</h3>

            {/* Scrollable Reviews */}
            <div className="space-y-4 max-h-[300px] overflow-y-auto pt-4 pr-2">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-start gap-4 border-b border-gray-200 pb-4">
                  <Avatar
                    alt="User Avatar"
                    src="https://bni-india.in/img/site/61b86b9dbc9e2500070cdb9a.jpg"
                    sx={{ width: 60, height: 60 }}
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-black">Roshni Bhoi</h4>
                    <span className="text-xs text-gray-500">21-01-2025</span>
                    <p className="text-sm text-gray-700 mt-2">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia dolore
                      reiciendis cupiditate nisi impedit accusamus voluptate facilis dicta unde
                      explicabo.
                    </p>
                    <Rating name={`rating-${i}`} size="small" defaultValue={4} readOnly />
                  </div>
                </div>
              ))}
            </div>

            {/* Review Form */}
            <div className="mt-6 bg-gray-50 p-5 rounded-md">
              <h4 className="text-md font-semibold mb-3">Write a Review</h4>
              <form className="space-y-4">
                <TextField
                  label="Write your review..."
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                />
                <div className="flex items-center gap-3 my-4">
                  <Rating name="user-rating" size="small" defaultValue={4} />
                </div>
                <button
                  type="submit"
                  className="bg-[#7d0492] hover:bg-[#69027a] text-white px-4 !py-2 rounded font-[500]"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
