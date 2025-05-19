import React from "react";
import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="max-w-xl mx-auto mt-10 mb-10 p-6 bg-white rounded-xl shadow-md py-30 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Order Placed Successfully 🎉</h1>
      <p className="text-lg text-gray-700 mb-6">
        Your order has been placed with Cash on Delivery.
      </p>
      <Link to="/feedback">
        <button className="border !text-gray-500 !font-[500] px-6 py-2 rounded hover:!text-black transition">
          Give Feedback
        </button>
      </Link>
    </div>
  );
}

export default OrderSuccess;
