import React, { useState } from "react";
import Feedback from "../Feedback/Feedback.jsx";
import { Link } from "react-router-dom";

function PaymentSuccess() {
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <div className="max-w-xl mx-auto mt-10 mb-10 p-6 bg-white rounded-xl shadow-md py-30 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful 🎉</h1>
      <p className="text-lg text-gray-700 mb-6">
        Thank you for your order! Your order has been placed successfully.
      </p>
        <Link to='/feedback'>
        <button
          onClick={() => setShowFeedback(true)}
          className="border !text-gray-500 !font-[500] px-6 py-2 rounded hover:!text-black transition"
        >
          Give Feedback
        </button>
        </Link>
      
    </div>
  );
}

export default PaymentSuccess;
