import React from "react";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { GoGitCompare } from "react-icons/go";
import Rating from "@mui/material/Rating";
import { IoCloseSharp } from "react-icons/io5";

function CartItems() {
  return (
    <div>
      <div className="cartitems border-b border-gray-100 w-full sm:p-3 p-3 flex items-center sm:gap-4 gap-3">
        <div className="img lg:!w-[15%]  !w-[20%] rounded-md overflow-hidden">
          <Link to="" className="group">
            <img
              src="https://www.fnp.com/images/pr/l/v20221205201829/red-velvet-fresh-cream-cake-half-kg_1.jpg"
              alt=""
              className="w-full group-hover:scale-105 transition-all"
            />
          </Link>
        </div>
        <div className="info w-[75%] sm:w-[85%] relative">
          <IoCloseSharp className="cursor-pointer link transition-all absolute md:!top-[-3] !top-[0px] sm:!right:[10px] !right-[-8px] text-[14px] sm:text-[18px] " />
          <h3 className="md:text-[15px] text-[11px]  text-black">
            <Link to="/productdetails/2" className="link">
              Red Velvet Fresh Cream Cake Half kg
            </Link>
          </h3>

          <div className="flex items-center sm:py-2  gap-1 sm:gap-3">
            <span className="text-gray-400 sm:!text-[15px] text-[11px] ">
              Brands :<span className="font-[400] text-[10px]  sm:!text-[14px] text-gray-600  pl-1">
                BirthDay Cake
              </span>
            </span>
            <Rating name="sixe-small" defaultValue={4} sixe="small" className="!text-[10px] sm:!text-[16px]" readOnly />
            <span className="text-[10px] sm:!text-[14px] cursor-pointer">
              Review {5}
            </span>
          </div>
          <div className="flex items-center  gap-4 my-1">
            <span className="price text-black sm:text-[15px] text-[13px] font-[600]">
              ₹900
            </span>
            <span className="oldPricce line-through text-grat-500 text text-[10px] sm:!text-[14px] font-[500]">
              ₹1500
            </span>
            <span className="price text-[#7d0492] sm:text-[14px] text-[10px] font-[600]">
              20% off
            </span>
          </div>
          <div className="flex sm:gap-4 gap-2 items-center sm:pt-2 sm:mb-1">
            <span className="flex items-center gap-2 text-[10px] sm:text-[14px] link cursor-pointer font-[500]">
              <FaRegHeart className="sm:text-[16px] text-[12px] " /> Add to WhishList
            </span>
            <span className="flex items-center gap-2 text-[10px] sm:text-[14px] link cursor-pointer font-[500]">
              <GoGitCompare className="sm:text-[18px] text-[12px]  " /> Add to Compare
            </span>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default CartItems;
