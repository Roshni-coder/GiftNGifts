import express from "express";
import {
  productlist,
  getAllProductsByCategory,
  placeorder,
  getUserOrders,
  getOrderById,
} from "../controller/clientcontroller.js";

import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.get("/productlist", productlist);
router.get("/productsbycategory", getAllProductsByCategory);
router.post("/place-order", userAuth, placeorder);
router.get("/get-orders", userAuth, getUserOrders);
router.get("/order/:id", userAuth, getOrderById);

export default router;
