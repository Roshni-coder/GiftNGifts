import React, { useState } from "react";
import LeftComponent from "./ProductLeft/LeftComponent";
import RightComponent from "./ProductRight/RightComponent";
import ProductSlider from "../Home/ProductSlider/Productslider.jsx";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import {Button } from "@mui/material";
function ProductDetail() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <div className="bg-white shadow-md">
        <div className="container  lg:pl-3 lg:flex  gap-1">
          <div className="leftContainer  lg:w-[40%] w-full  ">
            <LeftComponent />
          </div>

          <div className="rightContainer w-full lg:w-[60%]   my-3 ">
            <RightComponent />
          </div>
        </div>
        <div className="container py-8 pl-3 ">
          <div className="flex items-center gap-4 mb-5 ">
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
              Prducts Details
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
              <p className="!text-[11px] sm:!text-[14px]">
                Celebrate love with our personalised assorted flavoured
                chocolates, a perfect anniversary gift that speaks to the heart.
                Each exquisite chocolates is crafted with care and wrapped in
                love, featuring your special moments, names, and an elegant
                anniversary theme. As your loved one unwraps these sweet
                treasures, they'll be reminded of the beautiful journey you
                share. This thoughtful gesture is more than a gift-it celebrates
                your timeless bond.
              </p>
              <h4 className="font-[500] text-black sm:!text-[18px] !text-[14px]">
                Care Instructions
              </h4>
              <ul className="list-disc ml-2 sm:!text-[14px] !text-[10px] p-2">
                <li>
                  Store cream cakes in a refrigerator. Fondant cakes should be
                  stored in an air conditioned environment.
                </li>
                <li>
                  Slice and serve the cake at room temperature and make sure it
                  is not exposed to heat.
                </li>
                <li>Use a serrated knife to cut a fondant cake.</li>
                <li>
                  Sculptural elements and figurines may contain wire supports or
                  toothpicks or wooden skewers for support.
                </li>
                <li>
                  Please check the placement of these items before serving to
                  small children
                </li>
                <li>The cake should be consumed within 24 hours.</li>
                <li>Enjoy your cake</li>
              </ul>
              <h6 className="text-[13px] font-[500] text-black">
                Manufacturer Details:
              </h6>
              <ul className="list-disc ml-2 text-[11px] sm:!text-[13px] p-2">
                <li>Ferns N Petals Private Limited</li>
                <li>
                  Address: FNP Estate, Ashram Marg, Mandi Road, Gadaipur, South
                  Delhi, Delhi, 110030
                </li>
                <li>FSSAI License No. 10019011006502</li>
              </ul>
            </div>
          )}

          {activeTab === 1 && (
            <div className="shadow-lg w-full border border-gray-200 p-5 rounded-md">
              <h1 className="text-black font-[500] sm:!text-[17px] text-[14px]">
                Ingredients
              </h1>
              <p className="pt-2 !text-[11px] sm:!text-[14px]">
                Red Velvet Premix, Refined oil, Breakfast Sugar, Whip Cream,
                Cream Cheese, Tamato red colour, Red Velvet Sponge crumble
              </p>
              <h4 className="text-black !font-[500] sm:!text-[16px] text-[13px] ">
                Product details
              </h4>
              <ul className="sm:!text-[13px] !text-[10px] px-4 p-1 list-disc">
                <li className="pt-1">Cake Flavour- Red Velvet</li>
                <li className="pt-1">Type of Cake - Cream</li>
                <li className="pt-1">Shape- Round</li>
                <li className="pt-1">Weight: 500 gm</li>
                <li className="pt-1">Net Quantity: 1 Cake</li>
                <li className="pt-1">Diameter: 7.5 inch</li>
                <li className="pt-1">Serves: 4-6 People</li>
              </ul>
              <h4 className="font-[500] text-black pt-2 sm:!text-[16px] text-[13px]">
                Delivery Information
              </h4>
              <ul className="list-disc ml-2 text-[10px] sm:!text-[13px]  p-2">
                <li>Store at room temperature (15 to 20 Degree Celsius).</li>
                <li>
                  Avoid keeping the cake in places where it gets direct sunlight
                  as it decreases the shelf life of Dry Cake.
                </li>
                <li>Once open, store the cake in an airtight container.</li>
                <li>Consume the cake within 2-3 days if kept outside.</li>
                <li>
                  In case if you are storing the cake in the refrigerator upon
                  opening, please consume within 2-4 days.
                </li>
              </ul>
            </div>
          )}

          {activeTab === 2 && (
            <div className="shadow-lg w-full border border-gray-200 p-5 rounded-md">
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
      <ProductSlider title="Related Products" />
    </>
  );
}

export default ProductDetail;
