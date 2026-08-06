import express from "express";
import { SignIn, SignUp, SignOut, sendOtp, verifyOtp, resetPassword, googleAuth } from "../controllers/authController.js";
import { loginLimiter,registerLimiter,sendOtpLimiter,verifyOtpLimiter,forgotPasswordLimiter} from "../middlewares/rateLimiter.js"
import asyncHandler from "../middlewares/asyncHandler.js";
import isValidate from "../middlewares/isValidate.js";
import { loginSchema, registerSchema } from "../Schema.js";

const authRouter = express.Router();

authRouter.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});

authRouter.post("/signup" , registerLimiter, isValidate(registerSchema) , SignUp);
authRouter.post("/signin",loginLimiter, isValidate(loginSchema) , SignIn);
authRouter.post("/logout", SignOut);
authRouter.get("/signout", SignOut);
authRouter.post("/send-otp", sendOtpLimiter , sendOtp);
authRouter.post("/verify-otp", verifyOtpLimiter, verifyOtp);
authRouter.post("/reset-password", forgotPasswordLimiter, resetPassword);
authRouter.post("/google-auth", googleAuth);




export default authRouter;