import React from 'react';
import { TbTruckDelivery } from "react-icons/tb";

function FreeShip() {
  return (
    <div className="mt-6  w-[90%] max-w-screen-lg mx-auto">
      {/* Free Shipping Section */}
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg py-3 md:py-6 px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2  md:gap-6">
          
          {/* Icon and Title */}
          <div className="flex items-center ">
            <TbTruckDelivery className="text-xl md:text-5xl text-black" />
            <span className="text-sm md:text-[18px]  font-semibold text-gray-800">
              Free Shipping
            </span>
          </div>

          {/* Divider */}
          <span className="hidden md:block h-6 w-px bg-gray-300"></span>

          {/* Description */}
          <div className="text-center md:text-left">
            <p className="text-[11px] md:text-[14px] lg:text-[16px] text-gray-600 pt-3">
              Free Delivery Now On Your First Order and Over <span className="font-semibold text-black">₹100</span>
            </p>
          </div>

          {/* Divider */}
          <span className="hidden md:block h-6 w-px bg-gray-300"></span>

          {/* Highlighted Text */}
          <p className="pt-3 font-bold text-sm md:!text-[18px] text-black">
            Only ₹100*
          </p>
        </div>
      </div>
    </div>
  );
}

export default FreeShip;
