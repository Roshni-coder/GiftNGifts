// Server/controllers/payment.controller.js

import { createRazorpayInstance } from "../config/razorpay.config.js";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const razorpayInstance = createRazorpayInstance();

// Create Order Controller
export const createOrder = async (req, res) => {
  const { courseId, amount } = req.body;

  if (!courseId || !amount) {
    return res.status(400).json({
      success: false,
      message: "Course id and amount are required",
    });
  }

  const options = {
    amount: amount * 100, // Razorpay works in paise
    currency: "INR",
    receipt: `receipt_order_${Math.random().toString(36).substring(7)}`, // Dynamic receipt
  };

  try {
    const order = await razorpayInstance.orders.create(options);

    return res.status(200).json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// Verify Payment Controller
export const verifyPayment = async (req, res) => {
  const { order_id, payment_id, signature } = req.body;
  const secret = process.env.RAZORPAY_KEY_SECRET;

  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(order_id + "|" + payment_id);
  const generatedSignature = hmac.digest("hex");

  if (generatedSignature === signature) {
    return res.status(200).json({
      success: true,
      message: "Payment verified",
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Payment not verified",
    });
  }
};
