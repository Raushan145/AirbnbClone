import express from "express";
import {
  getKey,
  paymentVerification,
  processPayment,
} from "../controllers/razorpayController.js";
import isAuth from "../middlewares/isAuth.js";
const PaymentRouter = express.Router();

PaymentRouter.post("/process", processPayment);
PaymentRouter.get("/getKey", getKey);
PaymentRouter.post("/paymentVerification",isAuth, paymentVerification);

export default PaymentRouter;
