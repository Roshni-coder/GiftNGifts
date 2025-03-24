import React from "react";
import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import { HiShoppingBag } from "react-icons/hi2";
import CartItems from "./CartItems";
import { Link } from "react-router-dom";
import Totalprice from "./Totalprice";
function Cartpage() {
  return (
    <section className="section py-3">
      <div className="container lg:w-[80%] lg:mx-w-[80%] w-full lg:flex gap-4">
        <div className="leftPart lg:w-[70%] w-full">
          <div className="py-2 bg-white sm:px-3 px-2 border-b border-[rgba(0,0,0,0.1)]">
            <h2 className="text-black ">Your Cart</h2>
            <p className="">
              There are <span className="font-bold">2</span> products in your
              cart
            </p>
          </div>
          <div className="shadow-md rounded-md bg-white reviewScroll w-full border-b border-gray-200  !max-h-[450px] overflow-y-scroll overflow-x-hidden">
            <CartItems />
            <CartItems />
            <CartItems />
            <CartItems />
          </div>
        </div>

        <div className="rightPart w-full lg:!m-0 mt-4 lg:w-[30%]">
        <Totalprice/>
        </div>
      </div>
    </section>
  );
}

export default Cartpage;
