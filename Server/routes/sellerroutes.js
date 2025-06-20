import express from "express"
import authseller from "../middleware/authseller.js"
import { addproducts, getSellerOrders, getSellerProfile, loginseller, registerseller, updateSellerProfile, userlist } from "../controller/sellercontroller.js";
import upload from "../middleware/multer.js";

const sellerrouter=express.Router();

sellerrouter.post('/register',registerseller);
sellerrouter.post("/login",loginseller)
sellerrouter.post("/addproducts",upload.array('images', 5), addproducts)
// sellerrouter.get("/orders",authseller,sellerorders)
sellerrouter.get("/profile",authseller,getSellerProfile);
sellerrouter.post("/updateprofile",authseller,updateSellerProfile);
sellerrouter.get("/users-list",authseller,userlist);

// Define GET /api/seller/orders route
sellerrouter.get("/orders", getSellerOrders);
export default sellerrouter;