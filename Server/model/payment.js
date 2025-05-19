import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,
});

export default mongoose.model("payment", paymentSchema);