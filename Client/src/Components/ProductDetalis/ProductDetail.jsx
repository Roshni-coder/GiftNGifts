// ProductDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // 👈 import useParams
import LeftComponent from "./ProductLeft/LeftComponent";
import RightComponent from "./ProductRight/RightComponent";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";

function ProductDetail() {
  const { id: productId } = useParams(); // 👈 get product ID from URL
  const [activeTab, setActiveTab] = useState(0);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0); // 👉 scrolls to top when product detail is opened
  }, []);
  
  useEffect(() => {
    if (productId) {
      axios
        .get(`http://localhost:7000/api/products/${productId}`)
        .then((response) => {
          setProduct(response.data);
          console.log("fetched product successfully.....")
        })
        .catch((error) => {
          console.error("Error fetching product details", error);
        });
    }
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-md">
      <div className="container lg:pl-3 lg:flex gap-1 ">
        <div className="leftContainer !my-4 lg:w-[40%]  w-full">
          <LeftComponent product={product} />
        </div>

        <div className="rightContainer w-full my-4 lg:w-[60%]">
          <RightComponent product={product} />
        </div>
      </div>

      <div className="container py-8 pl-3">
        <div className="flex items-center gap-4 mb-5">
          <span
            className={`flex link sm:!text-[18px] !text-[16px] cursor-pointer font-[500] ${
              activeTab === 0 && "text-[#7d0492]"
            }`}
            onClick={() => setActiveTab(0)}
          >
            Description
          </span>
          <span
            className={`flex link sm:!text-[18px] !text-[16px] cursor-pointer font-[500] ${
              activeTab === 1 && "text-[#7d0492]"
            }`}
            onClick={() => setActiveTab(1)}
          >
            Product Details
          </span>
          <span
            className={`flex link sm:!text-[18px] !text-[16px] cursor-pointer font-[500] ${
              activeTab === 2 && "text-[#7d0492]"
            }`}
            onClick={() => setActiveTab(2)}
          >
            Reviews
          </span>
        </div>

        {activeTab === 0 && (
          <div className="shadow-lg w-full border border-gray-200 p-5 rounded-md">
            <p className="!text-[11px] sm:!text-[14px] text-semibold">{product.description}</p>

            {/* Render care instructions dynamically if available */}
            <ul className="list-disc ml-2 sm:!text-[14px] !text-[10px] p-2">
              {product.careInstructions && product.careInstructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
            
          </div>
        )}

        {activeTab === 1 && (
          <div className="shadow-lg w-full border border-gray-200 px-5 py-4 rounded-md">
            <h1 className="text-black font-[500] sm:!text-[17px] text-[14px]">
              Ingredients
            </h1>
            <p className="pt-2 !text-[11px] sm:!text-[14px]">{product.ingredients}</p>
            <ul className="sm:!text-[13px] !text-[10px] px-4  list-disc">
              <li className="pt-1">Cake Flavour: {product.flavor}</li>
              <li className="pt-1">Type of Cake: {product.type}</li>
              <li className="pt-1">Shape: {product.shape}</li>
              <li className="pt-1">Weight: {product.weight}</li>
              <li className="pt-1">Net Quantity: {product.netQuantity}</li>
              <li className="pt-1">Diameter: {product.diameter}</li>
              <li className="pt-1">Serves: {product.serves}</li>
            </ul>
            <h4 className="font-[500] text-black pt-2 sm:!text-[16px] text-[13px]">
              Delivery Information
            </h4>
            <ul className="list-disc ml-2 text-[10px] sm:!text-[13px] p-2">
              {/* <li>{product.deliveryInstructions}</li> */}
            </ul>
          </div>
        )}

        {activeTab === 2 && (
          <div className="shadow-lg w-full border border-gray-200 p-5 rounded-md">
            {/* Add reviews section as per your original implementation */}
            <div className="w-full productReview">
                <h2 className="text-black sm:!text-[18px] !text-[16px]">
                  Customer Questions & Answers
                </h2>
                <div className="reviewScroll w-full border-b border-gray-200  !max-h-[300px] overflow-y-scroll overflow-x-hidden">
                  <div className="review md:!w-[80%] !mb-2 !w-full flex items-center justify-between">
                    <div className="info md:w-[80%] flex items-center gap-3">
                      <Avatar
                        className="sm:!mb-6 !mb-18"
                        alt="Remy Sharp"
                        src="https://bni-india.in/img/site/61b86b9dbc9e2500070cdb9a.jpg"
                        sx={{ width: 60, height: 60 }}
                      />
                      <div className=" w-full pt-5">
                        <h4 className="sm:!text-[16px] !text-[14px] text-black pl-1">
                          Roshni Bhoi
                        </h4>
                        <h5 className="sm:!text-[13px] !text-[12px] text-black mb-0 pl-1">
                          21-01-2025
                        </h5>
                        <p className=" !mt-0 !mb-0 !text-[11px] sm:!text-[14px] pl-1">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Mollitia dolore reiciendis cupiditate nisi
                          impedit accusamus voluptate facilis dicta unde
                          explicabo.
                        </p>
                        <Rating
                          name="sixe-small"
                          size="small"
                          defaultValue={4}
                          readOnliy
                          className="!pr-3"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="review md:!w-[80%] !w-full flex items-center justify-between">
                    <div className="info md:w-[80%] flex items-center gap-3">
                      <Avatar
                        className="sm:!mb-6 !mb-18"
                        alt="Remy Sharp"
                        src="https://bni-india.in/img/site/61b86b9dbc9e2500070cdb9a.jpg"
                        sx={{ width: 60, height: 60 }}
                      />
                      <div className=" w-full pt-6">
                        <h4 className="sm:!text-[16px] !text-[14px] text-black pl-1">
                          Roshni Bhoi
                        </h4>
                        <h5 className="sm:!text-[13px] !text-[12px] text-black mb-0 pl-1">
                          21-01-2025
                        </h5>
                        <p className=" !mt-0 !mb-0 !text-[11px] sm:!text-[14px] pl-1">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Mollitia dolore reiciendis cupiditate nisi
                          impedit accusamus voluptate facilis dicta unde
                          explicabo.
                        </p>
                        <Rating
                          name="sixe-small"
                          defaultValue={4}
                          readOnliy
                          className="!pr-3"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="review md:!w-[80%] !w-full flex items-center justify-between">
                    <div className="info md:w-[80%] flex items-center gap-3">
                      <Avatar
                        className="sm:!mb-6 !mb-18"
                        alt="Remy Sharp"
                        src="https://bni-india.in/img/site/61b86b9dbc9e2500070cdb9a.jpg"
                        sx={{ width: 60, height: 60 }}
                      />
                      <div className=" w-full pt-6">
                        <h4 className="sm:!text-[16px] !text-[14px] text-black pl-1">
                          Roshni Bhoi
                        </h4>
                        <h5 className="sm:!text-[13px] !text-[12px] text-black mb-0 pl-1">
                          21-01-2025
                        </h5>
                        <p className=" !mt-0 !mb-0 !text-[11px] sm:!text-[14px] pl-1">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Mollitia dolore reiciendis cupiditate nisi
                          impedit accusamus voluptate facilis dicta unde
                          explicabo.
                        </p>
                        <Rating
                          name="sixe-small"
                          defaultValue={4}
                          readOnliy
                          className="!pr-3"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="reviewForm p-5 rounded-md bg-[#fafafa]">
                  <h2 className="text-[18px] p-4">
                    Add Reviews
                  </h2>
                  <form action="" className="w-full">
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Write a Review......"
                      className="w-full !mb-3"
                      multiline
                      Rows={5}
                    />
                    <br />
                    <Rating name="sixe-small" defaultValue={4} sixe="small" readOnliy />
                     <div className="flex items-center mt-2">
                      <button className="btn-org ">Submit Review</button></div>
                  </form>
                </div>
              </div>
          </div>
        )}
      </div>
      
    </div>
  );
}

export default ProductDetail;
