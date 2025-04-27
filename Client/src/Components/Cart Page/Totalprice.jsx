import React, { useContext } from 'react';
import { Divider } from "@mui/material";
import { HiShoppingBag } from "react-icons/hi2";
import { AppContext } from '../context/Appcontext.jsx';

function Totalprice({ handlePlaceOrder }) {  // Accept the prop
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
    <div className="shadow-md !w-[100%] rounded-md bg-white p-5">
      <h3 className="py-2 pb-3 px-1 font-[500]">PRICE DETAILS</h3>
      <Divider />
      <p className="flex items-center justify-between !pt-5 px-1">
        <span className="text-[14px] font-[500]">Price ({cartItems.length} items)</span>
        <span className="font-bold">₹{totalOriginalPrice}</span>
      </p>
      <p className="flex items-center justify-between py-1 px-1">
        <span className="text-[14px] font-[500]">Discount</span>
        <span className="font-bold">{discountPercent}% Off</span>
      </p>
      <p className="flex items-center justify-between py-1 px-1">
        <span className="text-[14px] font-[500]">Delivery Charges</span>
        <span className="font-bold">Free</span>
      </p>
      <Divider />
      <p className="flex items-center justify-between px-1">
        <span className="text-[14px] pt-2 text-black font-[600]">Total Amount</span>
        <span className="font-bold text-[14px] mt-3 text-black">₹{totalDiscountedPrice}</span>
      </p>
      <Divider />
      <button
        className="btn-org w-full flex justify-center gap-2 !p-2 mt-2"
        onClick={handlePlaceOrder}  // Call the function when clicked
      >
        <HiShoppingBag className="text-[18px]" /> Place Order
      </button>
    </div>
  );
}

export default Totalprice;
