import express from "express"
import authseller from "../middleware/authseller.js"
import { addproducts, getSellerProfile, loginseller, registerseller,sellerorders, updateSellerProfile } from "../controller/sellercontroller.js";
import upload from "../middleware/multer.js";
import { userlist } from "../controller/admincontroller.js";
const sellerrouter=express.Router();

sellerrouter.post('/register',registerseller);
sellerrouter.post("/login",loginseller)
sellerrouter.post("/addproducts",upload.array('images', 5), addproducts)
sellerrouter.get("/orders",authseller,sellerorders)
sellerrouter.get("/profile",authseller,getSellerProfile);
sellerrouter.post("/updateprofile",authseller,updateSellerProfile);
sellerrouter.get("/users-list",authseller,userlist);

export default sellerrouter;