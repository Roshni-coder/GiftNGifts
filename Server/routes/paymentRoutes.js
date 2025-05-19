import express from "express";
import {
  checkout,
  paymentVerification,
  getRazorpayKey
} from "../controller/paymentController.js";

const router = express.Router();

router.post("/checkout", checkout);
router.post("/paymentVerification", paymentVerification);
router.get("/getkey", getRazorpayKey);

export default router;
