// Server/routes/paymentrazorpay.js

import express from "express";
import { createOrder, verifyPayment } from "../controller/payment.controller.js";

const router = express.Router();

// Routes
router.post("/createOrder", createOrder);
router.post("/verifyPayment", verifyPayment);

export default router;
