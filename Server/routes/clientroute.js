import express from "express"
import { getAllProductsByCategory, getUserOrders, placeorder, productlist } from "../controller/clientcontroller.js";
import userAuth from "../middleware/userAuth.js";


const clientrouter=express.Router();

clientrouter.get("/productlist",productlist);
clientrouter.get("/productsbycategory",getAllProductsByCategory);
clientrouter.post("/place-order",userAuth ,placeorder);
clientrouter.get("/get-orders",userAuth ,getUserOrders);
export default clientrouter;