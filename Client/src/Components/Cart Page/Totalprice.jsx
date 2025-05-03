import React, { useContext } from 'react';
import { Divider } from "@mui/material";
import { HiShoppingBag } from "react-icons/hi2";
import { AppContext } from '../context/Appcontext.jsx';

function Totalprice({ handlePlaceOrder }) {
  const { cartItems: contextCartItems } = useContext(AppContext);
  const cartItems = contextCartItems || [];

  const totalOriginalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.oldprice * item.quantity,
    0
  );

  const totalDiscountedPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const discountAmount = totalOriginalPrice - totalDiscountedPrice;
  const discountPercent = totalOriginalPrice
    ? Math.round((discountAmount / totalOriginalPrice) * 100)
    : 0;

  return (
    <div className="shadow-md !w-[100%] rounded-md bg-white p-6">
      <h3 className="py-2 pb-5 px-1 font-[500]">PRICE DETAILS</h3>
      <Divider />
      <p className="flex items-center justify-between !pt-5 px-1">
        <span className="text-[15px] font-[500]">Price ({cartItems.length} items)</span>
        <span className="font-bold">₹{totalOriginalPrice.toFixed(2)}</span>
      </p>
      <p className="flex items-center justify-between py-2 px-1">
        <span className="text-[15px] font-[500]">Discount</span>
        <span className="font-bold">{discountPercent}% Off</span>
      </p>
      <p className="flex items-center justify-between py-2 px-1">
        <span className="text-[15px] font-[500]">Delivery Charges</span>
        <span className="font-bold">Free</span>
      </p>
      <p className="flex items-center justify-between py-2 px-1">
        <span className="text-[15px] font-[500]">Payment Process</span>
        <span className="font-bold">Cash on Delivery
        </span>
      </p>
      <Divider />
      <p className="flex items-center justify-between px-1 py-1">
        <span className="text-[15px] pt-2 text-black font-[600]">Total Amount</span>
        <span className="font-bold text-[15px] mt-3 text-black">₹{totalDiscountedPrice.toFixed(2)}</span>
      </p>
      <p className="text-[#7d0492] px-1 text-sm  font-medium">
        You will save ₹{discountAmount.toFixed(2)} on this order
      </p>
     
    </div>
  );
}

export default Totalprice;
