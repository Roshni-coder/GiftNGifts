import React from 'react'
import { Divider } from "@mui/material";
import { HiShoppingBag } from "react-icons/hi2";
import { Link } from "react-router-dom";
function Totalprice() {
  return (
    <>
         
          <div className="shadow-md !w-[100%] rounded-md  bg-white p-5">
            <h3 className="py-2 pb-3 px-1 font-[500]">PRICE DETAILS</h3>
            <Divider />
            <p className="flex items-center justify-between !pt-5 px-1">
              <span className="text-[14px] font-[500]">Price (3 items)</span>
              <span className="font-bold">₹2700</span>
            </p>
            <p className="flex items-center justify-between py-1 px-1">
              <span className="text-[14px] font-[500]">Discount</span>
              <span className="font-bold">20% Off</span>
            </p>
            <p className="flex items-center justify-between py-1 px-1">
              <span className="text-[14px] font-[500]">Delivery Charges</span>
              <span className="font-bold">Free</span>
            </p>
<Divider/>
            <p className="flex items-center justify-between  px-1">
              <span className="text-[14px] pt-2  text-black font-[600]">
                Total Amount
              </span>
              <span className="font-bold text-[14px] mt-3 text-black">₹2,000</span>
            </p>
            <Divider/>
            <Link to='/checkout'>
            <button className='btn-org w-full flex justify-center gap-2 !p-2'>
             <HiShoppingBag className='text-[18px]'/> Place Order
            </button>
            </Link>
           
          </div>
     
    </>
  )
}

export default Totalprice
