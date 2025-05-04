
import addproductmodel from "../model/addproduct.js";
import Category from "../model/Category.js";
import orderModel from "../model/order.js";

export const productlist=async(req,res)=>{
  try{

  const categories=await Category.find({});
  const products=await addproductmodel.find({});

  if(products.length==0){
    return res.status(404).json({message:"No products found in this category"})
  }

  res.status(200).json({products:products,categories:categories});


}

catch (err) {
  res.status(500).json({ error: 'Server error', details: err.message });
}

}

export const getAllProductsByCategory = async (req, res) => {
  try {
    const categories = await Category.find({});
    const result = [];

    for (const category of categories) {
      const products = await addproductmodel.find({ categoryname: category._id });
      result.push({
        category: category.categoryname,
        products,
      });
    }

    res.status(200).json({success:true,categories:result});
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};


export const placeorder=async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress,userId } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Order items are required." });
    }

    if (!shippingAddress || !totalAmount ) {
      return res.status(400).json({ success: false, message: "Missing required order details." });
    }

    const newOrder = new orderModel({
       // decoded from JWT by middleware
      user:userId,
      items,
      totalAmount,
      shippingAddress
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

    const orders = await orderModel.find({ user: userId }).populate('items.productId').sort({ placedAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
