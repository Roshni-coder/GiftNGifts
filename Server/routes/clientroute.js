import express from "express"
import { getAllProductsByCategory, productlist } from "../controller/clientcontroller.js";


const clientrouter=express.Router();

clientrouter.get("/productlist",productlist);
clientrouter.get("/productsbycategory",getAllProductsByCategory);
export default clientrouter;