import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId,ref:"Product", required: true },
      title: String,
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  shippingAddress: {
    name: String,
    pin: Number,
    city: String,
    state: String,
    phone: String,
    alternatephone: String,
    address: String
  },
  status: {
    type: String,
    default: "Pending"
  },
  placedAt: {
    type: Date,
    default: Date.now
  }
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;