import addproductmodel from "../model/addproduct.js";
import Category from "../model/Category.js";
import orderModel from "../model/order.js";

export const productlist = async (req, res) => {
  try {
    const categories = await Category.find();
    const products = await addproductmodel.find();

    if (!products.length) {
      return res.status(404).json({ message: "No products found in this category" });
    }

    res.status(200).json({ products, categories });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

export const getAllProductsByCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    const result = await Promise.all(categories.map(async (category) => {
      const products = await addproductmodel.find({ categoryname: category._id });
      return { category: category.categoryname, products };
    }));
    res.status(200).json({ success: true, categories: result });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

export const placeorder = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress, userId, image, paymentId } = req.body;

    if (!items?.length || !shippingAddress || !totalAmount) {
      return res.status(400).json({ success: false, message: "Missing required order details." });
    }

    const newOrder = new orderModel({
      user: userId,
      items,
      totalAmount,
      shippingAddress,
      image,
      paymentId: paymentId || null,
    });

    await newOrder.save();
    res.status(201).json({ success: true, message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Order placement failed:", error.message);
    res.status(500).json({ success: false, message: "Failed to place order", error: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel
      .find({ user: userId })
      .populate("items.productId")
      .sort({ placedAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderModel.findById(id).populate("items.productId");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch order", error: error.message });
  }
};

