import express from "express"
import { getAllProductsByCategory,productlist ,placeorder, getUserOrders, getOrderById} from "../controller/clientcontroller.js";
import userAuth from "../middleware/userAuth.js";


const clientrouter=express.Router();

clientrouter.get("/productlist",productlist);
clientrouter.get("/productsbycategory",getAllProductsByCategory);

// Place Order (with or without paymentId)
clientrouter.post("/place-order", userAuth, placeorder);

// Get all orders for logged-in user
clientrouter.get("/get-orders", userAuth, getUserOrders);

// Get specific order by ID
clientrouter.get("/order/:id", userAuth, getOrderById);


export default clientrouter;