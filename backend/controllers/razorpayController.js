import { instance } from "../index.js";
import crypto from "crypto";
import Booking from "../models/Bookingmodel.js";
import Listing from "../models/listingmodel.js";

export const processPayment = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: Math.round(Number(amount) * 100), // paise
      currency: "INR",
    };

    const order = await instance.orders.create(options);

    return res.status(200).json({
      success: true,
      message: "Payment Process",
      order,
    });
  } catch (error) {
    console.log(error);
    console.log("Razorpay Error:", error);

    return res.status(500).json({
      success: false,
      message: "Payment Process Error",
    });
  }
};

export const getKey = async (req, res) => {
  res.status(200).json({
    key: process.env.KEY_ID,
  });
};

export const paymentVerification = async (req, res) => {

  console.log("paymentVerification API Hit");

  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body =
      `${razorpay_order_id}|${razorpay_payment_id}`;


    const expectedSignature =
      crypto
      .createHmac(
        "sha256",
        process.env.TEST_KEY_SECRET
      )
      .update(body)
      .digest("hex");



    if(expectedSignature !== razorpay_signature){

      return res.status(400).json({

        success:false,

        message:"Payment verification failed"

      });

    }

     // Create Payment
      // const payment = await Payment.create({
      //   booking: booking._id,

      //   user: req.userId,

      //   amount: totalCharges,

      //   currency: "INR",

      //   method: "razorpay",

      //   paymentStatus: "success",

      //   transactionId: razorpay_payment_id,

      //   razorpayOrderId: razorpay_order_id,

      //   razorpayPaymentId: razorpay_payment_id,

      //   razorpaySignature: razorpay_signature,

      //   paidAt: new Date(),
      // });

    return res.status(200).json({

      success:true,
      message:"Payment Verified",
      paymentStatus:"paid",
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature

    });



  } catch(error){

    console.log(
      "Payment Verification Error",
      error
    );


    return res.status(500).json({

      success:false,

      message:error.message

    });

  }

};